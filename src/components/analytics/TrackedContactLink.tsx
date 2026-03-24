"use client";

import Link from "next/link";
import type { LeadChannel } from "@/lib/analytics";
import { pushLeadInteraction } from "@/lib/analytics";

type Props = React.ComponentPropsWithoutRef<typeof Link> & {
  leadChannel: LeadChannel;
  leadLocation: string;
};

export default function TrackedContactLink({
  leadChannel,
  leadLocation,
  onClick,
  ...rest
}: Props) {
  return (
    <Link
      {...rest}
      onClick={(e) => {
        pushLeadInteraction(leadChannel, leadLocation);
        onClick?.(e);
      }}
    />
  );
}
