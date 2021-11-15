import { getImage } from "gatsby-plugin-image";

export default function formatPageData(data) {
	const page = data.contentfulPage || {};
	const { title, subtitle } = page;
	const backgroundImage = getImage(page.backgroundImage);
	return { title, subtitle, backgroundImage };
}
