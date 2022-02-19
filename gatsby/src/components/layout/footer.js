import React from "react";
import { Box, Grid, Typography, Divider, Link } from "@mui/material";
import LogoColor from "../../images/logoColor.png";
import { getImage, GatsbyImage, StaticImage } from "gatsby-plugin-image";
import { useStaticQuery, graphql } from "gatsby";
import GetContactIcon from "../../utils/getContactIcon";
import LinkRoundedIcon from "@mui/icons-material/LinkRounded";
import { Link as GatsbyLink } from "gatsby-theme-material-ui";
export default function Footer() {
  const {
    allContentfulContactInfoField: contactInfoNodes,
    allContentfulPage: pageLinks,
  } = useStaticQuery(graphql`
    query {
      allContentfulContactInfoField {
        nodes {
          id
          title
          contactType
          link
        }
      }
      allContentfulPage(filter: { hideInFooter: { eq: false } }) {
        nodes {
          pageLinkText
          title
          pageName
        }
      }
    }
  `);
  const links = pageLinks?.nodes ?? [];
  const contactInfo = contactInfoNodes.nodes ?? [];

  return (
    <Box
      className="footerGrain"
      sx={{
        // display: "flex",
        // backgroundColor: (theme) => theme.palette.primary.main,
        margin: 0,
        // height: "7vh",
        width: "100vw",
        maxWidth: "100%",
        // position: "absolute",
        left: 0,
        // zIndex: (theme) => theme.zIndex.drawer + 1,
        // justifyContent: "center",
        // alignItems: "center",
        boxShadow: "0px -5px 5px rgba(0, 0, 0, .2)",
        p: "7rem",
        pt: { md: "10rem", xs: "4rem" },
      }}
    >
      <Grid container justifyContent="space-around" alignItems="flex-start">
        <Grid
          item
          order={{ xs: 3, md: 1 }}
          xs={12}
          sm={3}
          sx={{
            mb: 3,
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          <Box>
            <Typography
              variant="h5"
              color="white"
              align="center"
              sx={{ width: "max-content" }}
            >
              Quick Links
            </Typography>
            <Divider
              variant="thick"
              flexItem
              sx={{ py: 0.5, mb: 1, borderColor: "white" }}
            />
            {links.map((link) => {
              return (
                <Box
                  key={link.title}
                  sx={{ my: 1 }}
                  className="hoverShadow hoverLift clickPressDown"
                >
                  <GatsbyLink
                    underline="none"
                    color="secondary.light"
                    to={`/${link.pageLinkText ? link.pageLinkText : ""}`}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        "&:hover": {
                          color: "secondary.main",
                        },
                      }}
                    >
                      <LinkRoundedIcon sx={{ mr: 1 }} />
                      {link.pageName}
                    </Box>
                  </GatsbyLink>
                </Box>
              );
            })}
          </Box>
        </Grid>
        <Grid
          item
          order={{ xs: 1, md: 2 }}
          xs={12}
          md={6}
          sx={{
            mb: 3,
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              maxWidth: "20rem",
              // px: 3,
            }}
          >
            <LogoPic />
          </Box>
        </Grid>
        <Grid
          item
          order={{ xs: 2, md: 3 }}
          xs={12}
          sm={3}
          sx={{
            mb: 3,
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          <Box>
            <Typography variant="h5" color="white" align="center">
              Contact Info
            </Typography>
            <Divider
              variant="thick"
              flexItem
              sx={{ py: 0.5, mb: 1, borderColor: "white" }}
            />
            {contactInfo.map((contactItem) => {
              const ContactIcon = GetContactIcon(contactItem.contactType, {
                sx: { color: "inherit", mr: 1 },
              });
              let processedText;
              if (contactItem.contactType === "email") {
                const splitArray = contactItem.title.split("@");
                processedText = `${splitArray[0]}\n@${splitArray[1]}`;
              } else {
                processedText = contactItem.title;
              }
              return (
                <Box
                  key={contactItem.title}
                  className="hoverShadow hoverLift clickPressDown"
                  sx={{ my: 1 }}
                >
                  <Link
                    underline="none"
                    color="secondary.light"
                    href={contactItem.link}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      "&:hover": {
                        color: "secondary.main",
                      },
                      lineHeight:
                        contactItem.contactType === "email" && "1.2rem",
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    {ContactIcon}
                    {processedText}
                  </Link>
                </Box>
              );
            })}
          </Box>
        </Grid>
        <Grid item xs={12} order={{ xs: 4 }}>
          <Typography variant="h6" sx={{ mt: 8 }} color="white" align="center">
            ©{new Date().getFullYear()} Mountain Sky Goldens
          </Typography>
          <Typography variant="h6" color="white" align="center">
            All rights reserved
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}

export function LogoPic() {
  return (
    <StaticImage
      style={
        {
          // display: "flex",
          // width: "100%",
          // justifyContent: "center",
          // maxWidth: "20rem",
        }
      }
      // imgStyle={{ objectFit: "contain", maxWidth: "20rem", mx: "auto" }}
      // width={250}
      layout="constrained"
      src="../../images/logoColor.png"
      alt="Color logo"
    />
  );
}
