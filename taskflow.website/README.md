# Taskflow React

Bienvenue dans le projet **Taskflow React**, une application de démonstration conçue pour introduire les étudiants aux bases de **React.js** dans le cadre du cours *Développement de commerce électronique*. Ce projet est connecté à une API ASP.NET WebAPI existante et illustre les bonnes pratiques de développement front-end moderne.


## 🎯 Objectifs pédagogiques

- Comprendre la structure d'un projet React avec Vite
- Utiliser **useState**, **Context API**, et **axios** pour gérer les états et les appels API
- Implémenter une interface **mobile-first** avec **Tailwind CSS**
- Appliquer le principe de responsabilité unique (SRP) dans les composants
- Gérer les mises à jour optimistes et les notifications utilisateur


## 🗂 Structure du projet

Le projet est organisé pour favoriser la clarté, la réutilisabilité et la séparation des responsabilités.

### 📁 Arborescence complète

```bash
src/
├─ main.jsx
├─ App.jsx
├─ index.css
│
├─ styles/
│  ├─ theme.css
│  └─ utilities.css
│
├─ api/
│  ├─ axiosClient.js
│  └─ toDosApi.js
│
├─ context/
│  └─ ToDoContext.jsx
│
├─ hooks/
│  └─ useToDos.js
│
├─ utils/
│  ├─ date.js
│  ├─ constants.js
│  └─ cn.js
│
├─ common/
│  ├─ AppShell.jsx
│  ├─ Button.jsx
│  ├─ IconButton.jsx
│  ├─ Select.jsx
│  ├─ TextInput.jsx
│  ├─ Spinner.jsx
│  ├─ Card.jsx
│  ├─ Notification.jsx
│  └─ PriorityToggle.jsx
│
└─ toDos/
   ├─ pages/TodosPage.jsx
   └─ components/
      ├─ ToDoCreate/
      │  └─ ToDoCreate.jsx
      ├─ ToDoSelectors/
      │  ├─ ToDoSelectors.jsx
      │  └─ components/
      │     ├─ StatusSelect.jsx
      │     ├─ PrioritySelect.jsx
      │     └─ SortSelect.jsx
      ├─ ToDoStatsCards/
      │  ├─ ToDoStatsCards.jsx
      │  └─ components/
      │     ├─ StatsCard.jsx
      │     └─ StatsGrid.jsx
      ├─ ToDoList/
      │  ├─ ToDoList.jsx
      │  └─ components/
      │     ├─ ToDoItem.jsx
      │     ├─ ToDoItemView.jsx
      │     ├─ ToDoItemEdit.jsx
      │     └─ ToDoAudit.jsx
      └─ EmptyState.jsx
```

## ⚙️ Fonctionnalités principales

- Création et modification de tâche : description, date d’échéance (optionnelle), priorité (toggle via icône Heroicon), avec édition inline.
- Complétion et archivage : une tâche peut être marquée comme complétée à tout moment, puis archivée.
- Priorisation : une tâche peut être rendue prioritaire ou non prioritaire à tout moment.
- Mises à jour optimistes : les actions (création, modification, complétion, archivage) sont appliquées immédiatement dans l’interface, avec rollback en cas d’erreur.
- Statistiques interactives : 4 cartes (Remaining, Priority, Non-priority, Completed) cliquables qui appliquent les filtres et tris associés.
- Filtres et tri : par statut (toutes, non complétées, complétées), priorité (toutes, prioritaires, non prioritaires), et date (création ou échéance).
- Affichage des informations d’audit : dates de création et de dernière mise à jour visibles lors de l’édition.
Notifications utilisateur : toasts via react-hot-toast pour chaque action (succès ou erreur).

## 🔗 API ASP.NET WebAPI

**Base URL** : `http://localhost:5000/api/todos`

### Endpoints disponibles

- `POST /todos`
- `GET /todos`
- `GET /todos/{id}`
- `GET /todos/stats`
- `PUT /todos/{id}`
- `PATCH /todos/{id}/toggle-priority`
- `PATCH /todos/{id}/mark-as-completed`
- `DELETE /todos/{id}/archive`

### Format des données

```json
// Création / modification
{
  "description": "string",
  "dueDate": "2025-11-10 | null",
  "isPriority": true
}

// Tâche
{
  "id": 1,
  "description": "string",
  "dueDate": "YYYY-MM-DD | null",
  "isPriority": true,
  "isCompleted": false,
  "createdAt": "YYYY-MM-DD",
  "updatedAt": "YYYY-MM-DD | null"
}

// Statistiques
{
  "total": 10,
  "priority": 4,
  "nonPriority": 3,
  "completed": 3
}
```

## 🎨 Design et UX

- Thème sombre uniquement
- Mobile-first avec marges latérales en desktop
- Police système
- Couleurs par état :
  - Prioritaire non complétée : orange/rouge clair
  - Non prioritaire non complétée : bleu
  - Complétée : gris
- PriorityToggle : icône Heroicon clickable servant aussi de badge visuel
- Actions : boutons sous forme d’icônes Heroicon

## 🚀 Guide d’implémentation

### 🔑 Priorités de démarrage

1. Configurer Tailwind + thème sombre
2. Créer les composants UI communs
3. Mettre en place le Context
4. Implémenter le formulaire de création
5. Afficher la liste des tâches

### ✅ Bonnes pratiques

#### 📦 Implémentation d’un composant

- Composant simple et autonome (SRP)
- Props claires et bien nommées
- Styles via Tailwind ou `@apply`
- Dossier dédié si complexe
- Réutilisation via `common/`

#### 🔄 Mises à jour optimistes

- Mise à jour immédiate du `state` local
- Requête API en arrière-plan
- Rollback en cas d’erreur
- Toast de succès ou d’erreur

#### 🧠 Organisation des fichiers

- `context/TodosContext.jsx` : store global
- `hooks/useTodos.js` : accès au contexte
- `api/todosApi.js` : appels API
- `utils/` : fonctions utilitaires
- `common/` : composants UI
- `todos/components/` : composants métier
