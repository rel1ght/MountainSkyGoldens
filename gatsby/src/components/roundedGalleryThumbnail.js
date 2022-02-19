import React from "react";
import { Box, Paper } from "@mui/material";
import { useTheme } from "@mui/material/styles";
export default function roundedGalleryThumbnail({ children, onClick }) {
  const theme = useTheme();
  const gatsbyImage = React.cloneElement(children, {
    style: {
      borderRadius: "50%",
      width: "100%",
      height: "100%",
    },
  });
  return (
    <Paper
      className="hoverLift hoverShadow clickPressDown"
      sx={{
        width: "100%",
        m: 2,
        borderRadius: "50%",
        boxShadow: 4,
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: "100%",
          paddingTop: "100%",
        }}
        onClick={onClick}
      >
        <Box
          component="span"
          sx={{
            width: 1,
            height: 1,
            top: 0,
            position: "absolute",
            // p: 0,
            // backgroundColor: "grey.300",
            borderRadius: "50%",
          }}
        >
          {gatsbyImage}
        </Box>
      </Box>
    </Paper>
  );
}
