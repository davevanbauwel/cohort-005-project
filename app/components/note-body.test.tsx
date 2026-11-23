import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { NoteBody } from "./note-body";

function render(body: string) {
  const html = renderToStaticMarkup(<NoteBody body={body} />);
  const classes = /class="([^"]*)"/.exec(html)?.[1].split(" ") ?? [];
  return { html, classes };
}

describe("NoteBody", () => {
  it("wraps a long unbroken run instead of overflowing its card", () => {
    const { classes } = render(`See https://example.com/${"a".repeat(200)}`);

    expect(classes).toContain("break-words");
  });

  it("keeps the Student's line breaks", () => {
    const { classes } = render("one\ntwo");

    expect(classes).toContain("whitespace-pre-wrap");
  });

  it("shows Markdown characters as typed, not rendered", () => {
    const { html } = render("# not a heading\n*not bold*");

    expect(html).toContain("# not a heading\n*not bold*");
    expect(html).not.toContain("<h1");
    expect(html).not.toContain("<em");
  });

  it("escapes HTML in the body", () => {
    const { html } = render("<script>alert(1)</script>");

    expect(html).toContain("&lt;script&gt;");
    expect(html).not.toContain("<script>");
  });
});
