import Home from "./pages/Home";
import Game from "./pages/Game";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NewsPart from "./pages/NewsPart.jsx";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game/:id" element={<Game />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/news" element={<NewsPart />} />
      </Routes>
    </div>
  );
}

export default App;
