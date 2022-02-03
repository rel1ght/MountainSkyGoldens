import * as React from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  TextField,
  InputBase,
  Grid,
  Tabs,
  Tab,
  Card,
  CardContent,
  Divider,
  Link,
} from "@mui/material";
import { graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import Parallax from "../components/utils/parallax";
import Layout from "../components/layout/layout";
import { pageNames } from "../utils/constants";
import formatPageData from "../utils/formatPageData";
import useFormatLitterData from "../utils/useFormatLitterData";
import LittersTabs from "../components/littersHomepage";
import SectionBlock from "../components/layout/sectionBlock";
import GetContactIcon from "../utils/getContactIcon";

export default function AboutPage({ data }) {
  const { title, subtitle, backgroundImage, additionalContent } =
    formatPageData(data);
  const { contactItems = [] } = additionalContent;
  return (
    <Layout title="about">
      {/* hero box */}
      <Box
        sx={{
          height: 1,
          maxHeight: {
            xs: "85vh",
            sm: "60vh",
            md: "50vh",
            lg: "45vh",
            xl: "40vh",
          },
          //   overflow: "hidden",
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
            imgStyle={{ objectPosition: "center 15%" }}
            loading="eager"
            image={backgroundImage}
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
              my: "4rem",
            }}
          >
            <Box sx={{ flex: "0 1 auto" }}>
              <Box sx={{ mb: 2 }}>
                {Boolean(title) && (
                  <Typography
                    variant="h1"
                    color="yellow.light"
                    variantMapping="h1"
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
        <Box sx={{ width: 1, py: 8, minHeight: "30rem" }}>
          <Grid container justifyContent="space-between">
            {contactItems.map((contactItem) => {
              if (contactItem.showOnContactPage) {
                return (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    sx={{ p: 3 }}
                    key={contactItem.title}
                  >
                    <ContactCard info={contactItem} />
                  </Grid>
                );
              }
            })}
          </Grid>
        </Box>
      </SectionBlock>
    </Layout>
  );
}

function ContactCard({ info }) {
  const { link, title, contactType } = info;
  const ContactIcon = GetContactIcon(contactType, {
    sx: { fontSize: 100, color: "primary.main" },
  });

  return (
    <Card variant="outline">
      <CardContent
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: 1,
        }}
      >
        {ContactIcon}
        <Link
          underline="hover"
          align="center"
          className="wordBreak"
          href={link}
          sx={{ m: 1 }}
        >
          {title}
        </Link>
        <Divider sx={{ m: 1 }} flexItem />
        <Typography sx={{ m: 1 }} className="capitalize" variant="h6">
          {contactType}
        </Typography>
      </CardContent>
    </Card>
  );
}

export const query = graphql`
  {
    contentfulPage(pageName: { eq: "contact" }) {
      pageName
      subtitle
      title
      backgroundImage {
        image {
          gatsbyImageData(quality: 100)
        }
        focalPoint {
          focalPoint {
            x
            y
          }
        }
      }
      contentBlock {
        name
        layout
        header
        body {
          body
        }
      }
      documents {
        file {
          details {
            size
          }
          contentType
          fileName
          url
        }
        title
        description
        gatsbyImageData
      }
      options {
        flag
        name
      }
    }
  }
`;
