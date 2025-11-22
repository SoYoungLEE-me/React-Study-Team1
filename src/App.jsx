import "./App.css";
import { Routes, Route } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import MainPage from "./pages/Main/MainPage";
import MealRecordPage from "./pages/MealRecord/MealRecordPage";
import MealReportPage from "./pages/MealReport/MealReportPage";
import Login from "./pages/Login/Login";
import SettingsPage from "./pages/SettingsPage/SettingsPage";
import TestApi from "./pages/TestApi";
import Join from "./pages/Join/Join";
import ScrollToTop from "./utils/ScrollToTop";

function App() {
  return (
    <div className="App">
      <ScrollToTop></ScrollToTop>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<MainPage />} />
          <Route path="/record" element={<MealRecordPage />} />
          <Route path="/report" element={<MealReportPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/test" element={<TestApi />} />
          <Route path="/join" element={<Join />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
