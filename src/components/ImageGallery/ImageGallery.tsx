import css from "./ImageGallery.module.css";
import ImageCard from "../ImageCard/ImageCard";

import { GetImg } from "../App/App";
import React from "react";

interface Props {
  images: GetImg[];
  onCardClick: (image: GetImg) => void;
}

const ImageGallery: React.FC<Props> = ({ images, onCardClick }) => {
  return (
    <div className={css.GalleryContainer}>
      <ul className={css.ImageGallery}>
        {images.map((image) => (
          <li key={image.id}>
            <ImageCard image={image} onOpen={onCardClick} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ImageGallery;
