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
import { Typography } from '@mui/material';
import { employerInterface } from '../../../types/EmployerInterface';

interface OrderTableProps {
  allOrders: orderInterface[];
  employer?: employerInterface;
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
  action: string;
  consolidation: string;
  transaction: string;
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
  action: string,
  consolidation: string,
  transaction: string,
): Data {
  return {
    code,
    senderName,
    receiverName,
    items,
    date,
    status,
    cod,
    fee, 
    action,
    consolidation,
    transaction
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
    id: 'fee',
    label: 'Tổng cước',
  },
  {
    id: 'cod',
    label: 'Thu hộ',
  },
  {
    id: 'status',
    label: 'Trạng thái',
  },
  {
    id: 'action',
    label: 'Hành động tiếp theo',
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
            {headCell.id === "date" && (
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

            {headCell.id !== "date" && (
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


const OrderTable: React.FC<OrderTableProps> = ({ allOrders, employer}) => {
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
        "Hành động tiếp theo",
        (order.status && order.status.length > 0) ? (order.status[order.status.length - 1]?.toConsolidation ?? " ") : '',
        (order.status && order.status.length > 0) ? (order.status[order.status.length - 1]?.toTransaction ?? " ") : '',
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
    'Nhận đơn hàng': '#B8E1FF',
    'Đang gửi đến điểm tập kết': '#E9C3BB',
    'Điểm tập kết đã nhận': '#FFDCE3',
    'Đang gửi đến điểm tập kết đích': '#F0D6FA',
    'Điểm tập kết đích đã nhận': '#EEDCCE',
    'Đang gửi đến điểm giao dịch đích': '#ADDDCE',
    'Điểm giao dịch đích đã nhận': '#C8B4BA',
    'Đang giao hàng': '#C1CD97',
    'Giao hàng thành công': '#D5C7D9',
    'Giao hàng không thành công': '#9EBF99',
  };

  
  const getStatusColor = (status: string) => {
    return statusColors[status] || 'transparent';
  };

  const nextAction: Record<string, string> = {
    'Nhận đơn hàng': 'Gửi đến điểm tập kết',
    'Đang gửi đến điểm tập kết': 'Xác nhận đã nhận đơn hàng',
    'Điểm tập kết đã nhận': 'Gửi đến điểm tập kết đích',
    'Đang gửi đến điểm tập kết đích': 'Xác nhận đã nhận đơn hàng',
    'Điểm tập kết đích đã nhận': 'Gửi đến điểm giao dịch đích',
    'Đang gửi đến điểm giao dịch đích': 'Xác nhận đã nhận đơn hàng',
    'Điểm giao dịch đích đã nhận': 'Giao hàng',
    'Đang giao hàng': 'Xác nhận tình trạng đơn',
    'Giao hàng thành công': 'Giao hàng thành công',
    'Giao hàng không thành công': 'Theo dẫn người gửi',
  };

  
  const getNextAction = (status: string) => {
    return nextAction[status] || '';
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


  const isButtonDisabled = (row: Data) => {
    if ((row.status === 'Đang gửi đến điểm tập kết' && employer?.transaction !== row.transaction) 
      || (row.status === 'Đang gửi đến điểm tập kết đích' && employer?.consolidation !== row.consolidation)
      || (row.status === 'Đang gửi đến điểm giao dịch đích' && employer?.transaction  !== row.transaction)
      || (row.status === 'Giao hàng thành công')
      || (row.status === 'Giao hàng không thành công')) {
        return true;
    }
    return false;
  }

  const handleButtonClick = (row: Data) => {
    const onClose = () => {
      setItems(undefined);
      window.location.reload();
    }
    const onCloseButt = () => {
      setItems(undefined);
    }
    console.log('hi', employer?.transaction, 'hello', row.transaction)
    if (row.status === 'Nhận đơn hàng') {
      setItems(<SendToSenderConsolidation code={row.code} onClose={onClose} onCloseButt={onCloseButt}/>)
    } else if (row.status === 'Đang gửi đến điểm tập kết' && employer?.transaction === row.transaction) {
      setItems(<ConfirmSenderConsolidation code={row.code} onClose={onClose} onCloseButt={onCloseButt}/>)
    } else if (row.status === 'Điểm tập kết đã nhận') {
      setItems(<SendToReceiverConsolidation code={row.code} onClose={onClose} onCloseButt={onCloseButt}/>)
    } else if (row.status === 'Đang gửi đến điểm tập kết đích' && employer?.consolidation === row.consolidation) {
      setItems(<ConfirmReceiverConsolidation code={row.code} onClose={onClose} onCloseButt={onCloseButt}/>)
    } else if (row.status === 'Điểm tập kết đích đã nhận') {
      setItems(<SendToReceiverTransaction code={row.code} onClose={onClose} onCloseButt={onCloseButt}/>)
    } else if (row.status === 'Đang gửi đến điểm giao dịch đích' && employer?.transaction  === row.transaction) {
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
                    <TableCell align="center">{row.code} <br/> 
                      <a href={`/order/details/${row.code}`} className='text-[12px] text-bgBlue hover:text-blue-700 duration-300 transition ease-in-out'>Xem chi tiết</a>
                    </TableCell>
                    <TableCell align="center">{row.senderName}</TableCell>
                    <TableCell align="center">{row.receiverName}</TableCell>
                    <TableCell align="center">{row.items}</TableCell>
                    <TableCell align="center">{row.date}</TableCell>
                    <TableCell align="center">{row.cod}</TableCell>
                    <TableCell align="center">{row.fee}</TableCell>
                    <TableCell align="center">
                    <Typography
                      style={{
                        backgroundColor: getStatusColor(row.status),
                        border: '1px',
                        borderRadius: '8px',
                        padding: '8px',
                        color: "black",
                        fontSize: "12px",
                        textTransform: 'uppercase',
                        fontWeight: "bold",
                        fontFamily: 'Roboto, sans-serif',
                      }}
                    >
                      {row.status}
                    </Typography>
                    {items}
                    </TableCell>
                    <TableCell align="center">
                    <Button
                      style={{
                        backgroundColor: "#E5F0FF",
                        border: '1px',
                        borderRadius: '8px',
                        padding: '8px',
                        color: "black",
              
                      }}
                      disabled={isButtonDisabled(row)} 
                      onClick={() => handleButtonClick(row)}
                    >
                      {getNextAction(row.status)}
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
