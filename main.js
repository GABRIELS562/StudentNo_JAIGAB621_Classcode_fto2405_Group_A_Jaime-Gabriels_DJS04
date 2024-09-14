import { books, authors, genres, BOOKS_PER_PAGE } from "./data.js";

// Common variables
let page = 1;
let matches = books;

// Book Preview Web Component
class BookPreview extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const bookId = this.getAttribute("book-id");
    const book = books.find((b) => b.id === bookId);

    if (book) {
      this.render(book);
    }
  }

  render(book) {
    const author = authors[book.author];
    const template = document.createElement("template");

    template.innerHTML = `
      <style>
        :host {
          all: initial;
        }

        .preview {
          border-width: 0;
          width: 100%;
          font-family: Roboto, sans-serif;
          padding: 0.5rem 1rem;
          display: flex;
          align-items: center;
          cursor: pointer;
          text-align: left;
          border-radius: 8px;
          border: 1px solid rgba(var(--color-dark, 10, 10, 20), 0.15);
          background: rgba(var(--color-light, 255, 255, 255), 1);
          transition: background-color 0.2s ease-in-out;
        }

        .preview:hover {
          background: rgba(var(--color-blue, 0, 150, 255), 0.05);
        }

        .preview__image {
          width: 48px;
          height: 70px;
          object-fit: cover;
          background: grey;
          border-radius: 2px;
          box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.1), 0px 1px 3px 0px rgba(0, 0, 0, 0.1);
        }

        .preview__info {
          padding: 1rem;
        }

        .preview__title {
          margin: 0 0 0.5rem;
          font-weight: bold;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          color: rgba(var(--color-dark, 10, 10, 20), 0.8);
        }

        .preview__author {
          color: rgba(var(--color-dark, 10, 10, 20), 0.4);
        }
      </style>
      <button class="preview" data-preview="${book.id}">
        <img class="preview__image" src="${book.image}" alt="Book cover" />
        <div class="preview__info">
          <h3 class="preview__title">${book.title}</h3>
          <div class="preview__author">${author}</div>
        </div>
      </button>
    `;

    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}
customElements.define("book-preview", BookPreview);

// Theme Settings Web Component
class ThemeSettings extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
    this.shadowRoot.querySelector("form").addEventListener("submit", (event) => {
      event.preventDefault();
      const theme = this.shadowRoot.querySelector("select").value;
      this.applyTheme(theme);
    });
  }

  render() {
    const template = document.createElement("template");
    template.innerHTML = `
      <style>
        :host {
          display: block;
          font-family: Arial, sans-serif;
        }

        form {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        select {
          padding: 8px;
          border-radius: 5px;
        }

        button {
          padding: 8px;
          border: none;
          background-color: #333;
          color: white;
          border-radius: 5px;
          cursor: pointer;
        }

        button:hover {
          background-color: #555;
        }
      </style>
      <form>
        <label for="theme">Select Theme</label>
        <select id="theme">
          <option value="day">Day</option>
          <option value="night">Night</option>
        </select>
        <button type="submit">Apply Theme</button>
      </form>
    `;
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  applyTheme(theme) {
    if (theme === "night") {
      document.documentElement.style.setProperty("--color-dark", "255, 255, 255");
      document.documentElement.style.setProperty("--color-light", "10, 10, 20");
    } else {
      document.documentElement.style.setProperty("--color-dark", "10, 10, 20");
      document.documentElement.style.setProperty("--color-light", "255, 255, 255");
    }
  }
}
customElements.define("theme-settings", ThemeSettings);

// Render the Theme Settings
const settingsContainer = document.querySelector("[data-settings-overlay]");
const themeSettingsElement = document.createElement("theme-settings");
settingsContainer.appendChild(themeSettingsElement);

// Function to create a book preview element
function renderBookList(bookList, container, start = 0, end = 32) {
  const fragment = document.createDocumentFragment();

  bookList.slice(start, end).forEach((book) => {
    const bookPreviewElement = document.createElement("book-preview");
    bookPreviewElement.setAttribute("book-id", book.id);
    fragment.appendChild(bookPreviewElement);
  });

  container.appendChild(fragment);
}

// Render initial book list
renderBookList(matches, document.querySelector("[data-list-items]"));

// Rest of your existing code...
// Function to create a book preview element


renderBookList(matches, document.querySelector("[data-list-items]"));

// Function to create an option element
function createOptionElement(value, text) {
  const option = document.createElement("option");
  option.value = value;
  option.innerText = text;
  return option;
}

// Function to render dropdown options
function renderDropdownOptions(options, container, defaultOptionText = "Any") {
  const fragment = document.createDocumentFragment();
  const defaultOption = createOptionElement("any", defaultOptionText);
  fragment.appendChild(defaultOption);

  options.forEach((option) => {
    const optionElement = createOptionElement(option.id, option.name);
    fragment.appendChild(optionElement);
  });

  container.appendChild(fragment);
}

// Convert `genres` and `authors` objects to arrays of {id, name} format
const genreObjects = Object.entries(genres).map(([id, name]) => ({ id, name }));
const authorObjects = Object.entries(authors).map(([id, name]) => ({
  id,
  name,
}));

// Usage for Genres
renderDropdownOptions(
  genreObjects,
  document.querySelector("[data-search-genres]"),
  "All Genres",
);

// Usage for Authors
renderDropdownOptions(
  authorObjects,
  document.querySelector("[data-search-authors]"),
  "All Authors",
);

// Function to update the Show More button
function updateShowMoreButton(matches, page, button) {
  const remainingBooks = matches.length - page * BOOKS_PER_PAGE;
  button.disabled = remainingBooks < 1;
  button.innerHTML = `
        <span>Show more</span>
        <span class="list__remaining"> (${remainingBooks > 0 ? remainingBooks : 0})</span>
    `;
}

// Event listeners
document.querySelector("[data-search-cancel]").addEventListener("click", () => {
  document.querySelector("[data-search-overlay]").open = false;
});

document
  .querySelector("[data-settings-cancel]")
  .addEventListener("click", () => {
    document.querySelector("[data-settings-overlay]").open = false;
  });

document.querySelector("[data-header-search]").addEventListener("click", () => {
  document.querySelector("[data-search-overlay]").open = true;
  document.querySelector("[data-search-title]").focus();
});

document
  .querySelector("[data-header-settings]")
  .addEventListener("click", () => {
    document.querySelector("[data-settings-overlay]").open = true;
  });

document.querySelector("[data-list-close]").addEventListener("click", () => {
  document.querySelector("[data-list-active]").open = false;
});

document
  .querySelector("[data-settings-form]")
  .addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const { theme } = Object.fromEntries(formData);

    if (theme === "night") {
      document.documentElement.style.setProperty(
        "--color-dark",
        "255, 255, 255",
      );
      document.documentElement.style.setProperty("--color-light", "10, 10, 20");
    } else {
      document.documentElement.style.setProperty("--color-dark", "10, 10, 20");
      document.documentElement.style.setProperty(
        "--color-light",
        "255, 255, 255",
      );
    }

    document.querySelector("[data-settings-overlay]").open = false;
  });

document
  .querySelector("[data-search-form]")
  .addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const filters = Object.fromEntries(formData);
    const filteredBooks = filterBooks(filters, books);

    matches = filteredBooks;
    document.querySelector("[data-list-items]").innerHTML = "";

    if (filteredBooks.length < 1) {
      document
        .querySelector("[data-list-message]")
        .classList.add("list__message_show");
    } else {
      document
        .querySelector("[data-list-message]")
        .classList.remove("list__message_show");
      renderBookList(
        filteredBooks,
        document.querySelector("[data-list-items]"),
      );
      updateShowMoreButton(
        matches,
        page,
        document.querySelector("[data-list-button]"),
      );
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
    document.querySelector("[data-search-overlay]").open = false;
  });

// Function to filter books based on filters
function filterBooks({ title, author, genre, }, bookList) {
  return bookList.filter((book) => {
    const titleMatch =
      title.trim() === "" ||
      book.title.toLowerCase().includes(title.toLowerCase());
    const authorMatch = author === "any" || book.author === author;
    const genreMatch = genre === "any" || book.genres.includes(genre);

    return titleMatch && authorMatch && genreMatch;
  });
}

// Load more results on button click
document.querySelector("[data-list-button]").addEventListener("click", () => {
  renderBookList(
    matches,
    document.querySelector("[data-list-items]"),
    page * BOOKS_PER_PAGE,
    (page + 1) * BOOKS_PER_PAGE,
  );
  page += 1;
});

// Event delegation to show book details
document
  .querySelector("[data-list-items]")
  .addEventListener("click", (event) => {
    const pathArray = Array.from(event.path || event.composedPath());
    let active = null;

    for (const node of pathArray) {
      if (active) break;

      if (node?.dataset?.preview) {
        active = books.find(
          (singleBook) => singleBook.id === node.dataset.preview,
        );
      }
    }

    if (active) {
      document.querySelector("[data-list-active]").open = true;
      document.querySelector("[data-list-blur]").src = active.image;
      document.querySelector("[data-list-image]").src = active.image;
      document.querySelector("[data-list-title]").innerText = active.title;
      document.querySelector("[data-list-subtitle]").innerText =
        `${authors[active.author]} (${new Date(active.published).getFullYear()})`;
      document.querySelector("[data-list-description]").innerText =
        active.description;
    }
  });

// // Theme detection
// if (
//   window.matchMedia &&
//   window.matchMedia("(prefers-color-scheme: dark)").matches
// ) {
//   document.querySelector("[data-settings-theme]").value = "night";
//   document.documentElement.style.setProperty("--color-dark", "255, 255, 255");
//   document.documentElement.style.setProperty("--color-light", "10, 10, 20");
// } else {
//   document.querySelector("[data-settings-theme]").value = "day";
//   document.documentElement.style.setProperty("--color-dark", "10, 10, 20");
//   document.documentElement.style.setProperty("--color-light", "255, 255, 255");
// }
