import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPrint } from '@fortawesome/free-solid-svg-icons';
import { orderData, updateOrder } from '../../../features/axios/api/order/createOrder';
import { Status, orderInterface } from '../../../types/OrderInterface';
import { employerData } from '../../../features/axios/api/employer/userDetails';
import { fetchUser, clearUserDetails } from '../../../features/redux/slices/user/userDetailsSlice';
import { employerInterface } from '../../../types/EmployerInterface';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { getConsolidationByAddress, updateConsolidation } from '../../../features/axios/api/consolidation/consolidationPointDetails';
import { getTransactionByAddress, updateTransaction } from '../../../features/axios/api/transaction/transactionPointDetails';
import { ConsolidationInterface } from '../../../types/ConsolidationInterface';
import { TransactionInterface } from '../../../types/TransactionInterface';

//************************************
// Description: Phần tạo đơn đến điểm tập kết
//************************************

interface PrintButtonProps {
  code: string;
  onClose: () => void;
  onCloseButt: () => void;
}

const token = localStorage.getItem('token');

const SendToSenderConsolidation: React.FC<PrintButtonProps> = ({ code, onClose, onCloseButt }) => {
  const [orderDetails, setOrderDetails] = useState<orderInterface>();
  const [employerDetails, setEmployerDetails] = useState<employerInterface>();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<orderInterface>();

  useEffect(() => {
    const userInfo = async () => {
      const data = await orderData(code);
      setOrderDetails(data);
    };
    userInfo();
  }, []);

  useEffect(() => {
    if (token) {
      dispatch(fetchUser());
      const employerDetails = async () => {
        const data = await employerData();
        setEmployerDetails(data);
      };
      employerDetails();
    }
    return () => {
      dispatch(clearUserDetails());
    };
  }, [dispatch]);

  const buttonHandle = async (event: React.MouseEvent<HTMLButtonElement>) => {
    // Access the necessary information from your component's state or props
    if (orderDetails && employerDetails) {
      let status: Status = {
        action: 'Đang gửi đến điểm tập kết',
        fromConsolidation: employerDetails?.consolidation,
        fromTransaction: employerDetails?.transaction,
        toConsolidation: employerDetails?.consolidation,
        toTransaction: "",
        date: new Date(),
        staff: employerDetails?.name,
      };

      let statuses: Status[] = orderDetails.status ? orderDetails.status : [];
      statuses.push(status);
      setValue('status', statuses);
      await updateOrder(orderDetails);
      
      if (orderDetails.senderDistrict) {
        const data: ConsolidationInterface = await getConsolidationByAddress(orderDetails.senderDistrict);
        if (data && data.quantity !== undefined) {
          data.quantity = data.quantity + 1;
        } else {
          data.quantity = 1;
        }
        updateConsolidation(data);
      }


      onClose();
    }
  };

  return (
    <div>
      {/* Grey overlay */}
      <div className="fixed top-0 left-0 w-full h-full bg-gray-700 opacity-10 z-50"></div>

      <div className="z-50 min-w-[350px] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white text-black p-4 rounded shadow-md">
        <div className="fixed top-2 right-2 cursor-pointer text-3xl text-gray-700 hover:text-gray-900">
          <span onClick={onCloseButt}>&times;</span>
        </div>
        <div className='flex justify-center mb-4'>
          <label className='text-[20px] font-bold'>Xác nhận đơn đi</label>
        </div>
        <div className='mb-4'>
          <label className='font-bold '>Gửi từ điểm giao dịch</label>
          <input type="text"
                  placeholder="Điểm giao dịch"
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  value={orderDetails?.senderVillage}
          />
        </div>

        <div className='mb-4'>
          <label className='font-bold'>Đến điểm tập kết</label>
          <input type="text"
                  placeholder="Điểm tập kết"
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  value={orderDetails?.senderDistrict}
          />
        </div>

        <div className='flex justify-center'> 
          <button
            onClick={buttonHandle}
            type="button"
            className="inline-flex items-center bg-blue-400 hover:bg-blue-800 text-white py-2 px-8 shadow-md rounded"
          >
            <FontAwesomeIcon icon={faPrint} className="mr-2" />
            Xác nhận
          </button>
        </div>
        
      </div>
    </div>
    
    
  );
};

export default SendToSenderConsolidation;
