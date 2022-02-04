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
export default function AdoptPage({ data }) {
  const { title, subtitle, backgroundImage, additionalContent } =
    formatPageData(data);
  console.log("additionalContent: ", additionalContent);

  return (
    <Layout title="adopt">
      <SmallImagePageLayout
        title={title}
        subtitle={subtitle}
        backgroundImage={backgroundImage}
      >
        <>
          <Typography align="center" variant="h4" sx={{ mb: 1 }}>
            Adoption Form
          </Typography>
          <Typography align="center" variant="h6">
            Thinking about adopting a puppy? Great! Fill out this form and we'll
            review it.
          </Typography>
          <Divider sx={{ mt: 1, mb: 2 }} />
          {!!additionalContent?.forms?.length && (
            <ProcessedForm form={additionalContent.forms[0]} />
          )}
        </>
      </SmallImagePageLayout>
    </Layout>
  );
}

export const query = graphql`
  {
    contentfulPage(pageName: { eq: "adopt" }) {
      ...PageInformation
    }
  }
`;
