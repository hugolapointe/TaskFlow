# ?? Utilisation de Heroicons dans TaskFlow

## Installation

```bash
npm install @heroicons/react
```

## Import des icônes

### Outline (contour)
```javascript
import { StarIcon, CheckIcon, PlusIcon } from '@heroicons/react/24/outline';
```

### Solid (rempli)
```javascript
import { StarIcon } from '@heroicons/react/24/solid';
```

## Icônes utilisées dans le projet

| Composant | Icône | Type | Usage |
|-----------|-------|------|-------|
| **ToDoForm** | `XMarkIcon` | Outline | Bouton Cancel |
| | `StarIcon` | Outline | Priorité normale |
| | `StarIcon` | Solid | Priorité haute (actif) |
| | `DocumentTextIcon` | Outline | Input description |
| | `CalendarIcon` | Outline | Input date |
| | `CheckIcon` | Outline | Bouton Update |
| | `PlusIcon` | Outline | Bouton Create |
| **ToDoItem** | `StarIcon` | Solid | Indicateur priorité |
| | `CalendarIcon` | Outline | Date d'échéance |
| | `CheckCircleIcon` | Outline | Marquer comme complété |
| | `ArchiveBoxIcon` | Outline | Archiver |
| **EmptyState** | `ClipboardDocumentListIcon` | Outline | Liste vide |

## Styling

Les icônes héritent automatiquement de :
- `color` ? via `className` et CSS
- `width` / `height` ? via classes CSS (ex: `w-5 h-5`)

```javascript
<CheckIcon className="w-5 h-5 text-green-500" />
```

## Documentation complète

[Heroicons Official Docs](https://heroicons.com/)
