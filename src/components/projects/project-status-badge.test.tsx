import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { ProjectStatusBadge } from "@/components/projects/project-status-badge";

describe("ProjectStatusBadge", () => {
  it("renders the active label (Aperta)", () => {
    const markup = renderToStaticMarkup(
      <ProjectStatusBadge isActive={true} />
    );

    expect(markup).toContain("Aperta");
    expect(markup).toContain("text-primary");
  });

  it("renders the inactive label (Chiusa)", () => {
    const markup = renderToStaticMarkup(
      <ProjectStatusBadge isActive={false} />
    );

    expect(markup).toContain("Chiusa");
    expect(markup).toContain("text-[#7b4c00]");
  });
});
