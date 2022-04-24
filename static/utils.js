function getLoco(tabs, currentPath) {
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
function getLocoRooms(currentPath) {
	const rooms = document.querySelectorAll(".room-type");
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

export { getLoco, getLocoRooms };
