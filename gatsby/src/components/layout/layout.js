import React from "react";
import { Container, Box } from "@mui/material";
import NavBar from "./navBar";
import Footer from ".//footer";

export default function Layout({ title, children }) {
	return (
		<Box sx={{ width: 1 }}>
			<NavBar />
			<Box
				sx={{
					minHeight: (theme) => `calc(100vh - ${theme.mixins.appbarHeight})`,
					width: 1,
				}}
			>
				<Box sx={{ height: (theme) => theme.mixins.appbarHeight }} />
				{children}
			</Box>
			<Footer />
		</Box>
	);
}
