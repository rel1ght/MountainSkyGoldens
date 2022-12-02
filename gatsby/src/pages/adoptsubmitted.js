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
import Layout from "../components/layout/layout";
import { pageNames } from "../utils/constants";
import formatPageData from "../utils/formatPageData";
import SmallImagePageLayout from "../components/layout/smallImagePageLayout";
import ProcessedForm from "../components/utils/formFactory";
export default function AdoptSubmittedPage({ data }) {
  const {
    title,
    subtitle,
    backgroundImage,
    additionalContent,
    options = {},
  } = formatPageData(data);

  return (
    <Layout title="adopt" noIndex>
      <SmallImagePageLayout
        title={title}
        subtitle={subtitle}
        backgroundImage={backgroundImage}
        bigBackgroundImage={options?.bigBackgroundImage}
      />
    </Layout>
  );
}

export const query = graphql`
  {
    contentfulPage(pageName: { eq: "adopt submitted" }) {
      ...PageInformation
    }
  }
`;
