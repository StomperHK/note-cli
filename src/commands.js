import yargs from "yargs";
import { hideBin } from "yargs/helpers";

import {
  createNote,
  filterNotes,
  removeNoteById,
  deleteAllNotes,
  listAllNotes,
} from "./note.js";

import { startWebServer } from "./server.js";

yargs(hideBin(process.argv))
  .command(
    "create <title> [desc]",
    "creates a note and saves it.",
    (yargs) => {
      return yargs
        .positional("title", {
          type: "string",
          description: "title of the note.",
        })
        .positional("desc", {
          type: "string",
          description: "description of the note.",
        });
    },
    async ({ title, desc, tags }) => {
      const noteData = { title, desc: desc ? desc : "", tags, id: Date.now() };
      createNote(noteData);
    }
  )
  .option("tags", {
    alias: "t",
    type: "string",
    desc: "comma separated list of tags to add to the note.",
  })
  .command(
    "filter <text>",
    "filters all the notes with the respective text.",
    (yargs) =>
      yargs.positional("text", {
        type: "string",
        description: "text to search on notes.",
      }),
    async ({ text }) => console.log(await filterNotes(text))
  )
  .command(
    "list",
    "list all the notes.",
    () => {},
    async () => console.log(await listAllNotes())
  )
  .command(
    "remove <id>",
    "removes a note by id",
    (yargs) => {
      return yargs.positional("id", {
        type: "number",
        description: "the id of the note you want to remove.",
      });
    },
    async ({ id }) => {
      removeNoteById(id);
    }
  )
  .command(
    "web [port]",
    "launch website to see notes.",
    (yargs) => {
      return yargs.positional("port", {
        describe: "port to bind on",
        default: 3001,
        type: "number",
      });
    },
    async ({ port }) => startWebServer(port)
  )
  .command(
    "clear",
    "removes all notes.",
    () => {},
    () => deleteAllNotes()
  )
  .demandCommand(1)
  .parse();
