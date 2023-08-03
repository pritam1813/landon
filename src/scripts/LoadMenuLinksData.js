import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataPath = path.join(__dirname, "../components/data/menu_links.json");

const REGION = "us-east-1";

const dbclient = new DynamoDB({ region: REGION });
const ddbDocClient = DynamoDBDocument.from(dbclient);

console.log("Writing entries to MenuLinks table.");

try {
  const MenuLinksData = JSON.parse(fs.readFileSync(dataPath, "utf8"));

  for (const menuLink of MenuLinksData) {
    const params = {
      TableName: "MenuLinks",
      Item: {
        class: menuLink.class,
        href: menuLink.href,
        text: menuLink.text,
      },
    };

    try {
      await ddbDocClient.put(params);
      console.log("Added", menuLink.text, "to table.");
    } catch (err) {
      console.error(
        "Unable to load data into table for MenuLinks",
        menuLink.text,
        ". Error: ",
        err
      );
    }
  }
} catch (err) {
  console.error("Error reading the file:", err);
}
