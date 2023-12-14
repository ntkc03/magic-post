import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../features/redux/reducers/Reducer';
import { useEffect, useState } from 'react';
import { fetchAllConsolidations } from '../../features/redux/slices/user/allConsolidationSlice';
import { StatisticsPointsPayload } from '../../types/PayloadInterface';
import { allConsolidationsData } from '../../features/axios/api/consolidation/consolidationPointDetails';
import { ConsolidationInterface } from '../../types/ConsolidationInterface';
import { TransactionInterface } from '../../types/TransactionInterface';
import { allTransactionsData, getTransactionsByConsolidation } from '../../features/axios/api/transaction/transactionPointDetails';
import StatisticsPointShimmer from '../shimmer/StatisticsPointShimmer';
import { fetchAllTransactions } from '../../features/redux/slices/user/allTransactionSlide';

function StaticPoints() {
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const [statisticsList, setStatisticsList] = useState<StatisticsPointsPayload[]>();

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    const consState = useSelector((state: RootState) => state.allConsolidation.status);
    const transState = useSelector((state: RootState) => state.allTransaction.status);
    const consError = useSelector((state: RootState) => state.allConsolidation.error);
    const transError = useSelector((state: RootState) => state.allTransaction.error);
    useEffect(() => {
        dispatch(fetchAllConsolidations());
        dispatch(fetchAllTransactions());
        const getPoints = async () => {
            const result: StatisticsPointsPayload[] = [];
            const consolidations: ConsolidationInterface[] = await allConsolidationsData();
            for (const consolidation of consolidations) {
                const address = consolidation.address;
                if (address !== undefined) {
                    const transactions: TransactionInterface[] = await getTransactionsByConsolidation(address);
                    result.push({ consolidation, transactions });
                    setStatisticsList(result);
                }
            }
        }
        getPoints();
    }, [dispatch]);

    const totalCount = statisticsList ? statisticsList.length : 0;



    if (consState === "loading" || transState === "loading") {
        return (
            <div>
                <StatisticsPointShimmer />
            </div>
        )
    }

    if (consState === "failed") {
        return <div>Error: {consError}</div>;
    }

    if (transState === "failed") {
        return <div>Error: {transError}</div>;
    }


    return (
        <div className="relative overflow-hidden bg-background py-24 sm:py-32 pl-10 pr-10">
            <div className='pl-1 pb-4'>
                <text className='text-2xl'>Các điểm tập kết: </text>
            </div>
            <div className="items-center justify-center bg-background text-center text-textColor">
                <Paper sx={{ width: '100%' }}>
                    <TableContainer sx={{ maxHeight: 440 }}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    <TableCell />
                                    <TableCell>
                                        <Typography fontWeight="bold">Điểm tập kết</Typography>
                                    </TableCell>
                                    <TableCell align="left">
                                        <Typography fontWeight="bold">Tỉnh/Thành phố</Typography>
                                    </TableCell>
                                    <TableCell align="left">
                                        <Typography fontWeight="bold">Quốc gia</Typography>
                                    </TableCell>
                                    <TableCell align="left">
                                        <Typography fontWeight="bold">Trưởng điểm tập kết</Typography>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Typography fontWeight="bold">Tổng đơn hàng</Typography>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {statisticsList?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                                    <Row key={row.consolidation.address} row={row} />
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={totalCount}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </div>
        </div>
    );
}



function Row(props: { row: StatisticsPointsPayload }) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);

    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.consolidation.address}
                </TableCell>
                <TableCell align="left">{row.consolidation.city}</TableCell>
                <TableCell align="left">{row.consolidation.country}</TableCell>
                <TableCell align="left">{row.consolidation.manager}</TableCell>
                <TableCell align="right">0</TableCell>

            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Các điểm giao dịch
                            </Typography>
                            <Table size="small" stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>
                                            <span style={{ fontWeight: 'bold' }}>Điểm giao dịch</span>
                                        </TableCell>
                                        <TableCell align="left">
                                            <span style={{ fontWeight: 'bold' }}>Trưởng điểm giao dịch</span>
                                        </TableCell>
                                        <TableCell align="right">
                                            <span style={{ fontWeight: 'bold' }}>Số nhân viên</span>
                                        </TableCell>
                                        <TableCell align="right">
                                            <span style={{ fontWeight: 'bold' }}>Tổng đơn hàng</span>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.transactions.map((transaction) => (
                                        <TableRow key={transaction.address}>
                                            <TableCell component="th" scope="row" >
                                                {transaction.address}
                                            </TableCell>
                                            <TableCell align="left">{transaction.manager}</TableCell>
                                            <TableCell align="right">0</TableCell>
                                            <TableCell align="right">0</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

export default StaticPoints;
export { };