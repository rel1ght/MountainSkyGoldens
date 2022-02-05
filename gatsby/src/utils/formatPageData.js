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
  return blocks.map((block) => {
    console.log("block: ", block);
    const {
      body = {},
      header,
      imageGallery = [],
      layout,
      mainImage = {},
      name,
    } = block;

    const { body: bodyText } = body;

    const blockImage = mainImage ? getImage(mainImage.image) : null;
    console.log("imageGallery: ", imageGallery);
    const processedImageGallery =
      Array.isArray(imageGallery) && imageGallery.length
        ? imageGallery.map((photo) => processImageGallery(photo))
        : null;
    return {
      body: bodyText,
      mainImage: blockImage,
      gallery: processedImageGallery,
      header,
      layout,
      name,
    };
  });
}

function processImageGallery(photo) {
  return null;
}

function processAdditionalContent(content) {
  const contactItems = [];
  const forms = [];
  content.forEach((item) => {
    const contentType = determineContentType(item);
    const fields = { ...item };
    //  Object.keys(item).reduce((prev, current) => {
    //   return { ...prev, [current]: item[current] };
    // }, {});

    switch (contentType) {
      case "contact": {
        contactItems.push({
          ...fields,
        });
      }
      case "form": {
        console.log("fields: ", fields);
        forms.push({ ...fields });
      }
      default:
    }
  });
  return { contactItems, forms };
}

function processDocuments(documents) {}

function determineContentType(contentItem) {
  console.log("contentItem: ", contentItem);
  if (contentItem?.internal?.type === "ContentfulContactInfoField") {
    return "contact";
  }
  if (contentItem?.internal?.type === "ContentfulForm") {
    return "form";
  }
}
