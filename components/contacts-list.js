import contacts from "../js/contacts.js";

customElements.define(
  "contacts-list",
  class extends HTMLElement {
    constructor() {
      super();
    }

    #root = this.attachShadow({ mode: "closed" });

    connectedCallback() {
      this.initStyles();
      this.createComponent();
    }

    initStyles() {
      const style = document.createElement("style");
      style.textContent = `
      .contacts {
        display: flex;
        flex-wrap: wrap;
        padding: 0;
        margin: 0;
        list-style: none;
        gap: 15px;
      }
      .contacts__item-link,
      .contacts__item-link:visited {
        display: flex;
        color: var(--icon-color);
      }
      .contacts__item-link svg {
        width: 26px;
        height: 26px;
      }
      `;
      this.#root.appendChild(style);
    }

    createComponent() {
      const list = document.createElement("ul");
      list.classList.add("contacts");
      contacts.forEach((contact) => {
        const item = this.createListItem(contact);
        list.appendChild(item);
      });
      this.#root.appendChild(list);
    }

    createListItem({ title, link, icon }) {
      const item = document.createElement("li");
      const a = document.createElement("a");
      item.classList.add("contacts__item");
      a.classList.add("contacts__item-link");
      a.setAttribute("href", link);
      a.setAttribute("target", "_blank");
      a.setAttribute("rel", "noopener");
      a.setAttribute("title", title);
      const svg = new DOMParser().parseFromString(
        icon,
        "image/svg+xml"
      ).documentElement;
      a.append(svg);
      item.append(a);
      return item;
    }
  }
);
