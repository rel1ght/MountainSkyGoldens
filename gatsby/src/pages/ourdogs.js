import * as React from "react";
import Layout from "../components/layout/layout";
import { Box, Typography, Divider, Card, Grid, Link } from "@mui/material";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import { useTheme } from "@mui/material/styles";
import SmallImagePageLayout from "../components/layout/smallImagePageLayout";
import formatPageData from "../utils/formatPageData";
import useFormatLitterData from "../utils/useFormatLitterData";
import { graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import Gallery from "@browniebroke/gatsby-image-gallery";
import GalleryThumbnail from "../components/galleryThumbnail";

export default function OurDogsPage({ data, location }) {
  const dog = location.search ? location.search.split("=")[1] : null;
  const [dogScrollLink, setDogScrollLink] = React.useState(false);
  const dogIdCheck =
    typeof document !== "undefined" ? document.getElementById(dog) : {};
  React.useEffect(() => {
    if (location.search && typeof document !== "undefined") {
      const dogId = document.getElementById(dog);
      if (dogId && !dogScrollLink) {
        setDogScrollLink(true);
        if (typeof window !== "undefined" && dogId) {
          window.scrollTo({
            top: dogId.offsetTop,
            behavior: "smooth",
          });
        }
      }
    }
  }, [dogIdCheck?.id]);

  const { title, subtitle, backgroundImage, additionalContent, parents } =
    formatPageData(data);
  const litters = useFormatLitterData(data);
  const { ourParents, otherParents } = parents;
  return (
    <Layout title="ourdogs">
      <SmallImagePageLayout
        title={title}
        subtitle={subtitle}
        backgroundImage={backgroundImage}
      >
        {!!ourParents.length && (
          <>
            <Typography variant="h4" align="center">
              Our Parents
            </Typography>
            <Divider variant="thick" sx={{ py: 1 }} flexItem />
            <Grid container justifyContent="center" sx={{ mb: 6 }}>
              {ourParents.map((parent) => {
                return <ParentCard parent={parent} />;
              })}
            </Grid>
          </>
        )}
        {!!otherParents.length && (
          <>
            <Typography variant="h4" align="center">
              Other Parents
            </Typography>
            <Divider variant="thick" sx={{ py: 1 }} flexItem />
            <Grid container justifyContent="center">
              {otherParents.map((parent) => {
                return <ParentCard parent={parent} />;
              })}
            </Grid>
          </>
        )}
      </SmallImagePageLayout>
    </Layout>
  );
}

function ParentCard({ parent }) {
  const { name, gallery, mainImage, bio: bioWrapper } = parent;
  const dogAttributes = [
    { title: "Breed", value: parent.breed },
    { title: "Weight", value: parent.weight },
    { title: "Elbow Certification", value: parent.elbowCertification },
    { title: "Hip Certification", value: parent.hipCertification },
    { title: "Eye Certification", value: dog.eyeCertification },
    { title: "Heart Certification", value: dog.heartCertification },
    {
      title: "Owner",
      value: parent.ownerWebsiteLink ? (
        <Link
          underline="always"
          target="_blank"
          rel="noreferrer"
          color="primary"
          className="hoverLift clickPressDown"
          href={parent.ownerWebsiteLink}
        >
          {parent.owner}
        </Link>
      ) : (
        parent.owner
      ),
    },
    {
      title: "Pedigree",
      value: (
        <Link
          target="_blank"
          rel="noreferrer"
          color="primary"
          underline="none"
          color={parent.pedigreeLink === null ? "grey.300" : "secondary"}
          href={parent.pedigreeLink}
        >
          <Box
            component="span"
            className={
              parent.pedigreeLink === null
                ? ""
                : "hoverLift clickPressDown hoverShadow"
            }
            sx={{ display: "flex", alignItems: "center" }}
          >
            Link <OpenInNewRoundedIcon sx={{ pl: 0.3 }} />
          </Box>
        </Link>
      ),
    },
  ];
  const { bio } = bioWrapper || {};

  return (
    <>
      <Grid item xs={12} md={11} lg={10} sx={{ mb: 10 }} id={`${parent.slug}`}>
        <Grid justifyContent="center" container>
          <Grid
            item
            xs={12}
            sm={10}
            md={6}
            sx={{ p: 2, display: "flex", justifyContent: "center" }}
          >
            <Box
              sx={{
                borderRadius: 2,
                overflow: "hidden",
                maxHeight: "18rem",
                mt: 1,
              }}
            >
              <GatsbyImage
                style={{
                  width: "100%",
                  height: "100%",
                }}
                imgStyle={mainImage.focalStyle}
                loading="lazy"
                image={mainImage.gatsbyImage}
                alt="Mountain Sky Goldens"
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={10} md={6} sx={{ p: 2 }}>
            <Box className="cardRow" sx={{ pb: 1 }}>
              <Typography variant="h4" color="primary.main">
                {parent.name}
              </Typography>
              <Typography variant="h6" color="text.secondary">
                {parent.status}
              </Typography>
            </Box>
            {dogAttributes.map((attribute, index) => (
              <Box key={attribute.title} sx={{ width: 1 }}>
                {index !== 0 && <Divider sx={{ pt: 0.5 }} />}
                <Box className="cardRow" sx={{ pt: 0.2, minHeight: 32 }}>
                  <Typography variant="body1">{attribute.title}:</Typography>
                  {typeof attribute.value === "object" ? (
                    attribute.value
                  ) : (
                    <Typography variant="subtitle1">
                      {attribute.value}
                    </Typography>
                  )}
                </Box>
              </Box>
            ))}
          </Grid>
          {bio && (
            <Grid item xs={12} sx={{ px: 4 }}>
              <Typography variant="h6">Bio</Typography>
              <Typography>{bio}</Typography>
            </Grid>
          )}
        </Grid>

        {gallery && !!gallery.length && (
          <Box sx={{ width: 1, display: "flex", justifyContent: "center" }}>
            <Gallery images={gallery} customWrapper={GalleryThumbnail} />
          </Box>
        )}
        <Divider flexItem sx={{ mt: 2 }} />
      </Grid>
    </>
  );
}

export const query = graphql`
  {
    contentfulPage(pageName: { eq: "ourdogs" }) {
      ...PageInformation
    }
    ...ParentsInformation
    ...LitterInformation
  }
`;
