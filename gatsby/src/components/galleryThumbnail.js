import React from "react";
import { Box, Paper } from "@mui/material";
import { useTheme } from "@mui/material/styles";
export default function galleryThumbnail({ children, onClick }) {
  const theme = useTheme();
  const gatsbyImage = React.cloneElement(children, {
    style: {
      borderRadius: theme.shape.borderRadius,
      width: "100%",
      height: "100%",
    },
  });
  return (
    <Paper
      className="hoverLift hoverShadow clickPressDown"
      sx={{
        width: { xs: "8rem", sm: "10rem" },
        m: { xs: 1, sm: 2 },
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
            p: 0.5,
            backgroundColor: "grey.300",
            borderRadius: 1,
          }}
        >
          {gatsbyImage}
        </Box>
      </Box>
    </Paper>
  );
}
