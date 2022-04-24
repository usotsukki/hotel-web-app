export function carouselBox() {
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

	// on complete transition
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
