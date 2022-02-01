import { getImage } from "gatsby-plugin-image";

export default function formatPageData(data) {
  const page = data.contentfulPage || {};
  const { title, subtitle } = page;

  const backgroundImage = page.backgroundImage
    ? getImage(page.backgroundImage.image)
    : null;
  const contentBlocks = page.contentBlock
    ? processContentBlocks(page.contentBlock)
    : [];
  const additionalContent = page.additionalContent
    ? processAdditionalContent(page.additionalContent)
    : {};
  const documents = page.documents ? processDocuments(page.documents) : [];

  return {
    title,
    subtitle,
    backgroundImage,
    contentBlocks,
    additionalContent,
    documents,
  };
}

function processContentBlocks(blocks) {
  return blocks.map((block) => {});
}

function processAdditionalContent(content) {
  const contactItems = [];
  content.forEach((item) => {
    const contentType = determineContentType(item);
    switch (contentType) {
      case "contact": {
        contactItems.push({
          link: item.link,
          contactType: item.contactType,
          showOnContactPage: item.showOnContactPage,
          title: item.title,
        });
      }
      default:
        console.error("reached default statement in processAdditionalContent");
    }
  });
  return { contactItems };
}

function processDocuments(documents) {}

function determineContentType(contentItem) {
  if (contentItem?.internal?.type === "ContentfulContactInfoField") {
    return "contact";
  }
}
