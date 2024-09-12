// @ts-check
// Function to create a book preview element
/**
 * Creates a preview button element for a book.
 *
 * @param {Object} book - The book object containing details like title, author, image, and id.
 * @param {Object} authors - A map of author IDs to author names.
 * @returns {HTMLElement} - The created preview button element.
 */
export // Function to create a book preview element using the Web Component
function createBookPreview(book) {
  const previewElement = document.createElement('book-preview');  // Use the Web Component
  previewElement.bookData = {  // Set the book data
    id: book.id,
    title: book.title,
    image: book.image,
    author: authors[book.author]
  };
  return previewElement;
}
// Function to render a list of book previews
function renderBookList(bookList, container, start = 0, end = BOOKS_PER_PAGE) {
  const fragment = document.createDocumentFragment();
  bookList.slice(start, end).forEach((book) => {
    const previewElement = createBookPreview(book);  // Use Web Component
    fragment.appendChild(previewElement);
  });
  container.appendChild(fragment);
}

// Initially render book previews
renderBookList(matches, document.querySelector('[data-list-items]'));

// Function to create an option element
export function createOptionElement(value, text) {
  const option = document.createElement("option");// Create an option element
  option.value = value;// Set the option's value
  option.innerText = text;// Set the option's display text
  return option;// Return the created option element
}

// Function to render dropdown options
/**
 * @param {any[]} options
 * @param {{ appendChild: (arg0: DocumentFragment) => void; }} container
 */
export function renderDropdownOptions(
  options,
  container,
  defaultOptionText = "Any",
) {
  const fragment = document.createDocumentFragment();// Create a document fragment
  const defaultOption = createOptionElement("any", defaultOptionText);// Create a default 'Any' option
  fragment.appendChild(defaultOption);// Append the default option to the fragment

  options.forEach((option) => {
    const optionElement = createOptionElement(option.id, option.name); // Create an option for each item
    fragment.appendChild(optionElement);// Append each option to the fragment
  });

  container.appendChild(fragment);  // Append the fragment containing all options to the container
}

// Function to update the Show More button
export function updateShowMoreButton(matches, page, button, BOOKS_PER_PAGE) {// Calculate the number of remaining books
  const remainingBooks = matches.length - page * BOOKS_PER_PAGE;
  button.disabled = remainingBooks < 1;// Disable the button if no books are left
  button.innerHTML = `
        <span>Show more</span>
        <span class="list__remaining"> (${remainingBooks > 0 ? remainingBooks : 0})</span> 
    `;
}// Update the button text with the remaining books count

// Function to filter books based on search criteria (title, author, genre)
export function filterBooks({ title, author, genre }, bookList) {
  return bookList.filter((book) => {
    const titleMatch =
      title.trim() === "" || // Match title
      book.title.toLowerCase().includes(title.toLowerCase());
    const authorMatch = author === "any" || book.author === author;// Match author
    const genreMatch = genre === "any" || book.genres.includes(genre);// Match genre

    return titleMatch && authorMatch && genreMatch;
  });// Return books that match all criteria
}
