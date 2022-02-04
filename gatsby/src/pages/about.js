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
import SmallImagePageLayout from "../components/layout/smallImagePageLayout";
export default function AboutPage({ data, uri }) {
  const { title, subtitle, backgroundImage, additionalContent } =
    formatPageData(data);
  const { contactItems = [] } = additionalContent;
  return (
    <Layout title="about">
      <SmallImagePageLayout
        title={title}
        subtitle={subtitle}
        backgroundImage={backgroundImage}
      >
        <Grid container justifyContent="space-between"></Grid>
      </SmallImagePageLayout>
    </Layout>
  );
}

export const query = graphql`
  {
    contentfulPage(pageName: { eq: "about" }) {
      ...PageInformation
    }
  }
`;
