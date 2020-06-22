import "../index.html";
import "./sharedimports.js";

import "./homeimageimports.js";
import "./gallery.js";
//import instagramPosts from "./instagram-posts.js";
//const instagramPosts = require("./instagram-posts");
const ACCESS_TOKEN =
	"IGQVJYWndTZA2p1UzAwZAnFxSVVsY2hYWkkyVlZAkTnhCZA3h5OGIxaHdfVlFVa3J2Mk5MMWlrS3lIMUxyRjdSUldrQ0U0NE5lN3F1cXJLTnJHeC1CWjZAIeVpUVGRBMW45N3FWb3VPd01idFYzeVo3LVBVWQZDZD";
main();
async function instagrabber(url) {
	return new Promise(async (resolve, reject) => {
		await fetch(url)
			.then((res) => res.json())
			.then((json) => {
				//console.log("jsonhtml: ", json.html);
				resolve(json.html);
			});
	});
}

async function main() {
	let user = await instaUserGrabber(ACCESS_TOKEN);
	console.log("user: ", user);
	let postsArray = await responseDestructor(user);
	let htmlArray = await postsHTMLGenerator(postsArray);
	console.log("main htmlarray: ", htmlArray);
	let response = await htmlInjector(htmlArray);
	document.getElementById("insta-loading").style.display = "none";
	document.getElementById("insta-ready").classList.remove("d-none");
	window.instgrm.Embeds.process();
}

async function htmlInjector(htmlArray) {
	let injectSpots = document.getElementsByClassName("insta");
	for (let i = 0; i < injectSpots.length; i++) {
		injectSpots[i].innerHTML = htmlArray[i];
	}
}

async function postsHTMLGenerator(PostsArray) {
	console.log("postsArray: ", PostsArray);
	let urlArray = [];
	let htmlArray = [];
	let promises = [];
	for (let i = 0; i < PostsArray.length; i++) {
		let post = PostsArray[i].permalink;
		urlArray[i] = `https://api.instagram.com/oembed?url=${post}`;
		promises.push(instagrabber(urlArray[i]));
	}
	await Promise.all(promises).then((results) => {
		//console.log("finished: ", results);
		htmlArray = results;
		//console.log("htmlArray: ", htmlArray);
	});
	return htmlArray;
}

async function instaUserGrabber(token) {
	let response;
	await fetch(
		`https://graph.instagram.com/me/media?fields=permalink&access_token=${token}/`
	)
		.then((res) => res.json())
		.then((json) => (response = json));
	return response;
}
async function responseDestructor(user) {
	let postsArray = user.data;
	return postsArray;
}

//var rellax = new Rellax(".rellax");
