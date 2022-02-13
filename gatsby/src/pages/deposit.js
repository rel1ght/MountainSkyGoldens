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
import ProcessedForm from "../components/utils/formFactory";
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
  const paymentAmount = options?.amount ? Number(options.amount) : 500;
  console.log("data: ", data);
  const [termsAccepted, setTermsAccepted] = React.useState(false);
  return (
    <Layout title="deposit">
      <SmallImagePageLayout
        title={title}
        subtitle={subtitle}
        backgroundImage={backgroundImage}
      >
        <Grid container justifyContent="center" spacing={12}>
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
                    "AR0Vfdc7KLb8nJWqwdqt9BZBgmGFrEHVtP7uk3jLoueQ0CLQExrxeSx1u9ORvlPCrdOClJ24D2f0T9Uh",
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
                      alert(
                        "Deposit made successfully! We'll contact you shortly. Congrats!"
                      );
                      // do confetti
                    });
                  }}
                  style={{ layout: "vertical", width: "100%" }}
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
