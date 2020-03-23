import "babel-polyfill";
import "../index.html";
import "./sharedimports.js";

import "./homeimageimports.js";
import "./gallery.js";
//import instagramPosts from "./instagram-posts.js";
//const instagramPosts = require("./instagram-posts");

main();
async function instagrabber(url) {
	return new Promise(async (resolve, reject) => {
		await fetch(url)
			.then(res => res.json())
			.then(json => {
				//console.log("jsonhtml: ", json.html);
				resolve(json.html);
			});
	});
}

async function main() {
	let user = await instaUserGrabber("ellies_golden_years");
	let postsArray = await jsonDestructor(user);
	let htmlArray = await postsHTMLGenerator(postsArray);
	//console.log("main htmlarray: ", htmlArray);
	let response = await htmlInjector(htmlArray);
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
		let post = PostsArray[i];

		urlArray[
			i
		] = `https://api.instagram.com/oembed?url=https://www.instagram.com/p/${post.node.shortcode}/`;
		promises.push(instagrabber(urlArray[i]));
	}
	await Promise.all(promises).then(results => {
		//console.log("finished: ", results);
		htmlArray = results;
		//console.log("htmlArray: ", htmlArray);
	});
	return htmlArray;
}

async function instaUserGrabber(url) {
	let response;
	await fetch(`https://api.instagram.com/${url}/?__a=1`)
		.then(res => res.json())
		.then(json => (response = json));
	return response;
}
async function jsonDestructor(user) {
	//console.log("posts: ", user.graphql.user.edge_owner_to_timeline_media.edges);
	let postsArray = user.graphql.user.edge_owner_to_timeline_media.edges;
	return postsArray;
}
