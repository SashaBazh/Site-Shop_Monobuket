import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';

export const AboutContainer = styled(Box)({
  width: '100%',
  textAlign: 'center',
});

export const PageWrapper = styled(Box)({
  backgroundColor: '#dcc7bd',
  width: '100%',
});

export const ContentWrapper = styled(Box)({
  width: '100%',
  padding: '0 20px',
  boxSizing: 'border-box',
  '@media (max-width: 768px)': {
    padding: '0 0px 0 0px',
  },
});

export const SectionTitle = styled(Typography)({
  margin: '20px 0',
  fontSize: '50px',
  fontWeight: '200',
});

export const SectionSubtitle = styled(Typography)({
  margin: '30px 0 10px',
  fontSize: '36px',
  fontWeight: '300',
});

export const SectionSubtitle1 = styled(Typography)({
  margin: '30px 0 100px',
  fontSize: '36px',
  fontWeight: '300',
  '@media (max-width: 768px)': {
    margin: '0 0px 0 0px',
  },
});

export const SectionText = styled(Typography)(({ theme }) => ({
  margin: '0 0 20px 0',
  fontSize: '28px',
  fontWeight: '300',
  lineHeight: '1.5',
  padding: "0 130px 0 130px", 
  
  [theme.breakpoints.down('sm')]: {
    padding: '0 20px 0 20px',
    fontSize: '24px',
},
}));

export const AboutImage = styled('img')({
  width: '100%',
  height: 'auto',
  display: 'block',
  margin: '20px 0',
  padding: "0 40px 0 40px",

  '@media (max-width: 768px)': {
    padding: '0 0px 0 0px',
  },
});

export const AboutImage1 = styled('img')({
  width: '100%',
  height: 'auto',
  display: 'block',
  margin: '20px 0',
  padding: "0 40px 0 40px",

  '@media (max-width: 768px)': {
    padding: '0 0px 0 0px',
    margin: '0px 0',
  },
});

export const CircleItem = styled(Box)({
  width: '100px',
  height: '100px',
  backgroundColor: '#E89FB3',
  borderRadius: '50%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  margin: '10px auto',
  
});

export const CircleText = styled(Typography)({
    fontColor: '#fff',
    fontSize: '32px',
    fontWeight: '700',
    fontFamily: 'Rozha One, serif',
 
    });

export const CircleText1 = styled(Typography)({
  fontColor: '#fff',
  fontSize: '25px',
  fontWeight: '300',
  margin: '0PX 0 100PX 0 ',
  
  '@media (max-width: 768px)': {
    margin: '0px 0',
    
  },
});

export const MainText = styled(Typography)({
  marginBottom: "10px",
  fontWeight: 300,
  fontSize: "30px",
  padding: "10px",
  "@media (max-width: 600px)": {
    fontSize: "18px",
  },
});

export const SubtitleText = styled(Typography)({
  marginBottom: "10px",
  fontWeight: 300,
  fontSize: "36px",
  padding: "10px",
  "@media (max-width: 600px)": {
    fontSize: "30px",
  },
});

export const CircleTextStyled = styled(Typography)({
  marginBottom: "10px",
  fontWeight: 300,
  fontSize: "25px",
  padding: "10px",
  "@media (max-width: 600px)": {
    fontSize: "20px",
  },
});