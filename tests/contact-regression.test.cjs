const assert = require("node:assert/strict");
const { readFileSync, readdirSync, existsSync } = require("node:fs");
const path = require("node:path");
const { test } = require("node:test");
const vm = require("node:vm");
const ts = require("typescript");
const React = require("react");

const root = path.resolve(__dirname, "..");
const output = path.join(root, "out");
const phone = "tel:+966553027623";
const whatsapp = "https://wa.me/966553027623";

function loadComponent(relativePath, mocks = {}) {
  const source = readFileSync(path.join(root, relativePath), "utf8");
  const compiled = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      jsx: ts.JsxEmit.ReactJSX,
      esModuleInterop: true,
    },
  }).outputText;
  const module = { exports: {} };
  vm.runInNewContext(compiled, {
    module,
    exports: module.exports,
    require: (name) => mocks[name] ?? require(name),
  });
  return module.exports;
}

function descendants(element) {
  if (!React.isValidElement(element)) return [];
  return [element, ...React.Children.toArray(element.props.children).flatMap(descendants)];
}

function htmlFiles(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const file = path.join(directory, entry.name);
    return entry.isDirectory() ? htmlFiles(file) : file.endsWith(".html") ? [file] : [];
  });
}

test("exported pages retain working local links, images, scripts, and styles", () => {
  const files = htmlFiles(output);
  assert.ok(files.length >= 14);
  for (const file of files) {
    const html = readFileSync(file, "utf8");
    for (const [, url] of html.matchAll(/(?:href|src)="(\/[^"?#]*)[^" ]*"/g)) {
      const target = path.join(output, decodeURIComponent(url));
      assert.ok(
        existsSync(target) || existsSync(`${target}.html`) || existsSync(path.join(target, "index.html")),
        `${path.relative(output, file)} has a broken local URL ${url}`,
      );
    }
    assert.match(html, /lang="ar" dir="rtl"/);
    assert.match(html, /GTM-PDCHN49R/);
    const jsonLd = html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s);
    assert.ok(jsonLd, `${file} missing structured data`);
    const business = JSON.parse(jsonLd[1]).find((item) => item["@type"] === "LocalBusiness");
    assert.equal(business.address.addressLocality, "جدة");
    assert.equal(business.telephone, "+966553027623");
  }
});

test("shutter hero and sidebar offer the correct telephone and WhatsApp destinations", () => {
  const html = readFileSync(path.join(output, "services/window-shutter.html"), "utf8");
  const hero = html.match(/<section\b.*?<\/section>/s)[0];
  assert.match(hero, /<h1[^>]*>تركيب شتر نوافذ بجدة<\/h1>/);
  assert.ok(hero.includes(`href="${phone}"`));
  assert.ok(hero.includes(`href="${whatsapp}"`));
  assert.ok(hero.includes("اتصل الآن لطلب عرض سعر"));
  const aside = html.match(/<aside\b.*?<\/aside>/s)[0];
  assert.ok(aside.includes(`href="${phone}"`));
  assert.match(html, /rel="canonical" href="https:\/\/rowadamana.com\/services\/window-shutter"/);
});

test("contact page shows Jeddah and a clearly labelled city service-area map", () => {
  const html = readFileSync(path.join(output, "contact.html"), "utf8");
  assert.match(html, /عرض نطاق الخدمة في جدة/);
  assert.match(html, /maps\.google\.com\/maps\?q=Jeddah/);
  assert.doesNotMatch(html, /Riyadh|الرياض/);
});

test("desktop and mobile sticky contact links emit exactly one matching lead event", () => {
  const events = [];
  const StickyContact = loadComponent("src/components/layout/StickyContact.tsx", {
    "@/lib/analytics": { pushLeadInteraction: (...args) => events.push(args) },
    "@/lib/constants": { CONTACT: { phone: "+966553027623", whatsapp: "+966553027623" } },
  }).default;
  const links = descendants(StickyContact()).filter((element) => element.type === "a");
  assert.equal(links.length, 4);
  for (const [index, link] of links.entries()) {
    link.props.onClick();
    assert.equal(events.length, index + 1);
    const [channel, location] = events[index];
    assert.equal(link.props.href, channel === "phone" ? phone : whatsapp);
    assert.match(location, /^sticky_(desktop|mobile)$/);
    if (channel === "whatsapp") assert.equal(link.props.rel, "noopener noreferrer");
  }
  assert.deepEqual(events, [
    ["phone", "sticky_desktop"],
    ["whatsapp", "sticky_desktop"],
    ["phone", "sticky_mobile"],
    ["whatsapp", "sticky_mobile"],
  ]);
});

test("tracked contact anchors preserve caller handlers and navigation", () => {
  const events = [];
  const Anchor = loadComponent("src/components/analytics/TrackedContactAnchor.tsx", {
    "@/lib/analytics": { pushLeadInteraction: (...args) => events.push(args) },
  }).default;
  for (const [channel, href] of [["phone", phone], ["whatsapp", whatsapp]]) {
    let calls = 0;
    const element = Anchor({
      href, leadChannel: channel, leadLocation: "shutter_hero", onClick: () => calls++,
    });
    element.props.onClick({});
    assert.equal(element.props.href, href);
    assert.equal(calls, 1);
  }
  assert.deepEqual(events, [["phone", "shutter_hero"], ["whatsapp", "shutter_hero"]]);
});

test("lead interactions keep the existing GTM event contract", () => {
  const events = [];
  const { pushLeadInteraction } = loadComponent("src/lib/analytics.ts", {
    "@next/third-parties/google": { sendGTMEvent: (event) => events.push(event) },
  });
  pushLeadInteraction("phone", "shutter_hero");
  assert.equal(JSON.stringify(events), JSON.stringify([{
    event: "lead_interaction", lead_channel: "phone", lead_location: "shutter_hero",
  }]));
});
