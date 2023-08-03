import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataPath = path.join(__dirname, "../components/data/gallery_images.json");

const REGION = "us-east-1";

const dbclient = new DynamoDB({ region: REGION });
const ddbDocClient = DynamoDBDocument.from(dbclient);

console.log("Writing entries to GalleryImages table.");

try {
  const GalleryImagesData = JSON.parse(fs.readFileSync(dataPath, "utf8"));

  for (const GalleryImage of GalleryImagesData) {
    let className = GalleryImage.className;
    if (className.trim() == "") {
      className = "no_class";
    }
    const params = {
      TableName: "GalleryImages",
      Item: {
        src: GalleryImage.src,
        alt: GalleryImage.alt,
        className,
      },
    };

    try {
      await ddbDocClient.put(params);
      console.log("Added", GalleryImage.alt, "to table.");
    } catch (err) {
      console.error(
        "Unable to load data into table for GalleryImages",
        GalleryImage.alt,
        ". Error: ",
        err
      );
    }
  }
} catch (err) {
  console.error("Error reading the file:", err);
}
