import { Route, Routes } from "react-router-dom";
import StatisticsPointsPage from "../../pages/director/StatisticsPointsPage";
import EmployeePage from "../../pages/director/EmployeePage";


const DirectorRouter = () => {
  return (
    <div>
      <Routes>
        <Route path="/static-points" element={<StatisticsPointsPage />} />
        <Route path="/employee" element={<EmployeePage />} />
      </Routes>
    </div>
  );
};

export default DirectorRouter;