"use strict";

// Функціонал мобільного меню

modalHandler();

function modalHandler() {
  const mobileMenu = document.querySelector(".js-menu-container");
  const openMenuBtn = document.querySelector(".js-open-menu");
  const closeMenuBtn = document.querySelector(".js-close-menu");

  const toggleMenu = () => {
    const anchors = mobileMenu.querySelectorAll('a[href*="#"]');
    const isMenuOpen =
      openMenuBtn.getAttribute("aria-expanded") === "true" || false;
    openMenuBtn.setAttribute("aria-expanded", !isMenuOpen);
    mobileMenu.classList.toggle("is-open");

    const scrollLockMethod = !isMenuOpen
      ? "disableBodyScroll"
      : "enableBodyScroll";
    bodyScrollLock[scrollLockMethod](document.body);

    if (anchors.length === 0) return;

    if (!isMenuOpen) {
      anchors.forEach((anchor) => {
        anchor.addEventListener("click", toggleMenu);
      });
      return;
    }

    anchors.forEach((anchor) => {
      anchor.removeEventListener("click", toggleMenu);
    });
  };

  openMenuBtn.addEventListener("click", toggleMenu);
  closeMenuBtn.addEventListener("click", toggleMenu);

  window.matchMedia("(min-width: 375px)").addEventListener("change", (e) => {
    if (!e.matches) return;
    mobileMenu.classList.remove("is-open");
    openMenuBtn.setAttribute("aria-expanded", false);
    bodyScrollLock.enableBodyScroll(document.body);
  });

  window.matchMedia("(min-width: 768px)").addEventListener("change", (e) => {
    if (!e.matches) return;
    mobileMenu.classList.remove("is-open");
    openMenuBtn.setAttribute("aria-expanded", false);
    bodyScrollLock.enableBodyScroll(document.body);
  });

  document.addEventListener("DOMContentLoaded", function () {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    window.scrollTo(0, 0);

    document.querySelectorAll("nav a").forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute("href")).scrollIntoView({
          behavior: "smooth",
        });
      });
    });
  });
}

//Таймер і дата

window.onload = function () {
  startCountdown();
  showCurrentDate();
};

function startCountdown() {
  let twoHours = 60 * 60 * 2;
  let display = document.querySelector(".timer-time");
  let timer = twoHours,
    hours,
    minutes,
    seconds;
  setInterval(function () {
    hours = Math.floor(timer / 3600);
    minutes = Math.floor((timer % 3600) / 60);
    seconds = Math.floor(timer % 60);

    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    display.textContent = hours + ":" + minutes + ":" + seconds;

    if (--timer < 0) {
      timer = 0;
    }
  }, 1000);
}

function showCurrentDate() {
  let today = new Date();
  let date =
    today.getDate() + "." + (today.getMonth() + 1) + "." + today.getFullYear();
  document.getElementById("order-date").textContent = date;
}

// Маска

let inputsTel = document.querySelectorAll('input[type="tel"]');

const initializePhoneMask = (inputSelector) => {
  const input = document.querySelector(inputSelector);

  if (input) {
    const phoneMask = new Inputmask({
      mask: "+38(099) 999-99-99",
      showMaskOnHover: false,
    });

    phoneMask.mask(input);
  } else {
    console.error(`Input with selector "${inputSelector}" not found.`);
  }
};

initializePhoneMask("#user-tel");

// Очищення форми при сабміті

document
  .querySelector(".right-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    document.getElementById("user-name").value = "";
    document.getElementById("user-tel").value = "";
  });
