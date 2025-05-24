import React from "react";
import toast from "react-hot-toast";
import css from "./SearchBar.module.css";

interface Props {
  onSearch: (topic: string) => void;
}

const SearchBar: React.FC<Props> = ({ onSearch }) => {
  function handleSubmit(evt: React.FormEvent<HTMLFormElement>): void {
    evt.preventDefault();

    const form = evt.currentTarget;
    const input = form.elements.namedItem("topic") as HTMLInputElement;
    const topic = input.value.trim();

    if (!topic) {
      toast("Please enter search term!", {
        icon: "🔍",
      });
      return;
    }

    onSearch(topic);
    form.reset();
  }

  return (
    <header className={css.header}>
      <form onSubmit={handleSubmit} className={css.form}>
        <div>
          <input
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            name="topic"
            className={css.input}
          />
        </div>
        <button type="submit">Search</button>
      </form>
    </header>
  );
};

export default SearchBar;
