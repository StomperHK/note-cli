import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import open from "open";
import { fileURLToPath } from "node:url";
import { join } from "node:path";

import { returnNotesAsArray } from "./note.js";

function interpolateHtml(html, notes) {
  const tokenizedNotes = notes
    .map(
      ({ title, desc, tags }) => `
    <li>
      <h2>${title}${tags ? ` (${tags})` : ""}</h2>
      ${desc ? `<p>${desc}</p>` : ""}
    </li>
  `
    )
    .join("");

  return html.replace("<!--notes-->", tokenizedNotes);
}

function returnServerInstance(notes) {
  return createServer(async (req, res) => {
    const HTML_PATH = join(fileURLToPath(import.meta.url), "../template.html");
    const html = interpolateHtml(await readFile(HTML_PATH, "utf-8"), notes);

    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(html);
  });
}

export async function startWebServer(port = 3001) {
  const notes = await returnNotesAsArray();

  if (notes.length === 0) {
    console.log("no notes to show. ", notes);
    return;
  }

  const server = returnServerInstance(notes);

  server.listen(port);

  console.log("server launched");
  open(`http://127.0.0.1:${port}`);
}
