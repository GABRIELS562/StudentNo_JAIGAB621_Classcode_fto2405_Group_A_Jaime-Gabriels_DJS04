// utils.js

export function createOptionElement(value, text) {
  const option = document.createElement('option');
  option.value = value;
  option.innerText = text;
  return option;
}

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