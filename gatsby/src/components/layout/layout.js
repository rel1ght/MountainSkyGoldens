import React from "react";
import { Container, Box } from "@mui/material";
import NavBar from "./navBar";
import Footer from ".//footer";

export default function Layout({ title, children }) {
	return (
		<Box sx={{ width: 1 }}>
			<NavBar />
			<Box sx={{ minHeight: "93vh", width: 1 }}>
				<Box sx={{ height: "7vh" }} />
				{children}
			</Box>
			<Footer />
		</Box>
	);
}
