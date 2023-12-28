import { Route, Routes, useParams } from "react-router-dom";
import StatisticsPointsPage from "../../pages/director/StatisticsPointsPage";
import EmployeePage from "../../pages/director/EmployeePage";
import StatisticsOrdersPage from "../../pages/director/StatisticsOrdersPage";
import CreateAccountPage from "../../pages/director/CreateAccountPage";
import PointDetailsPage from "../../pages/director/PointDetailsPage";


function PointDetailsPageWrapper() {
  const { consolidation, transaction } = useParams();
  const consolidationValue = consolidation || '';
  const transactionValue = transaction || '';
  return <PointDetailsPage consolidation={consolidationValue} transaction={transactionValue} />;
}

const DirectorRouter = () => {
  return (
    <div>
      <Routes>
        <Route path="/statistics-points" element={<StatisticsPointsPage />} />
        <Route path="/employee" element={<EmployeePage />} />
        <Route path="/statistics-orders" element={<StatisticsOrdersPage />} />
        <Route path="/create-account" element={<CreateAccountPage />} />
        <Route path="/point-details/:consolidation/:transaction" element={<PointDetailsPageWrapper />} />
        <Route path="/point-details/:consolidation" element={<PointDetailsPageWrapper />} />
      </Routes>
    </div>
  );
};

export default DirectorRouter;