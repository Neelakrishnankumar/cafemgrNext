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

export interface TotalProfitProps {
  sx?: SxProps;
  value: string;
}

export function TotalProfit({ value, sx }: TotalProfitProps): React.JSX.Element {


  const  {data ,isLoading } = useGetYearMonthWeekMetricsQuery()

  const salseData = data || []
  let SalesAll = '0'

  if(!isLoading){
    SalesAll = (Number(salseData[0]['DB_LWDSALESBLOCK3']) +  Number(salseData[0]['DB_LWDSALESBLOCK5']) +  Number(salseData[0]['DB_LWDSALESBLOCK9'])).toFixed(2)
  }
  return (
    <Card sx={sx}>
      <CardContent>
        <Stack direction="row" sx={{ alignItems: 'flex-start', justifyContent: 'space-between' }} spacing={3}>
          <Stack spacing={1}>
            <Typography color="text.secondary" variant="overline">
              Last Day Sales
            </Typography>
            <Typography variant="h4">₹{isLoading ? '...' : SalesAll}</Typography>
          </Stack>
          <Avatar sx={{ backgroundColor: 'var(--mui-palette-primary-main)', height: '56px', width: '56px' }}>
            <ReceiptIcon fontSize="var(--icon-fontSize-lg)" />
          </Avatar>
        </Stack>
      </CardContent>
    </Card>
  );
}
