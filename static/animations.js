export function homeBookingAnimation() {
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

	const bookingBtnWidth = document.getElementById("booking-btn").offsetWidth;
	const height = document.querySelector(".home-slideshow").offsetHeight;
	const headerWidth = document.querySelector("header").offsetWidth;
	const homeBookingBtnwidth =
		document.querySelector(".home-booking").offsetWidth;

	gsap.defaultEase = Linear.easeNone;

	const controller = new ScrollMagic.Controller();

	const tl = new gsap.timeline();

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
function convertRemToPixels(rem) {
	return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}
