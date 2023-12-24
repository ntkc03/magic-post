import * as React from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { visuallyHidden } from '@mui/utils';
import { formatDate } from '../details/format';
import { Button } from '@material-tailwind/react';
import SendToSenderConsolidation from '../status/sendToSenderConsolidation';
import { useState } from 'react';
import { orderInterface } from '../../../types/OrderInterface';
import ConfirmSenderConsolidation from '../status/confirmSenderConsolidation';
import SendToReceiverConsolidation from '../status/sendToReceiverConsolidation';
import ConfirmReceiverConsolidation from '../status/confirmReceiverConsolidation';
import SendToReceiverTransaction from '../status/sendToReceiverTransaction';
import ConfirmReceiverTransaction from '../status/confirmReceiverTransaction';
import Shipping from '../status/shipping';
import ShippingStatus from '../status/shippingStatus';

interface OrderTableProps {
  allOrders: orderInterface[]
}

interface Data {
  code: string;
  senderName: string;
  receiverName: string;
  items: string;
  date: string;
  status: string;
  cod: string;
  fee: string;
}

function createData(
  code: string,
  senderName: string,
  receiverName: string,
  items: string,
  date: string,
  status: string,
  cod: string,
  fee: string,
): Data {
  return {
    code,
    senderName,
    receiverName,
    items,
    date,
    status,
    cod,
    fee
  };
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
    id: 'senderName',
    label: 'Người gửi',
  },
  {
    id: 'receiverName',
    label: 'Người nhận',
  },
  {
    id: 'items',
    label: 'Hàng gửi',
  },
  {
    id: 'date',
    label: 'Ngày tạo đơn',
  },
  {
    id: 'status',
    label: 'Trạng thái',
  },
  {
    id: 'cod',
    label: 'Thu hộ',
  },
  {
    id: 'fee',
    label: 'Tổng cước',
  },
];

interface EnhancedTableProps {
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const {order, orderBy, rowCount, onRequestSort } =
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
            fontWeight: 'bold'}} 
          >
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
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}


const OrderTable: React.FC<OrderTableProps> = ({ allOrders }) => {
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Data>('date');
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  
  const [rows, setRows] = React.useState<Data[]>([]);

  const [items, setItems] = useState<React.ReactNode>();



React.useEffect(() => {
  setRows(
    allOrders.map((order, index) => 
      createData(
        order.code || '',
        order.senderName || '',
        order.receiverName || ' ',
        order.items ? order.items.join(', ') : '',
        order.create_at ? formatDate(order?.create_at ?? new Date()) : '',
        (order.status && order.status.length > 0) ? (order.status[order.status.length - 1]?.action ?? " ") : '',
        order.COD ? order.COD.toLocaleString('it-IT', {style : 'currency', currency : 'VND'}) : "0 VND",
        order.sumFee ? order.sumFee.toLocaleString('it-IT', {style : 'currency', currency : 'VND'}) : "0 VND",
      ),
    ),
  );
}, [allOrders]);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };


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

  const statusColors: Record<string, string> = {
    'Nhận đơn hàng': '#F0E5FF',
    'Gửi đến điểm tập kết': '#FFF0E5',
    'Điểm tập kết đã nhận': '#E5FFF0',
    'Gửi đến điểm tập kết đích': '#F0FFE5',
    'Điểm tập kết đích đã nhận': '#E5F0FF',
    'Gửi đến điểm giao dịch đích': '#FFE5F0',
    'Điểm giao dịch đích đã nhận': '#F0E5FF',
    'Đang giao hàng': '#FFF0E5',
    'Giao hàng thành công': '#E5FFF0',
    'Giao hàng không thành công': '#F0FFE5',
  };
  
  const getStatusColor = (status: string) => {
    return statusColors[status] || 'transparent';
  };



  // Avoid a layout jump when reaching the last page with empty rows.
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


  const handleButtonClick = (row: Data) => {
    const onClose = () => {
      setItems(undefined);
      window.location.reload();
    }
    const onCloseButt = () => {
      setItems(undefined);
    }
    if (row.status === 'Nhận đơn hàng') {
      setItems(<SendToSenderConsolidation code={row.code} onClose={onClose} onCloseButt={onCloseButt}/>)
    } else if (row.status === 'Gửi đến điểm tập kết') {
      setItems(<ConfirmSenderConsolidation code={row.code} onClose={onClose} onCloseButt={onCloseButt}/>)
    } else if (row.status === 'Điểm tập kết đã nhận') {
      setItems(<SendToReceiverConsolidation code={row.code} onClose={onClose} onCloseButt={onCloseButt}/>)
    } else if (row.status === 'Gửi đến điểm tập kết đích') {
      setItems(<ConfirmReceiverConsolidation code={row.code} onClose={onClose} onCloseButt={onCloseButt}/>)
    } else if (row.status === 'Điểm tập kết đích đã nhận') {
      setItems(<SendToReceiverTransaction code={row.code} onClose={onClose} onCloseButt={onCloseButt}/>)
    } else if (row.status === 'Gửi đến điểm giao dịch đích') {
      setItems(<ConfirmReceiverTransaction code={row.code} onClose={onClose} onCloseButt={onCloseButt}/>)
    } else if (row.status === 'Điểm giao dịch đích đã nhận') {
      setItems(<Shipping code={row.code} onClose={onClose} onCloseButt={onCloseButt}/>)
    } else if (row.status === 'Đang giao hàng') {
      setItems(<ShippingStatus code={row.code} onClose={onClose} onCloseButt={onCloseButt}/>)
    }
  }


  return (
    <Box sx={{ width: '100%' }} id="box">
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer>
          <Table
            sx={{ minWidth: 1000 }}
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
                    <TableCell align="left">{row.code}</TableCell>
                    <TableCell align="left">{row.senderName}</TableCell>
                    <TableCell align="left">{row.receiverName}</TableCell>
                    <TableCell align="left">{row.items}</TableCell>
                    <TableCell align="left">{row.date}</TableCell>
                    <TableCell align="right">{row.cod}</TableCell>
                    <TableCell align="right">{row.fee}</TableCell>
                    <TableCell align="left">
                    <Button
                      style={{
                        backgroundColor: getStatusColor(row.status),
                        border: '1px',
                        borderRadius: '8px',
                        padding: '8px',
                        color: "black",
              
                      }}
                      
                      onClick={() => handleButtonClick(row)}
                    >
                      {row.status}
                    </Button>
                    {items}
                    </TableCell>
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
