import * as React from "react";
import { RellaxWrapper } from "react-rellax-wrapper";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";

// wrapper around rellax to disable on mobile for performance
export default function Parallax({ children, speed }) {
	const { breakpoints } = useTheme();
	const isMobile = useMediaQuery(breakpoints.down("sm"));

	return isMobile ? (
		<>{children}</>
	) : (
		<RellaxWrapper speed={speed}>{children}</RellaxWrapper>
	);
}
