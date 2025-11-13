# Guide de Réparation CSS - TaskFlow WebSite

## Problèmes Identifiés et Corrigés

### 1. ? index.css contenait CSS par défaut de Vite
**Problème:** Body avec `display: flex` et `place-items: center` cassait le layout
**Solution:** Remplacé par configuration Tailwind propre

### 2. ? tailwind.config.js était vide
**Problème:** Tailwind ne pouvait pas générer les classes
**Solution:** Ajouté configuration complète

### 3. ? postcss.config.js était vide  
**Problème:** PostCSS ne pouvait pas traiter Tailwind
**Solution:** Ajouté configuration avec tailwindcss et autoprefixer

## Fichiers Corrigés

### src/index.css ?
```css
@import './styles/theme.css';
@import './styles/utilities.css';

@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  margin: 0;
  min-height: 100vh;
}
```

### tailwind.config.js ?
```javascript
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### postcss.config.js ?
```javascript
export default {
plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

## Commandes de Vérification

### 1. Diagnostic complet
```powershell
.\diagnose-css.ps1
```

### 2. Installation des dépendances (si nécessaire)
```powershell
cd TaskFlow.WebSite
npm install
```

### 3. Vérifier que Tailwind est installé
```powershell
cd TaskFlow.WebSite
npm list tailwindcss postcss autoprefixer
```

### 4. Build de test
```powershell
cd TaskFlow.WebSite
npm run build
```

### 5. Démarrer le dev server
```powershell
cd TaskFlow.WebSite
npm run dev
```

## Structure CSS Finale

```
TaskFlow.WebSite/
??? src/
?   ??? index.css (Imports + Tailwind + Body reset)
?   ??? styles/
?       ??? theme.css (Variables CSS custom)
?       ??? utilities.css (Classes utilitaires custom)
??? tailwind.config.js (Config Tailwind)
??? postcss.config.js (Config PostCSS)
```

## Vérification Visuelle

Une fois l'app lancée, vous devriez voir:
- ? Background slate-900 (dark)
- ? Header centré avec logo et slogan
- ? Container max-width 900px centré
- ? Cards avec bordures et padding
- ? Couleurs Tailwind appliquées
- ? Hover effects fonctionnels
- ? Responsive design

## Si le problème persiste

1. **Supprimer node_modules et réinstaller:**
```powershell
cd TaskFlow.WebSite
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install
```

2. **Vider le cache Vite:**
```powershell
cd TaskFlow.WebSite
Remove-Item -Recurse -Force .vite
npm run dev
```

3. **Hard refresh du navigateur:**
- Chrome/Edge: `Ctrl + Shift + R`
- Firefox: `Ctrl + F5`

## Dépendances Requises

Vérifiez que package.json contient:
```json
{
  "devDependencies": {
    "tailwindcss": "^3.4.0",
    "autoprefixer": "^10.4.16",
    "postcss": "^8.4.32"
  }
}
```

Si manquantes, installer:
```powershell
cd TaskFlow.WebSite
npm install -D tailwindcss@latest autoprefixer@latest postcss@latest
```

## État Final Attendu

- ? Tous les fichiers CSS configurés
- ? Tailwind génère les classes
- ? PostCSS traite correctement
- ? Pas de conflits CSS
- ? Layout fonctionne correctement
- ? Styles appliqués partout

**Si tout est correct, l'application devrait s'afficher avec le design dark moderne ! ??**
