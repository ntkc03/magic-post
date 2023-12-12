import { Route, Routes } from "react-router-dom";
import StaticPointsPage from "../../pages/director/StaticPointsPage";


const DirectorRouter = () => {
    return (
      <div>
        <Routes>
          <Route path="/static-points" element={<StaticPointsPage />} />
        </Routes>
      </div>
    );
  };
  
  export default DirectorRouter;