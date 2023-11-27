import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux/es/exports";
import { ToastContainer, toast } from "react-toastify";
import { Disclosure } from "@headlessui/react";
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
    <Disclosure as="div" className="">
    {({ open }) => (
      <>
      <div className="flex flex-col items-center justify-center h-screen bg-background text-center text-textColor">
        <h1 className="text-8xl my-4">Magic derives from <br /> sustainable service</h1>
        <p className="text-xl">MagicPost is a magical provider of domestic and <br />international parcel courier services in Vietnam.<br /><br /></p>
        <div className="mb-14">
          <Disclosure.Button className="rounded-md p-2 sm:bg-buttonbg bg-buttonBlue hover:underline sm:text-white text-textColor focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
            <a href = "">Search</a>
          </Disclosure.Button>
        </div>
      </div>
      </>
    )}
    </Disclosure>
  );
}
