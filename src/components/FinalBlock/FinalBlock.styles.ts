import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';

export const FinalBlockContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: '40px',
  padding: '60px',
  backgroundColor: '#E2DCD3',
  alignItems: 'flex-start',
  flexDirection: 'row',

  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column-reverse',
    padding: '20px',
  },
}));

export const ImagesContainer = styled(Box)({
  flex: '1',
  display: 'flex',
  flexDirection: 'column-reverse',
  gap: '20px',
});

export const StyledImage = styled('img')(({ theme }) => ({
  width: '80%',
  borderRadius: '8px',

  [theme.breakpoints.down('sm')]: {
    width: '100%',
  },
}));

export const TextContainer = styled(Box)({
  flex: '1',
  minWidth: '300px',
});

export const Title = styled(Typography)(({ theme }) => ({
  marginBottom: '20px',

  [theme.breakpoints.down('sm')]: {
    fontSize: '45px',
  },
}));

export const Paragraph = styled(Typography)(({ theme }) => ({
  marginBottom: '10px',
  fontWeight: 300,
  fontSize: '30px',

  [theme.breakpoints.down('sm')]: {
    fontSize: '18px',
  },
}));
