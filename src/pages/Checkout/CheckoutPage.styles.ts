import { styled } from '@mui/material/styles';
import { Container, Paper, Button, Box, Typography } from '@mui/material';

export const StyledContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4)
}));

export const PageTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  fontWeight: 300
}));

export const OrderPaper = styled(Paper)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  padding: theme.spacing(3)
}));

export const SectionTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  fontWeight: 300
}));

export const ProductImage = styled('img')({
  width: 80,
  height: 80,
  borderRadius: 8,
  objectFit: 'cover'
});

export const ListItemContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 16
});

export const PriceText = styled('span')({
  fontWeight: 500
});

export const FormGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gap: theme.spacing(2)
}));

export const DeliveryFormSection = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
  display: 'grid',
  gap: theme.spacing(2)
}));

export const SubmitButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: '#B07889',
  color: '#000',
  '&:hover': {
    backgroundColor: '#FFB5C1'
  },
  fontWeight: 300,
  textTransform: 'none'
}));

export const BackButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: '#D99B96', // Сделано темнее
  color: '#8A5A63', // Соответствующее затемнение текста
  '&:hover': {
    backgroundColor: '#C08884' // Темнее при наведении
  },
  fontWeight: 300,
  textTransform: 'none',
  marginTop: theme.spacing(2)
}));
