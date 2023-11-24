import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import UserRouter from "./routes/user/UserRouter";
import NotFound from "./components/error/NotFound";
import UserLogin from "./components/user/login/UserLogin";

function App() {
  return (
    <div className="font-roboto">
      <Router>
        <Routes>
          <Route path="/user/login/*" element={<UserLogin />} />
          <Route path="/user/*" element={<UserRouter />} />\
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
