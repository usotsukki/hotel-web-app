export function toggleBtns(currentPath) {
	const bookBtn = document.querySelectorAll(
		".booking-btn, .booking-btn-mobile"
	);
	const bookAria = document.querySelector(".booking-area");
	let booking = false;
	const bookingDivBtn = document.querySelector(".booking-btn");
	bookBtn.forEach((btn) => {
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
						if (clicks > 1) {
							bookAria.classList.add("no-book");
							document.querySelector(".booking-btn").style.background =
								"#d42700";
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
}
