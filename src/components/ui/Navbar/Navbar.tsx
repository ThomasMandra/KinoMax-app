import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import {
  Divider,
  Drawer,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Slide,
  Stack,
  useScrollTrigger,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import {
  iconComponents,
  MOVIE_LISTS,
  TOP_LIST_MOBILE,
} from "../../../constant";
import Search from "../Search/Search";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { ColorModeContext } from "../../../context/ToggleColorMode";

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
  children?: React.ReactElement<unknown>;
}

function HideOnScroll(props: Props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children ?? <div />}
    </Slide>
  );
}

interface IconComponentProps {
  iconName: string;
}

const Icon = ({ iconName }: IconComponentProps) => {
  const IconComponent = iconComponents[iconName as keyof typeof iconComponents];

  return <IconComponent />;
};

function Navbar(props: Props) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { toggleColorMode, mode } = React.useContext(ColorModeContext);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  return (
    <HideOnScroll {...props}>
      <AppBar>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Stack>
              <Stack
                flexDirection="row"
                alignItems="center"
                sx={{ display: { xs: "none", md: "flex" } }}
              >
                <LiveTvIcon
                  sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
                />
                <Typography
                  variant="h5"
                  component={RouterLink}
                  to="/"
                  sx={{
                    mr: 2,
                    display: { xs: "none", md: "flex" },
                    fontFamily: "monospace",
                    fontWeight: 700,
                    letterSpacing: ".3rem",
                    color: "inherit",
                    textDecoration: "none",
                  }}
                >
                  KinoMAX
                </Typography>
              </Stack>
            </Stack>
            {/* MOBILE */}
            <Box
              alignItems="center"
              columnGap="20px"
              sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
            >
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleDrawerToggle}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
            </Box>
            <LiveTvIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component={RouterLink}
              to="/"
              sx={{
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              KinoMAX
            </Typography>
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
                justifyContent: "center",
                columnGap: "30px",
              }}
            >
              <Button
                component={RouterLink}
                to={"/catalog"}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Каталог
              </Button>
              <Button
                component={RouterLink}
                to={"/collection"}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Подборки
              </Button>
            </Box>
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
              }}
            >
              <Search />
            </Box>
            <IconButton color="inherit" onClick={toggleColorMode}>
              {mode === "dark" ? <Brightness7 /> : <Brightness4 />}
            </IconButton>

            <Drawer open={mobileOpen} onClose={handleDrawerToggle}>
              <Box sx={{ width: 250, height: "100%" }}>
                <List>
                  <Stack>
                    <Search />
                  </Stack>
                  {TOP_LIST_MOBILE.map((item, index) => {
                    return (
                      <Link
                        underline="none"
                        key={item.title}
                        component={RouterLink}
                        to={item.url}
                      >
                        <ListItem disablePadding onClick={handleDrawerToggle}>
                          <ListItemButton
                            disableGutters
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <ListItemIcon
                              sx={{
                                width: "40px",
                                height: "40px",
                                textAlign: "center",
                                color: "white",
                                background: `url("/public/images/icons/collection${
                                  index + 1
                                }.svg") no-repeat center center`,
                                objectFit: "cover",
                                backgroundSize: "40px 40px",
                                marginRight: "10px",
                              }}
                            />
                            <ListItemText
                              sx={{
                                color: `${mode === "dark" ? "white" : "black"}`,
                              }}
                              primary={item.title}
                            ></ListItemText>
                          </ListItemButton>
                        </ListItem>
                      </Link>
                    );
                  })}
                </List>
                <Divider sx={{ background: "white" }} />
                <List>
                  {MOVIE_LISTS.map((item) => {
                    return (
                      <Link
                        key={item.title}
                        component={RouterLink}
                        to={item.url}
                        underline="none"
                      >
                        <ListItem disablePadding onClick={handleDrawerToggle}>
                          <ListItemButton>
                            <ListItemIcon
                              sx={{ textAlign: "center", color: "white" }}
                            ></ListItemIcon>
                            <ListItemText
                              sx={{
                                color: `${mode === "dark" ? "white" : "black"}`,
                              }}
                              primary={item.title}
                            />
                          </ListItemButton>
                        </ListItem>
                      </Link>
                    );
                  })}
                </List>
              </Box>
            </Drawer>
          </Toolbar>
        </Container>
      </AppBar>
    </HideOnScroll>
  );
}
export default Navbar;
