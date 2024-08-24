
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
import { CurrencyDollar as CurrencyDollarIcon } from '@phosphor-icons/react/dist/ssr/CurrencyDollar';
import { CurrencyInr } from '@phosphor-icons/react/dist/ssr';
import { useGetYearMonthWeekMetricsQuery } from '@/state/api';
import { useAppSelector } from '@/app/redux';

export interface BudgetProps {
  diff?: number;
  trend: 'up' | 'down';
  sx?: SxProps;
  value: string;
}

export function Budget({ diff, trend, sx, value }: BudgetProps): React.JSX.Element {
  const TrendIcon = trend === 'up' ? ArrowUpIcon : ArrowDownIcon;
  const trendColor = trend === 'up' ? 'var(--mui-palette-success-main)' : 'var(--mui-palette-error-main)';

  const  {data ,isLoading } = useGetYearMonthWeekMetricsQuery();

  const salseData = data || [];
  let yearSalesAll = 0;



  const block = useAppSelector((state) => state.global.block);
  if (!isLoading && salseData.length > 0 && salseData[0]) {
    const salesBlock3 = Number(salseData[0]['DB_Y2DSALESBLOCK3']);
    const salesBlock5 = Number(salseData[0]['DB_Y2DSALESBLOCK5']);
    const salesBlock9 = Number(salseData[0]['DB_Y2DSALESBLOCK9']);

    if (block === '0') {
      yearSalesAll = salesBlock3 + salesBlock5 + salesBlock9;
    } else if (block === '1034') {
      yearSalesAll = salesBlock3;
    } else if (block === '1036') {
      yearSalesAll = salesBlock5;
    } else if (block === '1035') {
      yearSalesAll = salesBlock9;
    }
  }

  function formatNumber(num: number): string {
    if (num >= 1_000) {
         return (num / 1_000).toFixed(0) + 'K';
     } else {
         return num.toString();
     }
 }

// Example usage:

const formatted = formatNumber(yearSalesAll);

  return (
    <Card sx={sx}>
      <CardContent>
        <Stack spacing={3}>
          <Stack direction="row" sx={{ alignItems: 'flex-start', justifyContent: 'space-between' }} spacing={3}>
            <Stack spacing={1}>
              <Typography color="text.secondary" variant="overline">
                Y2D Sales
              </Typography>
              <Typography variant="h4">₹{isLoading ? '...' : formatted}</Typography>
            </Stack>
            <Avatar sx={{ backgroundColor: 'var(--mui-palette-primary-main)', height: '56px', width: '56px' }}>
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
