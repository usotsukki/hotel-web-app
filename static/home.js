import { getLoco, getLocoRooms } from "./utils.js";
import { homeBookingAnimation } from "./animations.js";
history.scrollRestoration = "manual";
window.onload = function () {
	window.scrollTo(0, 0);
};

const currentPath = window.location.pathname;
const tabs = document.querySelectorAll(".active");

window.onload = getLoco(tabs, currentPath);
if (tabs) {
	window.onload = getLocoRooms(currentPath);
}

// MOBILE NAV BAR + BUTTON
const menuBtn = document.querySelector(".ham-button");
let menuOpen = false;
menuBtn.addEventListener("click", () => {
	if (!menuOpen) {
		menuBtn.classList.add("open");
		menuOpen = true;
	} else {
		menuBtn.classList.remove("open");
		menuOpen = false;
	}
});

const primaryNav = document.querySelector(".primary-navigation");
const navToggle = document.querySelector(".ham-button");

navToggle.addEventListener("click", () => {
	const visibility = primaryNav.getAttribute("data-visible");

	if (visibility === "false") {
		primaryNav.setAttribute("data-visible", "true");
		navToggle.setAttribute("aria-expanded", "true");
	} else if (visibility === "true") {
		primaryNav.setAttribute("data-visible", "false");
		navToggle.setAttribute("aria-expanded", "false");
	}
});

//SHOW MORE BUTTON + TEXT
if (document.querySelector(".show")) {
	const showMoreBtn = document.querySelector(".show");
	const more = document.querySelector(".more");
	const moreVis = more.getAttribute("data-visible");
	let showMoreOpen = false;
	showMoreBtn.addEventListener("click", () => {
		if (!showMoreOpen) {
			showMoreBtn.classList.add("open");
			showMoreOpen = true;
			more.setAttribute("data-visible", "true");
		} else {
			showMoreBtn.classList.remove("open");
			showMoreOpen = false;
			more.setAttribute("data-visible", "false");
		}
	});
}
// CAROUSEL IMAGE GALLERY
if (document.querySelectorAll("[data-carousel-button]")) {
	const buttons = document.querySelectorAll("[data-carousel-button]");

	buttons.forEach((button) => {
		button.addEventListener("click", () => {
			const offset = button.dataset.carouselButton === "next" ? 1 : -1;
			const slides = button
				.closest("[data-carousel]")
				.querySelector("[data-slides]");

			const activeSlide = slides.querySelector("[data-active]");
			let newIndex = [...slides.children].indexOf(activeSlide) + offset;
			if (newIndex < 0) newIndex = slides.children.length - 1;
			if (newIndex >= slides.children.length) newIndex = 0;

			slides.children[newIndex].dataset.active = true;
			delete activeSlide.dataset.active;
		});
	});
}

// BOOK BUTTON
var bookBtn = document.querySelectorAll(".booking-btn, .booking-btn-mobile");
const bookAria = document.querySelector(".booking-area");
let booking = false;
bookBtn.forEach((btn) => {
	const bookingDivBtn = document.querySelector(".booking-btn");
	if (currentPath === "/") {
		bookingDivBtn.setAttribute("style", "transform: translateX(500px);");
	}

	function bookingBtnHover() {
		bookingDivBtn.setAttribute("style", "background: #151416;");
	}

	function bookingBtnHoverOff() {
		if (!booking) {
			bookingDivBtn.setAttribute("style", "background: #d42700;");
		}
	}
	bookingDivBtn.addEventListener("mouseover", bookingBtnHover, false);
	bookingDivBtn.addEventListener("mouseout", bookingBtnHoverOff, false);

	btn.addEventListener("click", () => {
		console.log("wanna book a room");
		if (!booking) {
			bookAria.classList.remove("no-book");
			booking = true;
			primaryNav.setAttribute("data-visible", "false");
			navToggle.setAttribute("aria-expanded", "false");
			document.querySelector(".booking-btn").style.background = "#151416";
			menuBtn.classList.remove("open");
			menuOpen = false;
			var clicks = 0;

			window.addEventListener("click", function (e) {
				if (!document.getElementById("form-body").contains(e.target)) {
					// Clicked outside the box

					clicks = clicks + 1;
					console.log("clicked outside");
					if (clicks > 1) {
						bookAria.classList.add("no-book");
						document.querySelector(".booking-btn").style.background = "#d42700";
						booking = false;
						clicks = 0;
					}
					if (!booking) {
						clicks = 0;
					}
				}
			});
		} else {
			bookAria.classList.add("no-book");
			document.querySelector(".booking-btn").style.background = "#d42700";
			booking = false;
		}
	});
});

function carouselBox() {
	//buttons
	const BtnNext = document.getElementById("BtnNext");
	const BtnPrev = document.getElementById("BtnPrev");

	//slides
	const CarouselSlide = document.querySelector(".carousel-slide");
	const CarouselSlideImgs = document.querySelectorAll(".carousel-slide-img");

	//counter
	let counter = 1;
	const size = CarouselSlideImgs[0].clientWidth;

	//sliding
	CarouselSlide.style.transform = "translateX(" + -size * counter + "px)";

	//btn listeners
	BtnNext.addEventListener("click", () => {
		if (counter >= CarouselSlideImgs.length - 1) {
			return;
		}
		CarouselSlide.style.transition = "transform 0.4s ease-in-out";
		counter++;
		CarouselSlide.style.transform = "translateX(" + -size * counter + "px)";
	});
	BtnPrev.addEventListener("click", () => {
		if (counter <= 0) {
			return;
		}
		CarouselSlide.style.transition = "transform 0.4s ease-in-out";
		counter--;
		CarouselSlide.style.transform = "translateX(" + -size * counter + "px)";
	});
	CarouselSlide.addEventListener("transitionend", () => {
		if (CarouselSlideImgs[counter].id === "last-im-copy") {
			CarouselSlide.style.transition = "none";
			counter = CarouselSlideImgs.length - 2;
			CarouselSlide.style.transform = "translateX(" + -size * counter + "px)";
		}
		if (CarouselSlideImgs[counter].id === "first-im-copy") {
			CarouselSlide.style.transition = "none";
			counter = CarouselSlideImgs.length - counter;
			CarouselSlide.style.transform = "translateX(" + -size * counter + "px)";
		}
	});
}
if (document.querySelector(".has-carousel")) {
	carouselBox();
}
if (document.querySelector(".has-animation-hb")) {
	if (window.innerWidth > window.innerHeight) homeBookingAnimation();
}
