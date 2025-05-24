import React from "react";
import css from "./LoadMoreBtn.module.css";

interface Props {
  loadMoreOnClick: () => void;
  loading: boolean;
}

const LoadMoreBtn: React.FC<Props> = ({ loadMoreOnClick, loading }) => {
  return (
    <button onClick={loadMoreOnClick} className={css.LoadMore}>
      {loading ? "Loading..." : "Load More"}
    </button>
  );
};

export default LoadMoreBtn;
