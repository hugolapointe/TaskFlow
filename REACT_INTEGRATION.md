# ?? Guide d'intégration React + Tailwind avec TaskFlow API

Ce guide montre comment créer un front-end React avec Tailwind CSS qui consomme l'API TaskFlow.

## ?? Configuration du projet React

### 1. Créer le projet avec Vite

```bash
npm create vite@latest taskflow-app -- --template react
cd taskflow-app
npm install
```

### 2. Installer Tailwind CSS

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### 3. Configurer Tailwind (`tailwind.config.js`)

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### 4. Ajouter les directives Tailwind (`src/index.css`)

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## ?? Service API (src/services/todoService.js)

```javascript
const API_BASE_URL = 'https://localhost:5001/api';

class TodoService {
  // Récupérer les tâches avec pagination et filtres
  async getTodos({ page = 1, pageSize = 10, sortBy = 'CreatedAt', isPriority, isCompleted } = {}) {
    const params = new URLSearchParams({
      page: page.toString(),
      pageSize: pageSize.toString(),
      sortBy
    });

    if (isPriority !== undefined) params.append('isPriority', isPriority);
    if (isCompleted !== undefined) params.append('isCompleted', isCompleted);

    const response = await fetch(`${API_BASE_URL}/todos?${params}`);
    if (!response.ok) throw new Error('Erreur lors du chargement des tâches');
    return await response.json();
  }

  // Récupérer une tâche par ID
  async getTodoById(id) {
    const response = await fetch(`${API_BASE_URL}/todos/${id}`);
    if (!response.ok) throw new Error('Tâche introuvable');
    return await response.json();
  }

  // Créer une nouvelle tâche
  async createTodo({ description, dueDate, isPriority = false }) {
    const response = await fetch(`${API_BASE_URL}/todos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ description, dueDate, isPriority })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Erreur lors de la création');
    }

    return await response.json();
  }

  // Mettre à jour la description
  async updateDescription(id, description) {
    const response = await fetch(`${API_BASE_URL}/todos/${id}/description`, {
      method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value: description })
    });

    if (!response.ok) throw new Error('Erreur lors de la mise à jour');
    return await response.json();
  }

  // Mettre à jour la date d'échéance
  async updateDueDate(id, dueDate) {
    const response = await fetch(`${API_BASE_URL}/todos/${id}/due-date`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value: dueDate })
    });

    if (!response.ok) throw new Error('Erreur lors de la mise à jour');
    return await response.json();
  }

  // Basculer la priorité
  async togglePriority(id) {
    const response = await fetch(`${API_BASE_URL}/todos/${id}/toggle-priority`, {
      method: 'PATCH'
    });

    if (!response.ok) throw new Error('Erreur lors du changement de priorité');
    return await response.json();
  }

  // Basculer la complétion
  async toggleComplete(id) {
    const response = await fetch(`${API_BASE_URL}/todos/${id}/toggle-complete`, {
      method: 'PATCH'
    });

    if (!response.ok) throw new Error('Erreur lors du changement de statut');
    return await response.json();
  }

  // Archiver une tâche
  async archiveTodo(id) {
    const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
      method: 'DELETE'
    });

  if (!response.ok) throw new Error('Erreur lors de l\'archivage');
  }
}

export default new TodoService();
```

## ?? Composants React avec Tailwind

### Composant TodoItem (src/components/TodoItem.jsx)

```jsx
import { useState } from 'react';
import { Check, Star, Trash2, Calendar } from 'lucide-react';

export default function TodoItem({ todo, onToggleComplete, onTogglePriority, onArchive }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleArchive = async () => {
    setIsDeleting(true);
    try {
      await onArchive(todo.id);
    } catch (error) {
      setIsDeleting(false);
    }
  };

  return (
    <div
      className={`
 p-4 rounded-lg border-2 transition-all
        ${todo.isCompleted ? 'bg-gray-50 border-gray-200' : 'bg-white border-gray-300'}
        ${isDeleting ? 'opacity-50' : 'hover:shadow-md'}
      `}
 >
      <div className="flex items-start gap-3">
        {/* Checkbox complétion */}
        <button
          onClick={() => onToggleComplete(todo.id)}
      className={`
            flex-shrink-0 w-6 h-6 rounded border-2 flex items-center justify-center
  transition-colors
       ${todo.isCompleted
  ? 'bg-green-500 border-green-500'
    : 'border-gray-300 hover:border-green-500'
            }
       `}
        >
          {todo.isCompleted && <Check className="w-4 h-4 text-white" />}
        </button>

  {/* Contenu */}
        <div className="flex-1 min-w-0">
          <p className={`
            text-gray-900 font-medium
            ${todo.isCompleted ? 'line-through text-gray-500' : ''}
    `}>
    {todo.description}
          </p>

  {/* Date d'échéance */}
  {todo.dueDate && (
     <div className="flex items-center gap-1 mt-1 text-sm text-gray-600">
              <Calendar className="w-4 h-4" />
     <span>{new Date(todo.dueDate).toLocaleDateString('fr-CA')}</span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
        {/* Bouton priorité */}
          <button
  onClick={() => onTogglePriority(todo.id)}
            className={`
      p-2 rounded transition-colors
        ${todo.isPriority
      ? 'text-yellow-500 hover:bg-yellow-50'
            : 'text-gray-400 hover:bg-gray-100'
       }
            `}
          >
       <Star
        className="w-5 h-5"
              fill={todo.isPriority ? 'currentColor' : 'none'}
            />
 </button>

          {/* Bouton supprimer */}
    <button
  onClick={handleArchive}
 disabled={isDeleting}
    className="p-2 text-red-500 hover:bg-red-50 rounded transition-colors"
          >
            <Trash2 className="w-5 h-5" />
          </button>
     </div>
      </div>
    </div>
  );
}
```

### Composant TodoForm (src/components/TodoForm.jsx)

```jsx
import { useState } from 'react';
import { Plus } from 'lucide-react';

export default function TodoForm({ onSubmit }) {
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [isPriority, setIsPriority] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!description.trim()) return;

    setIsSubmitting(true);
    try {
      await onSubmit({
        description: description.trim(),
        dueDate: dueDate || null,
        isPriority
      });
      setDescription('');
    setDueDate('');
      setIsPriority(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <div className="space-y-4">
        {/* Description */}
   <div>
          <input
        type="text"
  value={description}
      onChange={(e) => setDescription(e.target.value)}
        placeholder="Nouvelle tâche..."
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
  maxLength={200}
          disabled={isSubmitting}
          />
        </div>

  <div className="flex gap-4">
          {/* Date d'échéance */}
          <input
            type="date"
         value={dueDate}
     onChange={(e) => setDueDate(e.target.value)}
   className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
   disabled={isSubmitting}
  />

        {/* Priorité */}
          <label className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
        <input
  type="checkbox"
              checked={isPriority}
         onChange={(e) => setIsPriority(e.target.checked)}
       className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
 disabled={isSubmitting}
      />
   <span className="text-sm font-medium text-gray-700">Prioritaire</span>
 </label>

          {/* Bouton */}
          <button
  type="submit"
        disabled={!description.trim() || isSubmitting}
  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
          >
       <Plus className="w-5 h-5" />
    Ajouter
    </button>
    </div>
      </div>
    </form>
  );
}
```

### Composant TodoFilters (src/components/TodoFilters.jsx)

```jsx
export default function TodoFilters({ filters, onFilterChange }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="flex flex-wrap gap-4">
        {/* Filtre priorité */}
        <select
          value={filters.isPriority ?? ''}
        onChange={(e) => onFilterChange('isPriority', e.target.value === '' ? null : e.target.value === 'true')}
  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Toutes les priorités</option>
          <option value="true">Prioritaires</option>
   <option value="false">Non prioritaires</option>
     </select>

        {/* Filtre complétion */}
      <select
  value={filters.isCompleted ?? ''}
       onChange={(e) => onFilterChange('isCompleted', e.target.value === '' ? null : e.target.value === 'true')}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
 >
     <option value="">Tous les statuts</option>
          <option value="false">À faire</option>
       <option value="true">Terminées</option>
    </select>

        {/* Tri */}
    <select
     value={filters.sortBy}
          onChange={(e) => onFilterChange('sortBy', e.target.value)}
    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
       <option value="CreatedAt">Plus récentes</option>
          <option value="DueDate">Par échéance</option>
        </select>
      </div>
    </div>
  );
}
```

### Composant Pagination (src/components/Pagination.jsx)

```jsx
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination({ currentPage, totalPages, onPageChange }) {
if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
    className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <span className="px-4 py-2 text-sm font-medium">
        Page {currentPage} sur {totalPages}
      </span>

      <button
        onClick={() => onPageChange(currentPage + 1)}
   disabled={currentPage === totalPages}
        className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronRight className="w-5 h-5" />
    </button>
    </div>
  );
}
```

### Application principale (src/App.jsx)

```jsx
import { useState, useEffect } from 'react';
import todoService from './services/todoService';
import TodoForm from './components/TodoForm';
import TodoFilters from './components/TodoFilters';
import TodoItem from './components/TodoItem';
import Pagination from './components/Pagination';

export default function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    sortBy: 'CreatedAt',
    isPriority: null,
    isCompleted: null
  });

  // Charger les tâches
  const loadTodos = async () => {
    try {
setLoading(true);
      setError(null);
      const response = await todoService.getTodos({
        page,
        pageSize: 10,
        ...filters
      });
      setTodos(response.items);
      setTotalPages(response.totalPages);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
 loadTodos();
  }, [page, filters]);

  // Gestionnaires
  const handleCreateTodo = async (todo) => {
    await todoService.createTodo(todo);
    setPage(1);
    loadTodos();
  };

  const handleToggleComplete = async (id) => {
 await todoService.toggleComplete(id);
    loadTodos();
  };

  const handleTogglePriority = async (id) => {
    await todoService.togglePriority(id);
    loadTodos();
  };

  const handleArchive = async (id) => {
    await todoService.archiveTodo(id);
    loadTodos();
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto py-8 px-4 space-y-6">
        {/* Header */}
     <header className="text-center">
     <h1 className="text-4xl font-bold text-gray-900">TaskFlow</h1>
  <p className="text-gray-600 mt-2">Gérez vos tâches efficacement</p>
        </header>

 {/* Formulaire */}
     <TodoForm onSubmit={handleCreateTodo} />

        {/* Filtres */}
        <TodoFilters filters={filters} onFilterChange={handleFilterChange} />

        {/* Liste des tâches */}
        {loading ? (
      <div className="text-center py-12">
     <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
 {error}
          </div>
        ) : todos.length === 0 ? (
     <div className="text-center py-12 text-gray-500">
            Aucune tâche à afficher
     </div>
  ) : (
     <div className="space-y-3">
    {todos.map(todo => (
      <TodoItem
  key={todo.id}
   todo={todo}
       onToggleComplete={handleToggleComplete}
     onTogglePriority={handleTogglePriority}
            onArchive={handleArchive}
     />
     ))}
   </div>
      )}

        {/* Pagination */}
        <Pagination
  currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
    </div>
    </div>
  );
}
```

## ?? Installation des icônes

```bash
npm install lucide-react
```

## ?? Lancer l'application

```bash
npm run dev
```

L'application sera disponible sur `http://localhost:5173`

## ?? Personnalisation Tailwind

Ajoutez des couleurs personnalisées dans `tailwind.config.js` :

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        50: '#eff6ff',
        500: '#3b82f6',
        600: '#2563eb',
        700: '#1d4ed8',
      }
    }
  }
}
```

## ? Fonctionnalités du front-end

- ? Création de tâches avec date d'échéance et priorité
- ? Filtrage par priorité et statut de complétion
- ? Tri par date de création ou d'échéance
- ? Pagination avec navigation
- ? Toggle priorité et complétion
- ? Archivage (soft delete)
- ? Interface responsive avec Tailwind
- ? Icônes avec Lucide React
- ? États de chargement et erreurs

## ?? Points d'apprentissage

1. **Appels API async/await** avec gestion d'erreurs
2. **State management** avec useState et useEffect
3. **Props et callbacks** pour communication parent-enfant
4. **Styling moderne** avec Tailwind CSS
5. **UX optimale** : loading states, disabled buttons, feedback visuel
