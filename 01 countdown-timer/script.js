const app = document.querySelector(".newyearTimer_app");
const days_p = app.querySelector(".childDays_p");
const hours_p = app.querySelector(".childHours_p");
const mins_p = app.querySelector(".childMins_p");
const seconds_p = app.querySelector(".childSeconds_p");

const newYears_s = "1 Jan 2023";

function countdown() {
    const currentDate_o = new Date();
    const newYearsDate_o = new Date(newYears_s);

    const totalSecond_f = (newYearsDate_o - currentDate_o) / 1000;
    const secondsperDay_i = 24 * 60 * 60;
    const secondsperHour_i = 60 * 60;
    const secondsperMin_i = 60;

    const days_i = Math.floor(totalSecond_f / secondsperDay_i);
    const hours_i = Math.floor(totalSecond_f / secondsperHour_i) % 24;
    const mins_i = Math.floor(totalSecond_f / secondsperMin_i) % 60;
    const seconds_i = Math.floor(totalSecond_f) % 60;

    days_p.innerHTML = days_i;
    hours_p.innerHTML = formatTime(hours_i);
    mins_p.innerHTML = formatTime(mins_i);
    seconds_p.innerHTML = formatTime(seconds_i);
}

function formatTime(Time) {
    if (Time < 10) {
        return `0${Time}`
    } else {
        return Time
    }
}

setInterval(countdown, 1000);