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
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import { useTheme } from "@mui/material/styles";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import Gallery from "@browniebroke/gatsby-image-gallery";
import GalleryThumbnail from "./galleryThumbnail";
export default function ContentBlock({ block }) {
  const { body, mainImage, gallery, header, layout, name } = block;
  return (
    <Box>
      {header && (
        <>
          <Typography variant="h4" align="center">
            {header}
          </Typography>
          <Divider variant="thick" sx={{ py: 1 }} flexItem />
        </>
      )}
      {/* header */}
      <Grid
        container
        direction={layout === "Horizontal" ? "row" : "column"}
        sx={{ p: 4 }}
      >
        {mainImage && (
          <Grid item xs sx={{ p: 4, pt: 5 }}>
            <Box sx={{ borderRadius: 2, overflow: "hidden" }}>
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
        )}
        {body && (
          <Grid item xs sx={{ p: 4 }}>
            <Typography>{body}</Typography>
          </Grid>
        )}

        {gallery && !!gallery.length && (
          <Grid item xs={12} sx={{ p: 4, pt: 0 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Gallery images={gallery} customWrapper={GalleryThumbnail} />
            </Box>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}
