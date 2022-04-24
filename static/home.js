import { getLoco, getLocoRooms } from "./utils.js";
import { homeBookingAnimation } from "./animations.js";
import { carouselBox } from "./carousel.js";
import { toggleBtns } from "./btns.js";
window.onload = () => {
	history.scrollRestoration = "manual";
	const currentPath = window.location.pathname;
	const tabs = document.querySelectorAll(".active");

	window.scrollTo(0, 0);
	getLoco(tabs, currentPath);
	toggleBtns(currentPath);
	if (tabs) getLocoRooms();
	if (document.querySelector(".has-carousel")) carouselBox();
	if (document.querySelector(".has-animation-hb")) {
		if (window.innerWidth > window.innerHeight) homeBookingAnimation();
		else {
			document.querySelector(".intro").style.opacity = 0;
			document.querySelector(".intro-tail").style.opacity = 0;
		}
	}
};
