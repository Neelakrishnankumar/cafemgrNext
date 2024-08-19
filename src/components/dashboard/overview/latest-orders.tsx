'use client'
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import type { SxProps } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { ArrowRight as ArrowRightIcon } from '@phosphor-icons/react/dist/ssr/ArrowRight';
import dayjs from 'dayjs';
import { useAppSelector } from '@/app/redux';

const statusMap = {
  pending: { label: 'Pending', color: 'warning' },
  delivered: { label: 'Delivered', color: 'success' },
  refunded: { label: 'Refunded', color: 'error' },
} as const;

export interface Order {
  id: string;
  customer: { name: string };
  amount: number;
  status: 'pending' | 'delivered' | 'refunded';
  createdAt: Date;
}

export interface LatestOrdersProps {
  orders?: Order[];
  sx?: SxProps;
}

export function LatestOrders({ orders = [], sx }: LatestOrdersProps): React.JSX.Element {


  const productData = useAppSelector((state) => state.global.productPerformanceData)
  const isLoading = useAppSelector((state) => state.global.productPerformanceLoading)
  return (
    <Card sx={sx}>
      <CardHeader title="Product Proformance" />
      <Divider />
      <Box sx={{ overflowX: 'auto' }}>
        {isLoading ? <>loading..</>:
        <Table sx={{ minWidth: 800 }}>
          <TableHead>
            <TableRow>
              <TableCell>Product Name</TableCell>
              <TableCell>Sales Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {productData.map((order:any) => {
              // const { label, color } = statusMap[order.status] ?? { label: 'Unknown', color: 'default' };

              return (
                <TableRow hover key={order.ProductID}>
                  <TableCell>{order.ProductName}</TableCell>
                  <TableCell>₹{order.SalesValue}</TableCell>
                  {/* <TableCell>{dayjs(order.createdAt).format('MMM D, YYYY')}</TableCell> */}
                  {/* <TableCell>
                    <Chip color={color} label={label} size="small" />
                  </TableCell> */}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>}
      </Box>
      <Divider />
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button
          color="inherit"
          endIcon={<ArrowRightIcon fontSize="var(--icon-fontSize-md)" />}
          size="small"
          variant="text"
        >
          View all
        </Button>
      </CardActions>
    </Card>
  );
}
