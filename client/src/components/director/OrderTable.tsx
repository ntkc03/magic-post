import { Status, orderInterface } from "../../types/OrderInterface";
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableSortLabel from '@mui/material/TableSortLabel';
import { Box } from "@mui/material";
import { visuallyHidden } from '@mui/utils';
import React, { useState } from "react";


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

function createData(order: orderInterface) {
    const code = order.code;
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
    const createdAt = order.create_at;
    const statuses: Status[] | undefined = order.status;
    let location: string = "";
    let status: string = "";
    let sentAt: Date | undefined = undefined;
    if (statuses) {
        const lastState = statuses[statuses.length - 1];
        status = lastState.action ?? "";
        // const place = lastState.place;
        // if (place === "consolidation") {
        //     location = "Điểm tập kết: " + lastState.consolidation;
        // } else if (place === "transaction") {
        //     location = "Điểm giao dịch: " + lastState.transaction;
        // }
        // if (status === "Giao hàng thành công") {
        //     sentAt = lastState.date;
        // }
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
        id: 'location',
        label: 'Vị trí đơn hàng',
    },
    {
        id: 'status',
        label: 'Trạng thái đơn',
    },
    {
        id: 'createdAt',
        label: 'Thời gian tạo đơn',
    },
    {
        id: 'sentAt',
        label: 'Thời gửi đơn',
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
                        align={'center'}
                        sortDirection={orderBy === headCell.id ? order : false}
                        sx={{
                            fontWeight: 'bold'
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

// const OrderTable: React.FC<OrderTableProps> = ({ allOrders }) => {
//     const [order, setOrder] = React.useState<Order>('asc');
//     const [orderBy, setOrderBy] = React.useState<keyof Data>('createdAt');
//     const [page, setPage] = React.useState(0);
//     const [dense, setDense] = React.useState(false);
//     const [rowsPerPage, setRowsPerPage] = React.useState(5);


//     const [rows, setRows] = React.useState<Data[]>([]);

//     const [items, setItems] = useState<React.ReactNode>();

//     React.useEffect(() => {
//         setRows(
//             allOrders.map((order) =>
//                 createData(order);
//             ))
// }, [allOrders]);
// }  