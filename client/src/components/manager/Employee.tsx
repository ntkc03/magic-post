import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { employerInterface } from "../../types/EmployerInterface";
import { useDispatch } from "react-redux";
import { fetchAllEmployers } from "../../features/redux/slices/user/allEmployersSlide";
import { allEmployersData, getEmployersByCons } from "../../features/axios/api/employer/EmployersDetail";
import { DataGrid, GridRowSelectionModel } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import AddIcon from '@mui/icons-material/Add';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { deleteEmployer, employerData } from "../../features/axios/api/employer/userDetails";
import ConfirmDelete from "../director/ConfirmDelete";
import SearchFilterBar from "../director/searchFilterBar.tsx/searchFilterBar";
import EmployeeShimmer from "../shimmer/EmployeeShimmer";



export function Employee() {
    const navigate = useNavigate();
    const [allEmployers, setAllEmployers] = useState<employerInterface[]>([]);
    const [rowSelectionModel, setRowSelectionModel] = useState<GridRowSelectionModel>([]);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [filteredEmployers, setFilteredEmployers] = useState([...allEmployers]);
    const [employerDetails, setEmployerDetails] = useState<employerInterface>();
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
                employer.phone?.toLowerCase().includes(lowercaseQuery)
        );
        setFilteredEmployers(filtered);
    };
    const token = localStorage.getItem("token");


    useEffect(() => {
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

    }, []);

    useEffect(() => {
        if (employerDetails) {
            const getAllEmployersData = async () => {
                const allEmployers: employerInterface[] = await allEmployersData();
                const data: employerInterface[] = allEmployers.filter((employer) => {
                    return employerDetails.consolidation === employer.consolidation &&
                        employerDetails.transaction === employer.transaction;
                })
                setAllEmployers(data);
                setFilteredEmployers(data);
            }
            getAllEmployersData();
            setLoading(false);
        }
    }, [employerDetails]);

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
        navigate("/manager/create-account");
    }


    const notify = (msg: string, type: string) =>
        type === "error"
            ? toast.error(msg, { position: toast.POSITION.TOP_RIGHT })
            : toast.success(msg, { position: toast.POSITION.TOP_RIGHT });

    if (loading === true) {
        return (
            <div>
                <EmployeeShimmer />
            </div>
        )
    }

    return (
        <div className="relative overflow-hidden bg-background py-24 sm:py-32 pl-10 pr-10">
            <div className="items-center justify-center bg-background text-center text-textColor">
                <div className='pl-1 pb-4 text-center' >
                    <text className='text-3xl'>Danh sách Nhân viên</text>
                </div>
                <div className="lg:mx-[15%] mt-8">
                    <SearchFilterBar onSearch={handleSearch} />
                </div>
                <div className="text-base pt-5 pb-5">
                    {employerDetails?.transaction !== "" && (
                        <span>Điểm giao dịch: {employerDetails?.transaction} - Khu vực: {employerDetails?.consolidation}</span>
                    )}
                    {employerDetails?.transaction === "" && (
                        <span>Điểm tập kết: {employerDetails?.consolidation}</span>
                    )}
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
                                { field: 'name', headerName: 'Tên', maxWidth: 600, minWidth: 200, width: 300 },
                                { field: 'username', headerName: 'Tên đăng nhập', maxWidth: 600, minWidth: 200, width: 300 },
                                { field: 'role', headerName: 'Vai trò', maxWidth: 600, minWidth: 200, width: 300 },
                                { field: 'phone', headerName: 'Số điện thoại', maxWidth: 600, minWidth: 200, width: 250 },
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