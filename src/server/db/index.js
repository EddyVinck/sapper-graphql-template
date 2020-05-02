export * from "./connect";
const hostname = "localhost";
const port = 27017; // default mongo port
const dbName = "___";
export const dbUrl = `mongodb://${hostname}:${port}/${dbName}`;
