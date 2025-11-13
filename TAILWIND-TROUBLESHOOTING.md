# Guide de Dépannage Tailwind CSS

## Symptôme: Tailwind ne charge pas / Pas de styles

### Signes
- ? Background reste blanc
- ? Texte noir par défaut
- ? Aucun style appliqué
- ? Aucune erreur console
- ? App se charge correctement

## Solution Rapide (Automatique)

```powershell
# 1. Diagnostic
.\diagnose-tailwind.ps1

# 2. Fix automatique
.\fix-tailwind-loading.ps1

# 3. Test
.\test-tailwind.ps1

# 4. Démarrer
cd TaskFlow.WebSite
npm run dev
```

## Solution Manuelle

### Étape 1: Nettoyer les caches

```powershell
cd TaskFlow.WebSite

# Supprimer tous les caches
Remove-Item -Recurse -Force .vite
Remove-Item -Recurse -Force dist
Remove-Item -Recurse -Force node_modules/.cache
```

### Étape 2: Vérifier les configurations

#### tailwind.config.js
```javascript
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",  // ? Important!
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

#### postcss.config.js
```javascript
export default {
  plugins: {
    tailwindcss: {},      // ? Important!
    autoprefixer: {},
  },
}
```

#### src/index.css
```css
@import './styles/theme.css';
@import './styles/utilities.css';

@tailwind base;          /* ? Important! */
@tailwind components;    /* ? Important! */
@tailwind utilities;     /* ? Important! */

body {
  margin: 0;
  min-height: 100vh;
}
```

#### src/main.jsx
```javascript
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'        // ? Important!
import App from './App.jsx'
```

### Étape 3: Réinstaller Tailwind (si nécessaire)

```powershell
cd TaskFlow.WebSite
npm install -D tailwindcss@latest postcss@latest autoprefixer@latest
```

### Étape 4: Test de build

```powershell
cd TaskFlow.WebSite
npm run build
```

Vérifier qu'il n'y a **aucune erreur** liée à Tailwind ou PostCSS.

### Étape 5: Démarrer le serveur

```powershell
npm run dev
```

### Étape 6: Hard refresh du navigateur

- **Chrome/Edge**: `Ctrl + Shift + R`
- **Firefox**: `Ctrl + F5`  
- **Safari**: `Cmd + Option + R`

## Vérifications

### Dans le navigateur (F12)

#### Onglet Network
1. Rechercher les fichiers `.css`
2. Vérifier la taille (devrait être > 50KB)
3. Cliquer sur le fichier CSS
4. Vérifier qu'il contient des classes Tailwind (ex: `.bg-slate-900`)

#### Onglet Elements
1. Inspecter un élément (ex: `<div className="bg-slate-900">`)
2. Dans le panneau Styles, vérifier:
 ```css
   .bg-slate-900 {
     background-color: rgb(15 23 42);
   }
   ```

#### Onglet Console
- ? **Aucune erreur** (surtout pas de PostCSS/Tailwind errors)
- ? Aucun warning sur les classes inconnues

### Dans le code

#### Test rapide dans PageLayout.jsx
Ajouter temporairement des classes de debug:

```jsx
<div className="min-h-screen bg-red-500">  {/* ? Test rouge */}
  {/* Si vous voyez du rouge, Tailwind fonctionne! */}
</div>
```

Remplacer par `bg-slate-900` une fois confirmé.

## Problèmes Communs

### 1. Cache navigateur
**Solution:** Hard refresh (Ctrl+Shift+R)

### 2. Cache Vite
**Solution:** Supprimer `.vite` et redémarrer

### 3. Mauvais path dans content
**Solution:** Vérifier que `"./src/**/*.{js,ts,jsx,tsx}"` est présent

### 4. PostCSS non configuré
**Solution:** Vérifier `postcss.config.js`

### 5. Import CSS manquant
**Solution:** Vérifier `import './index.css'` dans main.jsx

### 6. Directives Tailwind manquantes
**Solution:** Vérifier `@tailwind base/components/utilities` dans index.css

### 7. Node modules corrompus
```powershell
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install
```

## Test Minimal

Créer `test-component.jsx`:
```jsx
const Test = () => (
  <div className="bg-blue-500 text-white p-4 text-center text-2xl font-bold">
    TAILWIND WORKS!
  </div>
);
export default Test;
```

Importer dans App.jsx temporairement. Si vous voyez un bloc bleu avec texte blanc, **Tailwind fonctionne!**

## Checklist Finale

Avant de demander de l'aide, vérifier:

- [ ] `npm install` exécuté sans erreur
- [ ] `tailwind.config.js` existe et contient `content: ["./src/**/*.{js,jsx,tsx}"]`
- [ ] `postcss.config.js` existe et contient les plugins
- [ ] `src/index.css` contient les 3 directives `@tailwind`
- [ ] `src/main.jsx` importe `./index.css`
- [ ] Cache Vite supprimé (`.vite/`)
- [ ] `npm run build` réussit sans erreur
- [ ] Hard refresh du navigateur fait
- [ ] Console browser sans erreurs
- [ ] Network tab montre fichier CSS > 50KB

## Si tout échoue

```powershell
# Reset complet
cd TaskFlow.WebSite
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
Remove-Item -Recurse -Force .vite
Remove-Item -Recurse -Force dist

# Réinstallation propre
npm install

# Rebuild complet
npm run build

# Test
npm run dev
```

## Aide Supplémentaire

Si le problème persiste après toutes ces étapes:

1. Partager la sortie de `.\diagnose-tailwind.ps1`
2. Partager screenshot du Network tab (fichiers CSS)
3. Partager screenshot de la console (onglet Console + Network)
4. Partager version Node: `node --version`
5. Partager version NPM: `npm --version`
