import React from "react";
import { Box, Typography } from "@mui/material";
import { GatsbyImage } from "gatsby-plugin-image";
import Parallax from "../utils/parallax";
import SectionBlock from "./sectionBlock";

export default function SmallImagePageLayout({
  backgroundImage,
  title,
  subtitle,
  children,
}) {
  return (
    <>
      <Box
        sx={{
          maxHeight: {
            xs: "85vh",
            sm: "60vh",
            md: "50vh",
            lg: "45vh",
            xl: "30vh",
          },
          position: "relative",
          overflow: "hidden",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* background image */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            height: 1,
            width: 1,
            zIndex: -1,
          }}
        >
          <GatsbyImage
            style={{
              width: "100%",
              height: "100%",
              filter: "brightness(0.5) contrast(70%)",
            }}
            imgStyle={backgroundImage.focalStyle}
            loading="eager"
            image={backgroundImage.gatsbyImage}
            alt="Mountain Sky Goldens"
          />
        </Box>
        {/* content wrapper above arrow */}
        <Parallax speed={-2}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box sx={{ flex: "0 1 auto" }}>
              <Box sx={{ my: "6rem", mt: "8rem", p: 2 }}>
                {Boolean(title) && (
                  <Typography
                    variant="h1"
                    color="yellow.light"
                    align="center"
                    sx={{ mb: 2 }}
                  >
                    {title}
                  </Typography>
                )}
                {Boolean(subtitle) && (
                  <Typography
                    variant="lead1"
                    sx={{ ml: ".25rem" }}
                    color="yellow.light"
                  >
                    {subtitle}
                  </Typography>
                )}
              </Box>
            </Box>
          </Box>
        </Parallax>
      </Box>
      <SectionBlock>
        <Box sx={{ width: 1, py: 8, minHeight: "30rem" }}>{children}</Box>
      </SectionBlock>
    </>
  );
}
