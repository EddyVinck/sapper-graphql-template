export * from "./connect";
const hostname = "localhost";
const port = 27017; // default mongo port
const dbName = "__whatever";
export const dbUrl = `mongodb://${hostname}:${port}/${dbName}`;