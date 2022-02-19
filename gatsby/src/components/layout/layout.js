import React from "react";
import { Helmet } from "react-helmet";
import { Container, Box } from "@mui/material";
import FavIcon from "../../images/favicon.ico";
import NavBar from "./navBar";
import Footer from "./footer";

export default function Layout({ title, children }) {
  return (
    <Box sx={{ width: 1 }}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Mountain Sky Goldens | {title}</title>
        <link
          rel="canonical"
          href={`https://mountainskygoldens.com/${title}`}
        />
        <link rel="icon" type="image/png" href={FavIcon} sizes="16x16" />
        <meta
          name="description"
          content="English Cream Golden Retriever Dog Breeder"
        ></meta>
        <meta
          name="keywords"
          content="English Cream, English Creme, Golden Retriever, Dog, Puppy, Puppies, Breeder, Cassia County, Magic Valley, Burley Idaho"
        ></meta>
        <meta name="author" content="Mountain Sky Goldens LLC"></meta>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
      </Helmet>
      <NavBar currentPage={title} />
      <Box
        // className="debugBreakpoints"
        sx={{
          height: 1,
          minHeight: (theme) => `calc(100vh - ${theme.mixins.minFooterHeight})`,
          width: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box sx={{ width: 1, flexGrow: 1 }}>{children}</Box>
      </Box>
      <Footer />
    </Box>
  );
}
