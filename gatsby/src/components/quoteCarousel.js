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
  useMediaQuery,
  MobileStepper,
} from "@mui/material";
import FormatQuoteRoundedIcon from "@mui/icons-material/FormatQuoteRounded";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import useFormatLitterData from "../utils/useFormatLitterData";
import LittersTabs from "../components/littersHomepage";
import { useTheme } from "@mui/material/styles";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import { processImage, processImageGallery } from "../utils/formatPageData";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import Gallery from "@browniebroke/gatsby-image-gallery";
import { useStaticQuery, graphql } from "gatsby";
import SwipeableViews from "react-swipeable-views";
import RoundedGalleryThumbnail from "./roundedGalleryThumbnail";
import {
  autoPlay,
  virtualize,
  bindKeyboard,
} from "react-swipeable-views-utils";
import { mod } from "react-swipeable-views-core";
const AutoPlaySwipeableViews = bindKeyboard(
  autoPlay(virtualize(SwipeableViews))
);

export default function QuoteCarousel() {
  const queryData = useStaticQuery(graphql`
    query {
      ...TestimonialInformation
    }
  `);
  const quotes = queryData?.allContentfulTestimonial?.nodes || [];
  const theme = useTheme();
  const carouselGroupings = { xs: 1, md: 1, lg: 2 };
  let groupingAmount;
  let lgTrue = useMediaQuery(theme.breakpoints.up("lg"));
  let mdTrue = useMediaQuery(theme.breakpoints.up("md"));

  if (lgTrue) {
    groupingAmount = carouselGroupings.lg;
  } else if (mdTrue) {
    groupingAmount = carouselGroupings.md;
  } else {
    groupingAmount = carouselGroupings.xs;
  }
  const quotePages = quotes.reduce((resultArray, item, index) => {
    const chunkIndex = Math.floor(index / groupingAmount);
    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = []; // start a new chunk
    }

    resultArray[chunkIndex].push(item);

    return resultArray;
  }, []);

  typeof document !== "undefined" && typeof window !== "undefined"
    ? window.innerWidth - document.body.clientWidth
    : 0;

  return (
    <Box sx={{ mb: 3 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h2" align="center" fullWidth>
          Testimonials
        </Typography>
        <Divider variant="thick" sx={{ py: 1 }} flexItem />
      </Box>
      <Box
        sx={{
          mx: { xs: -1, sm: -2, md: -6, lg: -12, xl: -26 },
        }}
      >
        <AutoPlaySwipeableViews
          autoplay={quotePages.length > 1}
          enableMouseEvents
          axis="x"
          interval={10000}
          slideRenderer={(params) => slideRenderer(params, quotePages)}
        />
      </Box>
    </Box>
  );
}

function Quote({ quote }) {
  const { quote: quoteText, owner, dog, picture } = quote;
  const theme = useTheme();
  const processedImage = picture ? processImage(picture) : null;
  return (
    <Box sx={{ position: "relative" }}>
      <Box
        sx={{
          height: "max-content",
          position: "relative",
          fontFamily: "sans-serif",
          maxWidth: { xs: "35rem", lg: "30rem", xl: "35rem" },
          background: "#fff",
          borderRadius: 2,
          padding: "2rem",
          textAlign: "center",
          color: "#000",
          mb: 3,
          "&::before": {
            content: '""',
            width: 0,
            height: 0,
            position: "absolute",
            borderLeft: (theme) =>
              `${theme.spacing(3)} solid ${theme.palette.background.paper}`,
            borderRight: (theme) => `${theme.spacing(1.5)} solid transparent`,
            borderTop: (theme) =>
              `${theme.spacing(1.5)} solid ${theme.palette.background.paper}`,
            borderBottom: (theme) => `${theme.spacing(2.5)} solid transparent`,
            left: {
              xs: theme.spacing(8),
              md: theme.spacing(6),
              lg: theme.spacing(4),
            },
            bottom: (theme) => `-${theme.spacing(3)}`,
          },
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: (theme) => `-${theme.spacing(4)}`,
            right: 0,
          }}
        >
          <FormatQuoteIcon sx={{ fontSize: "4rem", color: "yellow.main" }} />
        </Box>
        <QuoteContent
          processedImage={processedImage}
          owner={owner}
          quoteText={quoteText}
          dog={dog}
        />
      </Box>
      <Box
        sx={{
          height: "max-content",
          position: "absolute",
          top: (theme) => theme.spacing(0.6),
          right: (theme) => `${theme.spacing(0.6)}`,
          left: (theme) => `-${theme.spacing(0.6)}`,
          fontFamily: "sans-serif",
          maxWidth: { xs: "35rem", lg: "30rem", xl: "35rem" },
          backgroundColor: "shade.main",
          borderRadius: 2,
          padding: "2rem",
          textAlign: "center",
          color: "grey.300",
          mb: 3,
          zIndex: -1,
          boxShadow: "-4px 5px 18px 0px rgba(0,0,0,0.4)",
          "&::before": {
            content: '""',
            width: 0,
            height: 0,
            position: "absolute",
            borderLeft: (theme) =>
              `${theme.spacing(3)} solid ${theme.palette.shade.main}`,
            borderRight: (theme) => `${theme.spacing(1.5)} solid transparent`,
            borderTop: (theme) =>
              `${theme.spacing(1.5)} solid ${theme.palette.shade.main}`,
            borderBottom: (theme) => `${theme.spacing(2.5)} solid transparent`,
            left: {
              xs: theme.spacing(8),
              md: theme.spacing(6),
              lg: theme.spacing(4),
            },
            bottom: (theme) => `-${theme.spacing(3)}`,
          },
        }}
      >
        <QuoteContent
          processedImage={processedImage}
          owner={owner}
          quoteText={quoteText}
          dog={dog}
        />
      </Box>
      <Box
        sx={{
          // position: "absolute",
          position: "relative",
          // zIndex: -2,
          top: "-1rem",
          maxWidth: "5rem",
          left: { xs: "-1rem", md: "-2rem", lg: "-3rem" },
        }}
      >
        <Box
          sx={{
            borderRadius: "50%",
            overflow: "hidden",
            // width: "6rem",
            // height: "6rem",
          }}
        >
          <Gallery
            images={[
              {
                thumb: processedImage.gatsbyImage,
                full: processedImage.gatsbyImage,
                alt: owner,
                title: owner,
              },
            ]}
            customWrapper={RoundedGalleryThumbnail}
          />
        </Box>
      </Box>
    </Box>
  );
}
function QuoteContent({ quoteText, owner, dog }) {
  const { quote } = quoteText;
  return (
    <Grid container sx={{ width: 1, height: 1 }}>
      <Grid item xs={12}>
        <Typography align="left" variant="body2" sx={{ fontSize: ".9rem" }}>
          {quote}
        </Typography>
        <Typography fullWidth align="right" variant="subtitle2">
          - {owner}
        </Typography>
        {dog && (
          <Box sx={{ display: "flex", width: 1, justifyContent: "flex-end" }}>
            <Typography
              align="right"
              variant="caption"
              color="textSecondary"
              sx={{ mt: -1 }}
            >
              owner of {dog}
            </Typography>
          </Box>
        )}
      </Grid>
    </Grid>
  );
}
function slideRenderer(params, quotePages) {
  const { index, key } = params;
  const pageKey = mod(index, quotePages.length);
  return (
    <Box
      key={key}
      sx={{
        minHeight: "30rem",
        width: 1,
        display: "flex",
        justifyContent: "center",
        mt: 2,
        mb: 4,
        position: "relative",
      }}
    >
      <>
        {quotePages[pageKey].map((quote, index) => (
          <Box
            sx={{
              m: 4,
              mt: index % 2 !== 0 && 8,
              mb: index % 2 === 0 && 8,
            }}
          >
            <Quote quote={quote} />
          </Box>
        ))}
      </>
    </Box>
  );
}
