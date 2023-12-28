import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { Status, orderInterface } from '../../types/OrderInterface';
import { StatisticsOrdersPayload } from '../../types/PayloadInterface';

import { getOrderList } from '../../features/axios/api/order/createOrder';
import OrderTable from './OrderTable';
import SearchFilterBar from './searchFilterBar.tsx/searchFilterBar';

function StaticOrders() {

    const [allOrders, setAllOrders] = useState<orderInterface[]>([]);
    const [filteredOrders, setFilteredOrders] = useState([...allOrders]);


    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await getOrderList();
                if (response) {
                    const { status, allOrders: fetchedOrders } = response;

                    if (status === 'success') {
                        setAllOrders(fetchedOrders);
                        setFilteredOrders(fetchedOrders);
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

    function getLastStatusLocation(order: orderInterface): string | undefined {
        const array: Status[] | undefined = order.status;
        let location: string | undefined = undefined;
        let lastStatus: Status | undefined = undefined;
        if (array && array.length > 0) {
            lastStatus = array[array.length - 1];
            const status = lastStatus.action ?? "";
            if (status.includes("Đang gửi") || status === "Giao hàng thành công" || status === "Giao hàng không thành công") {
                if (lastStatus.fromTransaction === "") {
                    location = "Điểm tập kết: " + lastStatus.fromConsolidation;
                } else {
                    location = "Điểm giao dịch: " + lastStatus.fromTransaction + " - " + lastStatus.fromConsolidation;
                }
            } else if (status.includes("nhận") || status.includes("Nhận")) {
                if (lastStatus.toTransaction === "") {
                    location = "Điểm tập kết: " + lastStatus.toConsolidation;
                } else {
                    location = "Điểm giao dịch: " + lastStatus.toTransaction + " - " + lastStatus.toConsolidation;
                }
            }
        }
        console.log(location);
        return location;
    }

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
                order.receiverDistrict?.toLowerCase().includes(lowercaseQuery) ||
                order.receiverCountry?.toLowerCase().includes(lowercaseQuery) ||
                getLastStatusLocation(order)?.toLowerCase().includes(lowercaseQuery)
        );
        console.log(lowercaseQuery);
        setFilteredOrders(filtered);
    }

    return (
        <div className="relative overflow-hidden bg-background py-24 sm:py-32">
            <div className="min-h-screen bg-background py-8" id="container">
                <div className="mx-[5%] order-1 md:order-2">
                    <h1 className="md:text-[30px] mr-[1%] text-[20px] flex justify-center">Danh sách đơn hàng</h1>
                    <div className="lg:mx-[15%] mt-8">
                        <SearchFilterBar onSearch={handleSearch} />
                    </div>

                    {/* List of items */}
                    <div className="mt-8">
                        <OrderTable allOrders={filteredOrders} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StaticOrders;
export { };