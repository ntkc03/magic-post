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
import { RootState } from '../../features/redux/reducers/Reducer';
import { useEffect, useState } from 'react';
import { fetchAllConsolidations } from '../../features/redux/slices/user/allConsolidationSlice';
import { StatisticsPointsPayload } from '../../types/PayloadInterface';
import { allConsolidationsData } from '../../features/axios/api/consolidation/consolidationPointDetails';
import { ConsolidationInterface } from '../../types/ConsolidationInterface';
import { TransactionInterface } from '../../types/TransactionInterface';
import { allTransactionsData } from '../../features/axios/api/transaction/transactionPointDetails';
import StatisticsPointShimmer from '../shimmer/StatisticsPointShimmer';
import { fetchAllTransactions } from '../../features/redux/slices/user/allTransactionSlide';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';


function StaticPoints() {
    const dispatch = useDispatch();

    const [allList, setAllList] = useState<StatisticsPointsPayload[]>();
    const [statisticsList, setStatisticsList] = useState<StatisticsPointsPayload[]>();
    const [loading, setLoading] = useState(true);

    const [consolidationSearch, setConsolidationSearch] = useState<string>('');
    const [transactionSearch, setTransactionSearch] = useState<string>('');
    const [citySearch, setCitySearch] = useState<string>('');


    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        // Kiểm tra ID của trường nhập để xác định là trường nào đang thay đổi
        if (event.target.id === 'consolidation') {
            setConsolidationSearch(event.target.value);
        } else if (event.target.id === 'city') {
            setCitySearch(event.target.value);
        } else if (event.target.id === 'transaction') {
            setTransactionSearch(event.target.value);
        }
    };

    const filterByCity = () => {
        if (citySearch !== "") {
            let list = allList?.filter((result: StatisticsPointsPayload) =>
                result?.consolidation?.city?.toLowerCase().includes(citySearch.toLowerCase())
            )
            if (list) {
                setStatisticsList(list)
            } else {
                setStatisticsList(allList)
            }
        } else {
            setStatisticsList(allList)
        }
    }

    const filterByCons = () => {
        if (consolidationSearch !== "") {
            if (statisticsList) {
                let list = statisticsList?.filter((result: StatisticsPointsPayload) =>
                    result?.consolidation?.address?.toLowerCase().includes(consolidationSearch.toLowerCase())
                )
                if (list?.length != 0) {
                    setStatisticsList(list);
                } else {
                    filterByCity();
                }
            } else {
                filterByCity();
            }
        } else {
            filterByCity();
        }
    }

    const filterByTrans = () => {
        if (transactionSearch !== "") {
            if (statisticsList) {
                const list: StatisticsPointsPayload[] = [];
                for (const item of statisticsList) {
                    const transactions = item.transactions.filter((result: TransactionInterface) =>
                        result?.address?.toLowerCase().includes(transactionSearch.toLowerCase())
                    )
                    if (transactions.length !== 0) {
                        const consolidation = item.consolidation;
                        list.push({ consolidation: consolidation, transactions: transactions });
                    }
                }

                if (list.length !== 0) {
                    setStatisticsList(list);
                } else {
                    filterByCity();
                    filterByCons();
                }
            } else {
                filterByCity();
                filterByCons();
            }
        } else {
            filterByCity();
            filterByCons();
        }
    }

    useEffect(() => {
        filterByCity();
    }, [citySearch])

    useEffect(() => {
        filterByCons();
    }, [consolidationSearch])

    useEffect(() => {
        filterByTrans();
    }, [transactionSearch])

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
            const allTransaction: TransactionInterface[] = await allTransactionsData();
            for (const consolidation of consolidations) {
                const address = consolidation.address;
                if (address !== undefined) {
                    const transactions: TransactionInterface[] = await allTransaction.filter((result: TransactionInterface) =>
                        result.consolidation?.includes(address))
                    result.push({ consolidation, transactions });
                    setAllList(result);
                    setStatisticsList(result);
                    setLoading(false);
                }
            }
        }
        getPoints();
    }, []);

    const totalCount = statisticsList ? statisticsList.length : 0;



    if (consState === "loading" || transState === "loading" || loading === true) {
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
            <div className='pl-1 pb-4 text-center' >
                <text className='text-3xl'>Danh sách các điểm tập kết</text>
            </div>
            <Box component={Paper}>
                <div className='float-left pr-4 mt-3'>
                    <Stack direction="row" spacing={3} sx={{ width: "100%" }} style={{ paddingLeft: 80 }}>
                        <TextField id="city"
                            variant="standard"
                            label="Tỉnh/Thành phố"
                            onChange={handleInputChange} />
                        <TextField id="consolidation"
                            variant="standard"
                            label="Điểm tập kết"
                            onChange={handleInputChange} />
                        <TextField id="transaction"
                            variant="standard"
                            label="Điểm giao dịch"
                            onChange={handleInputChange} />
                    </Stack>

                </div>
                <div className="items-center justify-center bg-background text-center text-textColor">
                    <Paper sx={{ width: '100%' }}>
                        <TableContainer sx={{ maxHeight: 440 }}>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell />
                                        <TableCell sx={{ width: '20%' }} align="left">
                                            <Typography fontWeight="bold">Tỉnh/Thành phố</Typography>
                                        </TableCell>
                                        <TableCell sx={{ width: '20%' }} align="left">
                                            <Typography fontWeight="bold">Điểm tập kết</Typography>
                                        </TableCell>
                                        <TableCell sx={{ width: '20%' }} align="left">
                                            <Typography fontWeight="bold">Quốc gia</Typography>
                                        </TableCell>
                                        <TableCell sx={{ width: '20%' }} align="left">
                                            <Typography fontWeight="bold">Trưởng điểm tập kết</Typography>
                                        </TableCell>
                                        <TableCell sx={{ width: '20%' }} align="right">
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
            </Box>
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
                <TableCell sx={{ width: '20%' }} component="th" scope="row">
                    {row.consolidation.city}
                </TableCell>
                <TableCell sx={{ width: '20%' }} align="left">{row.consolidation.address}</TableCell>
                <TableCell sx={{ width: '20%' }} align="left">{row.consolidation.country}</TableCell>
                <TableCell sx={{ width: '20%' }} align="left">{row.consolidation.manager??"--"}</TableCell>
                <TableCell sx={{ width: '20%' }} align="right">{row.consolidation.quantity?? 0}</TableCell>

            </TableRow>
            <TableRow >
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Các điểm giao dịch
                            </Typography>
                            <Table size="small" stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ width: '33%' }}>
                                            <span style={{ fontWeight: 'bold' }}>Điểm giao dịch</span>
                                        </TableCell>
                                        <TableCell sx={{ width: '33%' }} align="left">
                                            <span style={{ fontWeight: 'bold' }}>Trưởng điểm giao dịch</span>
                                        </TableCell>
                                        <TableCell sx={{ width: '33%' }} align="right">
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
                                            <TableCell align="left">{transaction.manager ?? "--"}</TableCell>
                                            <TableCell align="right">{transaction.quantity?? 0}</TableCell>
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