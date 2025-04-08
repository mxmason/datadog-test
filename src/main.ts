import "./style.css";
import "./datadog.ts";

const controller = new AbortController();
const { signal } = controller;

const reqEl = document.getElementById("req") as HTMLButtonElement;
const abortBtnEl = document.getElementById("abort") as HTMLButtonElement;

reqEl.addEventListener("click", () => {
	console.log("Request started");
	fetch("https://httpbin.org/delay/10", { signal })
		.then((res) => {
			if (!res.ok) {
				throw new Error("Network response was not ok");
			}
			return res.json();
		})
		.then((data) => {
			console.log(data);
		});



	controller.abort();
});

abortBtnEl.addEventListener("click", () => {
	throw new Error("Error button clicked");
});
