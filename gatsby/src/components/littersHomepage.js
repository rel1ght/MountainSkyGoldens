import * as React from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  TextField,
  InputBase,
  Tabs,
  Grid,
  Tab,
  Divider,
  Link,
} from "@mui/material";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import { useTheme } from "@mui/material/styles";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import SwipeableViews from "react-swipeable-views";
import { processImage } from "../utils/formatPageData";

export default function LittersTabs({ litters }) {
  const theme = useTheme();
  const [tabsIndex, setTabsIndex] = React.useState(0);

  function handleTabChange(e, index) {
    setTabsIndex(index);
  }
  // for react-swipeable
  function handleChangeIndex(index) {
    setTabsIndex(index);
  }

  function TabBar() {
    return (
      <Tabs center value={tabsIndex} onChange={handleTabChange}>
        {litters.map((litter, index) => (
          <Tab
            sx={{
              fontSize: index === tabsIndex ? "1.4rem" : "1.25rem",
              fontWeight: index === tabsIndex ? 500 : 300,
            }}
            key={litter.dateOfLitter}
            // value={index}
            label={litter.title}
          />
        ))}
      </Tabs>
    );
  }

  function ParentsSection({ litter: currentLitter }) {
    return (
      <Grid container justifyContent="center" alignItems="center">
        {currentLitter.parents.map((dog) => {
          const ownerLink =
            typeof dog.ownerWebsiteLink === "string"
              ? dog.ownerWebsiteLink.trim()
              : "";
          const dogImage = processImage(dog.mainPicture);
          const dogAttributes = [
            { title: "Breed", value: dog.breed },
            { title: "Weight", value: dog.weight },
            { title: "Elbow Certification", value: dog.elbowCertification },
            { title: "Hip Certification", value: dog.hipCertification },
            {
              title: "Owner",
              value: ownerLink ? (
                <Link
                  underline="always"
                  target="_blank"
                  rel="noreferrer"
                  color="primary"
                  className="hoverLift clickPressDown"
                  href={ownerLink}
                >
                  {dog.owner}
                </Link>
              ) : (
                dog.owner
              ),
            },
            {
              title: "Pedigree",
              value: (
                <Link
                  target="_blank"
                  rel="noreferrer"
                  color="primary"
                  underline="none"
                  color={dog.pedigreeLink === null ? "grey.300" : "secondary"}
                  href={dog.pedigreeLink}
                >
                  <Box
                    component="span"
                    className={
                      dog.pedigreeLink === null
                        ? ""
                        : "hoverLift clickPressDown hoverShadow"
                    }
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    Link <OpenInNewRoundedIcon sx={{ pl: 0.3 }} />
                  </Box>
                </Link>
              ),
            },
          ];
          return (
            <Grid
              item
              xs={12}
              sm={8}
              md={6}
              lg={5}
              sx={{ p: { xs: 1, sm: 3, md: 5 } }}
            >
              <Paper
                sx={{
                  width: 1,
                  borderWidth: "1px",
                  borderColor: "grey.200",
                  borderStyle: "solid",
                }}
              >
                <Box>
                  <GatsbyImage
                    alt={`${dog.name}`}
                    image={dogImage.gatsbyImage}
                    imgStyle={dogImage.focalStyle}
                    quality={100}
                    style={{
                      height: "15rem",
                      width: "100%",
                      borderTopLeftRadius: `${theme.shape.borderRadius}px`,
                      borderTopRightRadius: `${theme.shape.borderRadius}px`,
                    }}
                  />
                </Box>
                <Box sx={{ p: 3 }}>
                  <Box className="cardRow" sx={{ pb: 1 }}>
                    <Typography variant="h5">{dog.name}</Typography>
                    <Typography variant="h6" color="text.secondary">
                      {dog.role}
                    </Typography>
                  </Box>
                  {dogAttributes.map((attribute, index) => (
                    <Box key={attribute.title} sx={{ width: 1 }}>
                      {index !== 0 && <Divider sx={{ pt: 0.5 }} />}
                      <Box className="cardRow" sx={{ pt: 0.2, minHeight: 32 }}>
                        <Typography variant="body1">
                          {attribute.title}:
                        </Typography>
                        {typeof attribute.value === "object" ? (
                          attribute.value
                        ) : (
                          <Typography variant="subtitle1">
                            {attribute.value}
                          </Typography>
                        )}
                      </Box>
                    </Box>
                  ))}
                  <Box
                    sx={{
                      width: 1,
                      display: "flex",
                      justifyContent: "flex-end",
                      mt: 2,
                    }}
                  >
                    <Button
                      sx={{ textTransform: "none" }}
                      variant="contained"
                      href={`ourdogs?dog=${dog.slug}`}
                    >
                      Read More
                    </Button>
                  </Box>
                </Box>
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    );
  }
  function PuppiesSection({ litter: currentLitter }) {
    return (
      <Grid container justifyContent="center" alignItems="center">
        {currentLitter.puppies.map((dog) => {
          const dogImage = processImage(dog.mainPicture);
          const dogAttributes = [
            { title: "Breed", value: dog.breed },
            { title: "Weight", value: dog.weight },
            { title: "Elbow Certification", value: dog.elbowCertification },
            { title: "Hip Certification", value: dog.hipCertification },
            {
              title: "Owner",
              value: dog.ownerWebsiteLink ? (
                <Link
                  underline="always"
                  target="_blank"
                  rel="noreferrer"
                  color="primary"
                  className="hoverLift clickPressDown"
                  href={dog.ownerWebsiteLink}
                >
                  {dog.owner}
                </Link>
              ) : (
                dog.owner
              ),
            },
            {
              title: "Pedigree",
              value: (
                <Link
                  target="_blank"
                  rel="noreferrer"
                  color="primary"
                  underline="none"
                  color={dog.pedigreeLink === null ? "grey.300" : "secondary"}
                  href={dog.pedigreeLink}
                >
                  <Box
                    component="span"
                    className={
                      dog.pedigreeLink === null
                        ? ""
                        : "hoverLift clickPressDown hoverShadow"
                    }
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    Link <OpenInNewRoundedIcon sx={{ pl: 0.3 }} />
                  </Box>
                </Link>
              ),
            },
          ];
          return (
            <Grid item xs={6} sm={4} lg={3} sx={{ p: { xs: 1, sm: 2, md: 3 } }}>
              <Paper
                sx={{
                  width: 1,
                  borderWidth: "1px",
                  borderColor: "grey.200",
                  borderStyle: "solid",
                }}
              >
                <Box
                  sx={{
                    position: "relative",
                    width: 1,
                    paddingTop: "100%",
                  }}
                >
                  <Box
                    component="span"
                    sx={{
                      width: 1,
                      height: 1,
                      top: 0,
                      position: "absolute",
                      p: 1,
                      backgroundColor: dog.collarColor,
                      borderRadius: 1,
                      borderBottomRightRadius: 0,
                      borderBottomLeftRadius: 0,
                    }}
                  >
                    <GatsbyImage
                      alt={`${dog.name}`}
                      image={dogImage.gatsbyImage}
                      imgStyle={dogImage.focalStyle}
                      quality={85}
                      style={{
                        width: "100%",
                        borderRadius: theme.shape.borderRadius,
                      }}
                    />
                  </Box>
                </Box>
                {dog.name !== "Unnamed" && (
                  <Box className="cardRow" sx={{ pt: 1, px: 1.5 }}>
                    <Typography variant="h6">{dog.name}</Typography>
                    <Typography
                      variant="h6"
                      color="text.secondary"
                      sx={{ fontSize: "1.1rem !important", fontWeight: "300" }}
                    >
                      {dog.gender}
                    </Typography>
                  </Box>
                )}
                <Box
                  sx={{
                    width: 1,
                    pb: 1,
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Typography align="center" variant="lead1">
                    {dog.status}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    );
  }

  return (
    <Box sx={{ width: 1, py: 8 }}>
      <Box
        sx={{
          width: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h2" color="text.primary">
          The Parents
        </Typography>
        <Divider variant="thick" sx={{ py: 1 }} flexItem />
        <TabBar />
      </Box>
      <SwipeableViews
        axis="x"
        index={tabsIndex}
        onChangeIndex={handleChangeIndex}
        dir={theme.direction}
      >
        {litters.map((litter, index) => (
          <ParentsSection key={litter.dateOfLitter} litter={litter} />
        ))}
      </SwipeableViews>
      <Box sx={{ width: 1, mt: 10 }}>
        <Box
          sx={{
            width: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h2" color="text.primary">
            The Puppies
          </Typography>
          <Divider variant="thick" sx={{ py: 1 }} flexItem />
          <TabBar />
        </Box>
        <SwipeableViews
          axis="x"
          index={tabsIndex}
          onChangeIndex={handleChangeIndex}
          dir={theme.direction}
        >
          {litters.map((litter, index) => (
            <PuppiesSection key={litter.dateOfLitter} litter={litter} />
          ))}
        </SwipeableViews>
      </Box>
    </Box>
  );
}
