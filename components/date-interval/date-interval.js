customElements.define(
  "date-interval",
  class extends HTMLElement {
    constructor() {
      super();
      this.shadow = null;
    }

    connectedCallback() {
      this.shadow = this.attachShadow({ mode: "closed" });

      const style = document.createElement("style");
      style.textContent = `
      .range {
        color: var(--accent-text-color);
        font-size: 12px;
      }
      .duration {
        color: var(--secondary-text-color);
        font-size: 12px;
        margin-top: 6px;
        margin-bottom: 15px;
      }
    `;
      this.shadow.appendChild(style);

      const sinceAttr = this.getAttribute("since");
      const untilAttr = this.getAttribute("until");
      const since = new Date(sinceAttr);
      const until = untilAttr === "now" ? new Date() : new Date(untilAttr);
      const withoutDuration = this.getAttribute("without-duration") === "true";

      if (!this.rendered) {
        this.render(since, until, withoutDuration, untilAttr === "now");
        this.rendered = true;
      }
    }

    calcDuration = (since, until) => {
      const yearDiff = until.getFullYear() - since.getFullYear();
      const monthDiff = until.getMonth() - since.getMonth();
      const dayDiff = until.getDate() - since.getDate() + 1;
      const isFullYear = 12 === monthDiff;
      const isFullMonth = dayDiff > 15;

      let result = "";
      if (yearDiff > 0 && !isFullYear) {
        const yearsCount = isFullYear ? yearDiff + 1 : yearDiff;
        result += yearsCount + (yearsCount === 1 ? " year" : " years");
      }
      if (monthDiff > 0 && !isFullYear) {
        const monthsCount = isFullMonth ? monthDiff + 1 : monthDiff;
        result += result ? " " : "";
        result += monthsCount + (monthsCount === 1 ? " month" : " months");
      }

      return result;
    };

    getFormattedInterval(since, until, isNowUntil) {
      const monthsName = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];

      const getText = (date) =>
        `${monthsName[date.getMonth()]} ${date.getFullYear()}`;

      return `${getText(since)} - ${isNowUntil ? "Present" : getText(until)}`;
    }

    render(since, until, withoutDuration, isNowUntil) {
      const interval = document.createElement("div");
      interval.classList.add("range");
      interval.append(this.getFormattedInterval(since, until, isNowUntil));
      this.shadow.appendChild(interval);
      if (!withoutDuration) {
        const duration = document.createElement("div");
        duration.append(this.calcDuration(since, until));
        duration.classList.add("duration");
        this.shadow.appendChild(duration);
      }
    }
  }
);
