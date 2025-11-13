# Checklist Pré-Commit - TaskFlow Frontend

## ?? À Exécuter

### 1. Nettoyage
```powershell
.\clean-for-commit.ps1
```

### 2. Audit
```powershell
.\pre-commit-audit.ps1
```

### 3. Si audit OK, supprimer les scripts temporaires
```powershell
Remove-Item *-audit.ps1, clean-for-commit.ps1, COMMIT-CHECKLIST.md
```

## ? Vérifications Manuelles

### Code
- [ ] Pas de console.log (sauf console.error)
- [ ] Pas de JSDoc
- [ ] Pas de commentaires inutiles
- [ ] Noms en PascalCase pour composants
- [ ] Imports Heroicons v2 (/24/solid ou /24/outline)

### Composants Common
- [ ] DescriptionInput utilisé au lieu de `<input type="text">`
- [ ] DueDatePicker utilisé au lieu de `<input type="date">`
- [ ] Select utilisé au lieu de `<select>`
- [ ] IconButton pour tous les boutons avec icônes
- [ ] DueDatePicker toujours avec `className="w-44"`
- [ ] Icônes toujours `w-5 h-5` dans IconButton

### Structure
- [ ] Pas de fichiers .md sauf README.md
- [ ] Pas de scripts .ps1 temporaires
- [ ] .gitignore à jour
- [ ] README.md complet

### Build
- [ ] `npm run build` réussit sans erreur
- [ ] Pas d'erreurs ESLint
- [ ] Pas d'avertissements critiques

### API
- [ ] baseURL correcte dans axiosClient.js
- [ ] Gestion d'erreurs présente partout
- [ ] Optimistic updates fonctionnels

### Design
- [ ] Header attaché au top
- [ ] Largeur max 900px
- [ ] Barre de séparation verticale dans header
- [ ] Barre de séparation dans audit
- [ ] Icône logo jaune (text-yellow-400)
- [ ] Dates au format yyyy-mm-dd partout

### Tests
- [ ] Application démarre sans erreur
- [ ] Toutes les fonctionnalités testées
- [ ] Pas d'erreurs dans la console navigateur
- [ ] Network requests OK (F12)

## ?? Fichiers à Commiter

### Source
- [ ] src/ (tous les fichiers .jsx, .js, .css)
- [ ] public/
- [ ] index.html

### Configuration
- [ ] package.json
- [ ] package-lock.json
- [ ] tailwind.config.js
- [ ] postcss.config.js
- [ ] vite.config.js

### Documentation
- [ ] README.md

### Git
- [ ] .gitignore

## ? À NE PAS Commiter

- [ ] node_modules/
- [ ] dist/
- [ ] .vite/
- [ ] *.log
- [ ] .env (si présent)
- [ ] Scripts .ps1 temporaires
- [ ] Fichiers .md de documentation (sauf README)

## ?? Commandes Git

```bash
# Vérifier le statut
git status

# Ajouter les fichiers
git add src/ public/ index.html package*.json *.config.js README.md .gitignore

# Commit
git commit -m "feat: Complete TaskFlow frontend implementation

- React 18 with Vite and Tailwind CSS
- Full CRUD operations with optimistic updates
- Filtering, sorting, and statistics
- Modern UI with Heroicons
- Clean component architecture
- Responsive design"

# Push
git push origin main
```

## ? Validation Finale

Avant de push, vérifier:
1. [ ] Build production réussit
2. [ ] Application fonctionne en mode dev
3. [ ] Pas de fichiers temporaires
4. [ ] README à jour
5. [ ] Conventions respectées
