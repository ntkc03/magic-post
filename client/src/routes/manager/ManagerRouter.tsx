import { Route, Routes } from "react-router-dom";
import EmployeePage from "../../pages/manager/EmployeePage";
import CreateAccount from "../../components/user/signup/createAccount";

const ManagerRouter = () => {
    return (
      <div>
        <Routes>
          <Route path="/employee" element={<EmployeePage/>}/>
          <Route path="/create-account" element={<CreateAccount/>}/>
        </Routes>
      </div>
    );
  };
  
  export default ManagerRouter;