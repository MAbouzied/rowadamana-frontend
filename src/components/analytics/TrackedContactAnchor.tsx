"use client";

import type { LeadChannel } from "@/lib/analytics";
import { pushLeadInteraction } from "@/lib/analytics";

type Props = React.ComponentPropsWithoutRef<"a"> & {
  leadChannel: LeadChannel;
  leadLocation: string;
};

export default function TrackedContactAnchor({
  leadChannel,
  leadLocation,
  onClick,
  ...rest
}: Props) {
  return (
    <a
      {...rest}
      onClick={(e) => {
        pushLeadInteraction(leadChannel, leadLocation);
        onClick?.(e);
      }}
    />
  );
}
