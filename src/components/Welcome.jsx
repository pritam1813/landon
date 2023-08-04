import React, { useEffect, useState } from "react";
import { loadDataFromEndpoint } from "../helpers/utils";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
// Use this to run the app locally
// import galleryImagesData from "./data/gallery_images.json";

const cld = new Cloudinary({
  cloud: {
    cloudName: import.meta.env.VITE_CLOUD_NAME,
  },
});

function Welcome() {
  const [galleryImagesData, setGalleryImagesData] = useState([]);

  useEffect(() => {
    //Loads the menu Links data from the AWS API Gateway
    loadDataFromEndpoint("gallery_images", setGalleryImagesData);
  }, []);

  return (
    <div className="scene" id="welcome">
      <article className="content">
        <div className="gallery">
          {galleryImagesData.map((images) => (
            /*
            //Can be used without the need of cloudinary
            <img
              key={images.src}
              className={images.className}
              src={images.src}
              alt={images.alt}
            />
            */
            <AdvancedImage
              key={images.public_id}
              cldImg={cld.image(`landon/${images.public_id}`)}
              className={images.className}
              alt={images.alt}
            />
          ))}
        </div>
        <h1>Welcome to the Landon&nbsp;Hotel</h1>
        <p>
          The original Landon perseveres after 50 years in the heart of West
          London. The West End neighborhood has something for everyone—from
          theater to dining to historic sights. And the not-to-miss Rooftop Cafe
          is a great place for travelers and locals to engage over drinks, food,
          and good&nbsp;conversation. &nbsp;To learn more about the Landon Hotel
          in the West End, browse our website and{" "}
          <a href="files/landon_information_sheet_London.pdf">
            download our handy information sheet
          </a>
          .
        </p>
      </article>
    </div>
  );
}

export default Welcome;
