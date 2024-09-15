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
// //	1.	import { books, authors } from './data.js';
// This line imports the books and authors data from another JavaScript file called data.js. These objects are used later to display book and author details.
// 2.	class BookPreview extends HTMLElement {
// Defines a custom HTML element BookPreview that extends the built-in HTMLElement class. This allows the creation of a new reusable web component.
// 3.	constructor() {
// This is the constructor method that is called when an instance of BookPreview is created.
// 4.	super();
// This calls the constructor of the parent HTMLElement class to ensure the custom element inherits its properties and behaviors.
// 5.	this.attachShadow({ mode: 'open' });
// Creates a “shadow DOM” for the component, which encapsulates its internal structure, preventing CSS and JavaScript from the outside world from affecting it. The { mode: 'open' } means the shadow DOM can be accessed via JavaScript.
// 6.	connectedCallback() {
// This is a lifecycle method that runs when the BookPreview element is inserted into the DOM. It is responsible for initializing the element.
// 7.	const bookId = this.getAttribute('book-id');
// Retrieves the book-id attribute from the component’s HTML markup (set by the parent element). This value is used to identify which book to display.
// 8.	const book = books.find(b => b.id === bookId);
// Searches through the books array (imported from data.js) to find the book object that has an id matching the book-id attribute.
// 9.	if (book) { this.render(book); }
// If a book with the matching id is found, the render() method is called, passing in the book object to render the book preview.
// 10.	render(book) {
// This method is responsible for creating the HTML structure and content for the book preview.
// 11.	const author = authors[book.author];
// Retrieves the author’s name from the authors object (imported from data.js) based on the book.author property.
// 12.	const template = document.createElement('template');
// Creates a new <template> element. Templates are used to store HTML content that will later be inserted into the shadow DOM.
// 13.	template.innerHTML =   (innerHTML code block)
// The innerHTML of the template contains the actual structure and style of the book preview, including a button with a book image, title, and author information.
// 14.	this.shadowRoot.appendChild(template.content.cloneNode(true));
// Appends the content of the template into the shadow DOM. The cloneNode(true) ensures that the entire structure is copied and inserted into the component.
// 15.	customElements.define('book-preview', BookPreview);
// Registers the BookPreview component as a custom element with the name book-preview, so it can be used in the HTML as <book-preview></book-preview>.
// 16.	export default BookPreview;
// Exports the BookPreview class as the default export, allowing it to be imported and used in other files.

// Summary:

// This code defines a custom web component (<book-preview>) that displays a preview of a book, including its image, title, and author. The book data is fetched using the book-id attribute passed to the component, and the content is styled and rendered inside a shadow DOM for encapsulation.