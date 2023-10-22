customElements.define(
  "years-old",
  class extends HTMLElement {
    constructor() {
      super();
    }

    connectedCallback() {
      this.append(
        new Date().getFullYear() -
          new Date(this.getAttribute("birth")).getFullYear()
      );
    }
  }
);
