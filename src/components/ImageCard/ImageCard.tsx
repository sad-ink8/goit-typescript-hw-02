import css from "./ImageCard.module.css";
import React from "react";
import { GetImg } from "../App/App";

interface Props {
  image: GetImg;
  onOpen: (image: GetImg) => void;
}

const ImageCard: React.FC<Props> = ({ image, onOpen }) => {
  return (
    <div onClick={() => onOpen(image)}>
      <img
        src={image.urls.small}
        alt={image.alt_description || "Image"}
        className={css.ImgCard}
      />
    </div>
  );
};

export default ImageCard;
