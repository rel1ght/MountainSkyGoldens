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

export default function ContactPage({ data }) {
  const { title, subtitle, backgroundImage, additionalContent } =
    formatPageData(data);
  console.log("additionalContent: ", additionalContent);
  const { contactItems = [] } = additionalContent;
  return (
    <Layout title="contact">
      <SmallImagePageLayout
        title={title}
        subtitle={subtitle}
        backgroundImage={backgroundImage}
      >
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
      </SmallImagePageLayout>
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
      ...PageInformation
    }
  }
`;
