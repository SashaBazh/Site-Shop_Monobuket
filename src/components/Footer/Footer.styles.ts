import { styled } from '@mui/material/styles';
import { Box, Link } from '@mui/material';

export const FooterContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(4, 2),
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(4),
}));

export const FooterTop = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  gap: theme.spacing(4),
  flexWrap: 'wrap',
}));

export const Logo = styled('img')(({ theme }) => ({
  height: '40px',
}));

export const NavLink = styled(Link)(({ theme }) => ({
  display: 'block',
  color: theme.palette.text.primary,
  textDecoration: 'none',
  marginBottom: theme.spacing(1),
  '&:hover': {
    color: theme.palette.primary.main,
  },
}));

export const SocialIconsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
}));

export const SocialIcon = styled('img')(({ theme }) => ({
  width: '24px',
  height: '24px',
  cursor: 'pointer',
}));



export const FooterBottom = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
  fontSize: '14px',
  color: theme.palette.text.secondary,
}));
