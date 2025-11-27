import React from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Chip,
  Divider
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';

function TechnologyDetail({ technologies, onStatusChange }) {
  const { id } = useParams();
  const technology = technologies.find(tech => tech.id === parseInt(id));

  if (!technology) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Технология не найдена
        </Typography>
        <Button component={Link} to="/technologies" startIcon={<ArrowBack />}>
          Назад к списку
        </Button>
      </Container>
    );
  }

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
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Button 
        component={Link} 
        to="/technologies" 
        startIcon={<ArrowBack />}
        sx={{ mb: 2 }}
      >
        Назад к списку
      </Button>

      <Card>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
            <Typography variant="h4" component="h1">
              {technology.title}
            </Typography>
            <Chip 
              label={getStatusText(technology.status)} 
              color={getStatusColor(technology.status)}
              variant="filled"
            />
          </Box>

          <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
            <Chip label={technology.category} variant="outlined" />
            <Typography variant="body2" color="text.secondary">
              Добавлено: {new Date(technology.createdAt).toLocaleDateString()}
            </Typography>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Typography variant="h6" gutterBottom>
            Описание
          </Typography>
          <Typography variant="body1" paragraph>
            {technology.description}
          </Typography>

          {technology.notes && (
            <>
              <Typography variant="h6" gutterBottom>
                Заметки
              </Typography>
              <Typography variant="body1" paragraph>
                {technology.notes}
              </Typography>
            </>
          )}

          <Box sx={{ mt: 3, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            <Button
              variant={technology.status === 'not-started' ? 'contained' : 'outlined'}
              onClick={() => onStatusChange(technology.id, 'not-started')}
            >
              Не начато
            </Button>
            <Button
              variant={technology.status === 'in-progress' ? 'contained' : 'outlined'}
              onClick={() => onStatusChange(technology.id, 'in-progress')}
            >
              В процессе
            </Button>
            <Button
              variant={technology.status === 'completed' ? 'contained' : 'outlined'}
              onClick={() => onStatusChange(technology.id, 'completed')}
            >
              Завершено
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}

export default TechnologyDetail;