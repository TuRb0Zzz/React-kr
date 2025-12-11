import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
  TextField,
  IconButton,
  Collapse,
  Alert
} from '@mui/material';
import {
  ArrowBack,
  Link as LinkIcon,
  ExpandMore,
  ExpandLess,
  Add as AddIcon
} from '@mui/icons-material';

function TechnologyDetail({ technologies, onStatusChange }) {
  const { id } = useParams();
  const technology = technologies.find(tech => tech.id === parseInt(id));
  const [newResource, setNewResource] = useState('');
  const [expanded, setExpanded] = useState(true);
  const [showAddResource, setShowAddResource] = useState(false);

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

  const handleAddResource = () => {
    if (newResource.trim()) {
      // В реальном приложении здесь был бы вызов API для обновления технологии
      console.log('Добавлен ресурс:', newResource);
      setNewResource('');
      setShowAddResource(false);
    }
  };

  const allResources = [...(technology.resources || []), ...(technology.userResources || [])];

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
              size="medium"
            />
          </Box>

          <Box sx={{ display: 'flex', gap: 1, mb: 3, flexWrap: 'wrap' }}>
            <Chip 
              label={technology.category} 
              variant="outlined" 
              color="primary"
            />
            <Typography variant="body2" color="text.secondary">
              Добавлено: {new Date(technology.createdAt).toLocaleDateString('ru-RU')}
            </Typography>
            {technology.isImported && (
              <Chip 
                label="Импортировано" 
                variant="outlined" 
                color="secondary"
                size="small"
              />
            )}
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
                Мои заметки
              </Typography>
              <Typography variant="body1" paragraph sx={{ 
                p: 2, 
                bgcolor: 'action.hover', 
                borderRadius: 1,
                fontStyle: 'italic'
              }}>
                {technology.notes}
              </Typography>
            </>
          )}

          {/* Ресурсы для изучения */}
          <Box sx={{ mt: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="h6" gutterBottom>
                Ресурсы для изучения
                <Chip 
                  label={allResources.length} 
                  size="small" 
                  sx={{ ml: 1 }}
                />
              </Typography>
              <IconButton onClick={() => setExpanded(!expanded)} size="small">
                {expanded ? <ExpandLess /> : <ExpandMore />}
              </IconButton>
            </Box>
            
            <Collapse in={expanded}>
              {allResources.length > 0 ? (
                <List dense>
                  {allResources.map((resource, index) => (
                    <ListItem 
                      key={index}
                      sx={{ 
                        borderBottom: index < allResources.length - 1 ? '1px solid' : 'none',
                        borderColor: 'divider',
                        py: 1
                      }}
                    >
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <LinkIcon fontSize="small" color="action" />
                            <a 
                              href={resource} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              style={{ 
                                color: 'inherit',
                                textDecoration: 'none',
                                '&:hover': { textDecoration: 'underline' }
                              }}
                            >
                              {resource}
                            </a>
                          </Box>
                        }
                        secondary={
                          index < (technology.resources?.length || 0) 
                            ? 'Исходный ресурс' 
                            : 'Добавлен пользователем'
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Alert severity="info" sx={{ mt: 1 }}>
                  Ресурсы для изучения не добавлены
                </Alert>
              )}

              {/* Добавление нового ресурса */}
              <Box sx={{ mt: 2 }}>
                {showAddResource ? (
                  <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-start' }}>
                    <TextField
                      fullWidth
                      size="small"
                      placeholder="https://example.com/resource"
                      value={newResource}
                      onChange={(e) => setNewResource(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleAddResource()}
                    />
                    <Button
                      variant="contained"
                      size="small"
                      onClick={handleAddResource}
                      disabled={!newResource.trim()}
                    >
                      Добавить
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => {
                        setShowAddResource(false);
                        setNewResource('');
                      }}
                    >
                      Отмена
                    </Button>
                  </Box>
                ) : (
                  <Button
                    startIcon={<AddIcon />}
                    variant="outlined"
                    size="small"
                    onClick={() => setShowAddResource(true)}
                  >
                    Добавить ресурс
                  </Button>
                )}
              </Box>
            </Collapse>
          </Box>

          <Box sx={{ mt: 4, pt: 2, borderTop: 1, borderColor: 'divider' }}>
            <Typography variant="h6" gutterBottom>
              Изменить статус
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              <Button
                variant={technology.status === 'not-started' ? 'contained' : 'outlined'}
                onClick={() => onStatusChange(technology.id, 'not-started')}
                color={technology.status === 'not-started' ? 'primary' : 'inherit'}
              >
                Не начато
              </Button>
              <Button
                variant={technology.status === 'in-progress' ? 'contained' : 'outlined'}
                onClick={() => onStatusChange(technology.id, 'in-progress')}
                color={technology.status === 'in-progress' ? 'warning' : 'inherit'}
              >
                В процессе
              </Button>
              <Button
                variant={technology.status === 'completed' ? 'contained' : 'outlined'}
                onClick={() => onStatusChange(technology.id, 'completed')}
                color={technology.status === 'completed' ? 'success' : 'inherit'}
              >
                Завершено
              </Button>
            </Box>
          </Box>

          <Box sx={{ mt: 3, display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
            <Button 
              variant="outlined" 
              component={Link}
              to={`/technologies`}
            >
              К списку технологий
            </Button>
            <Button 
              variant="contained"
              component={Link}
              to={`/add`}
            >
              Добавить похожую
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}

export default TechnologyDetail;