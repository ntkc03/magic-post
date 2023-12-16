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
import FormHelperText from '@mui/material/FormHelperText';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../features/redux/reducers/Reducer';
import { useEffect, useState } from 'react';
import { fetchAllConsolidations } from '../../features/redux/slices/user/allConsolidationSlice';
import { FilterPayload, StatisticsPointsPayload } from '../../types/PayloadInterface';
import { allConsolidationsData } from '../../features/axios/api/consolidation/consolidationPointDetails';
import { ConsolidationInterface } from '../../types/ConsolidationInterface';
import { TransactionInterface } from '../../types/TransactionInterface';
import { allTransactionsData, getTransactionsByConsolidation } from '../../features/axios/api/transaction/transactionPointDetails';
import StatisticsPointShimmer from '../shimmer/StatisticsPointShimmer';
import { fetchAllTransactions } from '../../features/redux/slices/user/allTransactionSlide';
import { isMapIterator } from 'util/types';

function StaticPoints() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [allList, setAllList] = useState<StatisticsPointsPayload[]>();
    const [statisticsList, setStatisticsList] = useState<StatisticsPointsPayload[]>();
    const [filterList, setFilterList] = useState<StatisticsPointsPayload[]>();
    const [selectedConsolidation, setSelectedConsolidation] = useState("");
    const [selectedConsolidation2, setSelectedConsolidation2] = useState("");
    const [selectedTransaction, setSelectedTransaction] = useState("");
    const [filter, setFilter] = useState<FilterPayload>();


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
        if (selectedConsolidation !== "") {
            let list = allList?.filter((result: StatisticsPointsPayload) =>
                result?.consolidation?.address?.includes(selectedConsolidation)
            )
            setStatisticsList(list)
        } else {
            setStatisticsList(allList)
        }
    }, [selectedConsolidation]);

    useEffect(() => {
        if (selectedConsolidation2 !== "") {
            let list = allList?.filter((result: StatisticsPointsPayload) =>
                result?.consolidation?.address?.includes(selectedConsolidation2)
            )
            setFilterList(list)
        }
    }, [selectedConsolidation2]);

    useEffect(() => {
        if (selectedTransaction !== "" && filterList) {
            let transList = filterList[0].transactions;
            let result = transList.find((transaction: TransactionInterface) => transaction.address === selectedTransaction);
            console.log("check", result)
            if (result) {
                let re: FilterPayload = {
                    consolidation: filterList[0].consolidation,
                    transaction: result
                };

                setFilter(re)
            }

        }
    }, [selectedTransaction])


    useEffect(() => {
        dispatch(fetchAllConsolidations());
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
            <div className='pl-1 pb-4 text-center' >
                <text className='text-2xl'>Danh sách các điểm tập kết</text>
            </div>
            <Box component={Paper}>
                <div className='float-left pr-4 pl-20'>
                    <FormControl sx={{ m: 1, width: 200 }} size="small">
                        <InputLabel id="demo-select-small-label">Chọn điểm tập kết</InputLabel>
                        <Select
                            labelId="demo-select-small-label"
                            id="demo-select-small"
                            value={selectedConsolidation}
                            label="Consolidation"
                            onChange={(e) => setSelectedConsolidation(e.target.value as string)}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {statisticsList?.map((item) => (
                                <MenuItem key={item.consolidation.address} value={item.consolidation.address}>
                                    {item.consolidation.address}
                                </MenuItem>

                            ))}
                        </Select>
                    </FormControl>
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
            </Box>
            <div className="justify-center bg-background text-center text-textColor pt-20">
                <div className='pl-1 pb-5'>
                    <text className='text-2xl'>Tra cứu</text>
                    <Box component={Paper} sx={{ minWidth: 650, minHeight: 133 }}>
                        <div className='float-left pr-2 pl-1'>
                            <FormControl sx={{ m: 1, minWidth: 180 }} size="small">
                                <InputLabel id="demo-select-small-label">Chọn điểm tập kết</InputLabel>
                                <Select
                                    labelId="demo-select-small-label"
                                    id="demo-select-small"
                                    value={selectedConsolidation2}
                                    label="Consolidation"
                                    onChange={(e) => setSelectedConsolidation2(e.target.value as string)}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    {allList?.map((item) => (
                                        <MenuItem key={item.consolidation.address} value={item.consolidation.address}>
                                            {item.consolidation.address}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>

                        <div className='float-left'>
                            <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
                                <InputLabel id="demo-select-small-label">Chọn điểm giao dịch</InputLabel>
                                <Select
                                    labelId="demo-select-small-label"
                                    id="demo-select-small"
                                    value={selectedTransaction}
                                    label="Transaction"
                                    onChange={(e) => setSelectedTransaction(e.target.value as string)}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    {filterList?.map((row) => (
                                        row.transactions.map((transaction) => (
                                            <MenuItem key={transaction.address} value={transaction.address}>
                                                {transaction.address}
                                            </MenuItem>
                                        ))
                                    ))}
                                </Select>
                                <FormHelperText>Required</FormHelperText>
                            </FormControl>
                        </div>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Điểm tập kết</TableCell>
                                        <TableCell align="left">Điểm giao dịch</TableCell>
                                        <TableCell align="left">Trưởng điểm giao dịch</TableCell>
                                        <TableCell align="left">Trưởng điểm tập kết</TableCell>
                                        <TableCell align="left">Số đơn hàng</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow
                                        key={filter?.consolidation?.address ?? "--"}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {filter?.consolidation?.address ?? "--"}
                                        </TableCell>
                                        <TableCell align="left">{filter?.transaction?.address ?? "--"}</TableCell>
                                        <TableCell align="left">{filter?.consolidation?.manager ?? "--"}</TableCell>
                                        <TableCell align="left">{filter?.transaction?.manager ?? "--"}</TableCell>
                                        <TableCell align="left">{filter?.transaction?.quantity ?? "--"}</TableCell>
                                    </TableRow>

                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                </div>
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
                <TableCell align="right">{row.consolidation.quantity}</TableCell>

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
                                            <TableCell align="right">{transaction.quantity}</TableCell>
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