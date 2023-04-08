import "./App.css";
import HomePage from "./pages/HomePage";
import { Routes, Route, Navigate } from "react-router-dom";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <div className="appContainer">
      <Routes>
        <Route index element={<Navigate to={"/home"} />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
