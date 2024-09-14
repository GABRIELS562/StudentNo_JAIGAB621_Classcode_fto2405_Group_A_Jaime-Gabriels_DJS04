// bookpreview.js
import { books, authors } from './data.js';

class BookPreview extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    const bookId = this.getAttribute('book-id');
    const book = books.find(b => b.id === bookId);

    if (book) {
      this.render(book);
    }
  }

  render(book) {
    const author = authors[book.author];
    const template = document.createElement('template');

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

customElements.define('book-preview', BookPreview);

export default BookPreview;