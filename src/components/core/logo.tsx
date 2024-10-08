'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import { useColorScheme } from '@mui/material/styles';

import { NoSsr } from '@/components/core/no-ssr';
import { Typography } from '@mui/material';

const HEIGHT = 60;
const WIDTH = 60;

type Color = 'dark' | 'light';

export interface LogoProps {
  color?: Color;
  emblem?: boolean;
  height?: number;
  width?: number;
}

export function Logo({ color = 'light', emblem, height = HEIGHT, width = WIDTH }: LogoProps): React.JSX.Element {
  let url: string;

  if (emblem) {
    url = color === 'light' ? '/assets/logo-emblem.svg' : '/assets/logo-emblem--dark.svg';
  } else {
    url = color === 'light' ? '/assets/Logo.png' : '/assets/Logo.png';
  }

  return <Box alt="logo" component="img" height={height} src={url} width={width} />;
}

export interface DynamicLogoProps {
  colorDark?: Color;
  colorLight?: Color;
  emblem?: boolean;
  height?: number;
  width?: number;
}

export function DynamicLogo({
  colorDark = 'light',
  colorLight = 'dark',
  height = HEIGHT,
  width = WIDTH,
  ...props
}: DynamicLogoProps): React.JSX.Element {
  const { colorScheme } = useColorScheme();
  const color = colorScheme === 'dark' ? colorDark : colorLight;

  return (
    <NoSsr fallback={<Box sx={{ height: `${height}px`, width: `${width}px` }} />}>
      <Logo color={color} height={height} width={width}  />
    </NoSsr>
  );
}
export default function CenteredLogoPage(): React.JSX.Element {
  return (
    <Box
      sx={{
        height: '100vh',             // Full viewport height
        width: '100vw',              // Full viewport width
        display: 'flex',             // Flexbox layout
        justifyContent: 'center',    // Center horizontally
        alignItems: 'center',        // Center vertically
        backgroundColor: '#f0f0f0',  // Optional background color
      }}
    >
      <DynamicLogo height={120} width={120} /> {/* Adjust size as needed */}
    </Box>
  );
}
