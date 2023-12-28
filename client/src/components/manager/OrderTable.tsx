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
    allOrders: orderInterface[],
    consolidation: string,
    transaction: string
}

interface Data {
    code: string;
    senderAddress: string;
    receiverAddress: string;
    status: string;
    createdAt: string;
    sentAt: string;
}

function createData(order: orderInterface, consolidation: string, transaction: string): Data {
    const code = order.code ?? '';
    const senderAddress: string = order.senderVillage + ', '
        + order.senderDistrict + ', '
        + order.senderCity;
    const receiverAddress: string = order.receiverVillage + ','
        + order.receiverDistrict + ', '
        + order.receiverCity;
    let createdAt: string = '';
    const statuses: Status[] | undefined = order.status;
    let statusLine: string = "";
    let sentAt: string = '';
    if (statuses) {
        statuses.map((status) => {
            if (status.toConsolidation === consolidation &&
                status.toTransaction === transaction) {
                if (status.action === "Giao hàng thành công") {
                    statusLine = "Đã giao hàng thành công";
                    if (status.date) {
                        const date = new Date(status.date);
                        sentAt = formatDate(date);
                    }
                } else if (status.action === "Giao hàng không thành công") {
                    statusLine = "Giao hàng không thành công";
                    if (status.date) {
                        const date = new Date(status.date);
                        sentAt = formatDate(date);
                    }
                } else if (status.action?.includes("nhận") ||status.action?.includes("Nhận") ) {
                    statusLine = "Đã nhận đơn hàng"
                    if (status.date) {
                        const date = new Date(status.date);
                        createdAt = formatDate(date);
                    }
                } else {
                    statusLine = "Đơn hàng đang được gửi đến"
                }
            } else {
                if (status.action?.includes("nhận")) {
                    statusLine = "Đã giao đơn hàng thành công"
                } else {
                    statusLine = "Đơn hàng đang được giao đi"
                }
                if (status.date) {
                    const date = new Date(status.date);
                    sentAt = formatDate(date);
                }
            }
        })

    }
    const status = statusLine;
    return {
        code, senderAddress, receiverAddress, status, createdAt, sentAt
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
        id: 'status',
        label: 'Trạng thái đơn',
    },
    {
        id: 'createdAt',
        label: 'Thời gian nhận đơn',
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

const OrderTable: React.FC<OrderTableProps> = ({ allOrders, consolidation, transaction }) => {
    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof Data>('createdAt');
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [rows, setRows] = React.useState<Data[]>([]);



    React.useEffect(() => {
        setRows(
            allOrders.map((order) =>
                createData(order, consolidation, transaction)));
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
                                        <TableCell align="left" sx={{ width: 200 }}>{row.status}</TableCell>
                                        <TableCell align="left" sx={{ width: 150 }} >{row.createdAt}</TableCell>
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
            <div className="float-left">
                <FormControlLabel
                    control={<Switch checked={dense} onChange={handleChangeDense} />}
                    label="Dense padding"
                />
            </div>
        </Box>
    );
}

export default OrderTable;