import React from 'react'
import { Box } from "@mui/material";

export default function Footer() {
	return (
		<Box
			sx={{
				display: "flex",
				backgroundColor: (theme) => theme.palette.primary.main,
				margin: 0,
				height: "7vh",
				width: "100vw",
				maxWidth: "100%",
				position: "absolute",
				left: 0,
				zIndex: (theme) => theme.zIndex.drawer + 1,
				justifyContent: "center",
				alignItems: "center",
				boxShadow: "0px -5px 5px rgba(0, 0, 0, .2)",
			}}
		>
			footer
		</Box>
	);
}
