# TaskFlow - Frontend

Application web de gestion de tâches construite avec React, Vite et Tailwind CSS.

## 🚀 Technologies

- **React 18** - Bibliothèque UI
- **Vite** - Build tool et dev server
- **Tailwind CSS** - Framework CSS utility-first
- **Heroicons** - Icônes
- **Axios** - Client HTTP
- **React Hot Toast** - Notifications

## 📋 Prérequis

- Node.js 18+ 
- NPM 9+
- API TaskFlow en cours d'exécution sur `http://localhost:5154`

## 🛠️ Installation

```bash
# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm run dev

# Builder pour la production
npm run build

# Prévisualiser le build de production
npm run preview
```

## 🏗️ Structure du Projet

```
src/
├── common/    # Composants réutilisables
│   ├── PageLayout.jsx
│   ├── PageHeader.jsx
│   ├── Card.jsx
│   ├── TextInput.jsx
│   ├── DescriptionInput.jsx
│   ├── DueDatePicker.jsx
│   ├── Select.jsx
│   ├── PriorityToggle.jsx
│   ├── IconButton.jsx
│   └── Spinner.jsx
├── toDos/            # Fonctionnalités ToDo
│   ├── pages/
│   │   └── TodosPage.jsx
│   └── components/
│       ├── ToDoCreate/
│       ├── ToDoList/
│       ├── ToDoSelectors/
│       └── ToDoStatsCards/
├── context/          # État global
│   └── ToDoContext.jsx
├── hooks/  # Hooks personnalisés
│   └── useToDos.js
├── api/     # Client API
│   ├── axiosClient.js
│   └── toDosApi.js
├── utils/ # Utilitaires
│   ├── date.js
│   ├── constants.js
│   └── cn.js
└── styles/           # Styles globaux
    ├── theme.css
    └── utilities.css
```

## 🎨 Design

- **Largeur maximale**: 900px (centré)
- **Theme**: Dark mode (slate colors)
- **Typographie**: System fonts
- **Espacement**: Cohérent avec Tailwind

## 🔧 Configuration

### API
L'URL de l'API est configurée dans `src/api/axiosClient.js`:
```javascript
baseURL: 'http://localhost:5154/api'
```

## 📝 Conventions

### Code
- **Composants**: PascalCase
- **Fonctions/variables**: camelCase
- **Pas de JSDoc**: Code auto-documenté
- **Pas de commentaires inutiles**: Code clair et expressif

### Styles
- **Tailwind uniquement**: Pas de CSS inline
- **Cohérence**: Mêmes tailles/espacements partout

## 🎯 Fonctionnalités

- ✅ Créer des tâches
- ✅ Marquer comme priorité
- ✅ Définir une date d'échéance
- ✅ Filtrer par statut et priorité
- ✅ Trier par date
- ✅ Marquer comme complété
- ✅ Éditer les tâches
- ✅ Archiver les tâches
- ✅ Statistiques en temps réel

## 📦 Build

```bash
npm run build
```

Génère un dossier `dist/` optimisé pour la production.

---

**Version**: 1.0.0  
**Last Update**: Décembre 2024
