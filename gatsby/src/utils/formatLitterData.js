export default function formatPageData(data) {
	const litters = data.allContentfulLitter.nodes || [];
	console.log("litters: ", litters);
	const formattedLitters = litters
		.sort((a, b) => new Date(b.dateOfLitter) - new Date(a.dateOfLitter))
		.map((litter) => {
			return {
				...litter,
				title: litter.title || formatDateString(litter.dateOfLitter),
				puppies: litter.puppy.map((puppy) => {
					return {
						...puppy,
						collarColor: formatPuppyColor(puppy.associatedColor),
					};
				}),
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
	return null;
}
