import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faCheck, faCross, faPrint, faTimes } from '@fortawesome/free-solid-svg-icons';
import { orderData, updateOrder } from '../../../features/axios/api/order/createOrder';
import { Status, orderInterface } from '../../../types/OrderInterface';
import { employerData } from '../../../features/axios/api/employer/userDetails';
import { fetchUser, clearUserDetails } from '../../../features/redux/slices/user/userDetailsSlice';
import { employerInterface } from '../../../types/EmployerInterface';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { getTransactionByAddress, updateTransaction } from '../../../features/axios/api/transaction/transactionPointDetails';
import { TransactionInterface } from '../../../types/TransactionInterface';

//************************************
// Description: Phần xác nhận tình trạng đơn.
//************************************

interface PrintButtonProps {
  code: string;
  onClose: () => void;
  onCloseButt: () => void;
}

const token = localStorage.getItem('token');

const ShippingStatus: React.FC<PrintButtonProps> = ({ code, onClose, onCloseButt }) => {
  const [orderDetails, setOrderDetails] = useState<orderInterface>();
  const [employerDetails, setEmployerDetails] = useState<employerInterface>();
  const [isShipping, setIsShipping] = useState<boolean>(true);
  const [note, setNote] = useState<string>('');
  const dispatch = useDispatch();

  const {
    setValue,
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

  const buttonSuccessHandle = async (event: React.MouseEvent<HTMLButtonElement>) => {
    // Access the necessary information from your component's state or props
    if (orderDetails && employerDetails) {
      let status: Status = {
        action: 'Giao hàng thành công',
        fromConsolidation: orderDetails.receiverDistrict,
        fromTransaction: orderDetails.receiverVillage,
        toConsolidation: orderDetails.receiverDistrict,
        toTransaction: orderDetails.receiverVillage,
        date: new Date(),
        staff: employerDetails?.name,
      };

      let statuses: Status[] = orderDetails.status ? orderDetails.status : [];
      statuses.push(status);
      setValue('status', statuses);
      if (orderDetails.receiverDistrict && orderDetails.receiverVillage) {
        const data: TransactionInterface = await getTransactionByAddress(orderDetails.receiverVillage, orderDetails.receiverDistrict);
        if (data && data.quantity !== undefined && data.quantity !== 0) {
          data.quantity = data.quantity - 1;
        } 
        updateTransaction(data);
      }
      setIsShipping(true);
      await updateOrder(orderDetails);
      onClose(); 
    }
  };

  const buttonFailHandle = async (event: React.MouseEvent<HTMLButtonElement>) => {
    // Access the necessary information from your component's state or props
    setIsShipping(false)

  };

  const returnArrow = async (event: React.MouseEvent<HTMLButtonElement>) => {
    // Access the necessary information from your component's state or props
    setIsShipping(true);

  };

  const buttonHandle = async (event: React.MouseEvent<HTMLButtonElement>) => {
    // Access the necessary information from your component's state or props
    if (orderDetails && employerDetails) {
      let status: Status = {
        action: 'Giao hàng không thành công',
        fromConsolidation: employerDetails?.consolidation,
        fromTransaction: employerDetails?.transaction,
        toConsolidation: employerDetails?.consolidation,
        toTransaction: employerDetails?.transaction,
        date: new Date(),
        staff: employerDetails?.name,
        note: note,
        guide: orderDetails.cannotDelivered
      };

      let statuses: Status[] = orderDetails.status ? orderDetails.status : [];
      statuses.push(status);
      setValue('status', statuses);
      await updateOrder(orderDetails);
      onClose(); 
    }
  };

  return (
    <div>
      {/* Grey overlay */}
      <div className="fixed top-0 left-0 w-full h-full bg-gray-700 opacity-10 z-50"></div>

      <div className="min-w-[350px] z-50 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white text-black p-4 rounded shadow-md">
        <div className="fixed top-2 right-2 cursor-pointer text-3xl text-gray-700 hover:text-gray-900">
          <span onClick={onCloseButt}>&times;</span>
        </div>
        

        { !isShipping ? (
        <div>
            <div className="fixed top-2 left-2 cursor-pointer text-gray-700 hover:text-gray-900 mt-2 ml-2">
                <span onClick={returnArrow}><FontAwesomeIcon icon={faArrowLeft} /></span>
            </div>
            <div className='flex justify-center mb-4'>
                <label className='text-[20px] font-bold'>Giao hàng không thành công</label>
            </div>
            <div className='px-8 py-2'>
                <label className='font-bold'>Lý do</label>
                <input type="text"
                        placeholder="Lý do"
                        className="w-[280px] flex px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-red-500"
                        onChange={(e) => setNote(e.target.value)}
                />
            </div>

            <div className='mt-2 px-8 py-2'>
                <label className='font-bold'>Chỉ dẫn</label>
                <input type="text"
                        placeholder="Lý do"
                        className="w-[280px] flex px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-red-500"
                        value={orderDetails?.cannotDelivered}
                />
            </div>

            <div className='flex justify-center px-8 py-2'> 
                <button
                    onClick={buttonHandle}
                    type="button"
                    className="inline-flex items-center bg-red-400 hover:bg-red-800 text-white py-2 px-8 shadow-md rounded"
                >
                    <FontAwesomeIcon icon={faPrint} className="mr-2" />
                    Xác nhận
                </button>
            </div>
        </div> ) : (
        <div>
            <div className='flex justify-center mb-4'>
                <label className='text-[20px] font-bold'>Xác nhận tình trạng</label>
            </div>
            <div className='flex justify-center mb-4'> 
                <button
                    onClick={buttonSuccessHandle}
                    type="button"
                    className="w-[280px] inline-flex items-center bg-green-400 hover:bg-green-800 text-white py-2 px-8 shadow-md rounded"
                >
                    <FontAwesomeIcon icon={faCheck} className="mr-2" />
                    Giao hàng thành công
                </button>
            </div>

            <div className='flex justify-center py-2'> 
                <button
                    onClick={buttonFailHandle}
                    type="button"
                    className="w-[280px] inline-flex items-center bg-red-400 hover:bg-red-800 text-white py-2 px-8 shadow-md rounded"
                >
                    <FontAwesomeIcon icon={faTimes} className="mr-2" />
                    Giao hàng không thành công
                </button>

            </div>  
        </div>)
        }

        
        
      </div>
    </div>
    
  );
};

export default ShippingStatus;
