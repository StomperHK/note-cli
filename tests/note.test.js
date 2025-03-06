import { beforeEach, expect, jest } from "@jest/globals";
import {
  createNote,
  filterNotes,
  removeNoteById,
  deleteAllNotes,
} from "../src/note.js";

jest.unstable_mockModule("../src/db.js", () => ({
  getDatabaseData: jest.fn(),
  setDatabaseData: jest.fn(),
}));

jest.unstable_mockModule("../src/note.js", () => ({
  listAllNotes: jest.fn(),
}));

const { getDatabaseData, setDatabaseData } = await import("../src/db.js");
const { listAllNotes } = await import("../src/note.js");

beforeEach(() => {
  getDatabaseData.mockClear(),
    setDatabaseData.mockClear(),
    listAllNotes.mockClear();
});

describe("cli functionalities", () => {
  test("createNote creates a note", async () => {
    const data = {
      id: Date.now(),
      title: "title",
      desc: "desc",
      tags: "tag, tag2",
    };

    getDatabaseData.mockResolvedValue('{"notes": []}');

    const result = await createNote(data);
    expect(result).toEqual(data);
  });

  test("filterNotes filters the notes", async () => {
    const expectedString = ["sair de casa (lazer) - sair com amigos"];

    const result = await filterNotes("sair");
    expect(result).toEqual(expectedString);
  });
});
