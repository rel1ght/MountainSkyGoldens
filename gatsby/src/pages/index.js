import * as React from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  TextField,
  InputBase,
  Tabs,
  Tab,
} from "@mui/material";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import { graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import Parallax from "../components/utils/parallax";
import Layout from "../components/layout/layout";
import { pageNames } from "../utils/constants";
import formatPageData from "../utils/formatPageData";
import useFormatLitterData from "../utils/useFormatLitterData";
import LittersTabs from "../components/littersHomepage";
import SectionBlock from "../components/layout/sectionBlock";
// Homepage
export default function IndexPage({ data }) {
  console.log("date: ", data);
  const { title, subtitle, backgroundImage } = formatPageData(data);
  const litters = useFormatLitterData(data);
  const [tabValue, setTabValue] = React.useState(0);
  function handleChange(val1, val2) {
    console.log("val1: ", val1);
    console.log("val2: ", val2);
    setTabValue(val2);
  }
  return (
    <Layout>
      {/* hero box */}
      <Box
        sx={{
          maxHeight: "85vh",
        }}
      >
        {/* background image */}
        <Box
          sx={{ position: "fixed", top: 0, height: 1, width: 1, zIndex: -1 }}
        >
          <GatsbyImage
            style={{
              width: "100%",
              height: "100%",
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
              mt: "25vh",
            }}
          >
            <Box sx={{ flex: "0 1 auto" }}>
              <Box sx={{ mb: 2 }}>
                <Typography
                  variant="h1"
                  color="yellow.light"
                  variantMapping="h1"
                  align="center"
                  sx={{ mb: 2 }}
                >
                  {title}
                </Typography>
                {/* puppy status */}
                <Typography
                  variant="lead1"
                  sx={{ ml: ".25rem" }}
                  color="yellow.light"
                >
                  {subtitle}
                </Typography>
              </Box>
              <Box>
                {/* input */}
                <Paper
                  sx={{
                    borderRadius: 1,
                    display: "flex",
                    alignItems: "stretch",
                    justifyContent: "center",
                  }}
                >
                  <InputBase
                    sx={{
                      m: 1,
                      mx: 2,
                      borderRadius: (theme) =>
                        `${theme.shape.borderRadius}px 0px ${theme.shape.borderRadius}px 0px`,
                    }}
                    fullWidth
                    placeholder="example@address.com"
                  />
                  <Button
                    onClick={() => {}}
                    variant="contained"
                    color="secondary"
                    size="large"
                    sx={{
                      textTransform: "none",
                      borderRadius: (theme) =>
                        `0px ${theme.shape.borderRadius}px ${theme.shape.borderRadius}px 0px`,
                    }}
                  >
                    <Typography>Submit</Typography>
                  </Button>
                </Paper>
              </Box>
            </Box>
          </Box>
        </Parallax>
        <Box
          sx={{
            mt: "20vh",
            width: 1,
            display: "flex",
            justifyContent: "center",
          }}
        >
          {/* arrow */}
          <Parallax speed={1.1}>
            <ExpandMoreRoundedIcon
              sx={{ fontSize: "4rem", color: "common.white" }}
            />
          </Parallax>
        </Box>
      </Box>
      {/* Parents container */}
      <SectionBlock>
        <LittersTabs litters={litters} />
        {/* parents tabs */}
        {/* Parents.map */}
        <Box sx={{ height: "2000px" }}>{/* Parent */}</Box>
      </SectionBlock>
      {/* Children container */}
      <Box>
        <Tabs value={tabValue} onChange={handleChange}>
          <Tab label="test1" />
          <Tab label="test2" />
        </Tabs>
        {/* children tabs */}
        {/* Children.map */}
        <Box>{/* Children */}</Box>
      </Box>
      {/* instagram */}
      <Box>{/* instagram stuff */}</Box>
      {/* gallery */}
      <Box>{/* gallery map */}</Box>
    </Layout>
  );
}
// TODO: make the eq: "home" dynamic
export const query = graphql`
  {
    contentfulPage(pageName: { eq: "home" }) {
      pageName
      subtitle
      title
      backgroundImage {
        image {
          gatsbyImageData
        }
      }
    }
    allContentfulLitter {
      nodes {
        puppy {
          id
          collarColor
          gender
          mainPicture {
            title
            image {
              gatsbyImageData
            }
          }
          name
          status
        }
        contentfulparent {
          id
          owner
          ownerWebsiteLink
          pedigreeLink
          role
          status
          weight
          hipCertification
          elbowCertification
          breed
          bio {
            id
            bio
          }
          mainPicture {
            puppy {
              mainPicture {
                childContentfulImageWithFocalPointFocalPointJsonNode {
                  id
                }
                focalPoint {
                  id
                }
                image {
                  gatsbyImageData
                }
              }
            }
            image {
              gatsbyImageData
            }
          }
          name
        }
        dateOfLitter
        status
        title
      }
    }
  }
`;
