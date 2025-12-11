import React, { useState } from 'react';
import {
  Container,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Chip
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

function AddTechnology({ onAddTechnology }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'frontend',
    status: 'not-started',
    notes: '',
    resources: ''
  });
  
  const [resourceInput, setResourceInput] = useState('');
  const [resources, setResources] = useState([]);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddResource = () => {
    if (resourceInput.trim()) {
      setResources([...resources, resourceInput.trim()]);
      setResourceInput('');
    }
  };

  const handleRemoveResource = (index) => {
    setResources(resources.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.description.trim()) {
      enqueueSnackbar('Заполните обязательные поля', { variant: 'error' });
      return;
    }

    const techData = {
      ...formData,
      resources: resources,
      userResources: []
    };

    const newTech = onAddTechnology(techData);
    enqueueSnackbar('Технология успешно добавлена!', { variant: 'success' });
    
    // Сброс формы
    setFormData({
      title: '',
      description: '',
      category: 'frontend',
      status: 'not-started',
      notes: '',
      resources: ''
    });
    setResources([]);
    setResourceInput('');
    
    navigate('/technologies');
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Добавить новую технологию
      </Typography>
      
      <Card>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Название технологии"
              name="title"
              value={formData.title}
              onChange={handleChange}
              margin="normal"
              required
            />
            
            <TextField
              fullWidth
              label="Описание"
              name="description"
              value={formData.description}
              onChange={handleChange}
              margin="normal"
              multiline
              rows={4}
              required
            />
            
            <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
              <FormControl fullWidth>
                <InputLabel>Категория</InputLabel>
                <Select
                  name="category"
                  value={formData.category}
                  label="Категория"
                  onChange={handleChange}
                >
                  <MenuItem value="frontend">Frontend</MenuItem>
                  <MenuItem value="backend">Backend</MenuItem>
                  <MenuItem value="database">Базы данных</MenuItem>
                  <MenuItem value="ui-library">UI Библиотеки</MenuItem>
                  <MenuItem value="mobile">Мобильная разработка</MenuItem>
                  <MenuItem value="devops">DevOps</MenuItem>
                  <MenuItem value="other">Другое</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel>Статус</InputLabel>
                <Select
                  name="status"
                  value={formData.status}
                  label="Статус"
                  onChange={handleChange}
                >
                  <MenuItem value="not-started">Не начато</MenuItem>
                  <MenuItem value="in-progress">В процессе</MenuItem>
                  <MenuItem value="completed">Завершено</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                Ресурсы для изучения
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                <TextField
                  fullWidth
                  placeholder="https://example.com/resource"
                  value={resourceInput}
                  onChange={(e) => setResourceInput(e.target.value)}
                  size="small"
                />
                <Button
                  variant="outlined"
                  onClick={handleAddResource}
                  disabled={!resourceInput.trim()}
                >
                  Добавить
                </Button>
              </Box>
              
              {resources.length > 0 && (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                  {resources.map((resource, index) => (
                    <Chip
                      key={index}
                      label={resource.length > 30 ? resource.substring(0, 30) + '...' : resource}
                      onDelete={() => handleRemoveResource(index)}
                      color="primary"
                      variant="outlined"
                    />
                  ))}
                </Box>
              )}
            </Box>

            <TextField
              fullWidth
              label="Заметки (необязательно)"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              margin="normal"
              multiline
              rows={3}
            />

            <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
              <Button 
                type="submit" 
                variant="contained" 
                size="large"
              >
                Добавить технологию
              </Button>
              <Button 
                variant="outlined" 
                onClick={() => navigate('/technologies')}
              >
                Отмена
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
}

export default AddTechnology;