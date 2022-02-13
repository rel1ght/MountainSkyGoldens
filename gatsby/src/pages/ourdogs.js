import * as React from "react";
import Layout from "../components/layout/layout";
import { Box, Typography, Divider, Card, Grid, Link } from "@mui/material";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import { useTheme } from "@mui/material/styles";
import SmallImagePageLayout from "../components/layout/smallImagePageLayout";
import formatPageData from "../utils/formatPageData";
import useFormatLitterData from "../utils/useFormatLitterData";
import ContentBlock from "../components/contentBlock";
import { graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import Gallery from "@browniebroke/gatsby-image-gallery";
import GalleryThumbnail from "../components/galleryThumbnail";

export default function OurDogsPage({ data, location }) {
  const dog = location.search ? location.search.split("=")[1] : null;
  const [dogScrollLink, setDogScrollLink] = React.useState(false);
  const dogIdCheck =
    typeof document !== "undefined" ? document.getElementById(dog) : {};
  React.useEffect(() => {
    if (location.search && typeof document !== "undefined") {
      const dogId = document.getElementById(dog);
      if (dogId && !dogScrollLink) {
        setDogScrollLink(true);
        if (typeof window !== "undefined" && dogId) {
          window.scrollTo({
            top: dogId.offsetTop,
            behavior: "smooth",
          });
        }
      }
    }
  }, [dogIdCheck?.id]);

  const {
    title,
    subtitle,
    backgroundImage,
    additionalContent,
    contentBlocks,
    parents,
  } = formatPageData(data);
  const litters = useFormatLitterData(data);
  return (
    <Layout title="ourdogs">
      <SmallImagePageLayout
        title={title}
        subtitle={subtitle}
        backgroundImage={backgroundImage}
      >
        {contentBlocks.map((block) => {
          return (
            <ContentBlock parents={parents} block={block} key={block.name} />
          );
        })}
      </SmallImagePageLayout>
    </Layout>
  );
}

export const query = graphql`
  {
    contentfulPage(pageName: { eq: "ourdogs" }) {
      ...PageInformation
    }
    ...ParentsInformation
    ...LitterInformation
  }
`;
