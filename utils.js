// utils.js

export function createOptionElement(value, text) {
  const option = document.createElement('option');
  option.value = value;
  option.innerText = text;
  return option;
}
// updated function for web component to Worker
// Explanation:

// 	•	The shadowContainer parameter is passed, which is the container inside the shadow DOM where the options will be appended. This ensures the dropdown options are placed correctly within the web component’s encapsulated DOM.
// 	•	The function remains largely unchanged otherwise.

// 3. Updating updateShowMoreButton for Web Components

// To update a “Show More” button in a web component, we need to ensure that the button is part of the web component’s shadow DOM and that updates are applied there.

export function renderDropdownOptions(options, container, defaultOptionText = 'Any') {
  const fragment = document.createDocumentFragment();
  const defaultOption = createOptionElement('any', defaultOptionText);
  fragment.appendChild(defaultOption);

  options.forEach((option) => {
    const optionElement = createOptionElement(option.id, option.name);
    fragment.appendChild(optionElement);
  });

  container.appendChild(fragment);
}

export function updateShowMoreButton(matches, page, button, booksPerPage) {
  const remainingBooks = matches.length - page * booksPerPage;
  button.disabled = remainingBooks < 1;
  button.innerHTML = `
    <span>Show more</span>
    <span class="list__remaining"> (${remainingBooks > 0 ? remainingBooks : 0})</span>
  `;
}

export function filterBooks({ title, author, genre }, bookList) {
  return bookList.filter((book) => {
    const titleMatch = title.trim() === '' || book.title.toLowerCase().includes(title.toLowerCase());
    const authorMatch = author === 'any' || book.author === author;
    const genreMatch = genre === 'any' || book.genres.includes(genre);

    return titleMatch && authorMatch && genreMatch;
  });
}
// 1.	import { books, authors } from './data.js';
// This line imports the books and authors data from another JavaScript file called data.js. These objects are used later to display book and author details.
// 	2.	class BookPreview extends HTMLElement {
// Defines a custom HTML element BookPreview that extends the built-in HTMLElement class. This allows the creation of a new reusable web component.
// 	3.	constructor() {
// This is the constructor method that is called when an instance of BookPreview is created.
// 	4.	super();
// This calls the constructor of the parent HTMLElement class to ensure the custom element inherits its properties and behaviors.
// 	5.	this.attachShadow({ mode: 'open' });
// Creates a “shadow DOM” for the component, which encapsulates its internal structure, preventing CSS and JavaScript from the outside world from affecting it. The { mode: 'open' } means the shadow DOM can be accessed via JavaScript.
// 	6.	connectedCallback() {
// This is a lifecycle method that runs when the BookPreview element is inserted into the DOM. It is responsible for initializing the element.
// 	7.	const bookId = this.getAttribute('book-id');
// Retrieves the book-id attribute from the component’s HTML markup (set by the parent element). This value is used to identify which book to display.
// 	8.	const book = books.find(b => b.id === bookId);
// Searches through the books array (imported from data.js) to find the book object that has an id matching the book-id attribute.
// 	9.	if (book) { this.render(book); }
// If a book with the matching id is found, the render() method is called, passing in the book object to render the book preview.
// 	10.	render(book) {
// This method is responsible for creating the HTML structure and content for the book preview.
// 	11.	const author = authors[book.author];
// Retrieves the author’s name from the authors object (imported from data.js) based on the book.author property.
// 	12.	const template = document.createElement('template');
// Creates a new <template> element. Templates are used to store HTML content that will later be inserted into the shadow DOM.
// 	13.	template.innerHTML =   (innerHTML code block)
// The innerHTML of the template contains the actual structure and style of the book preview, including a button with a book image, title, and author information.
// 	14.	this.shadowRoot.appendChild(template.content.cloneNode(true));
// Appends the content of the template into the shadow DOM. The cloneNode(true) ensures that the entire structure is copied and inserted into the component.
// 	15.	customElements.define('book-preview', BookPreview);
// Registers the BookPreview component as a custom element with the name book-preview, so it can be used in the HTML as <book-preview></book-preview>.
// 	16.	export default BookPreview;
// Exports the BookPreview class as the default export, allowing it to be imported and used in other files.

// Summary:

// This code defines a custom web component (<book-preview>) that displays a preview of a book, including its image, title, and author. The book data is fetched using the book-id attribute passed to the component, and the content is styled and rendered inside a shadow DOM for encapsulation.