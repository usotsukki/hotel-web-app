history.scrollRestoration = "manual";
window.onload = function () {
	window.scrollTo(0, 0);
};

// MOBILE NAV BAR + BUTTON
const currentPath = window.location.pathname;

function getloco() {
	tabs = document.querySelectorAll(".active");

	tabs.forEach((tab) => {
		var name = tab.firstElementChild.getAttribute("href");
		if (currentPath === name) {
			tab.classList.add("navnav");
			return;
		}
		if (currentPath.includes(name + "/")) {
			tab.classList.add("navnav");
			return;
		}
	});
}
window.onload = getloco();

function getLocoRooms() {
	rooms = document.querySelectorAll(".room-type");

	rooms.forEach((room) => {
		var name = room.firstElementChild.getAttribute("href");
		if (currentPath === name) {
			console.log(name);
			room.classList.add("roomnav");
			return;
		}
		if (currentPath.includes(name + "/")) {
			room.classList.add("roomnav");
			return;
		}
	});
}
if (tabs) {
	window.onload = getLocoRooms();
}

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

function mobileRoomList() {
	const nextRoom = document.querySelector(".next-room-btn");
	const prevRoom = document.querySelector(".prev-room-btn");
	const selectContainer = document.querySelector(".thirtyq ul");
	rooms = document.querySelectorAll(".room-type");
	let counter = 1;
	const size = rooms[0].clientWidth;
	//////
	//sliding
	selectContainer.style.transform = "translateX(" + -size * counter + "px)";

	//btn listeners
	nextRoom.addEventListener("click", () => {
		if (counter >= rooms.length - 1) {
			return;
		}
		selectContainer.style.transition = "transform 0.4s ease-in-out";
		counter++;
		selectContainer.style.transform = "translateX(" + -size * counter + "px)";
	});
	prevRoom.addEventListener("click", () => {
		if (counter <= 0) {
			return;
		}
		selectContainer.style.transition = "transform 0.4s ease-in-out";
		counter--;
		selectContainer.style.transform = "translateX(" + -size * counter + "px)";
	});
	selectContainer.addEventListener("transitionend", () => {
		if (rooms[counter].id === "last-room-copy") {
			selectContainer.style.transition = "none";
			counter = rooms.length - 2;
			selectContainer.style.transform = "translateX(" + -size * counter + "px)";
		}
		if (rooms[counter].id === "first-room-copy") {
			selectContainer.style.transition = "none";
			counter = rooms.length - counter;
			selectContainer.style.transform = "translateX(" + -size * counter + "px)";
		}
	});
}

function convertRemToPixels(rem) {
	return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}

function homeBookingAnimation() {
	gsap.to(".primary-header", { opacity: 0 });
	gsap.to(".inh-text", {
		ease: "power1.out",
		y: "0%",
		duration: 1,
		delay: 0.5,
	});
	gsap.to(".intro", {
		ease: "power1.out",
		y: "-100%",
		duration: 1,
		delay: 1.5,
	});
	gsap.to(".intro-tail", {
		ease: "power1.out",
		y: "-100%",
		duration: 0.5,
		delay: 2,
	});
	gsap.to(".primary-header", {
		ease: "power1.in",
		opacity: 1,
		duration: 0.5,
		delay: 2.25,
	});

	var bookingBtnWidth = document.getElementById("booking-btn").offsetWidth;
	var height = document.querySelector(".home-slideshow").offsetHeight;
	var headerWidth = document.querySelector("header").offsetWidth;
	var homeBookingBtnwidth = document.querySelector(".home-booking").offsetWidth;
	var roomsImgWidth = document.querySelector(".home-rooms-img").offsetWidth;
	var roomsImgHeight = document.querySelector(".home-rooms-img").offsetHeight;
	var roomsLogoHeight = document.querySelector(".home-rooms-font").offsetHeight;
	var blockWidth = document.querySelector(".rooms-txt-block").offsetWidth;
	var blockHeight = document.querySelector(".rooms-txt-block").offsetHeight;
	var cHeight = blockHeight;
	var difH = roomsImgHeight - cHeight;
	console.log(difH);
	var roomsDestinationY = (height - roomsImgHeight) / 2;
	var roomsDestinationX = headerWidth - roomsImgWidth - headerWidth * 0.1;
	var roomsTxtWidth = document.querySelector(".home-rooms-font").offsetWidth;
	var roomsXMinus =
		headerWidth - roomsTxtWidth / 2 - roomsTxtWidth - convertRemToPixels(10);
	var finalRoomTxtY = roomsDestinationY + difH * 0.5;
	var finalRoomTxtX = convertRemToPixels(7);
	var centerRoomsTxt = (headerWidth - roomsTxtWidth) / 2;
	var blockDestinationX = headerWidth * 0.1;
	var blockDestinationY = roomsDestinationY + difH / 2;

	console.log(roomsDestinationY);

	gsap.defaultEase = Linear.easeNone;

	const controller = new ScrollMagic.Controller();

	var tl = new gsap.timeline();

	tl.staggerTo(".home-booking", 5, {
		scale: 0.5,
		ease: Power1.easeOut,
		x: homeBookingBtnwidth + convertRemToPixels(3),
	});
	tl.staggerTo("#booking-btn", 5, {
		ease: Power1.easeIn,
		x: headerWidth.width - bookingBtnWidth,
	});
	tl.fromTo(
		".home-logo-font h1",
		10,
		{ ease: Power1.easeInOut, letterSpacing: 0 },
		{ ease: Power1.easeInOut, letterSpacing: headerWidth * 1.4, opacity: 0 }
	);

	tl.fromTo(
		".home-slideshow",
		5,
		{ ease: Power1.easeInOut, opacity: 1 },
		{ ease: Power1.easeInOut, opacity: 0 }
	);
	//tl.fromTo('.home-rooms-font', 10, { scale: 1, y: finalRoomTxtY, x: -headerWidth - 50, ease: Power1.easeInOut, opacity: 0.5 }, { ease: Power1.easeInOut, opacity: 1, scale: 1, y: finalRoomTxtY, x: finalRoomTxtX });
	//tl.fromTo('.home-rooms-img', 10, { y: roomsDestinationY, x: headerWidth, ease: Power1.easeInOut, opacity: 0.5 }, { ease: Power1.easeInOut, opacity: 1, y: roomsDestinationY, x: roomsDestinationX });
	//tl.fromTo('.rooms-txt-block', 10, { y: blockDestinationY, x: -blockWidth - 50, ease: Power1.easeInOut, opacity: 0.5 }, { ease: Power1.easeInOut, opacity: 1, y: blockDestinationY, x: blockDestinationX });
	// tl.staggerTo('.home-rooms-font h1', 10, { x: -roomsXMinus, ease: Power1.easeInOut });
	//var exitBB = gsap.fromTo('.rooms-txt-block', 25, { y: blockDestinationY, x: -blockWidth - 50, ease: Power1.easeInOut, opacity: 0.5 }, { ease: Power1.easeInOut, opacity: 1, y: blockDestinationY, x: blockDestinationX });
	//var exitAA = gsap.fromTo('.home-rooms-img', 30, { y: roomsDestinationY, x: headerWidth, ease: Power1.easeInOut, opacity: 0.5 }, { ease: Power1.easeInOut, opacity: 1, y: roomsDestinationY, x: roomsDestinationX });
	var exitBB = gsap.fromTo(
		".rooms-txt-block",
		50,
		{ x: -headerWidth, ease: Power1.easeInOut, opacity: 0.5 },
		{ ease: Power1.easeInOut, opacity: 1, x: 0 }
	);
	var exitAA = gsap.fromTo(
		".home-rooms-img",
		50,
		{ x: headerWidth, ease: Power1.easeInOut, opacity: 0.5 },
		{ ease: Power1.easeInOut, opacity: 1, x: 0 }
	);
	var exitB = gsap.fromTo(
		"#w25",
		50,
		{ x: headerWidth, opacity: 0.5, ease: Power1.easeInOut },
		{ ease: Power1.easeInOut, opacity: 1, x: 0 }
	);
	var exitA = gsap.fromTo(
		"#w50",
		50,
		{ x: -headerWidth, opacity: 0.5, ease: Power1.easeInOut },
		{ ease: Power1.easeInOut, opacity: 1, x: 0 }
	);
	var scene = new ScrollMagic.Scene({
		triggerElement: ".main",
		duration: height,
		triggerHook: 0,
	})
		.setTween(tl)
		.setPin(".main")
		.addTo(controller);

	var scene = new ScrollMagic.Scene({
		triggerElement: ".main",
		duration: height / 2,
		offset: height * 1.25,
		triggerHook: 0,
	})
		.setTween(exitAA)
		.addTo(controller);
	var scene = new ScrollMagic.Scene({
		triggerElement: ".main",
		duration: height / 2,
		offset: height * 1.25,
		triggerHook: 0,
	})
		.setTween(exitBB)
		.addTo(controller);

	var scene = new ScrollMagic.Scene({
		triggerElement: ".main",
		duration: height / 2,
		offset: height * 2,
		triggerHook: 0,
	})
		.setTween(exitA)
		.addTo(controller);
	var scene = new ScrollMagic.Scene({
		triggerElement: ".main",
		duration: height / 2,
		offset: height * 2,
		triggerHook: 0,
	})
		.setTween(exitB)
		.addTo(controller);
}
if (document.querySelector(".has-animation-hb")) {
	if (window.innerWidth > window.innerHeight) homeBookingAnimation();
	else console.log(window.innerWidth);
}
