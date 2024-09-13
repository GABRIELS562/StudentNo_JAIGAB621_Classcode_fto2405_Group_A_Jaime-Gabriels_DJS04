// book-preview.js

// Define and register the Web Component for book preview
class BookPreview extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    const book = JSON.parse(this.getAttribute('book'));
    const authors = JSON.parse(this.getAttribute('authors'));

    this.shadowRoot.innerHTML = `
      <style>
        .preview {
          border: 1px solid rgba(0, 0, 0, 0.1);
          padding: 10px;
          margin: 10px;
          border-radius: 5px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
          display: flex;
          align-items: center;
        }
        .preview__image {
          width: 100px;
          height: 150px;
          object-fit: cover;
        }
        .preview__info {
          margin-left: 10px;
        }
        .preview__title {
          font-size: 1.1rem;
          font-weight: bold;
          margin: 0.5rem 0;
        }
        .preview__author {
          color: gray;
        }
      </style>

      <div class="preview">
        <img class="preview__image" src="${book.image}" alt="${book.title}">
        <div class="preview__info">
          <h3 class="preview__title">${book.title}</h3>
          <div class="preview__author">${authors[book.author]}</div>
        </div>
      </div>
    `;
  }
}

// Register the Web Component
customElements.define('book-preview', BookPreview);