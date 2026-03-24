"use client";

import { sendGTMEvent } from "@next/third-parties/google";

export type LeadChannel =
  | "whatsapp"
  | "phone"
  | "email"
  | "contact_form"
  | "nav_contact";

export function pushLeadInteraction(
  leadChannel: LeadChannel,
  leadLocation: string,
  extra?: Record<string, unknown>
) {
  sendGTMEvent({
    event: "lead_interaction",
    lead_channel: leadChannel,
    lead_location: leadLocation,
    ...extra,
  });
}
