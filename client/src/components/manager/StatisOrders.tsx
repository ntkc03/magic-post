import { useEffect, useState } from 'react';
import { Status, orderInterface } from '../../types/OrderInterface';

import { getOrderList } from '../../features/axios/api/order/createOrder';
import SearchFilterBar from '../director/searchFilterBar.tsx/searchFilterBar';
import { employerInterface } from '../../types/EmployerInterface';
import { employerData } from '../../features/axios/api/employer/userDetails';

function StaticOrders() {

    const [allOrders, setAllOrders] = useState<orderInterface[]>([]);
    const [filteredOrders, setFilteredOrders] = useState([...allOrders]);
    const [employerDetails, setEmployerDetails] = useState<employerInterface>();

    const token = localStorage.getItem("token");



    useEffect(() => {
        if (token) {
            const fetchUser = async () => {
                const data = await employerData();
                setEmployerDetails(data);
            }
            const fetchOrders = async () => {
                try {
                    const response = await getOrderList();
                    if (response) {
                        const { status, allOrders: fetchedOrders } = response;

                        if (status === 'success') {
                            if (employerDetails) {
                                const orders = allOrders.filter((order) => {
                                    order.status?.map((status) => {
                                        if (status.consolidation === employerDetails.consolidation &&
                                            status.transaction === employerDetails.transaction) { return order; }
                                    })
                                })
                                setAllOrders(orders);
                                setFilteredOrders(orders);
                            }

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
            fetchUser();
            fetchOrders();
        }
    }, []);

    function getLastStatus(order: orderInterface): Status | undefined {
        const array: Status[] | undefined = order.status;
        let lastStatus: Status | undefined = undefined;
        if (array && array.length > 0) {
            lastStatus = array[array.length - 1];
        }
        return lastStatus;
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
                getLastStatus(order)?.consolidation?.toLowerCase().includes(lowercaseQuery) ||
                getLastStatus(order)?.transaction?.toLowerCase().includes(lowercaseQuery)
        );
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
                        {/* <OrderTable allOrders={filteredOrders} /> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StaticOrders;
export { };