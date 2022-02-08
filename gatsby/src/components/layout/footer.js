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
        pt: "10rem",
      }}
    >
      <Grid container justifyContent="center" alignItems="flex-start">
        <Grid
          item
          xs={12}
          md={4}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Box>
            <Typography variant="h5" color="white" align="center">
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
          xs={12}
          md={4}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              maxWidth: "20rem",
            }}
          >
            <LogoPic />
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
          sx={{ display: "flex", justifyContent: "center" }}
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
                    }}
                  >
                    {ContactIcon}
                    {contactItem.title}
                  </Link>
                </Box>
              );
            })}
          </Box>
        </Grid>
        <Grid item xs={12}>
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
