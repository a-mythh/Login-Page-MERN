import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// css
import "./index.css";

// components
import FirstScreen from "./components/firstScreen";
import Home from "./components/home";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Navigate to="/home" />} />
          <Route path="home/*" element={<Home />} />
          <Route path="login/*" element={<FirstScreen />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
