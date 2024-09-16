import { Card, CardContent, Avatar, Typography, Box, Stack } from '@mui/material';
import React from 'react';
import CheckSharpIcon from '@mui/icons-material/CheckSharp';

const TeamMemberCard = ({
  src,
  alt,
  name,
  contribution,
}: {
  src: string;
  alt: string;
  name: string;
  contribution: string;
}) => {
  return (
    <Card
      sx={{
        width: '18rem',
        backgroundColor: '#f3f8f3',
        transform: 'scale(1)',
        transition: 'all 0.2s linear',
        marginTop: 3,
        '&:hover': {
          transform: 'scale(1.1)',
          boxShadow: '0 10px 20px #26323814',
        },
      }}
    >
      <CardContent sx={{ alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
        <Avatar src={src} alt={alt} sx={{ width: 150, height: 150 }} />
        <Typography
          variant="h5"
          component="p"
          sx={{
            color: '#197ccb',
            opacity: 0.8,
            padding: '0.5rem 0 1rem 0',
            textAlign: 'center',
            fontWeight: 600,
          }}
        >
          {name}
        </Typography>
        <Stack>
          {contribution.split(',').map((index) => {
            return (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  columnGap: 1,
                  justifyContent: 'flex-start',
                }}
              >
                <CheckSharpIcon />
                <Typography>{index}</Typography>
              </Box>
            );
          })}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default TeamMemberCard;
