import "./App.css";
import { Routes, Route } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import Main from "./pages/Main/Main";
import MealRecordPage from "./pages/MealRecord/MealRecordPage";
import MealReportPage from "./pages/MealReport/MealReportPage";
import Login from "./pages/Login/Login";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Main />} />
          <Route path="/record" element={<MealRecordPage />} />
          <Route path="/report" element={<MealReportPage />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
