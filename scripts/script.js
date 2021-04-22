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
      <h3 class='holiday-item-title'>${this.title}</h3>
      <h5 class='holiday-item-date'>${this.date} ${this.weekday}<h5>
      <p>${this.rank} ${this.color} ${this.season} ${this.seasonWeek}</p>
      `;

    holidayItem.innerHTML = content;
    document.querySelector(".holidays-list").appendChild(holidayItem);
  }
}

class Holidays {
  constructor() {
    this.getInfoForHolidays();
    this.initDupa();
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
      console.log(ce);
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

  initDupa() {
    document.getElementById("add-btn").addEventListener("click", () => {
      document.querySelector(".holidays-list").innerHTML = "";
      this.getInfoForHolidays();
    });
  }
}

const holidays = new Holidays();
