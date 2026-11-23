/**
 * A Note body, shown as the Student typed it. A Note is plain text and is
 * never passed through the Markdown renderer. `break-words` keeps a pasted
 * URL or any other unbroken run inside its card.
 */
export function NoteBody({ body }: { body: string }) {
  return <p className="whitespace-pre-wrap break-words text-sm">{body}</p>;
}
