import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import "../fonts/fonts.css";
import backgroundPaper from "../images/paper_1.png";

const theme = createTheme({
	palette: {
		primary: {
			main: "#865580",
		},
		secondary: {
			main: "#a6a3d1",
		},
		yellow: {
			main: "#ffed88",
			light: "lightgoldenrodyellow",
			dark: "#ebc44e",
		},
		success: { main: "#63e792" },
		danger: { main: "#703b3b" },
		info: { main: "#ebc44e" },
		warning: { main: "#ffed88" },
		light: { main: "#f8f8f6" },
		dark: { main: "#555555" },
	},
	typography: {
		fontFamily: ["Poppins", "Roboto", "sans-serif"].join(","),
		cursive: { fontFamily: ["Phamelo"], fontWeight: 500, fontSize: "1.5rem" },
		h1: {
			fontFamily: ["Crete Round"],
			fontWeight: 500,
			fontSize: "4.5rem",
		},
		h2: {
			fontFamily: ["Crete Round"],
			fontWeight: 500,
			fontSize: "3.5rem",
		},
		h3: {
			fontFamily: ["Crete Round"],
			fontWeight: 500,
			fontSize: "3rem",
		},
		h4: {
			fontFamily: ["Crete Round"],
			fontWeight: 500,
		},
		h5: {
			fontFamily: ["Crete Round"],
			fontWeight: 500,
		},
		h6: {
			fontFamily: ["Crete Round"],
			fontWeight: 500,
		},
		lead1: {
			fontSize: "1.25rem",
			fontWeight: 300,
		},
		body1: { fontSize: "1.1rem" },
		body2: { fontSize: "1rem" },
		subtitle1: { fontSize: "1.1rem", fontWeight: 300 },
		subtitle2: { fontSize: "1rem", fontWeight: 300 },
	},
	shape: { borderRadius: 10 },
	components: {
		MuiTypography: {
			variants: [
				{
					props: { variant: "cursive" },
					style: {
						fontFamily: "Phamelo",
					},
				},
			],
		},
		MuiDivider: {
			variants: [
				{
					props: { variant: "thick" },
					style: {
						borderBottomWidth: ".2rem",
					},
				},
			],
		},
	},
});
theme.components = {
	...theme.components,
	MuiCssBaseline: {
		styleOverrides: {
			".defaultTransition": {
				transition: `${theme.transitions.create("all", {
					duration: 500,
					easing: theme.transitions.easing.easeOut,
				})} !important`,
			},
			".hoverShadow": {
				transition: theme.transitions.create("all", {
					duration: theme.transitions.duration.shortest,
				}),
				"&&:hover": {
					filter: "drop-shadow( 0px 2px 1px rgba(0, 0, 0, .2))",
					cursor: "pointer",
				},
			},

			".hoverLift": {
				transition: theme.transitions.create("all", {
					duration: theme.transitions.duration.shortest,
				}),
				"&&:hover": {
					transform: "translateY(-.1rem)",
					cursor: "pointer",
				},
			},
			".clickPressDown": {
				transition: theme.transitions.create("all", {
					duration: theme.transitions.duration.shortest,
					easing: theme.transitions.easing.sharp,
				}),
				"&&:active": {
					transform: "translateY(.2rem)",
					cursor: "pointer",
				},
			},
			".paperGrain": {
				backgroundColor: theme.palette.background.default,
				position: "relative",
				height: "100%",
				width: "100%",
				zIndex: 2,

				"&::before": {
					content: '""',
					backgroundImage: `url(${backgroundPaper})`,
					position: "absolute",
					top: 0,
					right: 0,
					bottom: 0,
					left: 0,
					opacity: 0.3,
					zIndex: 0,
				},
			},
			".cardRow": {
				display: "flex",
				width: "100%",
				justifyContent: "space-between",
				alignItems: "baseline",
			},
		},
	},
};
theme.mixins = {
	appbarHeight: theme.spacing(10),
};
export default responsiveFontSizes(theme);
