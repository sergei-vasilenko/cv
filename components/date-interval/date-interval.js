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

    calcDuration(since, until) {
      const timeDifference = until - since;
      const millisecondsInYear = 365 * 24 * 60 * 60 * 1000;
      const years = Math.floor(timeDifference / millisecondsInYear);
      const remainingMilliseconds = timeDifference % millisecondsInYear;
      const months = Math.floor(
        remainingMilliseconds / (30 * 24 * 60 * 60 * 1000)
      );
      let result = "";
      if (years > 0) {
        result += years + (years === 1 ? " year" : " years");
      }
      if (months > 0) {
        result += result ? " " : "";
        result += months + (months === 1 ? " month" : " months");
      }

      return result;
    }

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
