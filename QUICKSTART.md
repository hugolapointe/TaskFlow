# ?? Guide de démarrage rapide - TaskFlow API

## ? Démarrage en 3 minutes

### 1. Cloner et restaurer

```bash
git clone https://github.com/hugolapointe/TaskFlow.WebAPI.git
cd TaskFlow
dotnet restore
```

### 2. Lancer l'API

```bash
cd TaskFlow.WebAPI
dotnet run
```

### 3. Tester l'API

Ouvrir dans votre navigateur : **https://localhost:5001**

Vous verrez la documentation Swagger interactive ! ??

## ?? Utilisation de Swagger

### Interface automatique

Swagger UI vous permet de :
- ? Voir tous les endpoints disponibles
- ? Tester l'API directement depuis le navigateur
- ? Voir les modèles de données
- ? Consulter la documentation

### Tester un endpoint

1. Cliquez sur **POST /api/todos**
2. Cliquez sur **Try it out**
3. Modifiez le JSON :
   ```json
   {
     "description": "Ma première tâche",
     "dueDate": "2024-12-31",
     "isPriority": true
   }
   ```
4. Cliquez sur **Execute**
5. Voir la réponse en bas !

## ?? Premiers pas

### Créer votre première tâche

**Via Swagger :** Suivez les étapes ci-dessus

**Via cURL :**
```bash
curl -X POST https://localhost:5001/api/todos \
  -H "Content-Type: application/json" \
  -k \
  -d '{
    "description": "Apprendre ASP.NET Core",
    "dueDate": "2024-12-31",
    "isPriority": true
  }'
```

### Récupérer toutes les tâches

**Via navigateur :**
```
https://localhost:5001/api/todos
```

**Via cURL :**
```bash
curl -k https://localhost:5001/api/todos
```

### Compléter une tâche

Remplacez `{id}` par l'ID de votre tâche :

```bash
curl -X PATCH https://localhost:5001/api/todos/{id}/toggle-complete -k
```

## ?? Connecter avec React

### 1. Créer le projet React

```bash
npm create vite@latest taskflow-frontend -- --template react
cd taskflow-frontend
npm install
```

### 2. Ajouter Tailwind (optionnel)

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### 3. Créer un service API simple

Créer `src/api.js` :

```javascript
const API_URL = 'https://localhost:5001/api/todos';

export const getTodos = async () => {
  const response = await fetch(API_URL);
  return await response.json();
};

export const createTodo = async (todo) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(todo)
  });
  return await response.json();
};
```

### 4. Utiliser dans un composant

```javascript
import { useState, useEffect } from 'react';
import { getTodos, createTodo } from './api';

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    getTodos().then(data => setTodos(data.items));
  }, []);

  return (
    <div>
      <h1>Mes tâches</h1>
   <ul>
        {todos.map(todo => (
          <li key={todo.id}>{todo.description}</li>
      ))}
      </ul>
    </div>
  );
}

export default App;
```

**?? Pour plus de détails, consultez [REACT_INTEGRATION.md](REACT_INTEGRATION.md)**

## ?? Données de démonstration

L'API est pré-remplie avec des tâches d'exemple :
- ? Tâches prioritaires
- ? Tâches complétées
- ? Tâches avec dates d'échéance
- ? Tâches archivées (cachées)

## ?? Configuration

### Changer les ports

Modifier `Properties/launchSettings.json` :

```json
{
  "applicationUrl": "https://localhost:5001;http://localhost:5000"
}
```

### Configurer CORS pour votre app React

Modifier `appsettings.json` :

```json
{
  "Cors": {
  "AllowedOrigins": [
      "http://localhost:3000",
      "http://localhost:5173",
      "http://votre-domaine.com"
    ]
  }
}
```

### Changer la taille de page par défaut

Modifier `appsettings.json` :

```json
{
  "Pagination": {
  "DefaultPageSize": 20,
    "MaxPageSize": 100
  }
}
```

## ?? Dépannage

### Erreur de certificat HTTPS

**Option 1 - Faire confiance au certificat (recommandé) :**
```bash
dotnet dev-certs https --trust
```

**Option 2 - Utiliser HTTP en développement :**
Commenter dans `Program.cs` :
```csharp
// app.UseHttpsRedirection();
```

### Port déjà utilisé

Changer le port dans `Properties/launchSettings.json`

### CORS bloqué depuis React

Vérifier que :
1. L'origine est dans `appsettings.json`
2. `app.UseCors("AllowReactApp")` est avant `app.UseAuthorization()` dans `Program.cs`

### Base de données vide

Les données sont en mémoire et rechargées à chaque démarrage. C'est normal !

## ?? Documentation complète

- **[README.md](README.md)** - Vue d'ensemble et architecture
- **[AMELIORATIONS.md](AMELIORATIONS.md)** - Détails des améliorations apportées
- **[REACT_INTEGRATION.md](REACT_INTEGRATION.md)** - Guide complet React + Tailwind
- **[GUIDE_TESTS.md](GUIDE_TESTS.md)** - Exemples de tests unitaires et d'intégration

## ?? Pour les étudiants

### Concepts à étudier dans ce projet

1. **Architecture en couches**
   - Fichiers : `TaskFlow.WebAPI` vs `TaskFlow.Core`
   
2. **Repository Pattern**
   - Fichiers : `IToDoRepository.cs` et `ToDoRepository.cs`

3. **Service Layer**
   - Fichiers : `ToDoService.cs`

4. **DTOs et Mappers**
   - Fichiers : `TodoCommands.cs`, `TodoResponses.cs`, `ToDoMappers.cs`

5. **Entity Framework Core**
   - Fichiers : `TaskFlowDbContext.cs`, `ToDo.cs`

6. **Middleware ASP.NET**
   - Fichiers : `ExceptionHandlingMiddleware.cs`, `Program.cs`

### Exercices suggérés

1. ?? Ajouter un champ "catégorie" aux tâches
2. ?? Implémenter une recherche par mot-clé
3. ?? Créer un endpoint pour des statistiques (nombre de tâches par statut)
4. ?? Écrire des tests unitaires pour le service
5. ?? Migrer vers SQL Server au lieu d'InMemory

### Ordre d'apprentissage recommandé

1. **Commencer par** : `ToDo.cs` (entité simple)
2. **Ensuite** : `ToDoService.cs` (logique métier)
3. **Puis** : `ToDoController.cs` (endpoints API)
4. **Explorer** : `ToDoRepository.cs` (accès données)
5. **Comprendre** : `Program.cs` (configuration)
6. **Approfondir** : Les mappers et DTOs

## ? Checklist de vérification

Avant de commencer le développement :

- [ ] .NET 9 SDK installé
- [ ] API démarre sans erreur
- [ ] Swagger accessible
- [ ] Peut créer une tâche via Swagger
- [ ] Peut récupérer la liste des tâches
- [ ] (Optionnel) React configuré et connecté

## ?? Besoin d'aide ?

1. Consultez les fichiers de documentation
2. Explorez le code avec les commentaires
3. Testez avec Swagger
4. Regardez les exemples dans GUIDE_TESTS.md

Bon apprentissage ! ??
