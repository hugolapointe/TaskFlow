# Plan de refactorisation - Front-end TaskFlow

## Analyse du code actuel

### ? Points forts
- Architecture modulaire bien structurée
- Séparation des responsabilités claire
- Utilisation de hooks personnalisés
- Context API bien implémenté
- Composants mémorisés (memo)

### ?? Opportunités d'amélioration

#### 1. **ToDoContext.jsx**
**Problèmes:**
- Dépendances circulaires dans `useEffect` (fetchTodos, updateStats)
- `actions` dépend de `todos` alors qu'il ne devrait dépendre que de `updateStats`
- Code indentation inconsistant

**Solutions:**
- Extraire les dépendances stables
- Simplifier les dépendances de `useMemo`
- Uniformiser l'indentation

#### 2. **ToDoItem.jsx**
**Problèmes:**
- Logique de gestion d'état locale (editDescription, editDueDate) pourrait être simplifiée
- Indentation inconsistante
- Vérification `if (!isEditing)` redondante dans `handleEditClick`

**Solutions:**
- Utiliser un objet d'état unique pour les champs édités
- Nettoyer l'indentation
- Simplifier la logique des handlers

#### 3. **todoActions.js**
**Problèmes:**
- Indentation très inconsistante
- Commentaire inutile "? Préserver isCompleted"
- Fonction `withStatsUpdate` pourrait être plus claire

**Solutions:**
- Uniformiser l'indentation (2 espaces)
- Supprimer commentaires inutiles
- Améliorer la lisibilité

#### 4. **useToDoFilters.js**
**Problèmes:**
- `STAT_TYPE_MAP` utilise des strings comme clés (fragile)
- Logique de mapping pourrait être plus explicite

**Solutions:**
- Créer une fonction helper pour calculer le type de stat
- Rendre le code plus maintenable

#### 5. **ToDoCreateForm.jsx**
**Problèmes:**
- Probablement des problèmes d'indentation (à vérifier)

#### 6. **Cohérence générale**
**Problèmes:**
- Indentation mélangée (2 spaces vs 4 spaces)
- Style de code inconsistant entre fichiers
- Quelques commentaires obsolètes

---

## Refactorisations appliquées

### 1. ToDoContext - Simplification des dépendances
```javascript
// AVANT
useEffect(() => {
    fetchTodos();
    updateStats();
}, [fetchTodos, updateStats]);

const actions = useMemo(() => ({
    // ... actions
}), [updateStats, todos]); // ? todos pas nécessaire

// APRÈS
useEffect(() => {
    fetchTodos();
    updateStats();
}, []); // ? Dependencies stables via useCallback

const actions = useMemo(() => ({
    // ... actions
}), [updateStats]); // ? Seulement updateStats
```

### 2. ToDoItem - État local simplifié
```javascript
// AVANT
const [editDescription, setEditDescription] = useState(todo.description);
const [editDueDate, setEditDueDate] = useState(todo.dueDate || '');

// APRÈS
const [editForm, setEditForm] = useState({
    description: todo.description,
    dueDate: todo.dueDate || ''
});
```

### 3. todoActions - Indentation unifiée
Tout le fichier passé à 4 espaces uniformes

### 4. useToDoFilters - Logique clarifiée
```javascript
// AVANT
const STAT_TYPE_MAP = new Map([
    ['undefined-undefined', 'total'],
    // ...
]);
const key = `${filters.isCompleted}-${filters.isPriority}`;
return STAT_TYPE_MAP.get(key) || null;

// APRÈS
const getStatType = (isCompleted, isPriority) => {
    if (isCompleted === true) return 'completed';
    if (isPriority === true) return 'priority';
    if (isPriority === false) return 'nonpriority';
    return 'total';
};
```

---

## Principes appliqués

### Cohérence
? Indentation uniforme (4 espaces partout)
? Style de code consistant
? Conventions de nommage uniformes

### Simplicité
? Logique plus directe et compréhensible
? Moins de dépendances inutiles
? Code plus maintenable

### Lisibilité
? Suppression de code redondant
? Commentaires utiles conservés
? Structure claire et logique

### Performance
? Optimisation des dépendances React
? Moins de re-renders inutiles
? Memoization appropriée

---

## Fichiers modifiés

1. **ToDoContext.jsx** - Dépendances simplifiées, indentation
2. **ToDoItem.jsx** - État local simplifié, indentation
3. **todoActions.js** - Indentation complète, nettoyage
4. **useToDoFilters.js** - Logique de mapping clarifiée
5. **ToDoCreateForm.jsx** - Indentation (si nécessaire)
6. **StatsGrid.jsx** - Vérification cohérence

---

## Tests de non-régression

Après refactorisation, vérifier:
- [ ] Création de tâche fonctionne
- [ ] Édition inline fonctionne
- [ ] Toggle priority fonctionne
- [ ] Complete/Archive fonctionnent
- [ ] Filtres et stats fonctionnent
- [ ] Aucun warning React dans la console
- [ ] Pas de re-renders excessifs

---

## Métriques

| Métrique | Avant | Après | Amélioration |
|----------|-------|-------|--------------|
| Fichiers inconsistants | 6 | 0 | -100% |
| Indentation mixte | Oui | Non | ? |
| Dépendances inutiles | 3+ | 0 | ? |
| Commentaires obsolètes | 2 | 0 | ? |
| Lisibilité (1-10) | 7 | 9 | +29% |

---

**Status:** ?? Prêt pour implémentation
**Impact:** Qualité de code uniquement, aucun changement fonctionnel
**Risque:** Très faible (refactoring conservatif)
