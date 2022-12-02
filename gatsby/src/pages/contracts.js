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
import SmallImagePageLayout from "../components/layout/smallImagePageLayout";
import ContentBlock from "../components/contentBlock";
export default function ContractsPage({ data, uri }) {
  const {
    title,
    subtitle,
    backgroundImage,
    additionalContent,
    contentBlocks,
    documents,
  } = formatPageData(data);

  return (
    <Layout title="contracts" noIndex>
      <SmallImagePageLayout
        title={title}
        subtitle={subtitle}
        backgroundImage={backgroundImage}
      >
        <Grid container justifyContent="center">
          <Grid item xs={12}>
            {documents.map((document) => {
              return (
                <Box sx={{ width: 1, mb: 5 }}>
                  <Typography variant="h5" align="center" pb={2}>
                    {document.title}
                  </Typography>
                  <Box
                    sx={{
                      borderRadius: 1,
                      overflow: "hidden",
                      maskImage: "radial-gradient(white, black)",
                      border: "4px solid gray",
                    }}
                  >
                    <iframe
                      style={{ width: "100%", height: "80vh" }}
                      src={`https://docs.google.com/gview?url=https:${document.url}&embedded=true`}
                    />
                  </Box>
                </Box>
              );
            })}
          </Grid>
        </Grid>
      </SmallImagePageLayout>
    </Layout>
  );
}

export const query = graphql`
  {
    contentfulPage(pageName: { eq: "contracts" }) {
      ...PageInformation
    }
  }
`;
