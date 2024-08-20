'use client'

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import type { SxProps } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { Receipt as ReceiptIcon } from '@phosphor-icons/react/dist/ssr/Receipt';
import { useGetYearMonthWeekMetricsQuery } from '@/state/api';
import { useAppSelector } from '@/app/redux';

export interface TotalProfitProps {
  sx?: SxProps;
  value: string;
}

export function TotalProfit({ value, sx }: TotalProfitProps): React.JSX.Element {


  const  {data ,isLoading } = useGetYearMonthWeekMetricsQuery()

  const salseData = data || []
  let SalesAll = 0

  const block = useAppSelector((state) => state.global.block);
  if(!isLoading && block == '0'){
    SalesAll = (Number(salseData[0]['DB_LWDSALESBLOCK3']) +  Number(salseData[0]['DB_LWDSALESBLOCK5']) +  Number(salseData[0]['DB_LWDSALESBLOCK9']))
  }
  if(!isLoading && block == '3'){
    SalesAll = Number(salseData[0]['DB_LWDSALESBLOCK3'])
  }
  if(!isLoading && block == '5'){
    SalesAll = Number(salseData[0]['DB_LWDSALESBLOCK5']) 
  }
  if(!isLoading && block == '9'){
    SalesAll = Number(salseData[0]['DB_LWDSALESBLOCK9'])
  }

  function formatNumber(num: number): string {
    if (num >= 1_000) {
         return (num / 1_000).toFixed(0) + 'K';
     } else {
         return num.toString();
     }
 }



const formatted = formatNumber(SalesAll);
  return (
    <Card sx={sx}>
      <CardContent>
        <Stack direction="row" sx={{ alignItems: 'flex-start', justifyContent: 'space-between' }} spacing={3}>
          <Stack spacing={1}>
            <Typography color="text.secondary" variant="overline">
              Last Day Sales
            </Typography>
            <Typography variant="h4">₹{isLoading ? '...' : formatted}</Typography>
          </Stack>
          <Avatar sx={{ backgroundColor: 'var(--mui-palette-primary-main)', height: '56px', width: '56px' }}>
            <ReceiptIcon fontSize="var(--icon-fontSize-lg)" />
          </Avatar>
        </Stack>
      </CardContent>
    </Card>
  );
}
