import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux/es/exports";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



export default function HomePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");


  const notify = (msg: string, type: string) =>
    type === "error"
      ? toast.error(msg, { position: toast.POSITION.TOP_RIGHT })
      : toast.success(msg, { position: toast.POSITION.TOP_RIGHT });

  return (
    <div>
        <div className="flex justify-center h-screen bg-background"></div>
    </div>
  );
}
