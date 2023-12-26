import React from "react";
import { Helmet } from "react-helmet";
import { Container, Box } from "@mui/material";
import FavIcon from "../../images/favicon.ico";
import NavBar from "./navBar";
import Footer from "./footer";

export default function Layout({ title, children, noIndex }) {
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
        {noIndex && <meta name="robots" content="noindex,nofollow" />}
        <meta
          name="keywords"
          content="English Cream, English Creme, Golden Retriever, Dog, Puppy, Puppies, Breeder, Cassia County, Magic Valley, Burley Idaho"
        ></meta>
        <meta name="author" content="Mountain Sky Goldens LLC"></meta>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
        <script>
          {`!function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', '6817315085030342');
  fbq('track', 'PageView');`}
        </script>
        <noscript>
          <img
            height="1"
            width="1"
            style="display:none"
            src="https://www.facebook.com/tr?id=6817315085030342&ev=PageView&noscript=1"
          />
        </noscript>
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
