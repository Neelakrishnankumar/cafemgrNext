'use client'

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import type { SxProps } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { ArrowDown as ArrowDownIcon } from '@phosphor-icons/react/dist/ssr/ArrowDown';
import { ArrowUp as ArrowUpIcon } from '@phosphor-icons/react/dist/ssr/ArrowUp';
import { Users as UsersIcon } from '@phosphor-icons/react/dist/ssr/Users';
import { CurrencyDollar as CurrencyDollarIcon } from '@phosphor-icons/react/dist/ssr/CurrencyDollar';
import { CurrencyInr } from '@phosphor-icons/react/dist/ssr';
import { useGetYearMonthWeekMetricsQuery } from '@/state/api';
import { useAppSelector } from '@/app/redux';

export interface TotalCustomersProps {
  diff?: number;
  trend: 'up' | 'down';
  sx?: SxProps;
  value: string;
}

export function TotalCustomers({ diff, trend, sx, value }: TotalCustomersProps): React.JSX.Element {
  const TrendIcon = trend === 'up' ? ArrowUpIcon : ArrowDownIcon;
  const trendColor = trend === 'up' ? 'var(--mui-palette-success-main)' : 'var(--mui-palette-error-main)';

  const  {data ,isLoading } = useGetYearMonthWeekMetricsQuery()

  const salseData = data || []
  let monthSalesAll = 0
  
  const block = useAppSelector((state) => state.global.block);

  // Check if salseData[0] exists before accessing properties
  if (!isLoading && salseData.length > 0 && salseData[0]) {
    if (block === '0') {
      monthSalesAll =
        (Number(salseData[0]?.['DB_M2DSALESBLOCK3']) +
        Number(salseData[0]?.['DB_M2DSALESBLOCK5']) +
        Number(salseData[0]?.['DB_M2DSALESBLOCK9']));
    } else if (block === '1034') {
      monthSalesAll = Number(salseData[0]?.['DB_M2DSALESBLOCK3']);
    } else if (block === '1036') {
      monthSalesAll = Number(salseData[0]?.['DB_M2DSALESBLOCK5']);
    } else if (block === '1035') {
      monthSalesAll = Number(salseData[0]?.['DB_M2DSALESBLOCK9']);
    }
  }

  function formatNumber(num: number): string {
    if (num >= 1_000) {
         return (num / 1_000).toFixed(0) + 'K';
     } else {
         return num.toString();
     }
 }



const formatted = formatNumber(monthSalesAll);
  return (
    <Card sx={sx}>
      <CardContent>
        <Stack spacing={2}>
          <Stack direction="row" sx={{ alignItems: 'flex-start', justifyContent: 'space-between' }} spacing={3}>
            <Stack spacing={1}>
              <Typography color="text.secondary" variant="overline">
                M2D Sales
              </Typography>
              <Typography variant="h4">₹{isLoading ? '...': formatted}</Typography>
            </Stack>
            <Avatar sx={{ backgroundColor: 'var(--mui-palette-success-main)', height: '56px', width: '56px' }}>
            <CurrencyInr fontSize="var(--icon-fontSize-lg)" />
            </Avatar>
          </Stack>
          {/* {diff ? (
            <Stack sx={{ alignItems: 'center' }} direction="row" spacing={2}>
              <Stack sx={{ alignItems: 'center' }} direction="row" spacing={0.5}>
                <TrendIcon color={trendColor} fontSize="var(--icon-fontSize-md)" />
                <Typography color={trendColor} variant="body2">
                  {diff}%
                </Typography>
              </Stack>
              <Typography color="text.secondary" variant="caption">
                Since last month
              </Typography>
            </Stack>
          ) : null} */}
        </Stack>
      </CardContent>
    </Card>
  );
}
