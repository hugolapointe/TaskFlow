# Refactor: Édition Inline des Tâches

## Vue d'ensemble
Refonte majeure du système d'édition des tâches pour passer d'un formulaire centralisé vers une édition inline directement dans chaque item.

## Problèmes résolus
- ? **Avant**: Éditer une tâche redirigeait l'utilisateur en haut de la page
- ? **Avant**: Nécessitait de maintenir `selectedToDoId` au niveau App
- ? **Avant**: UX confuse entre sélection et édition
- ? **Après**: Édition inline sans déplacement de scroll
- ? **Après**: État d'édition géré localement dans `ToDoList`
- ? **Après**: UX claire avec boutons d'action explicites

## Architecture

### Composants modifiés

#### 1. `App.jsx`
- **Supprimé**: Gestion de `selectedToDoId`
- **Résultat**: Composant simplifié, moins de props drilling

#### 2. `ToDoList.jsx`
- **Ajouté**: État local `editingTodoId`
- **Ajouté**: Callbacks `handleEditStart` et `handleEditCancel`
- **Supprimé**: Props `selectedTodoId`, `onSelectTodo`, `onClearSelection`
- **Logique**: Seule une tâche peut être en édition à la fois

#### 3. `ToDoItem.jsx`
- **Supprimé**: Gestion de la sélection (onClick sur le container)
- **Ajouté**: État local pour `editDescription` et `editDueDate`
- **Ajouté**: Boutons d'action selon le statut:
  - **Pending**: [Modifier] [Compléter]
  - **Completed**: [Modifier] [Archiver]
- **Mode édition**:
  - Affiche les inputs pour description et date
  - Affiche [Sauvegarder] [Annuler]
  - Affiche les informations d'audit
- **Comportement**: Toggle priority reste cliquable en tout temps

#### 4. `ToDoItemContent.jsx`
- **Ajouté**: Props pour le mode édition
- **Rendu conditionnel**:
  - Mode normal: `<p>` pour description, `<div>` pour date
  - Mode édition: `<input>` pour description, `<input type="date">` pour date

#### 5. `ToDoItemAction.jsx`
- **Modifié**: Accepte maintenant `onArchive` en plus de `onComplete`
- **Logique**: Détermine l'action selon `todo.isCompleted`

#### 6. `ToDoCreateForm.jsx`
- **Corrigé**: Import de `useToDos` au lieu de `useToDo`
- **Rôle**: Gestion uniquement de la création (déjà le cas)

## API utilisée
- `PUT /todos/{id}`: Met à jour description, dueDate et isPriority
- `PATCH /todos/{id}/toggle-priority`: Toggle le statut priority
- `PATCH /todos/{id}/mark-as-completed`: Toggle le statut completed
- `DELETE /todos/{id}/archive`: Archive la tâche

## Styles CSS ajoutés

### `ToDoItem.module.css`
```css
/* Mode édition au lieu de sélection */
.container[data-editing="true"]

/* Conteneur pour les boutons d'action */
.actionsContainer

/* Nouveaux boutons */
.editButton
.saveButton
.cancelButton
```

### `ToDoItemContent.module.css`
```css
/* Inputs d'édition */
.descriptionInput
.dueDateInput
```

## Flux utilisateur

### Éditer une tâche
1. Utilisateur clique sur le bouton "Modifier" (icône crayon)
2. La tâche passe en mode édition:
   - Description devient un input text
   - Date devient un input date
   - Boutons deviennent [Sauvegarder] [Annuler]
   - Informations d'audit apparaissent
3. Utilisateur modifie les champs
4. Options:
   - **Sauvegarder**: Appelle l'API PUT, ferme le mode édition
   - **Annuler**: Restaure les valeurs originales, ferme le mode édition

### Édition exclusive
- Si l'utilisateur tente d'éditer une autre tâche pendant une édition:
  - La première édition est **automatiquement annulée**
  - La nouvelle tâche entre en mode édition

### Actions rapides
- **Toggle Priority**: Cliquable à tout moment (même en édition)
- **Complete**: Disponible sur les tâches pending
- **Archive**: Disponible sur les tâches completed (avec confirmation)

## Avantages

### UX améliorée
- ? Édition contextuelle sans perte de contexte visuel
- ? Moins de clics et de mouvements de scroll
- ? Actions claires et prévisibles

### Architecture simplifiée
- ? Moins de state global (plus de `selectedToDoId` dans App)
- ? État d'édition localisé dans `ToDoList`
- ? Composants plus découplés

### Maintenabilité
- ? Séparation claire: création vs édition
- ? Logique d'édition isolée dans `ToDoItem`
- ? Moins de props drilling

## Tests suggérés

### Fonctionnels
- [ ] Cliquer sur "Modifier" active le mode édition
- [ ] Modifier description et sauvegarder persiste les changements
- [ ] Annuler restaure les valeurs originales
- [ ] Toggle priority fonctionne en mode édition
- [ ] Éditer une 2e tâche annule la 1ère édition
- [ ] Compléter une tâche en édition ferme l'édition
- [ ] Archiver une tâche en édition ferme l'édition

### Visuels
- [ ] Bordure bleue apparaît en mode édition
- [ ] Inputs sont stylisés et accessibles
- [ ] Boutons sauvegarder/annuler sont distinctifs
- [ ] Informations d'audit apparaissent uniquement en édition

## Migration notes
- **Breaking change**: `ToDoItem` ne gère plus la sélection
- **Breaking change**: Props `isSelected`, `onSelectTodo`, `onClearSelection` supprimées
- **Nouvelle API**: Props `isEditing`, `onEditStart`, `onEditCancel` ajoutées

## Prochaines étapes possibles
- [ ] Validation des inputs (longueur max description)
- [ ] Auto-save sur blur au lieu de bouton Sauvegarder
- [ ] Keyboard shortcuts (Escape pour annuler, Enter pour sauvegarder)
- [ ] Animation de transition entre modes
- [ ] Confirmation sur annulation si modifications importantes
