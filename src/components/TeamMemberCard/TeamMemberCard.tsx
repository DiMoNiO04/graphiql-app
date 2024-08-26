import { Card, CardContent, Avatar, Typography } from '@mui/material';
import React from 'react';

const TeamMemberCard = ({ src, alt, name }: { src: string; alt: string; name: string }) => {
  return (
    <Card sx={{ width: '21rem' }}>
      <CardContent sx={{ alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
        <Avatar src={src} alt={alt} sx={{ width: 150, height: 150 }} />
        <Typography
          variant="h5"
          component="p"
          sx={{
            color: '#000000',
            padding: '0.5rem 0',
            textAlign: 'center',
            fontWeight: 600,
          }}
        >
          {name}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default TeamMemberCard;
