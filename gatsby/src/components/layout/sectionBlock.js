import * as React from "react";
import { Box } from "@mui/material";
export default function SectionBlock({ children }) {
	return (
		<Box
			component='section'
			className='paperGrain'
			sx={{ width: 1, px: { xs: 1, sm: 2, md: 6, lg: 12, xl: 20 } }}
		>
			<Box sx={{ position: "relative", height: 1, width: 1, zIndex: 1 }}>
				{children}
			</Box>
		</Box>
	);
}
