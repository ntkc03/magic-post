import { useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import { SignupPayload } from "../../types/PayloadInterface";
import { userRegisterValidationSchema } from "../../utils/validation";
import { employerInterface } from "../../types/EmployerInterface";
import { employerData } from "../../features/axios/api/employer/userDetails";
import { createAccount } from "../../features/axios/api/employer/userAuthentication";
import { FormControl, InputLabel, OutlinedInput, Select, SelectChangeEvent } from "@mui/material";
import { ConsolidationInterface } from "../../types/ConsolidationInterface";
import { TransactionInterface } from "../../types/TransactionInterface";
import MenuItem from '@mui/material/MenuItem';
import { allConsolidationsData } from "../../features/axios/api/consolidation/consolidationPointDetails";
import { getTransactionsByConsolidation } from "../../features/axios/api/transaction/transactionPointDetails";

export function CreateAccount() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupPayload>({
    resolver: yupResolver(userRegisterValidationSchema),
  });


  const token = localStorage.getItem("token");
  const [employerDetails, setEmployerDetails] = useState<employerInterface>();
  const [allConsolidations, setAllConsolidations] = useState<string[]>([]);
  const [allTransactions, setAllTransactions] = useState<string[]>([]);
  const [selectedConsolidation, setSelectedConsolidation] = useState("");
  const [selectedTransaction, setSelectedTransaction] = useState("");

  const getEmployerDetails = async () => {
    const data = await employerData();
    setEmployerDetails(data);
  }

  useEffect(() => {
    getEmployerDetails();
    const getAllConsoldationsData = async () => {
      const allConsolidations: ConsolidationInterface[] = await allConsolidationsData();
      const addresses: string[] = allConsolidations
        .map((consolidation) => consolidation.address)
        .filter((address): address is string => address !== undefined);
      setAllConsolidations(addresses);
    }
    getAllConsoldationsData();
  }, []);

  useEffect(() => {
    const getAllTransactionsData = async () => {
      if (selectedConsolidation !== "") {
        const allTransactions: TransactionInterface[] = await getTransactionsByConsolidation(selectedConsolidation);
        const addresses: string[] = allTransactions
          .map((transaction) => transaction.address)
          .filter((address): address is string => address !== undefined);
        setAllTransactions(addresses);
      }
    }
    getAllTransactionsData();
  }, [selectedConsolidation]);



  const notify = (msg: string, type: string) =>
    type === "error"
      ? toast.error(msg, { position: toast.POSITION.BOTTOM_RIGHT })
      : toast.success(msg, { position: toast.POSITION.BOTTOM_RIGHT });

  const submitHandler = async (formData: SignupPayload) => {
    if(formData.transaction){
      formData.role = "Trưởng điểm giao dịch";
    }else{
      formData.role = "Trưởng điểm tập kết";
    }
    createAccount(formData)
      .then((response: any) => {
        notify("User registered successfully", "success");
        setTimeout(() => {
          if (token) {
            if (employerDetails?.role === "Giám đốc") {
              navigate("/director/employee");
            } else {
              navigate("/employer/login");
            }
          }
        }, 2000);
      })
      .catch((error: any) => {
        notify(error.message, "error");
      });
  };
  return (
    <div className="flex justify-center min-h-screen">
      {/* <div className="flex justify-center items-center bg-background">
        <div className="lg:block hidden ">
          <img 
            src="https://i.imgur.com/5KtEikT.png"
            alt="Img"
            className="max-w-450 max-h-450 w-4/5 bg-cover bg-center"
          />
          <img
            src="https://i.imgur.com/7XTdnaF.png"
            alt="Img"
            className="mt-[-180px] max-w-450 max-h-450 w-1/5 bg-cover bg-center"
          />
        </div>
      </div> */}
      <div className="flex flex-wrap justify-center items-center ">
        <div className="w-[200%] h-screen md:h-auto p-8 bg-white border border-gray-300 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold ">Tạo tài khoản</h2>
          <p className="text-small text-gray-500 mb-4">Tạo tài khoản cho trưởng điểm giao dịch hoặc trưởng điểm tập kết</p>
          <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
            <div>
              <label className="text-sm" htmlFor="email">
                Tên
              </label>
              <input
                type="text"
                placeholder="Nhập tên người dùng"
                {...register("name")}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-purple-500"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>
            <div>
              <label className="text-sm" htmlFor="email">
                Tên đăng nhập
              </label>
              <input
                id="username"
                type="text"
                placeholder="Nhập tên đăng nhập"
                {...register("username")}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-purple-500"
              />
              {errors.username && (
                <p className="text-red-500 text-sm">{errors.username.message}</p>
              )}
            </div>
            <div>
              <label className="text-sm" htmlFor="email">
                Điện thoại
              </label>
              <input
                type="phone"
                placeholder="Nhập số điện thoại"
                {...register("phone")}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-purple-500"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm">{errors.phone.message}</p>
              )}
            </div>
            <div>
              <label className="text-sm" htmlFor="email">
                Mật khẩu
              </label>
              <input
                type="password"
                placeholder="Nhập mật khẩu"
                {...register("password")}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-purple-500"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div>
              <label className="text-sm" htmlFor="email">
                Xác nhận lại mật khẩu
              </label>
              <input
                type="password"
                placeholder="Nhập lại mật khẩu để xác nhận"
                {...register("confirmPassword")}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-purple-500"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
            <div>
              <label className="text-sm" htmlFor="email">
                Chọn điểm tập kết
              </label>
              <FormControl required size="small" className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-purple-500">
                <Select
                  {...register("consolidation")}
                  displayEmpty
                  onChange={(e) => {
                    setSelectedConsolidation(e.target.value as string);

                  }}
                  value={selectedConsolidation}
                  input={<OutlinedInput />}
                  renderValue={(selected) => {
                    if (!selected) {
                      return <em>Điểm tập kết</em>;
                    }
                    return selected;
                  }}
                >
                  {allConsolidations.map((address) => (
                    <MenuItem key={address} value={address}>
                      {address}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div>
              <label className="text-sm" htmlFor="email">
                Chọn điểm giao dịch
              </label>
              <FormControl size="small" className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-purple-500">
                <Select
                  {...register("transaction")}
                  displayEmpty
                  onChange={(e) => setSelectedTransaction(e.target.value as string)}
                  value={selectedTransaction}
                  input={<OutlinedInput />}
                  renderValue={(selected) => {
                    if (!selected) {
                      return <em>Điểm giao dịch</em>;
                    }

                    return selected;
                  }}
                >
                  {allTransactions.map((address) => (
                    <MenuItem key={address} value={address}>
                      {address}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <button
              type="submit"
              className="w-full px-3 py-2 text-sm bg-activeButton text-white rounded hover:bg-buttonPurple flex justify-center items-center"
            >
              Tạo tài khoản
            </button>
          </form>


        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default CreateAccount;
export { };
