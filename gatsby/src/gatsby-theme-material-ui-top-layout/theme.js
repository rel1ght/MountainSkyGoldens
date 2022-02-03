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
    text: {
      primary: "rgba(0,0,0,0.7)",
      secondary: "rgba(0,0,0,0.55)",
    },
    error: { main: "#a61330" },
    success: { main: "#63e792" },
    danger: { main: "#703b3b" },
    info: { main: "#ebc44e" },
    warning: { main: "#ffed88" },
    light: { main: "#f8f8f6" },
    dark: { main: "#555555" },
    puppyColors: {
      lightBlue: "rgb(111, 172, 243)",
      darkBlue: "rgb(37, 21, 133)",
      lightGreen: "rgb(88, 248, 173)",
      darkGreen: "rgb(0, 151, 28)",
      purple: "rgb(136, 51, 170)",
      yellow: "rgb(247, 236, 84)",
      tan: "rgb(150, 136,100)",
      orange: "rgb(196, 105, 44)",
      gray: "rgb(112, 112, 112)",
      black: "rgb(15, 15, 15)",
    },
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
      fontSize: "1.1rem",
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
      ".capitalize": {
        "&&:first-letter": { textTransform: "capitalize" },
      },
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
      ".hoverWiggle": {
        "&&:hover": {
          animation: "swing .3s ease-out",
          animationIterationCount: 1,
        },
        "@keyframes swing": {
          "15%": {
            webkitTransform: "rotate(5deg)",
            transform: "rotate(5deg)",
          },
          "30%": {
            webkitTransform: "rotate(-5deg)",
            transform: "rotate(-5deg)",
          },
          "50%": {
            webkitTransform: "rotate(3deg)",
            transform: "rotate(3deg)",
          },
          "65%": {
            webkitTransform: "rotate(-3deg)",
            transform: "rotate(-3deg)",
          },
          "80%": {
            webkitTransform: "rotate(2deg)",
            transform: "rotate(-2deg)",
          },
          "100%": {
            webkitTransform: "rotate(0)",
            transform: "rotate(0)",
          },
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
      ".debugBreakpoints": {
        [theme.breakpoints.up("xs")]: {
          // backgroundColor: 'BlueViolet',
          backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' version='1.1' height='40px' width='60px'><text x='0' y='30' fill='rgba(0,0,0,0.1)' font-size='20'>XS</text></svg>")`,
        },
        [theme.breakpoints.up("sm")]: {
          // backgroundColor: 'CornflowerBlue',
          backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' version='1.1' height='40px' width='60px'><text x='0' y='30' fill='rgba(0,0,0,0.1)' font-size='20'>SM</text></svg>")`,
        },
        [theme.breakpoints.up("md")]: {
          // backgroundColor: 'PaleVioletRed',
          backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' version='1.1' height='40px' width='60px'><text x='0' y='30' fill='rgba(0,0,0,0.1)' font-size='20'>MD</text></svg>")`,
        },
        [theme.breakpoints.up("lg")]: {
          // backgroundColor: 'DarkSeaGreen',
          backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' version='1.1' height='40px' width='60px'><text x='0' y='30' fill='rgba(0,0,0,0.1)' font-size='20'>LG</text></svg>")`,
        },
        [theme.breakpoints.up("xl")]: {
          // backgroundColor: 'Plum',
          backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' version='1.1' height='40px' width='60px'><text x='0' y='30' fill='rgba(0,0,0,0.1)' font-size='20'>XL</text></svg>")`,
        },
      },
      ".cardRow": {
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
        alignItems: "baseline",
      },
      ".wordBreak": {
        wordWrap: "break-word",
        wordBreak: "break-word",
      },
    },
  },
};
theme.mixins = {
  appbarHeight: theme.spacing(10),
  minFooterHeight: theme.spacing(6),
};
export default responsiveFontSizes(theme);
