import { getImage } from "gatsby-plugin-image";

export default function formatPageData(data) {
  const page = data.contentfulPage || {};
  const { title, subtitle } = page;
  console.log("data: ", data);
  const backgroundImage = page.backgroundImage
    ? processImage(page.backgroundImage, true)
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
    const {
      body = {},
      header,
      imageGallery = [],
      layout,
      mainImage = {},
      name,
    } = block;
    const { body: bodyText } = body;

    const blockImage = mainImage ? processImage(mainImage) : null;
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
export function processImage(imageObj, test) {
  if (test) {
    console.log("imageObj: ", imageObj);
  }
  const { image = {}, focalPoint: focalPointContainer = {} } = imageObj;
  const { focalPoint } = focalPointContainer;
  const { height: imageHeight, width: imageWidth } =
    image?.gatsbyImageData ?? {};
  const imageDetails = { imageWidth, imageHeight };
  const focalStyle = processImageFocalPoint({ imageDetails, focalPoint });
  const gatsbyImage = image ? getImage(image) : {};
  console.log("gatsbyImage: ", gatsbyImage);
  return { gatsbyImage, focalStyle };
}
export function processImageFocalPoint({ imageDetails = {}, focalPoint = {} }) {
  const { imageWidth, imageHeight } = imageDetails;
  const { x: focalX, y: focalY } = focalPoint;
  const focalXRatio = Number((focalX / imageWidth) * 100).toFixed(0);
  const focalYRatio = Number((focalY / imageHeight) * 100).toFixed(0);
  const xRemainder = 100 - focalXRatio;
  const yRemainder = 100 - focalYRatio;
  // if xRemainder is greater than image frame width, add difference to focalXRatio

  return { objectPosition: `${focalXRatio}% ${focalYRatio}%` };
}

export function processImageGallery(photo) {
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
        forms.push({ ...fields });
      }
      default:
    }
  });
  return { contactItems, forms };
}

function processDocuments(documents) {}

function determineContentType(contentItem) {
  if (contentItem?.internal?.type === "ContentfulContactInfoField") {
    return "contact";
  }
  if (contentItem?.internal?.type === "ContentfulForm") {
    return "form";
  }
}
