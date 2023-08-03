import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataPath = path.join(
  __dirname,
  "../components/data/accessibilities.json"
);

const REGION = "us-east-1";

const dbclient = new DynamoDB({ region: REGION });
const ddbDocClient = DynamoDBDocument.from(dbclient);

console.log("Writing entries to Accessibilities table.");

try {
  const accessibilitiesData = JSON.parse(fs.readFileSync(dataPath, "utf8"));

  for (const accessibility of accessibilitiesData) {
    const params = {
      TableName: "Accessibilities",
      Item: {
        name: accessibility.name,
      },
    };

    try {
      await ddbDocClient.put(params);
      console.log("Added", accessibility.name, "to table.");
    } catch (err) {
      console.error(
        "Unable to load data into table for accessibility",
        accessibility.name,
        ". Error: ",
        err
      );
    }
  }
} catch (err) {
  console.error("Error reading the file:", err);
}
