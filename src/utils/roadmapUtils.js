/**
 * Утилиты для работы с дорожными картами
 */

// Стандартная структура JSON для дорожных карт
export const roadmapSchema = {
  version: '1.0.0',
  name: 'Название дорожной карты',
  description: 'Описание дорожной карты',
  category: 'frontend|backend|database|etc',
  technologies: [
    {
      id: 'уникальный_идентификатор',
      title: 'Название технологии',
      description: 'Описание для изучения',
      category: 'Категория',
      resources: ['ссылка1', 'ссылка2'],
      // Пользовательские поля (заполняются позже)
      status: 'not-started|in-progress|completed',
      notes: 'Заметки пользователя',
      userResources: ['дополнительные_ссылки']
    }
  ]
};

/**
 * Генерация уникального ID для технологии
 */
export const generateTechId = () => {
  return 'tech_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
};

/**
 * Валидация импортируемого файла дорожной карты
 */
export const validateRoadmap = (data) => {
  if (!data.name || !data.description || !Array.isArray(data.technologies)) {
    throw new Error('Некорректная структура файла дорожной карты');
  }

  if (!data.technologies.length) {
    throw new Error('Дорожная карта не содержит технологий');
  }

  return true;
};

/**
 * Преобразование импортированной дорожной карты в формат приложения
 */
export const transformImportedRoadmap = (roadmapData) => {
  validateRoadmap(roadmapData);

  return {
    id: Date.now(),
    name: roadmapData.name,
    description: roadmapData.description,
    category: roadmapData.category || 'other',
    technologies: roadmapData.technologies.map(tech => ({
      id: tech.id || generateTechId(),
      title: tech.title,
      description: tech.description,
      category: tech.category || roadmapData.category || 'other',
      resources: tech.resources || [],
      status: 'not-started',
      notes: '',
      userResources: [],
      createdAt: new Date().toISOString(),
      isImported: true,
      originalId: tech.id
    }))
  };
};

/**
 * Экспорт дорожной карты в JSON
 */
export const exportRoadmap = (technologies, roadmapName = 'Моя дорожная карта') => {
  const exportData = {
    version: '1.0.0',
    name: roadmapName,
    description: `Дорожная карта экспортирована ${new Date().toLocaleDateString()}`,
    category: 'mixed',
    technologies: technologies.map(tech => ({
      id: tech.originalId || tech.id,
      title: tech.title,
      description: tech.description,
      category: tech.category,
      resources: tech.resources || [],
      status: tech.status,
      notes: tech.notes || '',
      userResources: tech.userResources || []
    }))
  };

  return JSON.stringify(exportData, null, 2);
};

/**
 * Скачивание файла
 */
export const downloadFile = (content, fileName, contentType = 'application/json') => {
  const blob = new Blob([content], { type: contentType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

/**
 * Примеры готовых дорожных карт
 */
export const sampleRoadmaps = [
  {
    name: 'Frontend Developer Roadmap 2024',
    description: 'Полный путь изучения фронтенд разработки',
    category: 'frontend',
    technologies: [
      {
        id: 'fe_1',
        title: 'HTML & CSS',
        description: 'Основы верстки и стилизации',
        category: 'frontend',
        resources: ['https://developer.mozilla.org/ru/docs/Learn/HTML', 'https://developer.mozilla.org/ru/docs/Learn/CSS']
      },
      {
        id: 'fe_2',
        title: 'JavaScript',
        description: 'Основы программирования на JavaScript',
        category: 'frontend',
        resources: ['https://learn.javascript.ru/']
      },
      {
        id: 'fe_3',
        title: 'React',
        description: 'Библиотека для создания пользовательских интерфейсов',
        category: 'frontend',
        resources: ['https://react.dev/learn']
      }
    ]
  },
  {
    name: 'Backend Developer Roadmap',
    description: 'Путь изучения серверной разработки',
    category: 'backend',
    technologies: [
      {
        id: 'be_1',
        title: 'Node.js',
        description: 'Среда выполнения JavaScript на сервере',
        category: 'backend',
        resources: ['https://nodejs.org/en/docs/']
      },
      {
        id: 'be_2',
        title: 'Express.js',
        description: 'Фреймворк для создания веб-приложений на Node.js',
        category: 'backend',
        resources: ['https://expressjs.com/']
      },
      {
        id: 'be_3',
        title: 'Базы данных (SQL)',
        description: 'Изучение реляционных баз данных',
        category: 'database',
        resources: ['https://www.postgresql.org/docs/']
      }
    ]
  }
];