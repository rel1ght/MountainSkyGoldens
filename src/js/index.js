import "../index.html";
import "./sharedimports.js";

import "./homeimageimports.js";
import "./gallery.js";
//import instagramPosts from "./instagram-posts.js";
//const instagramPosts = require("./instagram-posts");
const ACCESS_TOKEN =
	"IGQVJXX0FDbVVIcmZAhV3o3MVlMcEY0d20zUTZAWOWVQNndsZAXpSN05hT2JNLWRNbXRQREpNR0huNWFhZAXY4OFVOUlJiN0FjSS13aERham5KbkRuZAnp1VUpsVXRfVWdRQ3ZADT2lKUm81WnlXWnBUWUgzegZDZD";
const APP_ID = "2570617276529988";
const CLIENT_ID = "a57c245d7c1852f81288d10deae84a68";
main();
async function instagrabber(url) {
	return new Promise(async (resolve, reject) => {
		await fetch(url, {
			mode: "cors",
		})
			.then((res) => res.json())
			.then((json) => {
				//console.log("jsonhtml: ", json.html);
				resolve(json.html);
			});
	});
}

async function main() {
	let user = await instaUserGrabber(ACCESS_TOKEN);
	//console.log("user: ", user);
	let postsArray = await responseDestructor(user);
	let htmlArray = await postsHTMLGenerator(postsArray);
	//console.log("main htmlarray: ", htmlArray);
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
		urlArray[
			i
		] = `https://graph.facebook.com/v9.0/instagram_oembed?url=${post}&access_token=${APP_ID}|${CLIENT_ID}`;
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
		`https://graph.instagram.com/me/media?fields=permalink&access_token=${token}/`,
		{
			mode: "cors",
		}
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
