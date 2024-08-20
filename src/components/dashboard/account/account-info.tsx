'use client'
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useUser } from '@/hooks/use-user';

const users = {
  name: 'Sofia Rivers',
  avatar: 'http://cafemgr.benmoredata.com/uploads/images/IMG_20240820_111101.png',
  jobTitle: 'Senior Developer',
  country: 'USA',
  city: 'Los Angeles',
  timezone: 'GTM-7',
} as const;

export function AccountInfo(): React.JSX.Element {

  const { user } = useUser()

  const userDetail = user || {}
  console.log("🚀 ~ Page ~ user:", user)
  return (
    <Card>
      <CardContent>
        <Stack spacing={2} sx={{ alignItems: 'center' }}>
          <div>
            <Avatar src={`http://cafemgr.benmoredata.com/uploads/images/${userDetail.EMP_IMAGENAME}`} sx={{ height: '80px', width: '80px' }} />
          </div>
          <Stack spacing={1} sx={{ textAlign: 'center' }}>
            <Typography variant="h5">{userDetail.EMP_NAME}</Typography>
            <Typography color="text.secondary" variant="body2">
              {userDetail.EMP_PERMANENTADDRESS} 
            </Typography>
            <Typography color="text.secondary" variant="body2">
              {userDetail.EMP_CODE}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
      <Divider />
      <CardActions>
        <Button fullWidth variant="text">
          Upload picture
        </Button>
      </CardActions>
    </Card>
  );
}
