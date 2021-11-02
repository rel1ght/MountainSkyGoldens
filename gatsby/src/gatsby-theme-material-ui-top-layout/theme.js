import { createTheme } from "@mui/material/styles";
import "../fonts/fonts.css";
const theme = createTheme({
	palette: {
		primary: {
			main: "#865580",
		},
		secondary: {
			main: "#c0bedb",
		},
		success: { main: "#ebc44e" },
		danger: { main: "#703b3b" },
		info: { main: "#63e792" },
		warning: { main: "#ffed88" },
		light: { main: "#f8f8f6" },
		dark: { main: "#555555" },
	},
	typography: {
		fontFamily: ["Poppins", "Roboto", "sans-serif"].join(","),

		h1: {
			fontFamily: ["Crete Round"],
			fontWeight: 500,
		},
		h2: {
			fontFamily: ["Crete Round"],
			fontWeight: 500,
		},
		h3: {
			fontFamily: ["Crete Round"],
			fontWeight: 500,
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
	},
});
export default theme;
