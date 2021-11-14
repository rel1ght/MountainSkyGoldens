import React from "react";
//Components
import {
	AppBar,
	Toolbar,
	Typography,
	Box,
	useScrollTrigger,
} from "@mui/material";
import Logo from "../logo";
import { Link, Button } from "gatsby-theme-material-ui";
import { StaticImage } from "gatsby-plugin-image";
// import Logo from "../../images/svg/logo-thumb-white.svg";

export default function NavBar() {
	const scrollTrigger = useScrollTrigger({
		disableHysteresis: true,
		threshold: 200,
	});
	const links = [
		{ value: "ourdogs", title: "Our Dogs" },
		{ value: "about", title: "About" },
		{ value: "contact", title: "Contact" },
		{ value: "adopt", title: "Adopt", variant: "button" },
	];
	return (
		<AppBar
			position='fixed'
			className='defaultTransition'
			sx={{
				p: 1,
				pt: scrollTrigger ? 1 : 4,
				boxShadow: scrollTrigger ? 10 : 0,
				backgroundColor: scrollTrigger ? "white" : "transparent",
				zIndex: (theme) => theme.zIndex.drawer + 1,
				width: 1,
			}}
		>
			<Toolbar variant='dense'>
				<Box
					sx={{
						width: 1,
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
					}}
				>
					<Box
						className='defaultTransition'
						sx={{
							justifyContent: "flex-start",
							display: "flex",
							alignItems: "start",
							color: scrollTrigger ? "black" : "white",
							mb: scrollTrigger ? -1 : 0,
						}}
					>
						<Box sx={{ width: "2.2rem" }}>
							<Logo sx={{ fontSize: "2.8rem" }} />
						</Box>
						<Typography variant='cursive' sx={{ ml: 2 }}>
							Mountain Sky Goldens
						</Typography>
					</Box>
					<Box sx={{ display: "flex", alignItems: "center" }}>
						{links.map((link) => {
							return link?.variant === "button" ? (
								<Button variant='contained' to={link.value}>
									{link.title}
								</Button>
							) : (
								<Box
									sx={{ mr: 2 }}
									className=' hoverLift hoverShadow clickPressDown'
								>
									<Link underline='none' to={link.value}>
										<Typography
											className='defaultTransition'
											color={scrollTrigger ? "text.secondary" : "white"}
										>
											{link.title}
										</Typography>
									</Link>
								</Box>
							);
						})}
					</Box>
				</Box>
			</Toolbar>
		</AppBar>
	);
}