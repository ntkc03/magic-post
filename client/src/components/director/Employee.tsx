import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { employerInterface } from "../../types/EmployerInterface";
import { useDispatch } from "react-redux";
import { fetchAllEmployers } from "../../features/redux/slices/user/allEmployersSlide";
import { allEmployersData } from "../../features/axios/api/employer/EmployersDetail";
import { DataGrid, GridRowSelectionModel } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import AddIcon from '@mui/icons-material/Add';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { deleteEmployer } from "../../features/axios/api/employer/userDetails";
import ConfirmDelete from "./ConfirmDelete";
import SearchFilterBar from "./searchFilterBar.tsx/searchFilterBar";
import EmployeeShimmer from "../shimmer/EmployeeShimmer";

export function Employee() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [allEmployers, setAllEmployers] = useState<employerInterface[]>([]);
    const [rowSelectionModel, setRowSelectionModel] = useState<GridRowSelectionModel>([]);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [filteredEmployers, setFilteredEmployers] = useState([...allEmployers]);
    const [loading, setLoading] = useState(true);



    let rows: employerInterface[] = [];
    if (filteredEmployers) {
        // Use allEmployers if it's defined
        rows = filteredEmployers;/* logic to convert allEmployers to GridValidRowModel */;
    }

    const handleSearch = (query: string) => {
        if (query === '') {
            setFilteredEmployers(allEmployers);
            return;
        }
        const lowercaseQuery = query.toLowerCase();
        // Filter employers based on the search query
        const filtered = allEmployers.filter(
            (employer) =>
                employer.name?.toLowerCase().includes(lowercaseQuery) ||
                employer.username?.toLowerCase().includes(lowercaseQuery) ||
                employer.role?.toLowerCase().includes(lowercaseQuery) ||
                employer.phone?.toLowerCase().includes(lowercaseQuery) ||
                employer.transaction?.toLowerCase().includes(lowercaseQuery) ||
                employer.consolidation?.toLowerCase().includes(lowercaseQuery)
        );
        setFilteredEmployers(filtered);
    };



    useEffect(() => {
        dispatch(fetchAllEmployers);
        const getAllEmployersData = async () => {
            const allEmployers: employerInterface[] = await allEmployersData();
            setAllEmployers(allEmployers);
            setFilteredEmployers(allEmployers);
            setLoading(false);
        }
        getAllEmployersData();
    }, []);

    const deleteEmployerAction = () => {
        rowSelectionModel.map((selected) => {
            let employer: employerInterface | undefined = allEmployers?.find((employer) => employer.username === selected);
            const updatedEmployers: employerInterface[] | undefined = allEmployers?.filter((employer) => employer.username !== selected);
            if (employer) {
                try {
                    deleteEmployer(employer?.username);
                    setTimeout(() => {
                        setAllEmployers(updatedEmployers);
                        setFilteredEmployers(updatedEmployers);
                        setLoading(false);
                    }, 1500);
                } catch (error: any) {
                    notify(error.message, "error");
                }
            }
        })
    }

    const deleteHandle = () => {

        setShowDeleteConfirmation(true);
        console.log(showDeleteConfirmation);
    }

    const addHandle = () => {
        navigate("/director/create-account");
    }

    if (loading === true) {
        return (
            <div>
                <EmployeeShimmer />
            </div>
        )
    }

    const notify = (msg: string, type: string) =>
        type === "error"
            ? toast.error(msg, { position: toast.POSITION.TOP_RIGHT })
            : toast.success(msg, { position: toast.POSITION.TOP_RIGHT });

    return (
        <div className="relative overflow-hidden bg-background py-24 sm:py-32 pl-10 pr-10">
            <div className="items-center justify-center bg-background text-center text-textColor">
                <div className='pl-1 pb-4 text-center' >
                    <text className='text-3xl'>Danh sách Nhân viên</text>
                </div>
                <div className="lg:mx-[15%] mt-8">
                    <SearchFilterBar onSearch={handleSearch} />
                </div>
                <div className="pb-3 flex justify-end">
                    <Stack direction="row" spacing={2}>
                        {/* <Button size="small"
                            variant="outlined"
                            startIcon={<EditIcon />}
                            disabled={rowSelectionModel.length !== 1}
                        >
                            Chỉnh sửa
                        </Button> */}
                        <Button size="small"
                            variant="outlined"
                            startIcon={<DeleteIcon />}
                            disabled={rowSelectionModel.length === 0}
                            onClick={deleteHandle}>
                            Xóa
                        </Button>
                        <Button size="small"
                            variant="outlined"
                            startIcon={<AddIcon />}
                            onClick={addHandle}>
                            Thêm
                        </Button>
                    </Stack>
                </div>

                <div style={{ height: 500 }}>
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
                            onRowSelectionModelChange={(newRowSelectionModel) => {
                                setRowSelectionModel(newRowSelectionModel);
                            }}
                            rowSelectionModel={rowSelectionModel}

                        />
                    </Paper>
                </div>

            </div >
            {showDeleteConfirmation && (
                <ConfirmDelete
                    isOpen={showDeleteConfirmation}
                    onClose={() => setShowDeleteConfirmation(false)}
                    onConfirm={() => deleteEmployerAction()}
                />
            )}
            <ToastContainer />
        </div >

    );

}




export default Employee;
export { };