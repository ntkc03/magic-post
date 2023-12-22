import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { orderInterface } from '../../types/OrderInterface';
import { StatisticsOrdersPayload } from '../../types/PayloadInterface';
function StaticOrders() {
    const [allOrders, setAllOrders] = useState<orderInterface[]>();
    const [statisticsOrders, setStatisticsOrders] = useState<StatisticsOrdersPayload[]>();


    useEffect(()=> {

    },[]);


    let rows: orderInterface[] = [];
    if (allOrders) {
        // Use allEmployers if it's defined
        rows = allOrders;/* logic to convert allEmployers to GridValidRowModel */;
    }

    return (
        <div className="relative overflow-hidden bg-background py-24 sm:py-32">
            <div className="items-center justify-center bg-background text-center text-textColor">
                <div className='pl-1 pb-4 text-center' >
                    <text className='text-2xl'>Thống kê các đơn hàng</text>
                </div>
                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={rows}
                        columns={[
                            { field: 'code', headerName: 'Mã vận đơn', width: 210 },
                            { field: 'address', headerName: 'Vị trí đơn hàng', width: 200 },
                            { field: 'senderAddress', headerName: 'Địa chỉ người gửi', width: 200 },
                            { field: 'receiverAddress', headerName: 'Địa chỉ người nhận', width: 200 },
                            { field: 'created_at', headerName: 'Thời gian nhận đơn', width: 200 },
                            { field: 'sended_at', headerName: 'Thời gian gửi đơn', width: 200 },
                            { field: 'status', headerName: 'Trạng thái đơn hàng', width: 200 },
                        ]}
                        initialState={{
                            pagination: {
                                paginationModel: { page: 0, pageSize: 5 },
                            },
                        }}
                        pageSizeOptions={[5, 10]}
                        checkboxSelection
                    />
                </div>
            </div>
        </div>
    )
}

export default StaticOrders;
export { };