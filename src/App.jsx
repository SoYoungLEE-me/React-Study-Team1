import "./App.css";
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import MainPage from "./pages/Main/MainPage";
import MealRecordPage from "./pages/MealRecord/MealRecordPage";
import MealReportPage from "./pages/MealReport/MealReportPage";
import Login from "./pages/Login/Login";
import SettingsPage from "./pages/SettingsPage/SettingsPage";
import TestApi from "./pages/TestApi";
import { useUserGoal } from "./stores/useUsergoalStore";

function App() {
  const loadGoal = useUserGoal((s) => s.loadGoal);

  useEffect(() => {
    loadGoal(); //앱 실행 시 단 한 번 실행
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<MainPage />} />
          <Route path="/record" element={<MealRecordPage />} />
          <Route path="/report" element={<MealReportPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/test" element={<TestApi />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
