const sunIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
<path d="M256,144c-61.75,0-112,50.25-112,112s50.25,112,112,112s112-50.25,112-112S317.75,144,256,144z M256,336 c-44.188,0-80-35.812-80-80c0-44.188,35.812-80,80-80c44.188,0,80,35.812,80,80C336,300.188,300.188,336,256,336z M256,112 c8.833,0,16-7.167,16-16V64c0-8.833-7.167-16-16-16s-16,7.167-16,16v32C240,104.833,247.167,112,256,112z M256,400 c-8.833,0-16,7.167-16,16v32c0,8.833,7.167,16,16,16s16-7.167,16-16v-32C272,407.167,264.833,400,256,400z M380.438,154.167 l22.625-22.625c6.25-6.25,6.25-16.375,0-22.625s-16.375-6.25-22.625,0l-22.625,22.625c-6.25,6.25-6.25,16.375,0,22.625 S374.188,160.417,380.438,154.167z M131.562,357.834l-22.625,22.625c-6.25,6.249-6.25,16.374,0,22.624s16.375,6.25,22.625,0 l22.625-22.624c6.25-6.271,6.25-16.376,0-22.625C147.938,351.583,137.812,351.562,131.562,357.834z M112,256 c0-8.833-7.167-16-16-16H64c-8.833,0-16,7.167-16,16s7.167,16,16,16h32C104.833,272,112,264.833,112,256z M448,240h-32 c-8.833,0-16,7.167-16,16s7.167,16,16,16h32c8.833,0,16-7.167,16-16S456.833,240,448,240z M131.541,154.167 c6.251,6.25,16.376,6.25,22.625,0c6.251-6.25,6.251-16.375,0-22.625l-22.625-22.625c-6.25-6.25-16.374-6.25-22.625,0 c-6.25,6.25-6.25,16.375,0,22.625L131.541,154.167z M380.459,357.812c-6.271-6.25-16.376-6.25-22.625,0 c-6.251,6.25-6.271,16.375,0,22.625l22.625,22.625c6.249,6.25,16.374,6.25,22.624,0s6.25-16.375,0-22.625L380.459,357.812z" fill="currentColor"/>
</svg>`;

const moonIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512px" height="512px">
<path d="M248.082,263.932c-31.52-31.542-39.979-77.104-26.02-116.542c-15.25,5.395-29.668,13.833-41.854,26.02c-43.751,43.75-43.751,114.667,0,158.395c43.729,43.73,114.625,43.752,158.374,0c12.229-12.186,20.646-26.604,26.021-41.854C325.188,303.91,279.604,295.451,248.082,263.932z" fill="currentColor" />
</svg>`;

customElements.define(
  "theme-toggle",
  class extends HTMLButtonElement {
    constructor() {
      super();
      const parser = new DOMParser();
      this._icons = {
        sun: parser.parseFromString(sunIcon, "image/svg+xml").documentElement,
        moon: parser.parseFromString(moonIcon, "image/svg+xml").documentElement,
      };
      this._currentTheme = this.getAttribute("default-theme") || "dark";
      this._stylesheetsPaths = {
        dark: "css/dark.css",
        light: "css/light.css",
      };
      this._stylesheetsLink = null;
    }

    connectedCallback() {
      window.addEventListener("load", () => this.init());
      this.addEventListener("click", () => this.click());
    }

    get currentTheme() {
      return this._currentTheme;
    }

    set currentTheme(value) {
      return (this._currentTheme = value);
    }

    getStylesheetsPath(theme) {
      return this._stylesheetsPaths[theme];
    }

    init() {
      const savedTheme = window.localStorage.getItem("theme");
      const theme = savedTheme ? savedTheme : this.currentTheme;

      this.createStylesheetsLink(theme);
      this.setTheme(theme);
      this.setStylesheets();
      this.setIcon();
    }

    savePreferredTheme() {
      window.localStorage.setItem("theme", this.currentTheme);
    }

    click() {
      this.toggleTheme();
      this.setStylesheets();
      this.setIcon();
      this.savePreferredTheme();
    }

    createStylesheetsLink(theme) {
      const link = document.createElement("link");
      link.setAttribute("rel", "stylesheet");
      link.setAttribute("href", this.getStylesheetsPath(theme));
      this._stylesheetsLink = link;
      document.head.appendChild(link);
    }

    setTheme(theme) {
      this.currentTheme = theme;
    }

    setStylesheets() {
      this._stylesheetsLink.setAttribute(
        "href",
        this.getStylesheetsPath(this.currentTheme)
      );
    }

    setIcon() {
      this.innerHTML = "";
      this.append(
        this.currentTheme === "dark" ? this._icons.sun : this._icons.moon
      );
    }

    toggleTheme() {
      this.setTheme(this.currentTheme === "dark" ? "light" : "dark");
    }
  },
  { extends: "button" }
);
