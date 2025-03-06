import { readFile, writeFile, readdir } from "node:fs/promises";

const DB_PATH = "./db.json";

export async function getDatabaseData() {
  try {
    await createDatabase();
    const data = await readFile(DB_PATH, "utf-8");

    return data;
  } catch (error) {
    console.log("error accessing database data: ", error.message);
  }
}

export async function setDatabaseData(newData) {
  try {
    await writeFile(DB_PATH, JSON.stringify(newData, null, 2));
  } catch (error) {
    console.log("error overwriting database data: ", error.message);
  }
}

async function checkIfDatabaseExists() {
  const result = await readdir(".");

  return result.includes("db.json");
}

async function createDatabase() {
  try {
    const databaseExists = await checkIfDatabaseExists();

    if (databaseExists) return;

    const data = {
      notes: [],
    };

    const formattedData = JSON.stringify(data, null, 2);
    await writeFile(DB_PATH, formattedData);
  } catch (error) {
    console.log("error creating database: ", error.message);
  }
}
