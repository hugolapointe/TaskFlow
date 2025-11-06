# Checklist de vérification - Édition inline

## ? Corrections effectuées

### Imports corrigés (Round 1)
- [x] `ToDoItem.jsx` - Import de `todoUtils`
- [x] `todoActions.js` - Imports de `todoApi` et `todoUtils`
- [x] `ToDoContext.jsx` - Import de `todoApi`
- [x] `ToDoItemAudit.jsx` - Import de `todoUtils`

### Formulaire de création corrigé (Round 2)
- [x] `ToDoCreateForm.jsx` - Restructuration JSX avec formRow
- [x] `ToDoCreateForm.module.css` - Simplification et alignement
- [x] Ajout de l'icône PlusIcon
- [x] Ajout du container wrapper

### Compilation
- [x] Aucune erreur de compilation
- [x] Tous les composants importent correctement leurs dépendances

## ?? Tests manuels à effectuer

### 0. Démarrage de l'application
- [ ] Le backend .NET démarre sans erreur
- [ ] Le frontend React démarre sans erreur
- [ ] Aucune erreur dans la console du navigateur
- [ ] La page s'affiche correctement

### 1. Formulaire de création
- [ ] Le formulaire s'affiche avec une card stylisée
- [ ] L'input de description est visible et stylisé
- [ ] L'input de date est visible et stylisé
- [ ] Le bouton submit affiche l'icône Plus (+)
- [ ] Le bouton est désactivé quand la description est vide
- [ ] Entrer du texte active le bouton
- [ ] Submit crée une tâche
- [ ] Toast "Task created!" apparaît
- [ ] Le formulaire se réinitialise après submit
- [ ] La nouvelle tâche apparaît en haut de la liste

### 2. Affichage de la liste
- [ ] Les tâches s'affichent correctement
- [ ] Les statistiques apparaissent en haut (Remaining, Priority, etc.)
- [ ] Les filtres sont visibles
- [ ] Le design est cohérent

### 3. Mode édition inline
- [ ] Cliquer sur le bouton "Modifier" (icône crayon) active le mode édition
- [ ] La description devient un input text avec la valeur pré-chargée
- [ ] La date devient un input date avec la valeur pré-chargée
- [ ] Les boutons changent pour [Sauvegarder (?)] [Annuler (?)]
- [ ] Les informations d'audit apparaissent en bas (Created, Updated)
- [ ] La bordure devient bleue en mode édition

### 4. Sauvegarder les modifications
- [ ] Modifier la description
- [ ] Modifier la date
- [ ] Cliquer sur "Sauvegarder" (icône check)
- [ ] Les changements sont persistés dans l'API
- [ ] Toast "Task updated!" apparaît
- [ ] Le mode édition se ferme
- [ ] Les nouvelles valeurs s'affichent

### 5. Annuler les modifications
- [ ] Entrer en mode édition
- [ ] Modifier la description et/ou la date
- [ ] Cliquer sur "Annuler" (icône X)
- [ ] Les valeurs originales sont restaurées
- [ ] Le mode édition se ferme
- [ ] Aucune requête API n'est faite

### 6. Édition exclusive
- [ ] Éditer une tâche A
- [ ] Cliquer sur "Modifier" d'une tâche B
- [ ] La tâche A sort automatiquement du mode édition
- [ ] La tâche A restaure ses valeurs originales
- [ ] La tâche B entre en mode édition

### 7. Toggle priority
- [ ] Le bouton de priorité (!) fonctionne hors édition
- [ ] Cliquer change la couleur de l'icône
- [ ] Toast "Priority updated!" apparaît
- [ ] La tâche change de couleur/style
- [ ] Le bouton de priorité fonctionne EN mode édition
- [ ] Toggle priority en édition ne ferme pas l'édition

### 8. Actions rapides
#### Tâche pending
- [ ] Bouton "Modifier" (crayon) visible
- [ ] Bouton "Compléter" (coche) visible
- [ ] Cliquer sur "Compléter" marque la tâche comme complétée
- [ ] Toast "Task completed!" apparaît
- [ ] La tâche devient grisée/barrée

#### Tâche completed
- [ ] Bouton "Modifier" (crayon) visible
- [ ] Bouton "Archiver" (boîte) visible
- [ ] Cliquer sur "Archiver" affiche une confirmation
- [ ] Confirmer supprime la tâche de la liste
- [ ] Toast "Task archived!" apparaît

### 9. Interactions pendant édition
- [ ] Compléter une tâche en édition ferme l'édition
- [ ] Archiver une tâche en édition ferme l'édition
- [ ] Toggle priority en édition fonctionne SANS fermer l'édition

### 10. Filtres et statistiques
- [ ] Cliquer sur "Remaining" filtre les tâches pending
- [ ] Cliquer sur "Priority" filtre les tâches prioritaires
- [ ] Cliquer sur "Non Priority" filtre les tâches non-prioritaires
- [ ] Cliquer sur "Completed" filtre les tâches complétées
- [ ] Cliquer 2x sur la même stat réinitialise le filtre
- [ ] Les statistiques se mettent à jour après chaque action

### 11. Styles visuels
- [ ] Bordure bleue apparaît en mode édition
- [ ] Inputs d'édition sont bien stylisés
- [ ] Boutons Sauvegarder (vert) et Annuler (rouge) sont distinctifs
- [ ] Section audit est bien formatée
- [ ] Le formulaire de création est dans une card stylisée
- [ ] Les icônes sont claires et visibles
- [ ] Pas de décalage ou de bug visuel

### 12. Responsive design
- [ ] Sur mobile, le formulaire s'adapte correctement
- [ ] Les inputs prennent toute la largeur sur mobile
- [ ] Les boutons restent accessibles
- [ ] Les tâches s'affichent correctement
- [ ] Le mode édition fonctionne sur mobile

## ?? Commandes de démarrage

```bash
# Démarrer le backend (.NET)
cd TaskFlow.WebAPI
dotnet run

# Démarrer le frontend (React)
cd TaskFlow.WebSite
npm run dev
```

L'API devrait être accessible sur: `http://localhost:5154`
Le frontend devrait être accessible sur: `http://localhost:5173` (ou le port indiqué par Vite)

## ?? Notes de débogage

Si des erreurs apparaissent:

### Console navigateur
1. Ouvrir les DevTools (F12)
2. Onglet Console - Vérifier les erreurs JavaScript
3. Onglet Network - Vérifier les appels API (statut 200, 400, 500)
4. Onglet Elements - Inspecter le DOM pour les styles

### Console terminal (Vite)
1. Vérifier les erreurs de compilation
2. Vérifier les warnings ESLint
3. Vérifier les imports manquants

### Backend API
1. Vérifier que l'API est démarrée (`dotnet run`)
2. Tester manuellement: `http://localhost:5154/api/todos`
3. Vérifier les logs du backend pour erreurs SQL/validation

### Problèmes courants
- **CORS**: Vérifier que le backend autorise `localhost:5173`
- **Ports**: Vérifier que 5154 (API) et 5173 (Frontend) sont disponibles
- **Cache**: Vider le cache du navigateur (Ctrl+Shift+R)

## ? Statut final
- [x] Corrections d'imports appliquées (Round 1)
- [x] Formulaire de création corrigé (Round 2)
- [x] Aucune erreur de compilation
- [x] Documentation créée
- [ ] Tests manuels à effectuer par l'utilisateur

## ?? Documentation associée
- `FIX_IMPORT_CASING.md` - Corrections des imports
- `FIX_CREATE_FORM.md` - Corrections du formulaire
- `REFACTOR_INLINE_EDIT.md` - Documentation de la refonte
