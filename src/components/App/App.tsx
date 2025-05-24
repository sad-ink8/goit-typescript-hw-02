import { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

import SearchBar from "../SearchBar/SearchBar.js";
import ImageGallery from "../ImageGallery/ImageGallery.js";

import ImageModal from "../ImageModal/ImageModal.js";

import Loader from "../Loader/Loader.js";
import ErrorMessage from "../ErrorMessage/ErrorMessage.js";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn.js";

////
import Modal from "react-modal";
Modal.setAppElement("#root");
/////

////TYPISATION
export interface GetImg {
  id: string;
  alt_description: string | null;
  urls: {
    small: string;
    regular: string;
  };
  user: {
    name: string;
  };
}

interface Response {
  results: GetImg[];
  total: number;
}
////

function App() {
  const [images, setImages] = useState<GetImg[]>([]);
  const [query, setQuery] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const [modalImage, setModalImage] = useState<GetImg | null>(null);

  const [page, setPage] = useState<number>(1);
  const [totalImages, setTotalImages] = useState<number>(0);
  const [visible, setVisible] = useState<number>(0);

  async function fetchImages(search: string, pageNum: number): Promise<void> {
    if (loading) return;

    try {
      setLoading(true);

      const accessKey = "rQ-bYsY6JCiKCtNuToGFcv9fTdNQFxnXyN6vXONnhyQ";
      const response = await axios.get<Response>(
        `https://api.unsplash.com/search/photos`,
        {
          params: {
            query: search,
            page: pageNum,
            client_id: accessKey,
            per_page: 4,
          },
        }
      );
      if (response.data.results.length === 0) {
        toast.error("No photos for this topic");
        setImages([]);
        setTotalImages(0);
        setVisible(0);
        return;
      }

      setImages((prevImages) => [...prevImages, ...response.data.results]);
      setVisible((prevVisible) => prevVisible + response.data.results.length);

      setTotalImages(response.data.total);

      setError(false);
    } catch (error) {
      setError(true);
      setTotalImages(0);
      setVisible(0);
    } finally {
      setLoading(false);
    }
  }

  function handleSearch(topic: string): void {
    if (topic !== query) {
      setImages([]);
      setPage(1);
      setVisible(0);
      setTotalImages(0);
      setQuery(topic);
    }
  }

  ////PAGINATION ///
  const handleOnLoadMore = (): void => {
    if (loading || visible >= totalImages) return;
    const nextPage = page + 1;
    setPage(nextPage);
  };
  ///

  ////MODAL ///
  function openModal(image: GetImg): void {
    setIsOpen(true);
    setModalImage(image);
  }

  function closeModal(): void {
    setIsOpen(false);
    setModalImage(null);
  }
  ///

  useEffect(() => {
    if (query && page > 0) {
      fetchImages(query, page);
    }
  }, [query, page]);

  return (
    <>
      <Toaster position="top-right" />
      <SearchBar onSearch={handleSearch} />
      {error && <ErrorMessage />}
      <ImageGallery images={images} onCardClick={openModal} />
      {loading && <Loader />}
      <ImageModal
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        image={modalImage}
      />
      {totalImages > 0 ? (
        visible < totalImages ? (
          <div>
            <LoadMoreBtn loadMoreOnClick={handleOnLoadMore} loading={loading} />
          </div>
        ) : (
          <div>
            <p>No more images for this topic.</p>
          </div>
        )
      ) : null}
    </>
  );
}

export default App;
