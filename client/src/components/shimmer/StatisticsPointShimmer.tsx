import React, { useEffect, useState } from "react";
import { Shimmer } from "react-shimmer";
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import TableBody from '@mui/material/TableBody';
import TablePagination from '@mui/material/TablePagination';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';


function StatisticsPointShimmer() {

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
  return (

    <div className="relative overflow-hidden bg-background py-24 sm:py-32 pl-10 pr-10">
      <div className='pl-1 pb-4 text-center' >
        <text className='text-2xl'>Danh sách các điểm tập kết</text>
      </div>
      <Box component={Paper}>
        <div className='float-left pr-4 mt-3'>
          <Stack direction="row" spacing={3} sx={{ width: "100%"}} style={{ paddingLeft: 80 }}>
            <TextField id="city"
              variant="standard"
              label="Tỉnh/Thành phố"
              />
            <TextField id="consolidation"
              variant="standard"
              label="Điểm tập kết"
               />
            <TextField id="transaction"
              variant="standard"
              label="Điểm tập kết"
               />
          </Stack>
        </div>
        <div className="items-center justify-center bg-background text-center text-textColor">
          <Paper sx={{ width: '100%' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell />
                    <TableCell align="center" sx={{ width: 190 }}>
                      <Typography fontWeight="bold">Tỉnh/Thành phố</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography fontWeight="bold">Điểm tập kết</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography fontWeight="bold">Quốc gia</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography fontWeight="bold">Trưởng điểm tập kết</Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography fontWeight="bold">Tổng đơn hàng</Typography>
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

      </Box>
    </div>
  );
}

export default StatisticsPointShimmer;
