import { graphql } from "gatsby";

export const queries = {
  pageInfo: graphql`
    fragment PageHeader on ContentfulPage {
      pageName
      subtitle
      title
      backgroundImage {
        image {
          gatsbyImageData(quality: 95)
        }
        focalPoint {
          focalPoint {
            x
            y
          }
        }
      }
    }
  `,
  litterInfo: graphql`
    fragment LitterInformation on Query {
      allContentfulLitter {
        nodes {
          puppy {
            id
            collarColor
            gender
            mainPicture {
              title
              image {
                gatsbyImageData
              }
            }
            name
            status
          }
          contentfulparent {
            id
            owner
            ownerWebsiteLink
            pedigreeLink
            role
            status
            weight
            hipCertification
            elbowCertification
            breed
            bio {
              id
              bio
            }
            mainPicture {
              puppy {
                mainPicture {
                  childContentfulImageWithFocalPointFocalPointJsonNode {
                    id
                  }
                  focalPoint {
                    id
                  }
                  image {
                    gatsbyImageData
                  }
                }
              }
              image {
                gatsbyImageData
              }
            }
            name
          }
          dateOfLitter
          status
          title
        }
      }
    }
  `,
  contentBlockInfo: graphql`
    fragment ContentBlockInformation on ContentfulPage {
      contentBlock {
        imageGallery {
          childrenContentfulImageWithFocalPointFocalPointJsonNode {
            focalPoint {
              x
              y
            }
            children {
              id
            }
          }
          focalPoint {
            focalPoint {
              x
              y
            }
          }
          image {
            gatsbyImageData
            title
            file {
              fileName
              details {
                size
                image {
                  height
                  width
                }
              }
              contentType
              url
            }
          }
          title
        }
        name
        mainImage {
          focalPoint {
            focalPoint {
              x
              y
            }
          }
          image {
            gatsbyImageData
            title
            file {
              fileName
              url
              contentType
              details {
                image {
                  height
                  width
                }
                size
              }
            }
          }
        }
        layout
        header
        body {
          body
        }
      }
    }
  `,
  documentInfo: graphql`
    fragment DocumentInformation on ContentfulPage {
      documents {
        file {
          details {
            size
          }
          contentType
          fileName
          url
        }
      }
    }
  `,
  additionalContentInfo: graphql`
    fragment AdditionalContentInformation on ContentfulPage {
      additionalContent {
        ... on ContentfulForm {
          id
          name
          postUrl
          field {
            validation
            title
            placeholder
            required
            option
            helperText
            fieldType
            internal {
              type
            }
          }
          internal {
            type
          }
        }
        ... on ContentfulContactInfoField {
          contactType
          showOnContactPage
          title
          link
          internal {
            type
          }
        }
      }
    }
  `,
  optionsInfo: graphql`
    fragment OptionsInformation on ContentfulPage {
      options {
        flag
        name
      }
    }
  `,
};
export const pageQuery = graphql`
  fragment PageInformation on ContentfulPage {
    ...PageHeader
    ...DocumentInformation
    ...OptionsInformation
    ...AdditionalContentInformation
    ...ContentBlockInformation
  }
`;
