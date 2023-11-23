import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import UserRouter from "./routes/user/UserRouter";
import NotFound from "./components/error/NotFound";

function App() {
  return (
    <div className="font-roboto">
      <Router>
        <Routes>
          <Route path="/user/*" element={<UserRouter />} />\
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
