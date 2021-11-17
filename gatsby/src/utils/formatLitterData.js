import placeholderPuppy from "../images/temppuppythumb.jpg";
export default function formatLitterData(data) {
	const litters = data.allContentfulLitter.nodes || [];
	console.log("litters: ", litters);
	const formattedLitters = litters
		.sort((a, b) => new Date(b.dateOfLitter) - new Date(a.dateOfLitter))
		.map((litter) => {
			return {
				...litter,
				title: litter.title || formatDateString(litter.dateOfLitter),
				puppies: litter.puppy
					? litter.puppy.map((puppy) => {
							return {
								...puppy,
								collarColor: formatPuppyColor(puppy.collarColor),
							};
					  })
					: Array.from({ length: 8 }, () => ({
							collarColor: formatPuppyColor(),
							status: "Coming Soon!",
							name: "Unnamed",
							mainPicture: placeholderPuppy,
					  })),
				parents: litter.contentfulparent.map((parent) => {
					return { ...parent };
				}),
			};
		});
	console.log("formattedLitters: ", formattedLitters);
	return formattedLitters;
}

function formatDateString(date) {
	const dateObj = new Date(date);
	const month = dateObj.toLocaleString("default", { month: "long" });
	const year = dateObj.getFullYear();
	return `${month} ${year}`;
}

function formatPuppyColor(colorString) {
	return !colorString ? "#888" : `#${colorString}`;
}
