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
import ContentBlock from "../components/contentBlock";
import SectionBlock from "../components/layout/sectionBlock";
import { queries, pageQuery } from "../utils/queryFragments";
// Homepage
export default function IndexPage({ data }) {
  const {
    title,
    subtitle,
    backgroundImage,
    contentBlocks,
    options = {},
  } = formatPageData(data);
  const { enableEmail, enableInstagram } = options;

  const litters = useFormatLitterData(data);
  const [tabValue, setTabValue] = React.useState(0);
  function handleChange(val1, val2) {
    setTabValue(val2);
  }
  return (
    <Layout title="home">
      {/* hero box */}
      <Box
        sx={{
          height: "90vh",
          position: "relative",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* background image */}
        <Box
          sx={{ position: "absolute", top: 0, height: 1, width: 1, zIndex: -1 }}
        >
          <GatsbyImage
            style={{
              width: "100%",
              height: "100%",
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
              mt: "30vh",
              p: 2,
            }}
          >
            <Box sx={{ flex: "0 1 auto", minHeight: "12rem" }}>
              <Box sx={{ mb: 2, maxWidth: "50rem" }}>
                <Typography
                  variant="h1"
                  color="yellow.light"
                  variantMapping="h1"
                  align="center"
                  sx={{ mb: 4, lineHeight: 0.9 }}
                >
                  {title}
                </Typography>
                {/* puppy status */}
                <Box sx={{ maxWidth: "45rem", mx: "auto", p: 1 }}>
                  <Typography
                    variant="lead1"
                    sx={{ lineHeight: 0.8 }}
                    color="yellow.light"
                  >
                    {subtitle}
                  </Typography>
                </Box>
              </Box>
              <Box>
                {/* input */}
                {enableEmail && (
                  <form action="https://formspree.io/f/xvodolkn" method="POST">
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
                        name="email"
                        type="email"
                        fullWidth
                        placeholder="example@address.com"
                      />
                      <Button
                        type="submit"
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
                  </form>
                )}
              </Box>
            </Box>
          </Box>
        </Parallax>
        <Box
          sx={{
            mt: "10vh",
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
        {contentBlocks.map((block) => {
          return <ContentBlock block={block} key={block.name} />;
        })}
      </SectionBlock>
      {/* Children container */}
      <Box>
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
      ...PageInformation
    }
    ...LitterInformation
  }
`;
