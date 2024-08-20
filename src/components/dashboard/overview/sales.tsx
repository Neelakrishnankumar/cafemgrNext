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
import { useGetYearsalesMetricsQuery } from '@/state/api';
import { array } from 'zod';
import axios from 'axios';

// import { Chart } from '@/components/core/chart';

export interface SalesProps {
  // chartSeries: { name: string; data: number[] }[];
  sx?: SxProps;
}

export function Sales({ sx }: SalesProps): React.JSX.Element {


  const chartOptions = useChartOptions();

  const  {data ,isLoading,isSuccess } = useGetYearsalesMetricsQuery()

  const salseData = data || []
  const salseDatacopy = [...salseData] || []
  let content = <Box>No Content</Box>;
  const [localArray, setLocalArray] = React.useState([...salseDatacopy]);

  const [response , setResponse ] = React.useState([])
  const [loading , setLoading ] = React.useState(false)
  const [status , setStaus ] = React.useState('idle')
  React.useEffect(() =>{
   
    if(status == 'idle'){
      setLoading(true)
      axios.get('http://localhost/server/cafemgr/api/ProductYearSales.php', {
         headers: {
           Authorization:
             'eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk5ODQzNDl9.uxE3r3X4lqV_WKrRKRPXd-Jub9BnVcCXqCtLL4I0fpU',
         },
       }).then((response) => {
         console.log("🚀 ~ React.useEffect ~ response:", response)
   
         if(response.status == 200){
           setLoading(false)
           setResponse(response.data)
           setStaus('fulfilled')
         }else{
   
         }
         
       });
    }
 
  },[])


  if ( loading) {
    content = <CircularProgress />;
  } else if (!loading ) {
    content = <Chart height={350} options={chartOptions} series={response} type="bar" width="100%" />;
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

function useChartOptions(): ApexOptions {
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
