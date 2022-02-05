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
        {mainImage ? (
          <>
            <Grid item xs={12} md={6} sx={{ p: 4, pt: 5 }}>
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
            <Grid item xs={12} md={6} sx={{ p: 4 }}>
              <Typography>{body}</Typography>
            </Grid>
          </>
        ) : (
          <Grid item xs={12}>
            <Typography>{body}</Typography>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}
