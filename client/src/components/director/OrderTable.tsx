import { Status, orderInterface } from "../../types/OrderInterface";
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableSortLabel from '@mui/material/TableSortLabel';
import { Box, Button, FormControlLabel, Paper, Switch, Table, TableBody, TableContainer, TablePagination } from "@mui/material";
import { visuallyHidden } from '@mui/utils';
import React, { useState } from "react";
import { formatDate } from "../order/details/format";


interface OrderTableProps {
    allOrders: orderInterface[]
}

interface Data {
    code: string;
    senderAddress: string;
    receiverAddress: string;
    location: string;
    status: string;
    createdAt: string;
    sentAt: string;
}

function createData(order: orderInterface): Data {
    const code = order.code ? order.code : "";
    const senderAddress: string = order.senderHouseNumber + ', '
        + order.senderVillage + ', '
        + order.senderDistrict + ', '
        + order.senderCity + ', '
        + order.senderCountry;
    const receiverAddress: string = order.receiverHouseNumber + ', '
        + order.receiverVillage + ', '
        + order.receiverDistrict + ', '
        + order.receiverCity + ', '
        + order.receiverCountry;
    const createdAt = order.create_at ? formatDate(order?.create_at) : '';
    const statuses: Status[] | undefined = order.status;
    let location: string = "";
    let status: string = "";
    let sentAt: string = "";
    if (statuses) {
        const lastStatus = statuses[statuses.length - 1];
        status = lastStatus.action ?? "";
        if (status.includes("Đang gửi") || status === "Giao hàng thành công" || status === "Giao hàng không thành công") {
            if (lastStatus.date) {
                const date = new Date(lastStatus.date);
                sentAt = formatDate(date);
            }
            if (lastStatus.fromTransaction === "") {
                location = "Điểm tập kết: " + lastStatus.fromConsolidation;
            } else {
                location = "Điểm giao dịch: " + lastStatus.fromTransaction + " - " + lastStatus.fromConsolidation;
            }
        } else if (status.includes("nhận")) {
            if (lastStatus.toTransaction === "") {
                location = "Điểm tập kết: " + lastStatus.toConsolidation;
            } else {
                location = "Điểm giao dịch: " + lastStatus.toTransaction + " - " + lastStatus.toConsolidation;
            }
        }
    }
    return {
        code, senderAddress, receiverAddress, location, status, createdAt, sentAt
    }
}
function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key,
): (
    a: { [key in Key]: number | string },
    b: { [key in Key]: number | string },
) => number {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
    id: keyof Data;
    label: string;
}

const headCells: readonly HeadCell[] = [
    {
        id: 'code',
        label: 'Mã vận đơn',
    },
    {
        id: 'senderAddress',
        label: 'Địa chỉ người gửi',
    },
    {
        id: 'receiverAddress',
        label: 'Địa chỉ người nhận',
    },
    {
        id: 'createdAt',
        label: 'Thời gian tạo đơn',
    },
    {
        id: 'location',
        label: 'Vị trí đơn hàng',
    },
    {
        id: 'status',
        label: 'Trạng thái đơn',
    },

    {
        id: 'sentAt',
        label: 'Thời gian gửi đơn',
    }
];

interface EnhancedTableProps {
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
    const { order, orderBy, rowCount, onRequestSort } =
        props;
    const createSortHandler =
        (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
            onRequestSort(event, property);
        };
    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={'left'}
                        sortDirection={orderBy === headCell.id ? order : false}
                        sx={{
                            fontWeight: 'bold',
                        }}
                    >
                        {headCell.id === "createdAt" && (
                            <TableSortLabel
                                active={orderBy === headCell.id}
                                direction={orderBy === headCell.id ? order : 'asc'}
                                onClick={createSortHandler(headCell.id)}
                            >
                                {headCell.label}
                                {orderBy === headCell.id ? (
                                    <Box component="span" sx={visuallyHidden}>
                                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                    </Box>
                                ) : null}
                            </TableSortLabel>)
                        }

                        {headCell.id !== "createdAt" && (
                            <div>
                                {headCell.label}
                            </div>)
                        }

                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

const OrderTable: React.FC<OrderTableProps> = ({ allOrders }) => {
    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof Data>('createdAt');
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);


    const [rows, setRows] = React.useState<Data[]>([]);

    const [items, setItems] = useState<React.ReactNode>();



    React.useEffect(() => {
        setRows(
            allOrders.map((order) =>
                createData(order)));
    }, [allOrders]);

    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: keyof Data,
    ) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const visibleRows = React.useMemo(
        () =>
            stableSort(rows, getComparator(order, orderBy)).slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage,
            ),
        [order, orderBy, page, rowsPerPage, rows],
    );

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDense(event.target.checked);
    };

    return (
        <Box sx={{ width: '100%', maxWidth: 1600 }} id="box">
            <Paper sx={{ width: '100%', mb: 2 }}>
                <TableContainer>
                    <Table
                        sx={{ minWidth: 600 }}
                        aria-labelledby="tableTitle"
                        size={dense ? 'small' : 'medium'}
                    >
                        <EnhancedTableHead
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                        />
                        <TableBody>
                            {visibleRows.map((row, index) => {
                                return (
                                    <TableRow
                                        hover
                                        role="checkbox"
                                        tabIndex={-1}
                                        sx={{ cursor: 'pointer' }}
                                    >
                                        <TableCell align="left" sx={{ width: 100 }}>{row.code} <br />
                                            <a href={`/order/details/${row.code}`} className='text-[12px] text-bgBlue hover:text-blue-700 duration-300 transition ease-in-out'>Xem chi tiết</a>
                                        </TableCell>
                                        <TableCell align="left" sx={{ width: 200 }}>{row.senderAddress}</TableCell>
                                        <TableCell align="left" sx={{ width: 200 }}>{row.receiverAddress}</TableCell>
                                        <TableCell align="left" sx={{ width: 150 }} >{row.createdAt}</TableCell>
                                        <TableCell align="left" sx={{ width: 200 }}>{row.location}</TableCell>
                                        <TableCell align="left" sx={{ width: 200 }}>{row.status}</TableCell>
                                        <TableCell align="left" sx={{ width: 150 }}>{row.sentAt}</TableCell>
                                    </TableRow>
                                );
                            })}
                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: (dense ? 33 : 53) * emptyRows,
                                    }}
                                >
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            <FormControlLabel
                control={<Switch checked={dense} onChange={handleChangeDense} />}
                label="Dense padding"
            />
        </Box>
    );
}

export default OrderTable;
