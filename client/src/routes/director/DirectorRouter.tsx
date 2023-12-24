import { Route, Routes } from "react-router-dom";
import StatisticsPointsPage from "../../pages/director/StatisticsPointsPage";
import EmployeePage from "../../pages/director/EmployeePage";
import StatisticsOrdersPage from "../../pages/director/StatisticsOrdersPage";
import CreateAccountPage from "../../pages/director/CreateAccountPage";


const DirectorRouter = () => {
  return (
    <div>
      <Routes>
        <Route path="/statistics-points" element={<StatisticsPointsPage />} />
        <Route path="/employee" element={<EmployeePage />} />
        <Route path="/statistics-orders" element={<StatisticsOrdersPage />} />
        <Route path="/create-account" element={<CreateAccountPage />} />
      </Routes>
    </div>
  );
};

export default DirectorRouter;