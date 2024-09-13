// Updated function to create a book preview using the Web Component
export function createBookPreview(book, authors) {
  const previewElement = document.createElement('book-preview'); // Create a new custom 'book-preview' element
  previewElement.setAttribute('book', JSON.stringify(book)); // Set the book attribute as a JSON string
  previewElement.setAttribute('authors', JSON.stringify(authors)); // Set the authors attribute as a JSON string
  return previewElement; // Return the created 'book-preview' element
}

// Function to render a list of book previews on the page
export function renderBookList(bookList, container, authors, start = 0, end = 10) {
  const fragment = document.createDocumentFragment(); // Create a document fragment for efficient DOM manipulation
  bookList.slice(start, end).forEach((book) => {
    const previewElement = createBookPreview(book, authors); // Create a 'book-preview' component for each book
    fragment.appendChild(previewElement); // Append the preview element to the fragment
  });
  container.appendChild(fragment); // Append the fragment with all book previews to the container
}

// Function to create an option element for dropdowns
export function createOptionElement(value, text) {
  const option = document.createElement("option"); // Create an option element
  option.value = value; // Set the option's value
  option.innerText = text; // Set the option's display text
  return option; // Return the created option element
}

// Function to render dropdown options for genres or authors
export function renderDropdownOptions(
  options,
  container,
  defaultOptionText = "Any",
) {
  const fragment = document.createDocumentFragment(); // Create a document fragment for efficient DOM manipulation
  const defaultOption = createOptionElement("any", defaultOptionText); // Create a default 'Any' option
  fragment.appendChild(defaultOption); // Append the default option to the fragment

  options.forEach((option) => {
    const optionElement = createOptionElement(option.id, option.name); // Create an option element for each genre/author
    fragment.appendChild(optionElement); // Append each option to the fragment
  });

  container.appendChild(fragment);  // Append the fragment with all options to the container
}

// Function to update the "Show More" button based on remaining books
export function updateShowMoreButton(matches, page, button, BOOKS_PER_PAGE) {
  const remainingBooks = matches.length - page * BOOKS_PER_PAGE; // Calculate remaining books
  button.disabled = remainingBooks < 1; // Disable the button if no more books are left
  button.innerHTML = `
    <span>Show more</span>
    <span class="list__remaining"> (${remainingBooks > 0 ? remainingBooks : 0})</span>
  `; // Update the button text with the remaining books count
}

// Function to filter books based on search criteria (title, author, genre)
export function filterBooks({ title, author, genre }, bookList) {
  return bookList.filter((book) => {
    const titleMatch =
      title.trim() === "" || // Match all titles if no filter is applied
      book.title.toLowerCase().includes(title.toLowerCase()); // Match titles that include the search term

    const authorMatch = author === "any" || book.author === author; // Match if the author is "any" or matches the selected author

    const genreMatch = genre === "any" || book.genres.includes(genre); // Match if the genre is "any" or is included in the book's genres

    return titleMatch && authorMatch && genreMatch; // Return books that match all filters
  });
}