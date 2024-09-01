import React from "react";

// mui theme provider
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// views component
import TopNav from "./views/topNav";
import InventoryStats from "./views/inventoryStats";
import { Toaster } from "react-toast";

// dark theme provider
const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

// app layout
const AppLayout = () => {
  return (
    <React.Fragment>
      <TopNav />
      <InventoryStats />
    </React.Fragment>
  );
};

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <AppLayout />
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
