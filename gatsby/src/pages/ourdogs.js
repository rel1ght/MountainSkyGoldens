import * as React from "react";
import Layout from "../components/layout/layout";
import SmallImagePageLayout from "../components/layout/smallImagePageLayout";
import formatPageData from "../utils/formatPageData";
import { graphql } from "gatsby";

export default function OurDogsPage({ data }) {
  const { title, subtitle, backgroundImage, additionalContent } =
    formatPageData(data);
  return (
    <Layout title="ourdogs">
      <SmallImagePageLayout
        title={title}
        subtitle={subtitle}
        backgroundImage={backgroundImage}
      >
        our dogs
      </SmallImagePageLayout>
    </Layout>
  );
}

export const query = graphql`
  {
    contentfulPage(pageName: { eq: "ourdogs" }) {
      ...PageInformation
    }
    ...LitterInformation
  }
`;
