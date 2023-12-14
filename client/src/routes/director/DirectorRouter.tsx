import { Route, Routes } from "react-router-dom";
import StatisticsPointsPage from "../../pages/director/StatisticsPointsPage";


const DirectorRouter = () => {
  return (
    <div>
      <Routes>
        <Route path="/static-points" element={<StatisticsPointsPage />} />
      </Routes>
    </div>
  );
};

export default DirectorRouter;