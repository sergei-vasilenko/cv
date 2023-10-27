customElements.define(
  "nav-bar",
  class extends HTMLElement {
    constructor() {
      super();
    }

    #root = this.attachShadow({ mode: "closed" });

    connectedCallback() {
      this.initStyles();
      this.createNav();
    }

    initStyles() {
      const style = document.createElement("style");
      style.textContent = `
      .navbar {
        padding: 0;
        list-style: none;
      }
      .navbar__item:not(:first-child) {
        margin-top: 10px;
      }
      .navbar__item-elem {
        display: inline-block;
        color: var(--default-text-color);
        font-size: 20px;
        cursor: pointer;
        transition: transform, text-shadow 300ms;
        letter-spacing: 2px;
      }
      .navbar__item-elem:hover {
        text-shadow: 0 0 10px var(--nav-hover-color);
        transform: translate(-1px, 0px);
        transition: transform 300ms, text-shadow 300ms;
      }
      `;
      this.#root.appendChild(style);
    }

    createNav() {
      const marker = this.getAttribute("marker") || "";
      const list = document.createElement("ul");
      list.classList.add("navbar");
      document.querySelectorAll(`[${marker}]`).forEach((navItem) => {
        const label = navItem.getAttribute(marker) || navItem.innerText;
        const item = this.createNavItem(navItem, label);
        list.appendChild(item);
      });
      this.#root.appendChild(list);
    }

    createNavItem(elem, label) {
      const item = document.createElement("li");
      const span = document.createElement("span");
      item.classList.add("navbar__item");
      span.classList.add("navbar__item-elem");
      span.append(label);
      span.addEventListener("click", () =>
        elem.scrollIntoView({ behavior: "smooth", block: "start" })
      );
      item.append(span);
      return item;
    }
  }
);
