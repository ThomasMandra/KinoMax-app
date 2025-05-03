import { Box, Container } from "@mui/material";
import { Outlet } from "react-router-dom";

import Navbar from "./ui/Navbar/Navbar";
import Footer from "./ui/Footer/Footer";

export default function Layout() {
  return (
    <Container
      fixed
      sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      maxWidth={"xl"}
    >
      <Box sx={{ p: 5 }} />
      <Navbar />
      <Outlet />
      <Footer />
    </Container>
  );
}
