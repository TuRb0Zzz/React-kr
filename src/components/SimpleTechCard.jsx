import React from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip,
  Box
} from '@mui/material';

function SimpleTechCard({ technology, onStatusChange }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'success';
      case 'in-progress': return 'warning';
      default: return 'default';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'completed': return 'Завершено';
      case 'in-progress': return 'В процессе';
      default: return 'Не начато';
    }
  };

  return (
    <Card sx={{ 
      height: '100%',           // Занимаем всю высоту контейнера
      display: 'flex',          // Flexbox для выравнивания
      flexDirection: 'column',  // Вертикальное расположение
    }}>
      <CardContent sx={{ flexGrow: 1 }}> {/* Контент растягивается */}
        <Typography 
          variant="h6" 
          component="h2" 
          gutterBottom
          sx={{ 
            minHeight: '64px',  // Фиксированная высота заголовка
            display: '-webkit-box',
            WebkitLineClamp: 2,  // Максимум 2 строки
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}
        >
          {technology.title}
        </Typography>

        <Typography 
          variant="body2" 
          color="text.secondary" 
          sx={{ 
            mb: 2,
            minHeight: '60px',  // Фиксированная высота описания
            display: '-webkit-box',
            WebkitLineClamp: 3,  // Максимум 3 строки
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}
        >
          {technology.description}
        </Typography>

        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          <Chip
            label={technology.category}
            variant="outlined"
            size="small"
          />
          <Chip
            label={getStatusText(technology.status)}
            color={getStatusColor(technology.status)}
            size="small"
          />
        </Box>
      </CardContent>

      <CardActions>
        {technology.status !== 'completed' && (
          <Button
            size="small"
            variant="contained"
            onClick={() => onStatusChange(technology.id, 'completed')}
            sx={{ flexGrow: 1 }}  // Растягиваем кнопки
          >
            Завершить
          </Button>
        )}

        <Button
          size="small"
          variant="outlined"
          onClick={() => onStatusChange(technology.id,
            technology.status === 'in-progress' ? 'not-started' : 'in-progress')}
          sx={{ flexGrow: 1 }}  // Растягиваем кнопки
        >
          {technology.status === 'in-progress' ? 'Приостановить' : 'Начать'}
        </Button>
      </CardActions>
    </Card>
  );
}

export default SimpleTechCard;