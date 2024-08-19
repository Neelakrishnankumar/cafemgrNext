'use client';

import * as React from 'react';
import { useAppDispatch, useAppSelector } from '@/app/redux';
import { fetchFastMovingChart } from '@/state';
import { Box, CircularProgress } from '@mui/material';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import { alpha, useTheme } from '@mui/material/styles';
import type { SxProps } from '@mui/material/styles';
import { ArrowClockwise as ArrowClockwiseIcon } from '@phosphor-icons/react/dist/ssr/ArrowClockwise';
import { ArrowRight as ArrowRightIcon } from '@phosphor-icons/react/dist/ssr/ArrowRight';
import type { ApexOptions } from 'apexcharts';

import Chart from 'react-apexcharts';

// import { Chart } from '@/components/core/chart';

export interface SalesProps {
  // chartSeries: { name: string; data: number[] }[];
  sx?: SxProps;
}

export function Sales({ sx }: SalesProps): React.JSX.Element {
  const xaxis = useAppSelector((state) => state.global.xaxis);
  const yaxis = useAppSelector((state) => state.global.yaxis);
  console.log("🚀 ~ Sales ~ yaxis:", yaxis)
  const loading = useAppSelector((state) => state.global.isLoading);
  const status = useAppSelector((state) => state.global.status);

  const dispatch = useAppDispatch();

  const idata = {
    ToDate: '2024-08-13',
    FromDate: '2024-08-06',
    Limit: 10,
    LocationID: '',
  };

  React.useEffect(() => {
    if (status == 'idle') {
      dispatch(fetchFastMovingChart(idata));
    }
  }, []);

  const chartOptions = useChartOptions(xaxis);

  let content = <Box>No Content</Box>;
  if (status == 'pending' && loading) {
    content = <CircularProgress />;
  } else if (status == 'fulfilled' && !loading) {
    content = <Chart height={350} options={chartOptions} series={yaxis} type="bar" width="100%" />;
  }

  return (
    <Card sx={sx}>
      <CardHeader
        action={
          <Button color="inherit" size="small" startIcon={<ArrowClockwiseIcon fontSize="var(--icon-fontSize-md)" />}>
            Sync
          </Button>
        }
        title="Sales"
      />
      <CardContent>
        {content}
      </CardContent>
      <Divider />
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button color="inherit" endIcon={<ArrowRightIcon fontSize="var(--icon-fontSize-md)" />} size="small">
          Overview
        </Button>
      </CardActions>
    </Card>
  );
}

function useChartOptions(xaxis: any): ApexOptions {
  const theme = useTheme();

  return {
    chart: { background: 'transparent', stacked: false, toolbar: { show: false } },
    colors: [theme.palette.primary.main, alpha(theme.palette.primary.main, 0.25)],
    dataLabels: { enabled: false },
    fill: { opacity: 1, type: 'solid' },
    grid: {
      borderColor: theme.palette.divider,
      strokeDashArray: 2,
      xaxis: { lines: { show: false } },
      yaxis: { lines: { show: true } },
    },
    legend: { show: false },
    plotOptions: { bar: { columnWidth: '40px' } },
    stroke: { colors: ['transparent'], show: true, width: 2 },
    theme: { mode: theme.palette.mode },
    xaxis: {
    
      axisBorder: { color: theme.palette.divider, show: true },
      axisTicks: { color: theme.palette.divider, show: true },
      // categories: xaxis,
      categories:  ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      labels: {
        // show:false,
        offsetY: 5,
        style: { colors: theme.palette.text.secondary },
        hideOverlappingLabels: true,
        trim: true,
        rotateAlways: false,
      },
    },
    yaxis: {
      labels: {
        formatter: (value) => (value > 0 ? `₹${value}` : `${value}`),
        offsetX: -10,
        style: { colors: theme.palette.text.secondary },
      },
    },
  };
}
