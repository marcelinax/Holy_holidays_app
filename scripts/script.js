"use strict";
const date = new Date();
document.getElementById("date").value =
  date.getFullYear().toString() +
  "-" +
  (date.getMonth() + 1).toString().padStart(2, 0) +
  "-" +
  date.getDate().toString().padStart(2, 0);

class Holiday {
  constructor(title, color, rank, date, season, seasonWeek, weekday) {
    this.title = title;
    this.color = color;
    this.rank = rank;
    this.date = date;
    this.season = season;
    this.seasonWeek = seasonWeek;
    this.weekday = weekday;
    this.renderHoliday();
  }
  renderHoliday() {
    const holidayItem = document.createElement("div");
    holidayItem.classList.add("holiday-item");
    let content = `
     <div class='holiday-item-main-box'>
      <h3 class='holiday-item-title'>${this.title}</h3>
      <h5 class='holiday-item-date'>${this.date}</h5>
      <h6 class='holiday-item-date-weekday'>${this.weekday}</h6>
      </div>
      <div class='holiday-item-details-box'>
      <p class='holiday-item-rank'><strong>Rank:</strong> ${this.rank}</p>
       <p class='holiday-item-season'><strong>Season:</strong> ${this.season}</p>
      <p class='holiday-item-season-week'><strong>Season week:</strong> ${this.seasonWeek}</p>
      </div>
      `;

    holidayItem.innerHTML = content;

    document.querySelector(".holidays-list").appendChild(holidayItem);
    holidayItem.style.borderColor = this.getColorForHoliday(this.color);
  }
  getColorForHoliday(color) {
    switch (color) {
      case "green":
        return "green";
      case "violet":
        return "violet";
      case "white":
        return "white";
      case "red":
        return "red";
    }
  }
}

class Holidays {
  constructor() {
    this.getInfoForHolidays();
    this.initShowHolidays();
  }
  getDate() {
    let dateValue = document.querySelector("#date").value;
    return `${moment(dateValue).format("YYYY/M/DD")}`;
  }
  getHolidaysFromApi() {
    return new Promise((resolve) => {
      fetch(
        `http://calapi.inadiutorium.cz/api/v0/en/calendars/default/${this.getDate()}`
      ).then((response) => response.json().then((value) => resolve(value)));
    });
  }
  async getInfoForHolidays() {
    let holidays = await this.getHolidaysFromApi();

    holidays.celebrations.forEach((ce) => {
      new Holiday(
        ce.title,
        ce.colour,
        ce.rank,
        holidays.date,
        holidays.season,
        holidays.season_week,
        holidays.weekday
      );
    });
  }

  initShowHolidays() {
    document.getElementById("find-btn").addEventListener("click", () => {
      document.querySelector(".holidays-list").innerHTML = "";
      this.getInfoForHolidays();
    });
  }
}

class UI {
  constructor() {
    this.showInput();
  }
  showInput() {
    document.getElementById("find-holiday").addEventListener("click", () => {
      document
        .querySelector(".date-input-box")
        .classList.toggle("date-input-box--active");
    });
  }
}
const holidays = new Holidays();
const ui = new UI();
