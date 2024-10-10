"use strict";

window.onload = function () {
  // Скрипт для відліку часу
  startCountdown();

  //   // Скрипт для маски номера телефону
  //   initPhoneMask();

  // Скрипт для відображення дати
  showCurrentDate();
};

// Функція зворотного відліку часу
function startCountdown() {
  var twoHours = 60 * 60 * 2;
  var display = document.querySelector(".timer-time");
  var timer = twoHours,
    hours,
    minutes,
    seconds;
  setInterval(function () {
    hours = Math.floor(timer / 3600);
    minutes = Math.floor((timer % 3600) / 60);
    seconds = Math.floor(timer % 60);

    // Форматування
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    display.textContent = hours + ":" + minutes + ":" + seconds;

    // Зменшуємо таймер
    if (--timer < 0) {
      timer = 0; // Таймер зупиняється на нулі
    }
  }, 1000);
}

// Функція для маски номера телефону
// function initPhoneMask() {
//   document.getElementById("user-tel").addEventListener("input", function (e) {
//     let x = e.target.value.replace(/\D/g, "");
//     e.target.value =
//       "+38(0(" +
//       x.slice(0, 3) +
//       ")" +
//       x.slice(3, 6) +
//       "-" +
//       x.slice(6, 8) +
//       "-" +
//       x.slice(8, 10);
//   });
// }

// Функція для відображення поточної дати
function showCurrentDate() {
  var today = new Date();
  var date =
    today.getDate() + "." + (today.getMonth() + 1) + "." + today.getFullYear();
  document.getElementById("order-date").textContent = date;
}
