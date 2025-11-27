import React, { useState } from 'react';
import {
  Container,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography
} from '@mui/material';
import SimpleTechCard from '../components/SimpleTechCard';

function TechnologyList({ technologies, onStatusChange, onDelete }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const filteredTechnologies = technologies.filter(tech => {
    const matchesSearch = tech.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tech.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || tech.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || tech.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const categories = [...new Set(technologies.map(tech => tech.category))];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Все технологии
      </Typography>
      
      <Box sx={{ mb: 3, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <TextField
          label="Поиск технологий"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ minWidth: 200 }}
        />
        
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Статус</InputLabel>
          <Select
            value={statusFilter}
            label="Статус"
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <MenuItem value="all">Все</MenuItem>
            <MenuItem value="not-started">Не начато</MenuItem>
            <MenuItem value="in-progress">В процессе</MenuItem>
            <MenuItem value="completed">Завершено</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Категория</InputLabel>
          <Select
            value={categoryFilter}
            label="Категория"
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <MenuItem value="all">Все</MenuItem>
            {categories.map(category => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Typography variant="body1" sx={{ mb: 2 }}>
        Найдено: {filteredTechnologies.length} технологий
      </Typography>

      <Grid container spacing={3}>
        {filteredTechnologies.map(tech => (
          <Grid item xs={12} sm={6} md={4} key={tech.id}>
            <SimpleTechCard 
              technology={tech} 
              onStatusChange={onStatusChange}
            />
          </Grid>
        ))}
      </Grid>

      {filteredTechnologies.length === 0 && (
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="h6" color="text.secondary">
            Технологии не найдены
          </Typography>
        </Box>
      )}
    </Container>
  );
}

export default TechnologyList;