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
  Dialog,
  DialogContent,
} from "@mui/material";
import { graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import Parallax from "../components/utils/parallax";
import Layout from "../components/layout/layout";
import { pageNames } from "../utils/constants";
import formatPageData from "../utils/formatPageData";
import SmallImagePageLayout from "../components/layout/smallImagePageLayout";
import ContentBlock from "../components/contentBlock";
import ProcessedForm from "../components/utils/formFactory";
import useWindowSize from "../utils/useWindowSize";
import Confetti from "react-confetti";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
export default function Deposit({ data, uri }) {
  const {
    title,
    subtitle,
    backgroundImage,
    additionalContent,
    contentBlocks,
    options,
  } = formatPageData(data);
  const { width, height } = useWindowSize();
  const paymentAmount = options?.amount ? Number(options.amount) : 500;
  const [termsAccepted, setTermsAccepted] = React.useState(false);
  const [showModal, setShowModal] = React.useState();
  function handleOpen() {
    setShowModal(true);
  }
  function handleClose() {
    setTermsAccepted(false);
    setShowModal(false);
  }
  return (
    <Layout title="deposit" noIndex>
      <SmallImagePageLayout
        title={title}
        subtitle={subtitle}
        backgroundImage={backgroundImage}
      >
        <Grid container justifyContent="center" spacing={12}>
          {showModal && (
            <>
              <Dialog open={showModal} onClose={handleClose}>
                <Box
                  sx={{
                    position: "fixed",
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    zIndex: -1,
                  }}
                >
                  <Confetti
                    confettiSource={{
                      w: 10,
                      h: 10,
                      x: width / 2,
                      y: height / 2,
                    }}
                    initialVelocityX={10}
                    numberOfPieces={100}
                    initialVelocityY={14}
                    tweenDuration={1000}
                    gravity={0.15}
                    recycle={false}
                    width={width}
                    height={height}
                  />
                </Box>
                <DialogContent sx={{ p: 3 }}>
                  <Typography
                    sx={{ mb: 2 }}
                    variant="h4"
                    align="center"
                    color="primary"
                  >
                    Congrats!
                  </Typography>
                  <Typography variant="subtitle1">
                    Deposit made successfully. We'll contact you shortly!
                  </Typography>
                </DialogContent>
              </Dialog>
            </>
          )}
          <Grid item xs={10} md={6}>
            {contentBlocks.map((block) => {
              return <ContentBlock block={block} key={block.name} disableMx />;
            })}
            {!!additionalContent?.forms?.length && (
              <ProcessedForm
                form={additionalContent.forms[0]}
                submitAction={() => {
                  setTermsAccepted(true);
                }}
              />
            )}
          </Grid>
          <Grid item xs={10} md={6}>
            <Box
              sx={{
                pt: 8,
                pointerEvents: !termsAccepted && "none",
                filter: !termsAccepted && "grayscale(1)",
                position: "sticky",
                top: "10rem",
              }}
            >
              {!termsAccepted && (
                <Typography variant="h6" sx={{ pb: 2 }} align="center">
                  Please accept the terms
                </Typography>
              )}
              <PayPalScriptProvider
                options={{
                  "client-id":
                    "AXZ8lSy8FziFUDTZNxpXOqRjd02IffpKgvBRWakFn-Yt0rz6n_7y5u3uVXfu8o4-848OKUdrGAippDES",
                  "enable-funding": "venmo",
                }}
                style={{ width: "100%" }}
              >
                <PayPalButtons
                  disabled={!termsAccepted}
                  createOrder={(data, actions) => {
                    return actions.order
                      .create({
                        purchase_units: [
                          {
                            amount: {
                              currency_code: "USD",
                              value: paymentAmount,
                            },
                          },
                        ],
                        application_context: {
                          shipping_preference: "NO_SHIPPING",
                        },
                      })
                      .then((orderId) => {
                        // Your code here after create the order
                        return orderId;
                      });
                  }}
                  onApprove={function (data, actions) {
                    return actions.order.capture().then(function () {
                      // Your code here after capture the order
                      handleOpen();
                    });
                  }}
                  style={{ layout: "vertical", width: "100%", shape: "pill" }}
                />
              </PayPalScriptProvider>
            </Box>
          </Grid>
        </Grid>
      </SmallImagePageLayout>
    </Layout>
  );
}

export const query = graphql`
  {
    contentfulPage(pageName: { eq: "deposit" }) {
      ...PageInformation
    }
  }
`;
