import "dotenv/config";
import app from "./app";
import { connectToDatabase } from "./db";
const port = 3000;

async function main() {
  await connectToDatabase();

  app.listen(port, () => {
    console.log(`Notes app listening on port ${port}`);
  });
}

main();
