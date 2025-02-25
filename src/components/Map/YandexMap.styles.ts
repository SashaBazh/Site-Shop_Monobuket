import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export const YandexMapContainer = styled(Box)(() => ({
  width: '100%',
  height: '100%',
  '.yandex-map-container': {
    position: 'relative',
    width: '100%',
    height: '100%',
  },
}));
