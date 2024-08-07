import { graphql } from "gatsby";

export const queries = {
  pageInfo: graphql`
    fragment PageHeader on ContentfulPage {
      pageName
      subtitle
      title
      backgroundImage {
        image {
          gatsbyImageData(quality: 95, formats: [JPG])
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
  testimonialInfo: graphql`
    fragment TestimonialInformation on Query {
      allContentfulTestimonial {
        nodes {
          quote {
            quote
          }
          owner
          order
          dog
          picture {
            title
            image {
              gatsbyImageData(formats: [JPG])
            }
            focalPoint {
              focalPoint {
                x
                y
              }
            }
          }
        }
      }
    }
  `,
  litterInfo: graphql`
    fragment LitterInformation on Query {
      allContentfulLitter {
        nodes {
          title
          dateOfLitter
          puppy {
            id
            collarColor
            gender
            mainPicture {
              title
              image {
                gatsbyImageData(formats: [JPG], aspectRatio: 1)
              }
              focalPoint {
                focalPoint {
                  x
                  y
                }
              }
            }
            name
            status
          }
          contentfulparent {
            ...ParentInformation
          }
        }
      }
    }
  `,
  additionalContentBlockInfo: graphql`
    fragment AdditionalContentBlockInformation on ContentfulContentBlock {
      additionalContent {
        ... on ContentfulParent {
          id
          owner
          ownerWebsiteLink
          pedigreeLink
          role
          status
          weight
          hipCertification
          elbowCertification
          heartCertification
          eyeCertification
          breed
          bio {
            id
            bio
          }
          mainPicture {
            image {
              gatsbyImageData(formats: [JPG])
            }
            focalPoint {
              focalPoint {
                x
                y
              }
            }
            title
          }
          slug
          gallery {
            focalPoint {
              focalPoint {
                x
                y
              }
            }
            image {
              gatsbyImageData(formats: [JPG])
              title
            }
            title
          }
          name
          showOnOurDogsPage
          showOnStudServicePage
          order
          chic
          dam
          sire
          prcdpra
          pra1
          pra2
          ichthyosis
          dm
          ncl
        }
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
      }
    }
  `,

  documentInfo: graphql`
    fragment DocumentInformation on ContentfulPage {
      documents {
        title
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
  additionalContentPageInfo: graphql`
    fragment AdditionalContentPageInformation on ContentfulPage {
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
        optionalValue
      }
    }
  `,
  parentsInfo: graphql`
    fragment ParentsInformation on Query {
      allContentfulParent {
        nodes {
          ...ParentInformation
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
            gatsbyImageData(formats: [JPG])
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
            gatsbyImageData(formats: [JPG])
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
        contentType
        ...AdditionalContentBlockInformation
      }
    }
  `,
};

export const ParentInformation = graphql`
  fragment ParentInformation on ContentfulParent {
    id
    owner
    ownerWebsiteLink
    pedigreeLink
    role
    status
    weight
    hipCertification
    elbowCertification
    heartCertification
    eyeCertification
    breed
    bio {
      id
      bio
    }
    mainPicture {
      image {
        gatsbyImageData(formats: [JPG])
      }
      focalPoint {
        focalPoint {
          x
          y
        }
      }
      title
    }
    slug
    gallery {
      focalPoint {
        focalPoint {
          x
          y
        }
      }
      image {
        gatsbyImageData(formats: [JPG])
        title
      }
      title
    }
    name
    showOnOurDogsPage
    showOnStudServicePage
    order
    chic
    dam
    sire
    prcdpra
    pra1
    pra2
    ichthyosis
    dm
  }
`;

export const pageQuery = graphql`
  fragment PageInformation on ContentfulPage {
    ...PageHeader
    ...DocumentInformation
    ...OptionsInformation
    ...AdditionalContentPageInformation
    ...ContentBlockInformation
  }
`;
