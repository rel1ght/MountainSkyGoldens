import { useStaticQuery, graphql } from "gatsby";
export default function useFormatLitterData(data) {
  const queryData = useStaticQuery(graphql`
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
      ...LitterInformation
    }
  `);
  const { placeholderParent, placeholderPuppy, allContentfulLitter } =
    queryData;
  const litters = allContentfulLitter?.nodes || [];
  const formattedLitters = litters
    .sort((a, b) => {
      return new Date(b.dateOfLitter) - new Date(a.dateOfLitter);
    })
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
              mainPicture: { image: placeholderPuppy },
            })),
        parents: litter.contentfulparent.map((parent) => {
          return {
            ...parent,
            mainPicture: parent.mainPicture
              ? parent.mainPicture
              : { image: placeholderParent },
          };
        }),
      };
    });
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
