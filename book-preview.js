// book-preview.js

class BookPreview extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' }); // Create Shadow DOM
    }
  
    // Called when the element is added to the DOM
    connectedCallback() {
      this.render();
    }
  
    // Method to render the book preview template
    render() {
      const book = JSON.parse(this.getAttribute('book')); // Parse the book data passed as an attribute
      const authors = JSON.parse(this.getAttribute('authors')); // Parse authors data passed as an attribute
  
      // Template for the book preview
      this.shadowRoot.innerHTML = `
        <style>
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
            border: 1px solid rgba(10, 10, 20, 0.15);
            background: rgba(255, 255, 255, 1);
          }
          .preview__image {
            width: 48px;
            height: 70px;
            object-fit: cover;
            border-radius: 2px;
            box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
              0px 1px 1px 0px rgba(0, 0, 0, 0.1), 0px 1px 3px 0px rgba(0, 0, 0, 0.1);
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
            color: rgba(10, 10, 20, 0.8);
          }
          .preview__author {
            color: rgba(10, 10, 20, 0.4);
          }
        </style>
  
        <button class="preview">
          <img class="preview__image" src="${book.image}" alt="Book Image"/>
          <div class="preview__info">
            <h3 class="preview__title">${book.title}</h3>
            <div class="preview__author">${authors[book.author]}</div>
          </div>
        </button>
      `;
    }
  }
  
  // Define the custom element
  customElements.define('book-preview', BookPreview);