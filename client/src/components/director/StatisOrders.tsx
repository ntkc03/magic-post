import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { orderInterface } from '../../types/OrderInterface';
import { StatisticsOrdersPayload } from '../../types/PayloadInterface';
import OrderTable from '../order/list/orderTable';
import { getOrderList } from '../../features/axios/api/order/createOrder';
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



    return (
        <div className="relative overflow-hidden bg-background py-24 sm:py-32">
            <div className="min-h-screen bg-background py-8" id="container">
                <div className="mx-[5%] order-1 md:order-2">
                    <h1 className="md:text-[30px] mr-[1%] text-[20px] flex justify-center">Danh sách đơn hàng</h1>
                    

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