import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { ClientStatusBadge } from "@/components/clients/client-status-badge";

describe("ClientStatusBadge", () => {
  it("renders the active label", () => {
    const markup = renderToStaticMarkup(
      <ClientStatusBadge isActive={true} />
    );

    expect(markup).toContain("Attivo");
    expect(markup).toContain("text-primary");
  });

  it("renders the inactive label", () => {
    const markup = renderToStaticMarkup(
      <ClientStatusBadge isActive={false} />
    );

    expect(markup).toContain("Disattivato");
    expect(markup).toContain("text-[#7b4c00]");
  });
});
