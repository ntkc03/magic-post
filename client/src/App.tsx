import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import UserRouter from "./routes/user/UserRouter";
import HomeRouter from "./routes/home/HomeRouter";
import NotFound from "./components/error/NotFound";
import UserLogin from "./components/user/login/UserLogin";
import HomePage from "./components/homepage/HomePage";
import UserSignUp from "./components/user/signup/UserSignup";
import CreateOrderPage from "./pages/order/CreateOrderPage";

function App() {
  return (
    <div className="font-priego">
      <Router>
        <Routes>
          <Route path="/*" element={<HomeRouter />} />
          <Route path="/user/login/*" element={<UserLogin />} />
          <Route path="/user/register/*" element={<UserSignUp />} />
          <Route path="/user/order/*" element={<CreateOrderPage />} />
          <Route path="/user/*" element={<UserRouter />} />\
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
