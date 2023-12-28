import { useDispatch } from "react-redux";
import { employerInterface } from "../../types/EmployerInterface";
import { useEffect, useState } from "react";
import { clearUserDetails, fetchUser } from "../../features/redux/slices/user/userDetailsSlice";
import { employerData } from "../../features/axios/api/employer/userDetails";
import React from "react";
import { orderInterface } from "../../types/OrderInterface";
import { getOrderList } from "../../features/axios/api/order/createOrder";
import SearchFilterBar from "../director/searchFilterBar.tsx/searchFilterBar";
import OrderTable from "./OrderTable";

const token = localStorage.getItem("token");

export default function StaticOrders() {
    const dispatch = useDispatch();
    const [employerDetails, setEmployerDetails] = useState<employerInterface>();

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

    const [allOrders, setAllOrders] = React.useState<orderInterface[]>([]);
    const [selectedMonth, setSelectedMonth] = useState<string>("");
    const [selectedYear, setSelectedYear] = useState<string>("");

    React.useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await getOrderList();
                if (response) {
                    const { status, allOrders: fetchedOrders } = response;

                    if (status === 'success') {
                        let orders: orderInterface[] = fetchedOrders;
                        let filterOrders: orderInterface[] = [];
                        for (let i = 0; i < orders.length; i++) {
                            let checkDuplicate = 0;
                            if (orders[i]?.status) {
                                orders[i].status?.map((status) => {
                                    if ((employerDetails?.consolidation === status.fromConsolidation && employerDetails?.transaction === status.fromTransaction)
                                        || (employerDetails?.consolidation === status.toConsolidation && employerDetails?.transaction === status.toTransaction)) {
                                        if (checkDuplicate == 0) {
                                            filterOrders.push(orders[i]);
                                            checkDuplicate = 1;
                                        }
                                        return;
                                    }

                                })
                            }
                        }

                        if (selectedMonth && selectedYear) {
                            filterOrders = filterOrders.filter((order) => {
                                let orderDate = new Date();
                                if (order.create_at) {
                                    orderDate = new Date(order.create_at);
                                }
                                const orderMonth = orderDate.getMonth() + 1;
                                const orderYear = orderDate.getFullYear();
                                console.log(orderMonth.toString().padStart(2, "0"), orderYear.toString())
                                return (
                                    orderMonth.toString().padStart(2, "0") === selectedMonth &&
                                    orderYear.toString() === selectedYear
                                );
                            });
                        }

                        setAllOrders(filterOrders);
                        setFilteredOrders(filterOrders);
                    } else {
                        console.error('Error: Unexpected response status');
                    }
                } else {
                    console.error('Error: Response data is undefined');
                }
            } catch (error: any) {
                console.error('Error fetching orders:', error.message);
            }
        };

        fetchOrders();
    }, [employerDetails, selectedMonth, selectedYear]);

    const [filteredOrders, setFilteredOrders] = useState([...allOrders]);

    const handleSearch = (query: string) => {
        if (query === '') {
            setFilteredOrders(allOrders);
            return;
        }
        const lowercaseQuery = query.toLowerCase();
        // Filter orders based on the search query
        const filtered = allOrders.filter(
            (order) =>
                order.code?.toLowerCase().includes(lowercaseQuery) ||
                order.senderVillage?.toLowerCase().includes(lowercaseQuery) ||
                order.senderDistrict?.toLowerCase().includes(lowercaseQuery) ||
                order.senderCountry?.toLowerCase().includes(lowercaseQuery) ||
                order.receiverVillage?.toLowerCase().includes(lowercaseQuery) ||
                order.receiverDistrict?.toLowerCase().includes(lowercaseQuery)

        );
        console.log(lowercaseQuery);
        setFilteredOrders(filtered);
    }



    return (
        <div className="relative overflow-hidden bg-background py-24 sm:py-32 pl-10 pr-10">
            <div className="items-center justify-center bg-background text-center text-textColor">
                <div className="flex justify-end mb-8">
                    <select
                        value={selectedMonth}
                        onChange={(e) => {
                            setSelectedMonth(e.target.value);
                        }}
                        className="p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-green-500"
                    >
                        <option value="" hidden>Chọn tháng</option>
                        <option value="01">Tháng 1</option>
                        <option value="02">Tháng 2</option>
                        <option value="03">Tháng 3</option>
                        <option value="04">Tháng 4</option>
                        <option value="05">Tháng 5</option>
                        <option value="06">Tháng 6</option>
                        <option value="07">Tháng 7</option>
                        <option value="08">Tháng 8</option>
                        <option value="09">Tháng 9</option>
                        <option value="10">Tháng 10</option>
                        <option value="11">Tháng 11</option>
                        <option value="12">Tháng 12</option>
                    </select>

                    <select
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(e.target.value)}
                        className="p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-green-500 ml-2"
                    >
                        <option value="" hidden>
                            Chọn năm
                        </option>
                        <option value="2020">2020</option>
                        <option value="2021">2021</option>
                        <option value="2022">2022</option>
                        <option value="2023">2023</option>
                        <option value="2024">2024</option>
                    </select>
                </div>
                <div className="mx-[5%] order-1 md:order-2">
                    <h1 className="md:text-[30px] mr-[1%] text-[20px] flex justify-center">Danh sách đơn hàng</h1>
                    <div className="text-base pt-5 pb-5">
                        {employerDetails?.transaction !== "" && (
                            <span>Điểm giao dịch: {employerDetails?.transaction} - Khu vực: {employerDetails?.consolidation}</span>
                        )}
                        {employerDetails?.transaction === "" && (
                            <span>Điểm tập kết: {employerDetails?.consolidation}</span>
                        )}
                    </div>
                    <div className="lg:mx-[15%] mt-8">
                        <SearchFilterBar onSearch={handleSearch} />
                    </div>

                    {/* List of items */}
                    <div className="mt-8">
                        <OrderTable allOrders={filteredOrders} consolidation={employerDetails?.consolidation ?? ''} transaction={employerDetails?.transaction ?? ''} />
                    </div>
                </div>

            </div>
        </div>
    );

}