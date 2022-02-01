import React from "react";
import { Container, Box } from "@mui/material";
import NavBar from "./navBar";
import Footer from "./footer";

export default function Layout({ title, children }) {
	return (
		<Box sx={{ width: 1 }}>
			<NavBar />
			<Box
				className='debugBreakpoints'
				sx={{
					height: 1,
					minHeight: (theme) => `calc(100vh - ${theme.mixins.minFooterHeight})`,
					width: 1,
					display: 'flex',
					flexDirection:'column'
				}}
			>
				<Box sx={{ height: (theme) => theme.mixins.appbarHeight }} />
				<Box sx={{width: 1, flexGrow: 1}}>
					{children}
				</Box>
			</Box>
			<Footer />
		</Box>
	);
}
