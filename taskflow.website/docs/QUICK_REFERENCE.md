# ? Quick Fix Reference

## Problèmes résolus

### 1?? Imports cassés
**Symptôme:** Erreurs "module not found"
**Cause:** Casse incorrecte (`ToDoApi` vs `todoApi`)
**Fix:** Renommer tous les imports en minuscules
?? Détails: `FIX_IMPORT_CASING.md`

### 2?? Formulaire de création cassé
**Symptôme:** Formulaire non stylisé / layout brisé
**Cause:** Structure JSX != CSS attendu
**Fix:** Restructurer avec `.formRow` + `.inputGroup` + icône
?? Détails: `FIX_CREATE_FORM.md`

### 3?? Marges horizontales manquantes
**Symptôme:** Contenu collé aux bords de l'écran
**Cause:** `App.css` vide, pas de padding défini
**Fix:** Ajouter styles `.app` et `.main-content`
?? Détails: `FIX_HORIZONTAL_MARGINS.md`

---

## Fichiers critiques modifiés

```
src/
??? App.css         ? Styles globaux ajoutés
??? App.jsx     ? Structure correcte
??? components/
?   ??? AppHeader/
?   ?   ??? AppHeader.module.css  ? Padding ajouté
? ??? ToDoCreateForm/
?   ?   ??? ToDoCreateForm.jsx    ? Restructuré
?   ?   ??? ToDoCreateForm.module.css ? Simplifié
?   ??? ToDoItem/
?   ?   ??? ToDoItem.jsx   ? Import corrigé
?   ?   ??? components/
?   ?       ??? ToDoItemAudit/
?   ?           ??? ToDoItemAudit.jsx ? Import corrigé
?   ??? ToDoList/
?       ??? ToDoList.jsx       ? Props updated
??? contexts/
?   ??? ToDoContext.jsx        ? Import corrigé
??? services/
    ??? todoActions.js         ? Imports corrigés
    ??? todoApi.js   ? OK
```

---

## Code snippets essentiels

### App.css (était vide)
```css
.app {
  min-height: 100vh;
  background-color: var(--bg-app);
}

.main-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--spacing-xl) var(--spacing-lg);
}
```

### Imports corrects
```javascript
// ? CORRECT
import * as toDoApi from './todoApi';
import { isOverdue } from '../../utils/todoUtils';

// ? INCORRECT
import * as toDoApi from './ToDoApi';
import { isOverdue } from '../../utils/toDoUtils';
```

### ToDoCreateForm structure
```jsx
<div className={styles.container}>
  <form className={styles.form}>
    <div className={styles.formRow}>
      <div className={styles.inputGroup}>
        <input ... />
 </div>
      <div className={styles.inputGroup}>
        <input type="date" ... />
      </div>
      <button>
        <PlusIcon />
      </button>
    </div>
  </form>
</div>
```

---

## Commandes de vérification

```bash
# Build check
cd TaskFlow.WebSite
npm run build

# Dev server
npm run dev

# Backend
cd TaskFlow.WebAPI
dotnet run
```

---

## Checklist rapide

### Compilation
- [x] 0 erreurs
- [x] 0 warnings critiques

### UI
- [ ] Formulaire créé visible et stylisé
- [ ] Marges horizontales présentes (desktop)
- [ ] Contenu centré (max-width 1200px)
- [ ] Background visible sur les côtés
- [ ] Édition inline fonctionne
- [ ] Tous les boutons cliquables

### Responsive
- [ ] Desktop: padding 16px
- [ ] Tablet: padding 12px
- [ ] Mobile: padding 8px

---

## Documentation complète

| Doc | Description |
|-----|-------------|
| `SUMMARY_ALL_FIXES.md` | ?? Résumé exhaustif |
| `REFACTOR_INLINE_EDIT.md` | ?? Refonte édition inline |
| `FIX_IMPORT_CASING.md` | ?? Corrections imports |
| `FIX_CREATE_FORM.md` | ?? Corrections formulaire |
| `FIX_HORIZONTAL_MARGINS.md` | ?? Corrections marges |
| `VISUAL_LAYOUT_GUIDE.md` | ?? Guide visuel layout |
| `TESTING_CHECKLIST.md` | ? Tests à effectuer |

---

## Support rapide

**Problème:** Imports cassés
**Solution:** Utiliser `todoApi` et `todoUtils` (minuscules)

**Problème:** Formulaire laid
**Solution:** Vérifier structure JSX avec `.formRow`

**Problème:** Pas de marges
**Solution:** Vérifier `App.css` contient `.app` et `.main-content`

**Problème:** Erreur "module not found"
**Solution:** `npm install` puis `npm run dev`

**Problème:** Backend ne répond pas
**Solution:** `cd TaskFlow.WebAPI && dotnet run`

---

## Status

? **Round 1:** Imports corrigés
? **Round 2:** Formulaire corrigé
? **Round 3:** Marges restaurées

?? **Application prête pour tests!**
