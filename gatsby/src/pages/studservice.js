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
export default function AboutPage({ data, uri }) {
  const { title, subtitle, backgroundImage, additionalContent, contentBlocks } =
    formatPageData(data);
  return (
    <Layout title="studservice">
      <SmallImagePageLayout
        title={title}
        subtitle={subtitle}
        backgroundImage={backgroundImage}
      >
        <Grid container justifyContent="space-between">
          <Grid item>
            {contentBlocks.map((block) => {
              return <ContentBlock block={block} key={block.name} />;
            })}
          </Grid>
        </Grid>
      </SmallImagePageLayout>
    </Layout>
  );
}

export const query = graphql`
  {
    contentfulPage(pageName: { eq: "Stud Service" }) {
      ...PageInformation
    }
  }
`;
