import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataPath = path.join(__dirname, "../components/data/services.json");

const REGION = "us-east-1";

const dbclient = new DynamoDB({ region: REGION });
const ddbDocClient = DynamoDBDocument.from(dbclient);

console.log("Writing entries to services table.");

try {
  const servicesData = JSON.parse(fs.readFileSync(dataPath, "utf8"));

  for (const service of servicesData) {
    const params = {
      TableName: "Services",
      Item: {
        name: service.name,
      },
    };

    try {
      await ddbDocClient.put(params);
      console.log("Added", service.name, "to table.");
    } catch (err) {
      console.error(
        "Unable to load data into table for service",
        service.name,
        ". Error: ",
        err
      );
    }
  }
} catch (err) {
  console.error("Error reading the file:", err);
}
