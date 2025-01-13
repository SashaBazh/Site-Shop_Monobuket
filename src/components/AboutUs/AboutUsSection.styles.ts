import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';

export const AboutUsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(4),
  padding: theme.spacing(8, 4),
  alignItems: 'flex-start',
  backgroundColor: theme.palette.background.default,
}));

export const TextContainer = styled(Box)(({ theme }) => ({
  flex: '1',
}));

export const Title = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  color: '#000'
}));

export const Paragraph = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  color: '#000'
}));

export const ImagesContainer = styled(Box)(({ theme }) => ({
  flex: '1',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  alignItems: 'flex-end',
}));

export const RectImage = styled('img')(({ theme }) => ({
  width: '80%',
  height: 'auto',
  objectFit: 'cover',
}));

export const ArchImage = styled('img')(({ theme }) => ({
  width: '60%',
  height: 'auto',
  objectFit: 'cover',
  borderTopLeftRadius: '50%',
  borderTopRightRadius: '50%',
  overflow: 'hidden',
}));
