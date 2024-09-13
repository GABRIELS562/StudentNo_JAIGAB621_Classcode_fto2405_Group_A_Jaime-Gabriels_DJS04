

// book-list.js
import './book-preview.js'; // Import the BookPreview component

class BookList extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.page = 1;
      this.books = [];
      this.authors = {};
    }
  
    connectedCallback() {
      this.books = JSON.parse(this.getAttribute('books'));
      this.authors = JSON.parse(this.getAttribute('authors'));
      this.render();
    }
  
    render() {
      const booksToShow = this.books.slice(0, this.page * 10);
      this.shadowRoot.innerHTML = `
        <style>
          .book-list {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
            gap: 1rem;
          }
          .show-more {
            display: block;
            margin: 1rem auto;
          }
        </style>
        <div class="book-list">
          ${booksToShow.map(book => `
            <book-preview book='${JSON.stringify(book)}' authors='${JSON.stringify(this.authors)}'></book-preview>
          `).join('')}
        </div>
        <button class="show-more" ${this.page * 10 >= this.books.length ? 'disabled' : ''}>Show More</button>
      `;
  
      this.shadowRoot.querySelector('.show-more').addEventListener('click', () => {
        this.page += 1;
        this.render();
      });
    }
  }
  
  customElements.define('book-list', BookList);