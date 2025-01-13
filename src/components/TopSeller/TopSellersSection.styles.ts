import { styled } from '@mui/material/styles';
import { Box, Typography, IconButton } from '@mui/material';

// Контейнер для секции с букетами
export const BouquetSectionContainer = styled(Box)(({ theme }) => ({
  position: 'relative', // Устанавливает относительное позиционирование для дальнейшего позиционирования вложенных элементов
  padding: theme.spacing(40, 2), // Добавляет отступы внутри контейнера
  backgroundColor: '#fff', // Устанавливает цвет фона
  minHeight: '100vh', // Высота секции равна высоте экрана
  display: 'flex', // Использует flexbox для упрощения выравнивания
  flexDirection: 'column', // Располагает дочерние элементы по вертикали
  justifyContent: 'center', // Центрирует элементы по вертикали
  alignItems: 'center', // Центрирует элементы по горизонтали
}));

// Заголовок секции
export const SectionTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(4), // Отступ снизу для создания пространства между заголовком и контентом
  textAlign: 'center', // Выравнивание текста по центру
  fontFamily: 'Roboto, sans-serif', // Шрифт заголовка
  fontWeight: 300, // Тонкое начертание текста
  fontSize: '2.5rem', // Размер шрифта
  color: '#000', // Чёрный цвет текста
}));

// Обёртка для карточек
export const CardsWrapper = styled(Box)(({ theme }) => ({
  display: 'flex', // Использует flexbox для создания горизонтального ряда
  gap: theme.spacing(3), // Промежутки между карточками
  overflow: 'hidden', // Обрезает содержимое, выходящее за пределы обёртки
  justifyContent: 'center', // Выравнивает карточки по центру по горизонтали
  alignItems: 'center', // Выравнивает карточки по центру по вертикали
}));

// Кнопки со стрелками для навигации
export const ArrowButton = styled(IconButton, {
  // Фильтрация свойства direction, чтобы оно не передавалось в DOM
  shouldForwardProp: (prop) => prop !== 'direction',
})<{ direction?: 'left' | 'right' }>(({ theme, direction }) => ({
  position: 'absolute', // Абсолютное позиционирование для размещения кнопки на уровне карточек
  top: '50%', // Размещение кнопки по вертикали на середине контейнера
  [direction === 'left' ? 'left' : 'right']: theme.spacing(2), // Определение позиции кнопки слева или справа в зависимости от свойства direction
  transform: 'translateY(-50%)', // Смещение по вертикали для точного центрирования
  backgroundColor: 'transparent', // Прозрачный фон кнопки
  color: '#fff', // Белый цвет иконки стрелки
  border: 'none', // Убирает границы кнопки
  '&:hover': { // Стили для кнопки при наведении
    backgroundColor: 'transparent', // Сохраняет прозрачный фон при наведении
    color: '#f0f0f0', // Изменяет цвет иконки на светло-серый
  },
}));
