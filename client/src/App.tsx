import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import UserRouter from "./routes/user/UserRouter";
import HomeRouter from "./routes/home/HomeRouter";
import NotFound from "./components/error/NotFound";
import OrderRouter from "./routes/order/OrderRouter";

function App() {
  return (
    <div className="font-priego text-sm md:text-md">
      <Router>
        <Routes>
          <Route path="/*" element={<HomeRouter />} />
          <Route path="/employer/*" element={<UserRouter />} />\
          <Route path="/order/*" element={<OrderRouter />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
