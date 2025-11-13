# Guide des Composants Common - TaskFlow

## Vue d'ensemble

Les composants `common/` sont des composants réutilisables de base utilisés dans toute l'application. Ils assurent la cohérence visuelle et fonctionnelle.

## Composants Disponibles

### 1. PageLayout
**Fichier**: `common/PageLayout.jsx`

**Usage**: Layout principal de l'application (container et structure)

**Props**:
- `children` - Contenu de la page

**Exemple**:
```jsx
import PageLayout from '../../common/PageLayout';

<PageLayout>
  <YourContent />
</PageLayout>
```

**Structure**:
- Container centré max-w-[900px]
- Padding horizontal px-12
- Padding vertical py-8
- Background slate-900

---

### 2. Header
**Fichier**: `common/Header.jsx`

**Usage**: Header de l'application avec logo et slogan

**Props**: Aucun (statique)

**Exemple**:
```jsx
import Header from '../../common/Header';

<Header />
```

**Caractéristiques**:
- Background slate-800
- Border arrondi (rounded-lg)
- SparklesIcon (w-6 h-6, text-blue-400)
- Point séparateur avec style inline pour affichage correct
- Margin bottom mb-6

---

### 3. Card
**Fichier**: `common/Card.jsx`

**Usage**: Container avec bordure, padding et background

**Props**:
- `children` - Contenu de la card
- `className` - Classes CSS additionnelles
- `onClick` - Handler de click (rend la card cliquable)

**Exemple**:
```jsx
import Card from '../common/Card';

<Card className="hover:bg-slate-700">
  <p>Content</p>
</Card>
```

---

### 4. TextInput
**Fichier**: `common/TextInput.jsx`

**Usage**: Input de base (généralement utilisé via wrappers)

**Props**:
- `label` - Label optionnel
- `type` - Type d'input (default: 'text')
- `value` - Valeur contrôlée
- `onChange` - Handler (reçoit la valeur directement)
- `placeholder` - Placeholder text
- `required` - Champ requis
- `error` - Message d'erreur
- `className` - Classes pour le wrapper
- `inputClassName` - Classes pour l'input lui-même

**Exemple**:
```jsx
<TextInput
  label="Description"
  value={desc}
  onChange={setDesc}
  inputClassName="w-full"
}
```

---

### 5. DescriptionInput
**Fichier**: `common/DescriptionInput.jsx`

**Usage**: Wrapper de TextInput pour descriptions (avec flex-1)

**Props**:
- `value` - Valeur de la description
- `onChange` - Handler
- `placeholder` - Texte placeholder (default: "What needs to be done?")
- `onClick` - Handler de click

**Exemple**:
```jsx
import DescriptionInput from '../common/DescriptionInput';

<DescriptionInput
  value={description}
  onChange={setDescription}
}
```

**? À utiliser dans**: ToDoCreate, ToDoItemEdit

---

### 6. DueDatePicker
**Fichier**: `common/DueDatePicker.jsx`

**Usage**: Wrapper de TextInput pour dates

**Props**:
- `value` - Date au format YYYY-MM-DD
- `onChange` - Handler
- `onClick` - Handler de click
- `className` - Classes additionnelles (ex: "w-44")

**Exemple**:
```jsx
import DueDatePicker from '../common/DueDatePicker';

<DueDatePicker
  value={dueDate}
  onChange={setDueDate}
  className="w-44"
}
```

**? À utiliser dans**: ToDoCreate, ToDoItemEdit

**?? Important**: Toujours utiliser `className="w-44"` pour cohérence

---

### 7. Select
**Fichier**: `common/Select.jsx`

**Usage**: Dropdown avec ChevronDownIcon

**Props**:
- `label` - Label optionnel (omis dans les filtres)
- `value` - Valeur sélectionnée
- `onChange` - Handler (reçoit la valeur directement)
- `options` - Array de `{ value, label }`
- `className` - Classes additionnelles

**Exemple**:
```jsx
import Select from '../common/Select';

<Select
  value={statusFilter}
  onChange={setStatusFilter}
  options={[
    { value: 'all', label: 'All tasks' },
    { value: 'active', label: 'Active' }
  ]}
}
```

**? À utiliser dans**: StatusSelect, PrioritySelect, SortSelect

**Structure attendue**:
```jsx
<div className="flex items-center gap-2">
  <FunnelIcon className="w-5 h-5 text-slate-400" />
  <Select ... />
</div>
```

---

### 8. PriorityToggle
**Fichier**: `common/PriorityToggle.jsx`

**Usage**: Toggle étoile avec hover fill effect

**Props**:
- `isPriority` - État de priorité
- `onToggle` - Handler de toggle
- `disabled` - Désactiver le toggle
- `className` - Classes additionnelles

**Exemple**:
```jsx
import PriorityToggle from '../common/PriorityToggle';

<PriorityToggle
  isPriority={isPriority}
  onToggle={handleTogglePriority}
}
```

**? À utiliser dans**: ToDoCreate, ToDoItemEdit, ToDoItemView, ToDoItemCompleted

**Comportement**:
- StarIcon solid quand `isPriority` ou au hover
- StarIconOutline sinon
- Couleur orange quand priority, slate sinon

---

### 9. IconButton
**Fichier**: `common/IconButton.jsx`

**Usage**: Bouton avec icône uniquement (sans background/padding)

**Props**:
- `icon` - Élément React de l'icône
- `label` - Label pour accessibilité (aria-label)
- `variant` - 'default' | 'primary' | 'danger' | 'success'
- `disabled` - Désactiver le bouton
- `className` - Classes additionnelles
- `onClick` - Handler de click

**Exemple**:
```jsx
import IconButton from '../common/IconButton';
import { CheckIcon } from '@heroicons/react/24/outline';

<IconButton
  icon={<CheckIcon className="w-5 h-5" />}
  label="Save"
  variant="success"
  onClick={handleSave}
}
```

**? À utiliser dans**: ToDoItemView, ToDoItemEdit, ToDoItemCompleted

**Taille des icônes**: Toujours `w-5 h-5`

---

### 10. Spinner
**Fichier**: `common/Spinner.jsx`

**Usage**: Indicateur de chargement animé

**Props**:
- `size` - 'sm' | 'md' | 'lg'

**Exemple**:
```jsx
import Spinner from '../common/Spinner';

{loading && <Spinner size="lg" />}
```

**? À utiliser dans**: TodosPage (loading states)

---

## Patterns d'Utilisation

### Layout Principal
```jsx
<PageLayout>
  {/* Header inclus automatiquement */}
  <YourContent />
</PageLayout>
```

### Formulaire de Création/Édition
```jsx
<div className="flex items-center gap-3">
  <PriorityToggle ... />
  <DescriptionInput ... />
  <DueDatePicker className="w-44" ... />
  <IconButton ... />
</div>
```

### Filtres
```jsx
<div className="grid grid-cols-3 gap-4">
  <div className="flex items-center gap-2">
    <FunnelIcon className="w-5 h-5 text-slate-400" />
    <Select ... />
  </div>
  {/* Répéter pour autres filtres */}
</div>
```

### Affichage de Tâche
```jsx
<div className="flex items-center gap-3">
  <PriorityToggle ... />
  <div className="flex-1 min-w-0">
    <p>{description}</p>
  </div>
  <div className="w-44">
    <p>{formatDateForDisplay(dueDate)}</p>
  </div>
  <div className="flex items-center gap-2">
    <IconButton ... />
    <IconButton ... />
  </div>
</div>
```

## ? Anti-Patterns à Éviter

### 1. Input HTML direct
```jsx
// ? MAUVAIS
<input type="text" placeholder="Description" />

// ? BON
<DescriptionInput placeholder="Description" />
```

### 2. Input date HTML direct
```jsx
// ? MAUVAIS
<input type="date" value={date} onChange={e => setDate(e.target.value)} />

// ? BON
<DueDatePicker value={date} onChange={setDate} className="w-44" />
```

### 3. Select HTML direct
```jsx
// ? MAUVAIS
<select>
  <option value="all">All</option>
</select>

// ? BON
<Select options={[{ value: 'all', label: 'All' }]} />
```

### 4. Bouton avec icône custom
```jsx
// ? MAUVAIS
<button onClick={handleEdit}>
<PencilIcon className="w-5 h-5" />
</button>

// ? BON
<IconButton
  icon={<PencilIcon className="w-5 h-5" />}
  label="Edit"
  onClick={handleEdit}
}
```

### 5. Largeurs incohérentes
```jsx
// ? MAUVAIS
<DueDatePicker className="w-40" />
<DueDatePicker className="w-36" />

// ? BON - Toujours w-44
<DueDatePicker className="w-44" />
<DueDatePicker className="w-44" />
```

## Checklist de Vérification

Avant de créer un nouveau composant, vérifier:

- [ ] Un composant common existe-t-il déjà?
- [ ] Le composant est-il utilisé partout où il devrait l'être?
- [ ] Les props sont-elles cohérentes?
- [ ] Les tailles (w-44, w-5 h-5) sont-elles cohérentes?
- [ ] Le composant suit-il les patterns établis?

## Maintenance

Si vous devez modifier un composant common:

1. **Vérifier tous les usages** avant de modifier
2. **Tester dans tous les contextes** (Create, Edit, View, Completed)
3. **Documenter les changements** dans ce guide
4. **Maintenir la cohérence** visuelle et fonctionnelle

## Scripts Utiles

```powershell
# Audit complet des composants common
.\audit-common-components.ps1

# Vérifier les props DOM invalides
.\check-dom-props.ps1
```

---

**Dernière mise à jour**: Décembre 2024
**Composants**: 10
**Usage**: Obligatoire pour cohérence
