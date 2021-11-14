import * as React from "react";
import {
	Box,
	Typography,
	Paper,
	Button,
	TextField,
	InputBase,
} from "@mui/material";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import { graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import Parallax from "../components/utils/parallax";
import Layout from "../components/layout/layout";

// Homepage
export default function IndexPage({ data }) {
	console.log("date: ", data);
	const homePageData = data?.allContentfulHomepageBanner?.edges[0]?.node || {};
	const { title, subtitle } = homePageData;
	const backgroundImage = getImage(homePageData.backgroundPicture);

	// litters map
	// look at object structure

	return (
		<Layout>
			{/* hero box */}
			<Box sx={{ height: "85vh" }}>
				{/* background image */}
				<Box
					sx={{ position: "fixed", top: 0, height: 1, width: 1, zIndex: -1 }}
				>
					<GatsbyImage image={backgroundImage} alt='Mountain Sky Goldens' />
				</Box>
				{/* content wrapper above arrow */}
				<Parallax speed={-2}>
					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							justifyContent: "center",
							alignItems: "center",
							mt: 20,
						}}
					>
						<Box sx={{ flex: "0 1 auto" }}>
							<Box sx={{ mb: 2 }}>
								<Typography
									variant='h1'
									color='yellow.light'
									variantMapping='h1'
									align='center'
									sx={{ mb: 2 }}
								>
									{title}
								</Typography>
								{/* puppy status */}
								<Typography
									variant='lead1'
									sx={{ ml: ".25rem" }}
									color='yellow.light'
								>
									{subtitle}
								</Typography>
							</Box>
							<Box>
								{/* input */}
								<Paper
									sx={{
										borderRadius: 1,
										display: "flex",
										alignItems: "stretch",
										justifyContent: "center",
									}}
								>
									<InputBase
										sx={{
											m: 1,
											mx: 2,
											borderRadius: (theme) =>
												`${theme.shape.borderRadius}px 0px ${theme.shape.borderRadius}px 0px`,
										}}
										fullWidth
										placeholder='example@address.com'
									/>
									<Button
										onClick={() => {}}
										variant='contained'
										color='secondary'
										size='large'
										sx={{
											textTransform: "none",
											borderRadius: (theme) =>
												`0px ${theme.shape.borderRadius}px ${theme.shape.borderRadius}px 0px`,
										}}
									>
										<Typography>Submit</Typography>
									</Button>
								</Paper>
							</Box>
						</Box>
					</Box>
				</Parallax>
				<Box
					sx={{ width: 1, mt: 22, display: "flex", justifyContent: "center" }}
				>
					{/* arrow */}
					<Parallax speed={1.1}>
						<ExpandMoreRoundedIcon
							sx={{ fontSize: "4rem", color: "common.white" }}
						/>
					</Parallax>
				</Box>
			</Box>
			{/* Parents container */}
			<Box className='paperGrain'>
				{/* parents tabs */}
				{/* Parents.map */}
				<Box sx={{ height: "2000px" }}>{/* Parent */}</Box>
			</Box>
			{/* Children container */}
			<Box sx={{ height: "4000px" }}>
				{/* children tabs */}
				{/* Children.map */}
				<Box>{/* Children */}</Box>
			</Box>
			{/* instagram */}
			<Box>{/* instagram stuff */}</Box>
			{/* gallery */}
			<Box>{/* gallery map */}</Box>
		</Layout>
	);
}

export const query = graphql`
	{
		allContentfulHomepageBanner {
			edges {
				node {
					id
					backgroundPicture {
						id
						file {
							url
							fileName
							contentType
						}
						fluid {
							src
						}
						gatsbyImageData(placeholder: BLURRED, quality: 90)
					}
					title
					subtitle
				}
			}
		}
	}
`;
