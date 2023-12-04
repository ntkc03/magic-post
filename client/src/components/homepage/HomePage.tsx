import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { RootState } from "../../features/redux/reducers/Reducer";
import { loginSuccess } from "../../features/redux/slices/user/userLoginAuthSlice";


const links = [
  { name: "Easy apply", href: "#" },
  { name: "Hundreds of recruiters", href: "#" },
  { name: "Different categories of jobs", href: "#" },
  { name: "Find you dream job", href: "#" },
];
const stats = [
  { name: "Of jobs", value: "1000" },
  { name: "Full-time Part-time etc", value: "Different jobs" },
  { name: "Companies", value: "100+" },
  { name: "No charges", value: "Unlimited" },
];

function HomePage() {
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = true;
//   const isLoggedIn = useSelector(
//     (state: RootState) => state.userAuth.isLoggedIn
//   );

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(loginSuccess());
    }
    // if (isLoggedIn === true) {
    //   navigate("/user/home");
    // }
  }, [dispatch, isLoggedIn]);

  return (
    <div className="relative overflow-hidden bg-background py-24 sm:py-32">
        <div className="items-center justify-center bg-background text-center text-textColor">
        <h1 className="text-4xl sm:text-8xl">Magic derives from <br /> sustainable service</h1>
        <p className="mx-4 sm:text-xl">MagicPost cung cấp dịch vụ ổn định và bền bỉ, đáp ứng nhu cầu <br className="hidden sm:block" /> vận chuyển hàng hóa nội địa và quốc tế tại Việt Nam.<br /><br /></p>
        <div className="mb-0">
          <button className="rounded-md p-2 bg-buttonbg hover:underline text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
            <a href = "">Tra cứu</a>
          </button>
        
      
      <img
        src="https://i.imgur.com/Jrvywgo.png"
        alt="Img"
        className=""
      />
      </div>
      </div>
    </div>
  );
}

export default HomePage;