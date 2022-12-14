import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import NewList from "./components/NewList";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import CheckPointItem from "./components/CheckPointItem";
import CheckPoint from "./components/CheckPoint";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/newlist" element={<NewList />} />
          <Route path="/checklist/:id" element={<CheckPoint />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
