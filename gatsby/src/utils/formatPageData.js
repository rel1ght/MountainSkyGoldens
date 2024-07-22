import { getImage } from "gatsby-plugin-image";
import { useStaticQuery, graphql } from "gatsby";
export default function formatPageData(data) {
  const { placeholderPuppy, placeholderParent } = useStaticQuery(graphql`
    query {
      placeholderPuppy: file(relativePath: { eq: "temppuppythumb.jpg" }) {
        childImageSharp {
          gatsbyImageData
        }
      }
      placeholderParent: file(
        relativePath: { eq: "litterParentPlaceholder.jpg" }
      ) {
        childImageSharp {
          gatsbyImageData
        }
      }
    }
  `);
  const page = data.contentfulPage || {};
  const { title, subtitle } = page;

  const backgroundImage = page.backgroundImage
    ? processImage(page.backgroundImage)
    : {};
  const contentBlocks = page.contentBlock
    ? processContentBlocks(page.contentBlock)
    : [];
  const additionalContent = page.additionalContent
    ? processAdditionalContent(page.additionalContent)
    : {};
  const parents = data.allContentfulParent
    ? processParents(data.allContentfulParent)
    : [];

  const options = page.options ? processOptions(page.options) : {};
  const documents = page.documents ? processDocuments(page.documents) : [];
  return {
    title,
    subtitle,
    backgroundImage,
    contentBlocks,
    additionalContent,
    options,
    parents,
    documents,
  };
}

function processOptions(options) {
  const formattedOptions = {};
  options.forEach((option) => {
    formattedOptions[option.name] = option?.optionalValue ?? option.flag;
  });
  return formattedOptions;
}

function processParents(parents) {
  const { nodes = [] } = parents;
  const ourParents = [];
  const otherParents = [];
  nodes
    .sort((a, b) => a.order - b.order)
    .forEach((parent) => {
      const { mainPicture, gallery: imageGallery } = parent;
      const mainImage = mainPicture
        ? processImage(mainPicture)
        : { image: placeholderParent };
      const processedImageGallery =
        Array.isArray(imageGallery) && imageGallery.length
          ? processImageGallery(imageGallery)
          : null;
      const processedParent = {
        ...parent,
        mainImage,
        gallery: processedImageGallery,
      };
      if (processedParent.owner === "Mountain Sky Goldens") {
        ourParents.push(processedParent);
      } else {
        otherParents.push(processedParent);
      }
    });
  return { ourParents, otherParents };
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
      contentType,
      additionalContent = {},
    } = block;
    const { body: bodyText } = body || {};

    const blockImage = mainImage ? processImage(mainImage) : null;
    const processedImageGallery =
      Array.isArray(imageGallery) && imageGallery.length
        ? processImageGallery(imageGallery)
        : null;
    const processedAdditionalContent = processAdditionalContent([
      additionalContent,
    ]);
    return {
      ...block,
      body: bodyText,
      mainImage: blockImage,
      gallery: processedImageGallery,
      additionalContent: processedAdditionalContent,
      header,
      layout,
      contentType,
      name,
    };
  });
}
export function processImage(imageObj) {
  const { image = {}, focalPoint: focalPointContainer = {} } = imageObj;
  const { focalPoint } = focalPointContainer;
  const { height: imageHeight, width: imageWidth } =
    image?.gatsbyImageData ?? {};
  const imageDetails = { imageWidth, imageHeight };
  const focalStyle = processImageFocalPoint({ imageDetails, focalPoint });
  const gatsbyImage = image ? getImage(image) : {};
  return { gatsbyImage, focalStyle };
}
export function processImageFocalPoint({ imageDetails = {}, focalPoint = {} }) {
  const { imageWidth, imageHeight } = imageDetails;
  const { x: focalX, y: focalY } = focalPoint;
  const focalXRatio = Number((focalX / imageWidth) * 100).toFixed(0);
  const focalYRatio = Number((focalY / imageHeight) * 100).toFixed(0);
  return { objectPosition: `${focalXRatio}% ${focalYRatio}%` };
}

export function processImageGallery(gallery) {
  return gallery.map((photo) => {
    const gatsbyImage = getImage(photo.image);
    return {
      thumb: gatsbyImage,
      full: gatsbyImage,
      alt: photo.title,
      title: photo.title,
    };
  });
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

function processDocuments(documents) {
  // todo: handle other document types
  return documents.map((document) => {
    const { file = {} } = document;
    return { title: document.title, url: file.url, type: file.title };
  });
}
function determineContentType(contentItem) {
  if (contentItem?.internal?.type === "ContentfulContactInfoField") {
    return "contact";
  }
  if (contentItem?.internal?.type === "ContentfulForm") {
    return "form";
  }
}
