import { Route, Routes } from "react-router-dom";
import Home from ".//Pages/Home.jsx";
import Users from ".//Pages/Users.jsx"
import Transponders from ".//Pages/Transponders.jsx"
import Blocklist from ".//Pages/Bloclist.jsx"
import { ThemeProvider, createTheme } from "@mui/material";


const theme = createTheme();

//Tarayıcıda adres çubuğunda yazacağımız link açıklaması:
function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route exact path="/" element={<Home/>}></Route>
        <Route exact path="/Transponders" element={<Transponders/>}></Route>
        <Route exact path="/Users" element={<Users/>}></Route>
        <Route exact path="/Blocklist" element={<Blocklist/>}></Route>
      </Routes>
    </ThemeProvider>
  );
}
export default App;