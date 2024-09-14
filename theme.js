// theme.js
class ThemeSettings extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
    }
  
    connectedCallback() {
      this.render();
      this.shadowRoot.querySelector('form').addEventListener('submit', (event) => {
        event.preventDefault();
        const theme = this.shadowRoot.querySelector('select').value;
        this.applyTheme(theme);
      });
    }
  
    render() {
      const template = document.createElement('template');
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
      if (theme === 'night') {
        document.documentElement.style.setProperty('--color-dark', '255, 255, 255');
        document.documentElement.style.setProperty('--color-light', '10, 10, 20');
      } else {
        document.documentElement.style.setProperty('--color-dark', '10, 10, 20');
        document.documentElement.style.setProperty('--color-light', '255, 255, 255');
      }
    }
  }
  
  customElements.define('theme-settings', ThemeSettings);
  
  export default ThemeSettings;