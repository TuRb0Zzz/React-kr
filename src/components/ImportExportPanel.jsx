import React, { useState, useRef } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import {
  Upload as UploadIcon,
  Download as DownloadIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
  Info as InfoIcon
} from '@mui/icons-material';
import { useSnackbar } from 'notistack';
import {
  sampleRoadmaps,
  transformImportedRoadmap,
  exportRoadmap,
  downloadFile
} from '../utils/roadmapUtils';

function ImportExportPanel({ technologies, onImportRoadmap }) {
  const [roadmapName, setRoadmapName] = useState('Моя дорожная карта');
  const [selectedSample, setSelectedSample] = useState('');
  const [importError, setImportError] = useState('');
  const [showImportDialog, setShowImportDialog] = useState(false);
  const [showExportDialog, setShowExportDialog] = useState(false);
  const fileInputRef = useRef(null);
  const { enqueueSnackbar } = useSnackbar();

  /**
   * Обработка импорта из файла
   */
  const handleFileImport = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        const transformedRoadmap = transformImportedRoadmap(data);
        
        onImportRoadmap(transformedRoadmap.technologies);
        enqueueSnackbar(`Импортировано ${transformedRoadmap.technologies.length} технологий`, { 
          variant: 'success' 
        });
        setImportError('');
        setShowImportDialog(false);
      } catch (error) {
        setImportError(`Ошибка импорта: ${error.message}`);
        enqueueSnackbar('Ошибка при импорте файла', { variant: 'error' });
      }
    };
    reader.readAsText(file);
    
    // Сбрасываем input
    event.target.value = '';
  };

  /**
   * Импорт из примера
   */
  const handleSampleImport = () => {
    if (!selectedSample) {
      enqueueSnackbar('Выберите дорожную карту для импорта', { variant: 'warning' });
      return;
    }

    const sample = sampleRoadmaps.find(r => r.name === selectedSample);
    if (sample) {
      const transformedRoadmap = transformImportedRoadmap(sample);
      onImportRoadmap(transformedRoadmap.technologies);
      enqueueSnackbar(`Импортирован пример: "${sample.name}"`, { variant: 'success' });
      setSelectedSample('');
    }
  };

  /**
   * Экспорт дорожной карты
   */
  const handleExport = () => {
    if (technologies.length === 0) {
      enqueueSnackbar('Нет технологий для экспорта', { variant: 'warning' });
      return;
    }

    const exportData = exportRoadmap(technologies, roadmapName);
    const fileName = `${roadmapName.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.json`;
    
    downloadFile(exportData, fileName);
    enqueueSnackbar('Дорожная карта успешно экспортирована', { variant: 'success' });
    setShowExportDialog(false);
  };

  /**
   * Открыть диалог импорта
   */
  const handleOpenImportDialog = () => {
    setShowImportDialog(true);
    setImportError('');
  };

  /**
   * Открыть диалог экспорта
   */
  const handleOpenExportDialog = () => {
    setRoadmapName('Моя дорожная карта');
    setShowExportDialog(true);
  };

  /**
   * Очистить все технологии
   */
  const handleClearAll = () => {
    if (window.confirm('Вы уверены, что хотите удалить все технологии?')) {
      onImportRoadmap([]);
      enqueueSnackbar('Все технологии удалены', { variant: 'info' });
    }
  };

  return (
    <>
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Импорт / Экспорт дорожных карт
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mt: 2 }}>
            <Button
              variant="contained"
              startIcon={<UploadIcon />}
              onClick={handleOpenImportDialog}
            >
              Импортировать
            </Button>

            <Button
              variant="outlined"
              startIcon={<DownloadIcon />}
              onClick={handleOpenExportDialog}
              disabled={technologies.length === 0}
            >
              Экспортировать
            </Button>

            <Button
              variant="text"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={handleClearAll}
              disabled={technologies.length === 0}
            >
              Очистить всё
            </Button>
          </Box>

          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            Импортируйте готовые дорожные карты или экспортируйте свой прогресс
          </Typography>
        </CardContent>
      </Card>

      {/* Диалог импорта */}
      <Dialog 
        open={showImportDialog} 
        onClose={() => setShowImportDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Импорт дорожной карты</DialogTitle>
        <DialogContent>
          {importError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {importError}
            </Alert>
          )}

          <Typography variant="subtitle1" gutterBottom>
            Импорт из файла
          </Typography>
          <Box sx={{ mb: 3 }}>
            <input
              type="file"
              accept=".json"
              onChange={handleFileImport}
              ref={fileInputRef}
              style={{ display: 'none' }}
            />
            <Button
              variant="outlined"
              onClick={() => fileInputRef.current?.click()}
              fullWidth
            >
              Выбрать JSON файл
            </Button>
            <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
              Поддерживается только JSON формат
            </Typography>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Typography variant="subtitle1" gutterBottom>
            Импорт из примеров
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 2 }}>
            <FormControl fullWidth>
              <InputLabel>Выберите пример</InputLabel>
              <Select
                value={selectedSample}
                label="Выберите пример"
                onChange={(e) => setSelectedSample(e.target.value)}
              >
                <MenuItem value="">
                  <em>Выберите дорожную карту</em>
                </MenuItem>
                {sampleRoadmaps.map((roadmap) => (
                  <MenuItem key={roadmap.name} value={roadmap.name}>
                    {roadmap.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button
              variant="contained"
              onClick={handleSampleImport}
              disabled={!selectedSample}
            >
              Импортировать
            </Button>
          </Box>

          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              Доступные примеры:
            </Typography>
            <List dense>
              {sampleRoadmaps.map((roadmap) => (
                <ListItem key={roadmap.name}>
                  <ListItemText
                    primary={roadmap.name}
                    secondary={`${roadmap.description} • ${roadmap.technologies.length} технологий`}
                  />
                </ListItem>
              ))}
            </List>
          </Box>

          <Alert severity="info" sx={{ mt: 2 }}>
            <Typography variant="body2">
              <strong>Формат JSON файла:</strong>
              <pre style={{ fontSize: '12px', marginTop: '8px' }}>
{`{
  "name": "Название карты",
  "description": "Описание",
  "technologies": [
    {
      "id": "уникальный_id",
      "title": "Название технологии",
      "description": "Описание",
      "category": "категория",
      "resources": ["ссылка1", "ссылка2"]
    }
  ]
}`}
              </pre>
            </Typography>
          </Alert>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowImportDialog(false)}>Отмена</Button>
        </DialogActions>
      </Dialog>

      {/* Диалог экспорта */}
      <Dialog 
        open={showExportDialog} 
        onClose={() => setShowExportDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Экспорт дорожной карты</DialogTitle>
        <DialogContent>
          <Typography variant="body2" gutterBottom sx={{ mb: 2 }}>
            Экспортируется {technologies.length} технологий
          </Typography>

          <TextField
            fullWidth
            label="Название дорожной карты"
            value={roadmapName}
            onChange={(e) => setRoadmapName(e.target.value)}
            margin="normal"
          />

          <Alert severity="info" sx={{ mt: 2 }}>
            <Typography variant="body2">
              В экспортированный файл будут включены:
              <ul>
                <li>Все технологии с текущими статусами</li>
                <li>Заметки пользователя</li>
                <li>Дополнительные ресурсы</li>
                <li>Дата экспорта</li>
              </ul>
            </Typography>
          </Alert>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowExportDialog(false)}>Отмена</Button>
          <Button variant="contained" onClick={handleExport}>
            Экспортировать
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ImportExportPanel;