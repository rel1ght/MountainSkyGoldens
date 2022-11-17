import * as React from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  TextField,
  InputBase,
  Tabs,
  Grid,
  Tab,
  Divider,
  Link,
  Card,
  CardContent,
} from "@mui/material";
import useFormatLitterData from "../utils/useFormatLitterData";
import LittersTabs from "../components/littersHomepage";
import { useTheme } from "@mui/material/styles";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import Gallery from "@browniebroke/gatsby-image-gallery";
import GalleryThumbnail from "./galleryThumbnail";

export default function ParentCard({ parent }) {
  const { name, gallery, mainImage, bio: bioWrapper } = parent;
  const dogAttributes = [
    { title: "Breed", value: parent.breed },
    { title: "Weight", value: parent.weight },
    { title: "Elbow Certification", value: parent.elbowCertification },
    { title: "Hip Certification", value: parent.hipCertification },
    { title: "Eye Certification", value: parent.eyeCertification },
    { title: "Heart Certification", value: parent.heartCertification },
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
                maskImage: "radial-gradient(white, black)",
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
          <Box
            sx={{
              width: 1,
              display: "flex",
              justifyContent: "center",
              "& *": { justifyContent: "center" },
            }}
          >
            <Gallery images={gallery} customWrapper={GalleryThumbnail} />
          </Box>
        )}
        <Divider flexItem sx={{ mt: 2 }} />
      </Grid>
    </>
  );
}
