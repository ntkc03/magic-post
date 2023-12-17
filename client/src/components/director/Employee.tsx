import { useEffect, useState } from "react";
import { employerInterface } from "../../types/EmployerInterface";
import { useDispatch } from "react-redux";
import { fetchAllEmployers } from "../../features/redux/slices/user/allEmployersSlide";
import { allEmployersData } from "../../features/axios/api/employer/EmployersDetail";
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import AddIcon from '@mui/icons-material/Add';

export function Employee() {
    const dispatch = useDispatch();
    const [allEmployers, setAllEmployers] = useState<employerInterface[]>();

    let rows: employerInterface[] = [];
    if (allEmployers) {
        // Use allEmployers if it's defined
        rows = allEmployers;/* logic to convert allEmployers to GridValidRowModel */;
    }



    useEffect(() => {
        dispatch(fetchAllEmployers);
        const getAllEmployersData = async () => {
            const allEmployers: employerInterface[] = await allEmployersData();
            setAllEmployers(allEmployers);
        }
        getAllEmployersData();
    }, []);


    return (
        <div className="relative overflow-hidden bg-background py-24 sm:py-32 pl-10 pr-10">
            <div className="items-center justify-center bg-background text-center text-textColor">
                <div className='pl-1 pb-4 text-center' >
                    <text className='text-2xl'>Danh sách Nhân viên</text>
                </div>
                <div className="pb-3 flex justify-end">
                    <Stack direction="row" spacing={2}>
                        <Button size="small" variant="outlined" startIcon={<DeleteIcon />} disabled>
                            Xóa
                        </Button>
                        <Button size="small" variant="outlined" startIcon={<AddIcon />}>
                            Thêm
                        </Button>
                    </Stack>
                </div>

                <div style={{ height: 500}}>
                    <Paper sx={{ width: '100%' }}>
                        <DataGrid
                            getRowId={(row) => row.username}
                            rows={rows}
                            columns={[
                                { field: 'name', headerName: 'Tên', width: 210 },
                                { field: 'username', headerName: 'Tên đăng nhập', width: 200 },
                                { field: 'role', headerName: 'Vai trò', width: 200 },
                                { field: 'phone', headerName: 'Số điện thoại', width: 200 },
                                { field: 'transaction', headerName: 'Điểm giao dịch', width: 200 },
                                { field: 'consolidation', headerName: 'Điểm tập kết', width: 200 },
                            ]}
                            initialState={{
                                pagination: {
                                    paginationModel: { page: 0, pageSize: 5 },
                                },
                            }}
                            pageSizeOptions={[5, 10]}
                            checkboxSelection
                        />
                    </Paper>
                </div>

            </div >
        </div >
    );

}




export default Employee;
export { };