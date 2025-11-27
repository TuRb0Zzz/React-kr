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
  Box
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

function AddTechnology({ onAddTechnology }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'frontend',
    status: 'not-started',
    notes: ''
  });
  
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.description.trim()) {
      enqueueSnackbar('Заполните обязательные поля', { variant: 'error' });
      return;
    }

    const newTech = onAddTechnology(formData);
    enqueueSnackbar('Технология успешно добавлена!', { variant: 'success' });
    
    setFormData({
      title: '',
      description: '',
      category: 'frontend',
      status: 'not-started',
      notes: ''
    });
    
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
              label="Название технологии *"
              name="title"
              value={formData.title}
              onChange={handleChange}
              margin="normal"
              required
            />
            
            <TextField
              fullWidth
              label="Описание *"
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