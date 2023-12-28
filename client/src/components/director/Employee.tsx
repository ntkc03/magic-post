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
import { deleteEmployer, employerData } from "../../features/axios/api/employer/userDetails";
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
    const [employerDetails, setEmployerDetails] = useState<employerInterface>();
    const token = localStorage.getItem("token");




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
        if (token) {
            const fetchEmployerDetails = async () => {
                try {
                    const data = await employerData();
                    setEmployerDetails(data);
                } catch (error: any) {
                    notify(error.message, "error");
                }
            };
            fetchEmployerDetails();
        }
        const getAllEmployersData = async () => {
            const allEmployers: employerInterface[] = await allEmployersData();
            setAllEmployers(allEmployers);
            setFilteredEmployers(allEmployers);
            setLoading(false);
        }
        getAllEmployersData();
    }, []);

    const deleteEmployerAction = () => {
        for (const selected of rowSelectionModel) {
            let employers: employerInterface | undefined = allEmployers?.find((employer) => employer.username === selected);
            const updatedEmployers: employerInterface[] | undefined = allEmployers?.filter((employer) => employer.username !== selected);
            if (employers) {
                try {
                    deleteEmployer(employers?.username);
                    setTimeout(() => {
                        setAllEmployers(updatedEmployers);
                        setFilteredEmployers(updatedEmployers);
                        setLoading(false);
                    }, 1500);
                } catch (error: any) {
                    notify(error.message, "error");
                }
            }
        }
    }

    const deleteHandle = () => {

        setShowDeleteConfirmation(true);
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
                <div className="focus lg:mx-[15%] mt-8">
                    <SearchFilterBar onSearch={handleSearch} />
                </div>
                <div className="pb-3 flex justify-end">
                    <Stack direction="row" spacing={2}>
                        <Button size="small"
                            variant="outlined"
                            startIcon={<DeleteIcon />}
                            disabled={
                                rowSelectionModel.length === 0 ||
                                (!!employerDetails?.username && 
                                    rowSelectionModel.includes(employerDetails.username))
                              }
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
                                { field: 'name', width: 210, renderHeader: () => (<strong>Tên</strong>) },
                                { field: 'username', width: 200, renderHeader: () => (<strong>Tên đăng nhập</strong>) },
                                { field: 'role', width: 200, renderHeader: () => (<strong>Vai trò</strong>) },
                                { field: 'phone', width: 200, renderHeader: () => (<strong>Số điện thoại</strong>) },
                                { field: 'consolidation', width: 200, renderHeader: () => (<strong>Điểm tập kết</strong>) },
                                { field: 'transaction', width: 200, renderHeader: () => (<strong>Điểm giao dịch</strong>) },

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