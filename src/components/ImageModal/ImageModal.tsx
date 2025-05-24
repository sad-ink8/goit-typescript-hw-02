import React from "react";
import Modal from "react-modal";
import css from "./ImageModal.module.css";

import { GetImg } from "../App/App";

Modal.setAppElement("#root");

interface Props {
  modalIsOpen: boolean;
  closeModal: () => void;
  image: GetImg | null;
}

const ImageModal: React.FC<Props> = ({ modalIsOpen, closeModal, image }) => {
  if (!image) return null;
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      contentLabel="Chosen image"
      className={css.Modal}
      overlayClassName={css.Overlay}
    >
      <div className={css.ModalImgContainer}>
        <img
          src={image.urls.regular}
          alt="Chosen image"
          className={css.ImgModal}
        />
        <p className={css.author}>{image.user.name}</p>
      </div>
    </Modal>
  );
};

export default ImageModal;
