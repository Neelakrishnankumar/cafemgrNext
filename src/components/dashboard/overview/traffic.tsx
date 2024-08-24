'use client';

import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import type { SxProps } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import type { ApexOptions } from 'apexcharts';
import { useAppSelector } from '@/app/redux';
import { Chart } from '@/components/core/chart';

// Define SalesRecord and AggregatedSales interfaces
interface SalesRecord {
  LocationID: string;
  WeekDays: string;
  SalesValue: string;
}

const salesData: SalesRecord[] = [
  { LocationID: "1034", WeekDays: "Monday", SalesValue: "76036.20" },
  { LocationID: "1036", WeekDays: "Monday", SalesValue: "73369.09" },
  { LocationID: "1035", WeekDays: "Monday", SalesValue: "69742.21" },
  { LocationID: "1034", WeekDays: "Tuesday", SalesValue: "6036.20" },
  { LocationID: "1036", WeekDays: "Tuesday", SalesValue: "73369.09" },
  { LocationID: "1035", WeekDays: "Tuesday", SalesValue: "69742.21" },
  { LocationID: "1034", WeekDays: "Wednesday", SalesValue: "6036.20" },
  { LocationID: "1036", WeekDays: "Wednesday", SalesValue: "73369.09" },
  { LocationID: "1035", WeekDays: "Wednesday", SalesValue: "69742.21" },
  { LocationID: "1034", WeekDays: "Thursday", SalesValue: "6036.20" },
  { LocationID: "1036", WeekDays: "Thursday", SalesValue: "73369.09" },
  { LocationID: "1035", WeekDays: "Thursday", SalesValue: "69742.21" },
  { LocationID: "1034", WeekDays: "Friday", SalesValue: "6036.20" },
  { LocationID: "1036", WeekDays: "Friday", SalesValue: "73369.09" },
  { LocationID: "1035", WeekDays: "Friday", SalesValue: "69742.21" }
];

interface AggregatedSales {
  LocationID: string;
  WeekDays: string;
  SalesValue: number;
}

// Function to aggregate sales data (without using hooks)
function aggregateSales(data: SalesRecord[]): AggregatedSales[] {
  const aggregated: Record<string, AggregatedSales> = data.reduce((acc, item) => {
    const key = `${item.WeekDays}`;

    if (!acc[key]) {
      acc[key] = {
        LocationID: item.LocationID,
        WeekDays:item.WeekDays,
        SalesValue: 0,
      };
    }

    acc[key].SalesValue += Number(item.SalesValue);
    return acc;
  }, {} as Record<string, AggregatedSales>);

  return Object.values(aggregated);
}

export function Traffic({ chartSeries, labels, sx }: { chartSeries: number[]; labels: string[]; sx?: SxProps }) {
  const theme = useTheme(); // Hook inside the component
  const aggregatedSales = aggregateSales(salesData); // No hook here

  const location = useAppSelector((state) => state.global.block); // Hook inside the component

  let locationFilteredValue = aggregatedSales;
  if (location !== '0') {
    locationFilteredValue = aggregatedSales.filter((item) => item.LocationID === location);
  }

  const cate = locationFilteredValue.map((a) => `${a.WeekDays}`);
  const chartOptions = useChartOptions(cate, theme);

  return (
    <Card sx={sx}>
      <CardHeader title="Week Days Sales" />
      <CardContent>
        <Stack spacing={2}>
          <Chart
            height={300}
            options={chartOptions}
            series={locationFilteredValue.map((a) => a.SalesValue)}
            type="donut"
            width="100%"
          />
        </Stack>
      </CardContent>
    </Card>
  );
}

function useChartOptions(labels: any, theme: any): ApexOptions {
  return {
    chart: { background: 'transparent' },
    dataLabels: { enabled: false },
    labels,
    legend: { show: true, position: 'bottom' },
    plotOptions: { pie: { expandOnClick: false } },
    states: { active: { filter: { type: 'none' } }, hover: { filter: { type: 'none' } } },
    stroke: { width: 0 },
    theme: { mode: theme.palette.mode },
    tooltip: { fillSeriesColor: false },
  };
}
