import React, { useState } from "react";
import { orderInterface } from "../../types/OrderInterface";
import { getOrderList } from "../../features/axios/api/order/createOrder";
import SearchFilterBar from "./searchFilterBar.tsx/searchFilterBar";
import OrderTable from "../manager/OrderTable";

interface PointDetailsProps {
    transaction: string,
    consolidation: string
}


const PointDetails: React.FC<PointDetailsProps> = ({ consolidation, transaction }) => {


    const [allOrders, setAllOrders] = React.useState<orderInterface[]>([]);


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
                            let checkDuplicate = 0; //xử lí dữ liệu bị trùng
                            if (orders[i]?.status) {
                                orders[i].status?.map((status) => {
                                    if ((consolidation === status.fromConsolidation && transaction === status.fromTransaction)
                                        || (consolidation === status.toConsolidation && transaction === status.toTransaction)) {
                                        if (checkDuplicate == 0) {
                                            filterOrders.push(orders[i]);
                                            checkDuplicate = 1;
                                        }
                                        return;
                                    }

                                })
                            }
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
    }, []);

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
                <div className="mx-[5%] order-1 md:order-2">
                    <h1 className="md:text-[30px] mr-[1%] text-[20px] flex justify-center">Danh sách đơn hàng</h1>
                    <div className="text-base pt-5 pb-5">
                        {transaction !== "" && (
                            <span>Điểm giao dịch: {transaction} - Khu vực: {consolidation}</span>
                        )}
                        {transaction === "" && (
                            <span>Điểm tập kết: {consolidation}</span>
                        )}
                    </div>
                    <div className="lg:mx-[15%] mt-8">
                        <SearchFilterBar onSearch={handleSearch} />
                    </div>

                    {/* List of items */}
                    <div className="mt-8">
                        <OrderTable allOrders={filteredOrders} consolidation={consolidation ?? ''} transaction={transaction ?? ''} />
                    </div>
                </div>

            </div>
        </div>
    );

}

export default PointDetails;