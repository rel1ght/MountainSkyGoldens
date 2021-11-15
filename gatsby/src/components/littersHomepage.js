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

export default function LittersTabs({ litters }) {
	const theme = useTheme();
	const [tabsIndex, setTabsIndex] = React.useState(0);
	const [currentLitter, setCurrentLitter] = React.useState(litters[0]);
	function handleTabChange(e, index) {
		setTabsIndex(index);
		setCurrentLitter(litters[tabsIndex]);
	}

	function TabBar() {
		return (
			<Tabs value={tabsIndex} onChange={handleTabChange}>
				{litters.map((litter, index) => (
					<Tab key={litter.dateOfLitter} value={index} label={litter.title} />
				))}
			</Tabs>
		);
	}

	function ParentsSection() {
		return (
			<Box
				sx={{
					width: 1,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}
			>
				<Typography variant='h2' color='text.primary'>
					The Parents
				</Typography>
				<Divider variant='thick' sx={{ py: 1 }} flexItem />
				<TabBar />
				<Grid container justifyContent='center' alignItems='center'>
					{currentLitter.parents.map((dog) => {
						console.log("parent: ", dog);
						const dogImage = getImage(dog.mainPicture);
						const dogAttributes = [
							{ title: "Breed", value: dog.breed },
							{ title: "Weight", value: dog.weight },
							{ title: "Elbow Certification", value: dog.elbowCertification },
							{ title: "Hip Certification", value: dog.hipCertification },
							{
								title: "Owner",
								value: dog.ownerWebsiteLink ? (
									<Link
										underline='always'
										target='_blank'
										rel='noreferrer'
										color='primary'
										className='hoverLift clickPressDown'
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
										target='_blank'
										rel='noreferrer'
										color='primary'
										underline='none'
										color={dog.pedigreeLink === null ? "grey.300" : "secondary"}
										href={dog.pedigreeLink}
									>
										<Box
											component='span'
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
								md={6}
								lg={5}
								sx={{ p: { xs: 1, sm: 3, md: 5 } }}
							>
								<Paper>
									<Box>
										<GatsbyImage
											alt={`${dog.name}`}
											image={dogImage}
											quality={85}
											style={{
												maxHeight: "275px",
												width: "100%",
												borderTopLeftRadius: `${theme.shape.borderRadius}px`,
												borderTopRightRadius: `${theme.shape.borderRadius}px`,
											}}
										/>
									</Box>
									<Box sx={{ p: 3 }}>
										<Box className='cardRow' sx={{ pb: 1 }}>
											<Typography variant='h5'>{dog.name}</Typography>
											<Typography variant='h6' color='text.secondary'>
												{dog.role}
											</Typography>
										</Box>
										{dogAttributes.map((attribute, index) => (
											<Box key={attribute.title} sx={{ width: 1 }}>
												{index !== 0 && <Divider sx={{ pt: 0.5 }} />}
												<Box
													className='cardRow'
													sx={{ pt: 0.2, minHeight: 32 }}
												>
													<Typography variant='body1'>
														{attribute.title}:
													</Typography>
													{typeof attribute.value === "object" ? (
														attribute.value
													) : (
														<Typography variant='subtitle1'>
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
												variant='contained'
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
			</Box>
		);
	}
	function PuppiesSection() {
		return (
			<Box
				sx={{
					width: 1,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}
			>
				<Typography variant='h2' color='text.primary'>
					The Puppies
				</Typography>
				<Divider variant='thick' sx={{ py: 1 }} flexItem />
				<TabBar />
				<Grid container justifyContent='center' alignItems='center'>
					{currentLitter.puppies.map((dog) => {
						console.log("parent: ", dog);
						const dogImage = getImage(dog.mainPicture);
						const dogAttributes = [
							{ title: "Breed", value: dog.breed },
							{ title: "Weight", value: dog.weight },
							{ title: "Elbow Certification", value: dog.elbowCertification },
							{ title: "Hip Certification", value: dog.hipCertification },
							{
								title: "Owner",
								value: dog.ownerWebsiteLink ? (
									<Link
										underline='always'
										target='_blank'
										rel='noreferrer'
										color='primary'
										className='hoverLift clickPressDown'
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
										target='_blank'
										rel='noreferrer'
										color='primary'
										underline='none'
										color={dog.pedigreeLink === null ? "grey.300" : "secondary"}
										href={dog.pedigreeLink}
									>
										<Box
											component='span'
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
								md={6}
								lg={5}
								sx={{ p: { xs: 1, sm: 3, md: 5 } }}
							>
								<Paper></Paper>
							</Grid>
						);
					})}
				</Grid>
			</Box>
		);
	}

	return (
		<Box sx={{ width: 1, py: 8 }}>
			<ParentsSection />
			<Box sx={{ width: 1, mt: 10 }}>
				<PuppiesSection />
			</Box>
		</Box>
	);
}
