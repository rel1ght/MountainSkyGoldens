import React from "react";
//Components
import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import { Link, Button } from "gatsby-theme-material-ui";
export default function NavBar() {
	const links = [
		{ value: "ourdogs", title: "Our Dogs" },
		{ value: "about", title: "About" },
		{ value: "contact", title: "Contact" },
		{ value: "adopt", title: "Adopt", variant: "button" },
	];
	return (
		<AppBar
			color='primary'
			position='static'
			sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, width: 1 }}
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
					<Box>Mountain Sky Goldens</Box>
					<Box sx={{ display: "flex", alignItems: "center" }}>
						{links.map((link) => {
							return link?.variant === "button" ? (
								<Button variant='contained' to={link.value}>
									{link.title}
								</Button>
							) : (
								<Box sx={{ mr: 2 }}>
									<Link to={link.value}>
										<Typography color='white'>{link.title}</Typography>
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
