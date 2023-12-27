import { Route, Routes } from "react-router-dom";
import EmployeePage from "../../pages/manager/EmployeePage";
import CreateAccount from "../../components/user/signup/createAccount";
import StatisticsOrdersPage from "../../pages/manager/StatisticsOrdersPage";

const ManagerRouter = () => {
    return (
      <div>
        <Routes>
          <Route path="/employee" element={<EmployeePage/>}/>
          <Route path="/create-account" element={<CreateAccount/>}/>
          <Route path="/orders" element={<StatisticsOrdersPage/>}/>
        </Routes>
      </div>
    );
  };
  
  export default ManagerRouter;