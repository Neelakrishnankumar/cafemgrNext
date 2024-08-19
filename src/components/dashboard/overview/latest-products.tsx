'use client';

import React, { useEffect } from 'react';
import {  useGetProductCateMetricsQuery } from '@/state/api';
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
import { useAppDispatch, useAppSelector } from '@/app/redux';
import { getProductCateMetrics, getProductMetrics } from '@/state';

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
  const dataw = [
    { id: 0, value: 107429.36, label: "Pasta", image: '/assets/product-5.png', },
    { id: 1, value: 54959.48, label: "Ice Cream/Milkshake", image: '/assets/product-5.png', },
    { id: 2, value: 26679.10, label: "Healthy Snacks", image: '/assets/product-5.png', },
    { id: 3, value: 213472.70, label: "Sandwich", image: '/assets/product-5.png', },
    { id: 4, value: 12937.26, label: "Hot Beverages", image: '/assets/product-5.png', },
    { id: 5, value: 10265.00, label: "Beverages", image: '/assets/product-5.png', },
    { id: 6, value: 1743.00, label: "Noodles", image: '/assets/product-5.png', },
    { id: 7, value: 79879.89, label: "Frankie", image: '/assets/product-5.png', },
    { id: 8, value: 322678.80, label: "French Fries", image: '/assets/product-5.png', },
    { id: 9, value: 9422.35, label: "Lassi", image: '/assets/product-5.png', },
    { id: 10, value: 414.75, label: "Chaat", image: '/assets/product-5.png', },
    { id: 11, value: 6796.50, label: "Sodas", image: '/assets/product-5.png', },
    { id: 12, value: 97830.95, label: "Salads", image: '/assets/product-5.png', },
    { id: 13, value: 31912.10, label: "Health Drinks", image: '/assets/product-5.png', },
    { id: 14, value: 117199.95, label: "Mojitos", image: '/assets/product-5.png', },
    { id: 15, value: 47256.76, label: "Rolls", image: '/assets/product-5.png', },
  ];

  const disatch = useAppDispatch();

  useEffect(()=>{
    disatch(getProductCateMetrics())
  },[])

  const isLoading = useAppSelector((state) => state.global.pLoading);
  const data = useAppSelector((state) => state.global.ProductCate) || [];

 

  return (
    <Card sx={sx}>
      <CardHeader title="Top Products Analysis" />
      <Divider />
      {isLoading ? <>Loading...</>: 
      <List style={{maxHeight: '600px', overflow: 'auto'}} >
        {data.map((product : any, index) => (
          <ListItem divider={index < products.length - 1} key={product.CategoryID }>
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
            <Button variant='text' sx={{textAlign:'right'}} onClick={()=>disatch(getProductMetrics(Number(product.CategoryID)))} >₹{product.SalesValue}</Button>
          </ListItem>
        ))}
      </List>
       } 
      
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
