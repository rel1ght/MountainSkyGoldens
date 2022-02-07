import React from "react";
//Components
import {
  AppBar,
  Toolbar,
  Drawer,
  Typography,
  Divider,
  Box,
  useScrollTrigger,
  IconButton,
} from "@mui/material";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import Logo from "../logo";
import { Link, Button } from "gatsby-theme-material-ui";

export default function NavBar({ currentPage = "" }) {
  const scrollThreshold = ["home"].includes(currentPage.toLowerCase())
    ? 200
    : 100;
  const scrollTrigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: scrollThreshold,
  });
  const links = [
    { value: "ourdogs", title: "Our Dogs" },
    { value: "about", title: "About" },
    { value: "contact", title: "Contact" },
    { value: "adopt", title: "Adopt", variant: "button" },
  ];
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  return (
    <AppBar
      position="fixed"
      className="defaultTransition"
      sx={{
        p: 1,
        pt: scrollTrigger ? 1 : 4,
        boxShadow: scrollTrigger ? 10 : 0,
        backgroundColor: scrollTrigger ? "white" : "transparent",
        zIndex: (theme) => theme.zIndex.drawer - 1,
        width: 1,
      }}
    >
      <Toolbar variant="dense">
        <Box
          sx={{
            width: 1,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box
            className="defaultTransition"
            sx={{
              justifyContent: "flex-start",
              display: "flex",
              alignItems: "start",
              color: scrollTrigger ? "black" : "white",
              mb: scrollTrigger ? -1 : 0,
            }}
          >
            <Box className="hoverLift hoverShadow clickPressDown">
              <Link
                color="inherit"
                to={`/`}
                underline="none"
                sx={{ display: "flex", alignItems: "center" }}
              >
                <Logo sx={{ fontSize: "2.8rem" }} />
                <Typography
                  variant="cursive"
                  sx={{ ml: 2, display: { xs: "none", md: "block" } }}
                >
                  Mountain Sky Goldens
                </Typography>
              </Link>
            </Box>
          </Box>
          <Box sx={{ display: { xs: "block", sm: "none" } }}>
            <IconButton
              size="large"
              sx={{ color: scrollTrigger ? "black" : "white" }}
              onClick={() => {
                setDrawerOpen(!drawerOpen);
              }}
            >
              <MenuRoundedIcon />
            </IconButton>
            <Drawer
              anchor="left"
              open={drawerOpen}
              onClose={() => {
                setDrawerOpen(false);
              }}
            >
              <Box sx={{ width: 250, m: 2 }}>
                <Box
                  className="hoverLift hoverShadow clickPressDown"
                  sx={{ mb: 3 }}
                >
                  <Link
                    color="inherit"
                    to={`/`}
                    underline="none"
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <Logo sx={{ fontSize: "2.8rem" }} />
                    <Typography variant="cursive" sx={{ ml: 2 }}>
                      Mountain Sky Goldens
                    </Typography>
                  </Link>
                </Box>
                <NavLinks
                  isDrawer
                  links={links}
                  scrollTrigger={scrollTrigger}
                  currentPage={currentPage}
                />
              </Box>
            </Drawer>
          </Box>
          <Box sx={{ display: { xs: "none", sm: "flex" } }}>
            <NavLinks
              links={links}
              scrollTrigger={scrollTrigger}
              currentPage={currentPage}
            />
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

function NavLinks({ links, currentPage, scrollTrigger, isDrawer }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: isDrawer ? "column" : "row",
        alignItems: isDrawer ? "flex-start" : "center",
      }}
    >
      {links.map((link) => {
        console.log("link: ", link);
        console.log("currentPage: ", currentPage);
        const isActive = link.value === currentPage;
        return link?.variant === "button" ? (
          <Button
            className="hoverWiggle"
            variant={isActive ? "outlined" : "contained"}
            to={`../${link.value}`}
            sx={{
              boxShadow: isActive ? 0 : 5,
              backgroundColor: isActive ? "white" : "primary.main",
              color: isActive && !isDrawer ? "text.primary" : "white",
              pointerEvents: isActive ? "none" : undefined,
            }}
          >
            {link.title}
          </Button>
        ) : (
          <Box
            sx={{ mr: !isDrawer && 2, mb: isDrawer && 2, width: isDrawer && 1 }}
            className={!isActive ? "hoverLift hoverShadow clickPressDown" : ""}
          >
            <Link
              sx={{
                pointerEvents: isActive && "none",
              }}
              underline="none"
              to={`../${link.value}`}
            >
              <Typography
                className="defaultTransition"
                color={
                  isActive
                    ? "secondary.light"
                    : scrollTrigger || isDrawer
                    ? "text.secondary"
                    : "white"
                }
              >
                {link.title}
              </Typography>
            </Link>
            {isDrawer && <Divider variant="thick" sx={{ width: 1, mt: 1 }} />}
          </Box>
        );
      })}
    </Box>
  );
}
