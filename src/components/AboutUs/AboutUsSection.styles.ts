import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';

export const AboutUsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  gap: theme.spacing(4),
  padding: theme.spacing(8, 4),
  alignItems: 'flex-start',
  backgroundColor: '#dcc7bd',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    padding: theme.spacing(2),
  },
}));

export const TextContainer = styled(Box)(() => ({
  flex: '1',
  minWidth: '300px',
}));

export const Title = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  fontSize: '45px',
  color: '#000',
  [theme.breakpoints.down('sm')]: {
    fontSize: '36px',
  },
}));

export const Paragraph = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  fontWeight: 300,
  fontSize: '30px',
  color: '#000',
  [theme.breakpoints.down('sm')]: {
    fontSize: '18px',
  },
}));

export const ImagesContainer = styled(Box)(({ theme }) => ({
  flex: '1',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  alignItems: 'flex-end',
}));

export const RectImage = styled('img')(() => ({
  width: '80%',
  borderRadius: '8px',
  objectFit: 'cover',
}));

export const ArchImage = styled('img')(() => ({
  width: '60%',
  height: 'auto',
  objectFit: 'cover',
  borderTopLeftRadius: '50%',
  borderTopRightRadius: '50%',
  overflow: 'hidden',
}));
