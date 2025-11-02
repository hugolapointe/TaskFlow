# TaskFlow API

API de gestion de tâches (ToDo) développée avec **ASP.NET Core 9** pour démontrer les concepts fondamentaux d'une Web API moderne.

## ?? Objectif pédagogique

Ce projet sert d'exemple pour apprendre :
- Architecture en couches (WebAPI + Core)
- Pattern Repository et Service Layer
- Entity Framework Core avec InMemory Database
- API RESTful avec Swagger/OpenAPI
- Validation avec Data Annotations
- Gestion d'erreurs avec middleware
- Pagination des résultats
- Logging structuré
- CORS pour applications React

## ??? Architecture

```
TaskFlow/
??? TaskFlow.WebAPI/ # Couche présentation (API)
?   ??? Controllers/          # Contrôleurs API
?   ??? Models/          # DTOs (Data Transfer Objects)
?   ??? Mappers/      # Mapping Domain ? API
?   ??? Middlewares/          # Middlewares personnalisés
?
??? TaskFlow.Core/            # Couche métier et données
 ??? Domain/
    ?   ??? Entities/   # Entités du domaine
    ?   ??? Enums/            # Énumérations
    ?   ??? Services/         # Services métier
    ?   ??? Repositories/ # Interfaces repositories
    ??? Infrastructure/
    ?   ??? Repositories/     # Implémentation repositories
    ??? Data/     # DbContext et Seeder
```

## ?? Démarrage rapide

### Prérequis
- .NET 9 SDK

### Lancer l'application

```bash
cd TaskFlow.WebAPI
dotnet run
```

L'API sera disponible à : **https://localhost:5001** (ou http://localhost:5000)

La documentation Swagger est accessible à la racine : **https://localhost:5001**

## ?? Endpoints API

### Tâches (ToDo)

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| `GET` | `/api/todos` | Liste paginée avec filtres |
| `GET` | `/api/todos/{id}` | Détails d'une tâche |
| `POST` | `/api/todos` | Créer une tâche |
| `PUT` | `/api/todos/{id}/description` | Modifier description |
| `PUT` | `/api/todos/{id}/due-date` | Modifier date d'échéance |
| `PATCH` | `/api/todos/{id}/toggle-priority` | Basculer priorité |
| `PATCH` | `/api/todos/{id}/toggle-complete` | Basculer complétion |
| `DELETE` | `/api/todos/{id}` | Archiver (soft delete) |

### Paramètres de requête (GET /api/todos)

- `page` : Numéro de page (défaut: 1)
- `pageSize` : Taille de page (défaut: 10, max: 100)
- `sortBy` : `CreatedAt` | `DueDate`
- `isPriority` : `true` | `false` (optionnel)
- `isCompleted` : `true` | `false` (optionnel)

### Exemples de requêtes

**Créer une tâche :**
```bash
curl -X POST https://localhost:5001/api/todos \
  -H "Content-Type: application/json" \
  -d '{
    "description": "Apprendre ASP.NET Core",
    "dueDate": "2024-12-31",
    "isPriority": true
}'
```

**Liste des tâches prioritaires non complétées :**
```bash
curl "https://localhost:5001/api/todos?isPriority=true&isCompleted=false&page=1&pageSize=10"
```

## ??? Concepts démontrés

### 1. Architecture en couches
- **WebAPI** : Présentation et communication HTTP
- **Core** : Logique métier et accès données

### 2. Patterns utilisés
- **Repository Pattern** : Abstraction de la couche données
- **Service Layer** : Encapsulation de la logique métier
- **DTO (Data Transfer Objects)** : Séparation modèles API/Domaine
- **Dependency Injection** : Inversion de contrôle

### 3. Fonctionnalités ASP.NET Core
- Routing et contrôleurs API
- Model Binding et validation
- Middleware personnalisé
- Configuration et options
- Logging
- CORS

### 4. Entity Framework Core
- DbContext et DbSet
- InMemory Database (pour tests/démos)
- Fluent API pour configuration
- AsNoTracking pour optimisation

## ?? Intégration avec React

L'API est configurée pour fonctionner avec un front-end React :

### Configuration CORS
Par défaut, les origines autorisées sont :
- `http://localhost:3000` (Create React App)
- `http://localhost:5173` (Vite)

Modifiable dans `appsettings.json` :
```json
{
  "Cors": {
    "AllowedOrigins": ["http://localhost:3000"]
  }
}
```

### Exemple d'utilisation en React (avec fetch)

```javascript
// Récupérer les tâches
const getTodos = async (page = 1) => {
  const response = await fetch(
    `https://localhost:5001/api/todos?page=${page}&pageSize=10`
  );
  return await response.json();
};

// Créer une tâche
const createTodo = async (todo) => {
  const response = await fetch('https://localhost:5001/api/todos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(todo)
  });
  return await response.json();
};

// Basculer la complétion
const toggleComplete = async (id) => {
  const response = await fetch(
    `https://localhost:5001/api/todos/${id}/toggle-complete`,
    { method: 'PATCH' }
  );
  return await response.json();
};
```

## ?? Points d'apprentissage

### Pour les étudiants

1. **Séparation des préoccupations** : Chaque couche a sa responsabilité
2. **Testabilité** : L'utilisation d'interfaces facilite les tests unitaires
3. **Maintenabilité** : Code organisé et commenté
4. **Bonnes pratiques** : Validation, logging, gestion d'erreurs
5. **RESTful** : Respect des conventions HTTP

### Exercices suggérés

1. Ajouter un filtre par date de création
2. Implémenter une recherche par mot-clé
3. Ajouter des catégories aux tâches
4. Créer des tests unitaires pour le service
5. Migrer vers SQL Server au lieu d'InMemory

## ?? Packages utilisés

- **Microsoft.EntityFrameworkCore** (9.0.10) : ORM
- **Microsoft.EntityFrameworkCore.InMemory** (9.0.10) : Base de données en mémoire
- **Swashbuckle.AspNetCore** (9.0.6) : Documentation Swagger/OpenAPI

## ?? Contribution

Ce projet est à but éducatif. Les améliorations et corrections sont les bienvenues !

## ?? Licence

Projet éducatif libre d'utilisation.
