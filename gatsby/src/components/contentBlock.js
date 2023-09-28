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
import ParentCard from "./parentCard";
import ProcessedForm from "./utils/formFactory";
import { useTheme } from "@mui/material/styles";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import Gallery from "@browniebroke/gatsby-image-gallery";
import GalleryThumbnail from "./galleryThumbnail";
import QuoteCarousel from "./quoteCarousel";
export default function ContentBlock({ parents = {}, block, disableMx }) {
  const { header } = block;

  return (
    <Box sx={{ mb: 4 }}>
      {header && (
        <>
          <Typography variant="h4" align="center">
            {header}
          </Typography>
          <Divider variant="thick" sx={{ py: 1 }} flexItem />
        </>
      )}
      <GetContentComponent
        parents={parents}
        block={block}
        disableMx={disableMx}
      />
    </Box>
  );
}

function GetContentComponent({ parents, block, form, disableMx }) {
  const { contentType } = block;
  switch (contentType) {
    case "litters": {
      return <Litters block={block} />;
    }
    case "testimonials": {
      return <Testimonials block={block} />;
    }
    case "our parents": {
      return <Parents parents={parents} ourParentsFlag />;
    }
    case "other parents": {
      return <Parents parents={parents} block={block} />;
    }
    case "form": {
      return typeof form === "object" && <ProcessedForm form={form} />;
    }
    default: {
      return <Default block={block} disableMx={disableMx} />;
    }
  }
}

function Testimonials({ block }) {
  return (
    <>
      <QuoteCarousel />
    </>
  );
}

function Parents({ parents, ourParentsFlag }) {
  const { ourParents = {}, otherParents = {} } = parents;
  const filteredOurParents = ourParents.filter(
    (parent) => parent.showOnOurDogsPage
  );
  const filteredOtherParents = otherParents.filter(
    (parent) => parent.showOnOurDogsPage
  );

  return ourParentsFlag ? (
    <>
      {!!filteredOurParents.length && (
        <>
          <Typography variant="h4" align="center">
            Our Parents
          </Typography>
          <Divider variant="thick" sx={{ py: 1 }} flexItem />
          <Grid container justifyContent="center" sx={{ mb: 6 }}>
            {filteredOurParents.map((parent) => {
              return <ParentCard parent={parent} />;
            })}
          </Grid>
        </>
      )}
    </>
  ) : (
    <>
      {!!filteredOtherParents.length && (
        <>
          <Typography variant="h4" align="center">
            Other Parents
          </Typography>
          <Divider variant="thick" sx={{ py: 1 }} flexItem />
          <Grid container justifyContent="center">
            {filteredOtherParents.map((parent) => {
              return <ParentCard parent={parent} />;
            })}
          </Grid>
        </>
      )}
    </>
  );
}

function Litters({ block }) {
  const litters = useFormatLitterData(block);
  return <LittersTabs litters={litters} />;
}

function Default({ block, disableMx }) {
  const {
    body,
    mainImage,
    gallery,
    header,
    layout,
    name,
    contentType,
    additionalContent,
  } = block;
  return (
    <Grid container direction={layout === "Horizontal" ? "row" : "column"}>
      {mainImage && (
        <Grid
          item
          xs={12}
          md
          sx={{ m: 4, pt: 1, display: "flex", justifyContent: "center" }}
        >
          <Box
            sx={{
              borderRadius: 2,
              overflow: "hidden",
              maskImage: "radial-gradient(white, black)",
              display: "flex",
              justifyContent: "center",
              maxWidth: {
                xs: "90vw",
                md: "70vw",
                lg: "65vw",
              },
              maxHeight: {
                xs: "80vh",
                sm: "75vh",
                md: "72vh",
                lg: "70vh",
              },
            }}
          >
            <GatsbyImage
              formats={["jpg", "png"]}
              style={{
                width: "100%",
                height: "100%",
              }}
              objectFit="contain"
              imgStyle={mainImage.focalStyle}
              loading="lazy"
              image={mainImage.gatsbyImage}
              alt="Mountain Sky Goldens"
            />
          </Box>
        </Grid>
      )}
      {body && (
        <Grid item xs={12} md sx={{ m: 4, mx: disableMx && 0 }}>
          <Typography>{body}</Typography>
        </Grid>
      )}
      {gallery && !!gallery.length && (
        <Grid item xs={12} sx={{ m: 4, pt: 0 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              "& *": { justifyContent: "center" },
            }}
          >
            <Gallery images={gallery} customWrapper={GalleryThumbnail} />
          </Box>
        </Grid>
      )}
    </Grid>
  );
}
