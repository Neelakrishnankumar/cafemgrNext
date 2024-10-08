'use client';

import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/redux';
import { getProductCateMetrics, getProductMetrics } from '@/state';
import { useGetSalesMetricsQuery } from '@/state/api';
// import { useGetProductCateMetricsQuery } from '@/state/api';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import type { SxProps } from '@mui/material/styles';
import { ArrowRight as ArrowRightIcon } from '@phosphor-icons/react/dist/ssr/ArrowRight';
import { DotsThreeVertical as DotsThreeVerticalIcon } from '@phosphor-icons/react/dist/ssr/DotsThreeVertical';
import dayjs from 'dayjs';

export interface Product {
  id: string;
  image: string;
  name: string;
  updatedAt: Date;
}

export interface LatestProductsProps {
  products?: Product[];
  sx?: SxProps;
}

export function LatestProducts({ products = [], sx }: LatestProductsProps): React.JSX.Element {
  const disatch = useAppDispatch();

  const { data, isLoading } = useGetSalesMetricsQuery();

  console.log('API data:', data);
  const CategorySummary = data?.data || []

  interface SalesRecord {
    CategoryID: string;  
    CategoryName: string;
    SalesValue: string;
  }

  interface AggregatedSales {
    CategoryID: string;    
    CategoryName: string;
    SalesValue: any;
  
  }
  
  function aggregateSales(data: SalesRecord[]): AggregatedSales[] {
    // Reduce to aggregate sales by location and product
    const aggregated: Record<string, AggregatedSales> = data.reduce((acc, item) => {
      const key = `${item.CategoryName}`;
  
      if (!acc[key]) {
        acc[key] = {
           CategoryName: item.CategoryName,
           CategoryID: item.CategoryID,
           SalesValue: 0
        };
      }
  
      acc[key].SalesValue += Number(item.SalesValue);
      acc[key].SalesValue = parseFloat(acc[key].SalesValue.toFixed(2));
  
      return acc;
    }, {} as Record<string, AggregatedSales>);
  
    // Convert the aggregated object to an array
    return Object.values(aggregated);
  }
  
  const aggregatedSales = aggregateSales(CategorySummary);
  
  console.log('Aggregated Sales:', aggregatedSales);
  

  const location = useAppSelector((state) => state.global.block);
  
  
 let  loactionFilterdValue: any = []
  
 if(location != '0'){

    loactionFilterdValue = CategorySummary.filter(item => item.LocationID == location);
 }

 if(location == '0'){

  loactionFilterdValue = aggregatedSales;
}


  
 

  
  return (
    <Card sx={sx}>
      <CardHeader title="Product category performance" />
      <Divider />
      {isLoading ? (
        <>Loading...</>
      ) : (
        <List style={{ maxHeight: '600px', overflow: 'auto' }}>
          {loactionFilterdValue.map((product: any, index: any) => (
            <ListItem
              divider={index < products.length - 1}
              key={product.CategoryID}
              sx={{
                backgroundColor: index % 2 === 0 ? '#90EE90' : 'background.paper',
              }}
            >
              {/* <ListItemAvatar>
              {product.image ? (
                <Box component="img" src={product.image} sx={{ borderRadius: 1, height: '38px', width: '38px' }} />
              ) : (
                <Box
                  sx={{
                    borderRadius: 1,
                    backgroundColor: 'var(--mui-palette-neutral-200)',
                    height: '48px',
                    width: '48px',
                  }}
                />
              )}
            </ListItemAvatar> */}
              <ListItemText
                primary={product.CategoryName}
                primaryTypographyProps={{ variant: 'subtitle1' }}
                // secondary={`Updated ${dayjs(product.updatedAt).format('MMM D, YYYY')}`}
                // secondaryTypographyProps={{ variant: 'body2' }}
              />
              <Button
                variant="text"
                sx={{ textAlign: 'right' }}
                onClick={() => disatch(getProductMetrics({id:Number(product.CategoryID),LocationID:Number(product.LocationID)}))}
              >
                ₹{product.SalesValue}
              </Button>
            </ListItem>
          ))}
        </List>
      )}

      <Divider />
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        {/* <Button
          color="inherit"
          endIcon={<ArrowRightIcon fontSize="var(--icon-fontSize-md)" />}
          size="small"
          variant="text"
        >
          View all
        </Button> */}
      </CardActions>
    </Card>
  );
}
