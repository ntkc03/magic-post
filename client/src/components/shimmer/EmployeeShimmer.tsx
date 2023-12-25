import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import SearchFilterBar from "../director/searchFilterBar.tsx/searchFilterBar";
import { Shimmer } from "react-shimmer";
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useState } from "react";

function EmployeeShimmer() {

    const [pageWidth, setPageWidth] = useState(window.innerWidth);
    useEffect(() => {
        // Update page width when the window is resized
        const handleResizeW = () => setPageWidth(window.innerWidth);
        window.addEventListener('resize', handleResizeW);

        // Clean up the event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResizeW);
        };
    }, []);
    function handleSearch(query: string): void {
        throw new Error("Function not implemented.");
    }

    return (<div className="relative overflow-hidden bg-background py-24 sm:py-32 pl-10 pr-10">
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
                        disabled
                    >
                        Xóa
                    </Button>
                    <Button size="small"
                        variant="outlined"
                        startIcon={<AddIcon />}
                    >
                        Thêm
                    </Button>
                </Stack>
            </div>

            <div style={{ height: 500 }}>
                <Paper sx={{ width: '100%' }}>
                    <TableContainer sx={{ maxHeight: 440 }}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    <TableCell />
                                    <TableCell align="center" sx={{ width: 300 }}>
                                        <Typography fontWeight="bold">Tên</Typography>
                                    </TableCell>
                                    <TableCell align="center" sx={{ width: 300 }}>
                                        <Typography fontWeight="bold">Tên đăng nhập</Typography>
                                    </TableCell>
                                    <TableCell align="center" sx={{ width: 300 }}>
                                        <Typography fontWeight="bold">Vai trò</Typography>
                                    </TableCell>
                                    <TableCell align="center" sx={{ width: 250 }}>
                                        <Typography fontWeight="bold">Số điện thoại</Typography>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                        </Table>
                        <TableBody>
                            <Shimmer height={440} width={pageWidth} />
                        </TableBody>
                    </TableContainer>
                </Paper>
            </div>
        </div >
    </div >
    )
}

export default EmployeeShimmer;