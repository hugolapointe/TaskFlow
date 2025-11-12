# ?? TaskFlow - React Todo Application

[![React](https://img.shields.io/badge/React-19.1.1-61DAFB?logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-7.1.7-646CFF?logo=vite)](https://vitejs.dev)
[![.NET](https://img.shields.io/badge/.NET-9.0-512BD4?logo=.net)](https://dot.net)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

> ?? **Projet pédagogique** - Une application complète de gestion de tâches (Todo List) construite avec React et .NET, conçue pour enseigner les meilleures pratiques de développement moderne.

![TaskFlow Demo](https://via.placeholder.com/800x400/1a1a2e/eaeaea?text=TaskFlow+Demo)

---

## ? Caractéristiques

- ? **CRUD Complet** - Créer, lire, mettre à jour et archiver des tâches
- ?? **Gestion des priorités** - Marquer et filtrer les tâches prioritaires
- ?? **États des tâches** - Marquer comme complétée, rouvrir
- ?? **Statistiques en temps réel** - Total, prioritaires, régulières, complétées
- ?? **Filtrage avancé** - Par statut, priorité et tri personnalisé
- ?? **Notifications** - Toast pour toutes les actions
- ?? **Interface moderne** - Design propre et responsive
- ? **Accessible** - Navigation clavier, ARIA labels

---

## ?? Objectif Pédagogique

Ce projet démontre:

### Concepts React ??
- Context API pour la gestion d'état
- Hooks modernes (useState, useEffect, useContext, useCallback)
- Composition de composants
- Custom hooks
- CSS Modules
- Appels API asynchrones

### Architecture ???
- Séparation claire des concerns
- Composants réutilisables
- Services API découplés
- Constantes centralisées
- Documentation extensive

### Best Practices ??
- Code DRY et maintenable
- Nomenclature cohérente
- Tests complets
- Accessibilité (a11y)
- Performance optimisée

---

## ?? Démarrage Rapide

### Prérequis
- Node.js 18+
- .NET 9 SDK
- npm ou yarn

### Installation

```bash
# Cloner le repository
git clone https://github.com/hugolapointe/TaskFlow.WebAPI.git
cd TaskFlow.WebAPI

# Démarrer le backend (.NET)
cd TaskFlow.WebAPI
dotnet run

# Dans un nouveau terminal, démarrer le frontend (React)
cd taskflow.website
npm install
npm run dev
```

L'application sera accessible sur:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5154

---

## ?? Documentation

### ?? Pour tous
- **[??? INDEX DE LA DOCUMENTATION](./DOCUMENTATION_INDEX.md)** - Index complet de tous les documents

### ????? Pour les étudiants
- **[?? Guide d'Apprentissage React](./taskflow.website/README.md)** - Documentation pédagogique complète avec exemples

### ????? Pour les enseignants
- **[?? Résumé du Projet](./PROJECT_SUMMARY.md)** - Vue d'ensemble, plan de cours, exercices
- **[?? Guide de Présentation](./taskflow.website/README.md#pour-les-enseignants)** - Ordre de présentation suggéré

### ????? Pour les développeurs
- **[?? Architecture et Recommandations](./FRONTEND_REVIEW_RECOMMENDATIONS.md)** - Analyse exhaustive (18K mots)
- **[? Rapport d'Implémentation](./IMPLEMENTATION_COMPLETE.md)** - Changements détaillés de la Phase 1
- **[?? Suivi Technique](./REFACTORING_PROGRESS.md)** - Progression et prochaines étapes

### ?? Pour les testeurs
- **[?? Guide de Tests](./QUICK_TEST_GUIDE.md)** - 30+ tests fonctionnels et techniques

---

## ??? Architecture

```
TaskFlow/
??? TaskFlow.WebAPI/        # Backend .NET 9 Web API
?   ??? Controllers/
?   ??? DTOs/
?   ??? Program.cs
?
??? TaskFlow.Core/            # Core Business Logic
?   ??? Entities/
?   ??? Repositories/
?   ??? Services/
?
??? taskflow.website/# Frontend React + Vite
    ??? src/
        ??? components/       # Composants React
        ??? contexts/         # Context API (état global)
??? services/    # Services API
        ??? utils/         # Fonctions utilitaires
        ??? constants/        # Constantes
        ??? styles/# Styles globaux
```

---

## ?? Technologies

### Frontend
- **React 19.1.1** - Library UI moderne
- **Vite 7.1.7** - Build tool ultra-rapide
- **Axios 1.7.9** - Client HTTP
- **React Toastify 11.0.2** - Notifications élégantes
- **Heroicons 2.1.1** - Icônes SVG
- **CSS Modules** - Styling scopé

### Backend
- **.NET 9** - Framework web performant
- **ASP.NET Core** - Web API
- **Entity Framework Core** - ORM
- **SQLite** - Base de données

---

## ?? Screenshots

<details>
<summary>Voir les captures d'écran</summary>

### Liste des tâches
![Todo List](https://via.placeholder.com/600x400/1a1a2e/eaeaea?text=Todo+List+View)

### Statistiques
![Statistics](https://via.placeholder.com/600x400/1a1a2e/eaeaea?text=Statistics+Cards)

### Filtres
![Filters](https://via.placeholder.com/600x400/1a1a2e/eaeaea?text=Filters+Bar)

</details>

---

## ?? Exercices Suggérés

### ?? Niveau Débutant (2-4h)
1. Changer les couleurs du thème
2. Ajouter un champ "notes" aux tâches
3. Créer une nouvelle carte de statistique

### ?? Niveau Intermédiaire (6-8h)
4. Implémenter la recherche de tâches
5. Ajouter des catégories/tags
6. Persister les filtres dans localStorage

### ?? Niveau Avancé (10-15h)
7. Ajouter le drag & drop pour réordonner
8. Implémenter des sous-tâches (nested todos)
9. Créer un système de notification push
10. Ajouter l'authentification utilisateur

---

## ?? Tests

```bash
# Lancer les tests unitaires (backend)
cd TaskFlow.WebAPI
dotnet test

# Vérifier le linting (frontend)
cd taskflow.website
npm run lint

# Build de production
npm run build
```

Pour des tests plus détaillés, consultez [QUICK_TEST_GUIDE.md](./QUICK_TEST_GUIDE.md)

---

## ?? Contribution

Les contributions sont les bienvenues! Pour contribuer:

1. Fork le projet
2. Créez votre branche feature (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

Consultez [REFACTORING_PROGRESS.md](./REFACTORING_PROGRESS.md) pour les prochaines étapes (Phases 2 & 3).

---

## ?? Statistiques du Projet

| Métrique | Valeur |
|----------|--------|
| Composants React | 15 |
| Hooks personnalisés | 1 |
| Lignes de code frontend | ~920 |
| Lignes de documentation | ~38,000 |
| Tests suggérés | 30+ |
| Exercices pédagogiques | 10 |
| Concepts React couverts | 15+ |

---

## ?? Pour les Étudiants

### Par où commencer?

1. **Installer et démarrer** l'application
2. **Lire** [taskflow.website/README.md](./taskflow.website/README.md)
3. **Explorer** le code source (commencer par les composants simples)
4. **Faire** les exercices niveau 1
5. **Progresser** vers les niveaux 2 et 3

### Concepts clés à maîtriser

- ? Composants fonctionnels et JSX
- ? Props et state
- ? Hooks (useState, useEffect, useContext)
- ? Context API
- ? Appels API asynchrones
- ? Gestion d'erreurs
- ? CSS Modules

---

## ????? Pour les Enseignants

### Plan de cours suggéré (4 semaines)

**Semaine 1**: Composants de base (TodoItem, CSS Modules)  
**Semaine 2**: État et interactivité (TodoItemEdit, formulaires)  
**Semaine 3**: Context API et appels API (TodoContext, api.js)  
**Semaine 4**: Filtres, optimisation, best practices

Consultez [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md) pour plus de détails.

### Quiz disponibles

4 quiz couvrant:
- Bases React
- Hooks
- Architecture
- Best Practices

---

## ?? Ressources Complémentaires

### Documentation officielle
- [React Docs](https://react.dev) - Documentation React
- [.NET Docs](https://docs.microsoft.com/dotnet/) - Documentation .NET
- [Vite Guide](https://vitejs.dev/guide/) - Guide Vite

### Tutoriels recommandés
- [React Tutorial](https://react.dev/learn) - Tutoriel officiel React
- [Full Stack Open](https://fullstackopen.com/en/) - Cours complet gratuit
- [React Patterns](https://reactpatterns.com/) - Patterns communs

---

## ?? Bugs & Support

Si vous rencontrez un problème:

1. Vérifiez [QUICK_TEST_GUIDE.md](./QUICK_TEST_GUIDE.md)
2. Consultez la section Debugging dans [taskflow.website/README.md](./taskflow.website/README.md)
3. Ouvrez une issue sur GitHub avec:
   - Description du problème
   - Steps to reproduce
   - Erreurs console
   - Version de Node.js et npm

---

## ?? Licence

Ce projet est sous licence MIT - voir le fichier [LICENSE](LICENSE) pour plus de détails.

---

## ?? Auteurs

- **Hugo Lapointe** - [GitHub](https://github.com/hugolapointe)

---

## ?? Remerciements

- [React Team](https://react.dev) pour l'excellente documentation
- [Vite](https://vitejs.dev) pour la vitesse de développement
- [Heroicons](https://heroicons.com) pour les magnifiques icônes
- Tous les contributeurs et étudiants

---

## ?? Star le Projet

Si ce projet vous a aidé à apprendre React, n'oubliez pas de lui donner une étoile! ?

---

## ?? Contact

Pour toute question sur l'utilisation pédagogique de ce projet, consultez:
- ?? [Index de la documentation](./DOCUMENTATION_INDEX.md)
- ?? [FAQ dans le README](./taskflow.website/README.md)
- ?? [Issues GitHub](https://github.com/hugolapointe/TaskFlow.WebAPI/issues)

---

**?? Bon apprentissage! ??**

---

*Version: 2.0 - Refactorisation Complète Phase 1*  
*Dernière mise à jour: 2024*
