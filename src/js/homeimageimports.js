//IMAGES

import ellieheadshot from "../img/ellieheadshotcropped.jpg";
const ellieheadshotdom = document.getElementById("ellieheadshot");
ellieheadshotdom.src = ellieheadshot;

import magnumheadshot from "../img/magnumheadshotcropped.jpg";
const magnumheadshotdom = document.getElementById("magnumheadshot");
magnumheadshotdom.src = magnumheadshot;

import puppytemp from "../img/temppuppythumb.jpg";
const puppies = document.getElementsByClassName("puppytemp");
for (let puppy of puppies) {
	puppy.src = puppytemp;
}
//IMAGES - Gallery
let galleryArray = [];
import gallery1 from "../img/thumbs/1Thumb.jpg";
galleryArray.push(gallery1);
import gallery2 from "../img/thumbs/2Thumb.jpg";
galleryArray.push(gallery2);
import gallery3 from "../img/thumbs/5Thumb.jpg";
galleryArray.push(gallery3);
import gallery4 from "../img/thumbs/7Thumb.jpg";
galleryArray.push(gallery4);
import gallery5 from "../img/thumbs/8Thumb.jpg";
galleryArray.push(gallery5);
import gallery6 from "../img/thumbs/9Thumb.jpg";
galleryArray.push(gallery6);
import gallery7 from "../img/thumbs/13Thumb.jpg";
galleryArray.push(gallery7);
import gallery8 from "../img/thumbs/15Thumb.jpg";
galleryArray.push(gallery8);
import gallery9 from "../img/thumbs/16Thumb.jpg";
galleryArray.push(gallery9);
import gallery10 from "../img/thumbs/17Thumb.jpg";
galleryArray.push(gallery10);
import gallery11 from "../img/thumbs/18Thumb.jpg";
galleryArray.push(gallery11);
import gallery12 from "../img/thumbs/4Thumb.jpg";
galleryArray.push(gallery12);
console.log("galleryArray: ", galleryArray);
const thumbs = document.getElementsByClassName("galleryThumb");
for (let i = 0; i < thumbs.length; i++) {
	thumbs[i].src = galleryArray[i];
}
import "../img/1.jpg";
import "../img/2.jpg";
import "../img/3.jpg";
import "../img/4.jpg";
import "../img/5.jpg";
import "../img/6.jpg";
import "../img/7.jpg";
import "../img/8.jpg";
import "../img/9.jpg";
import "../img/10.jpg";
import "../img/11.jpg";
import "../img/12.jpg";
import "../img/13.jpg";
import "../img/14.jpg";
import "../img/15.jpg";
import "../img/16.jpg";
import "../img/17.jpg";
import "../img/18.jpg";
import "../img/19.jpg";
