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
      <div className="items-center justify-center h-screen bg-background text-center text-textColor">
        <h1 className="text-8xl"><br />Magic derives from <br /> sustainable service</h1>
        <p className="text-xl">MagicPost cung cấp dịch vụ ổn định và bền bỉ, đáp ứng nhu cầu <br /> vận chuyển hàng hóa nội địa và quốc tế tại Việt Nam.<br /><br /></p>
        <div className="mb-0">
          <Disclosure.Button className="rounded-md p-2 sm:bg-buttonbg bg-buttonBlue hover:underline sm:text-white text-textColor focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
            <a href = "">Search</a>
          </Disclosure.Button>
        </div>
      
      <img
        src="https://i.imgur.com/Jrvywgo.png"
        alt="Img"
        className=""
      />
      </div>
      </>
    )}
    </Disclosure>
  );
}
