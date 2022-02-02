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
    <Layout>
      <SmallImagePageLayout
        title={title}
        subtitle={subtitle}
        backgroundImage={backgroundImage}
      >
        <>
          <Typography align="center">test</Typography>
          <Typography align="center" variant="subtitle1">
            test
          </Typography>
          {!!data?.forms?.length && <ProcessedForm form={form[0]} />}
        </>
      </SmallImagePageLayout>
    </Layout>
  );
}

export const query = graphql`
  {
    contentfulPage(pageName: { eq: "adopt" }) {
      pageName
      subtitle
      title
      backgroundImage {
        image {
          gatsbyImageData(quality: 100)
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
      }
      options {
        flag
        name
      }
      contentBlock {
        name
        layout
        header
      }
      additionalContent {
        ... on ContentfulForm {
          id
          name
          postUrl
          field {
            validation
            title
            placeholder
            required
            option
            helperText
            fieldType
            internal {
              type
            }
          }
          internal {
            type
          }
        }
      }
    }
  }
`;
