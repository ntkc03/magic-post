import { Route, Routes } from "react-router-dom";
import StatisticsPointsPage from "../../pages/director/StatisticsPointsPage";
import EmployeePage from "../../pages/director/EmployeePage";
import StatisticsOrdersPage from "../../pages/director/StatisticsOrdersPage";


const DirectorRouter = () => {
  return (
    <div>
      <Routes>
        <Route path="/statistics-points" element={<StatisticsPointsPage />} />
        <Route path="/employee" element={<EmployeePage />} />
        <Route path="/statistics-orders" element={<StatisticsOrdersPage />} />
      </Routes>
    </div>
  );
};

export default DirectorRouter;