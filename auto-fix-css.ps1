#!/usr/bin/env pwsh
Write-Host "=== RÉPARATION AUTOMATIQUE CSS ===" -ForegroundColor Cyan
Write-Host ""

Set-Location TaskFlow.WebSite

# 1. Vérifier et installer les dépendances
Write-Host "1. Installation des dépendances..." -ForegroundColor Yellow
if (!(Test-Path "node_modules")) {
    Write-Host "  Installation complète..." -ForegroundColor Cyan
    npm install
} else {
    Write-Host "  Vérification de Tailwind..." -ForegroundColor Cyan
    if (!(Test-Path "node_modules/tailwindcss")) {
   Write-Host "  Installation de Tailwind CSS..." -ForegroundColor Cyan
    npm install -D tailwindcss@latest postcss@latest autoprefixer@latest
    }
    
    if (!(Test-Path "node_modules/@heroicons")) {
    Write-Host "  Installation de Heroicons..." -ForegroundColor Cyan
        npm install @heroicons/react
    }
}

# 2. Vérifier tailwind.config.js
Write-Host "`n2. Vérification de tailwind.config.js..." -ForegroundColor Yellow
$tailwindConfig = @"
/** @type {import('tailwindcss').Config} */
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
"@

if (!(Test-Path "tailwind.config.js") -or (Get-Item "tailwind.config.js").Length -eq 0) {
    Write-Host "  Création de tailwind.config.js..." -ForegroundColor Cyan
    $tailwindConfig | Out-File -FilePath "tailwind.config.js" -Encoding utf8
    Write-Host "  ? tailwind.config.js créé" -ForegroundColor Green
} else {
    Write-Host "  ? tailwind.config.js existe" -ForegroundColor Green
}

# 3. Vérifier postcss.config.js
Write-Host "`n3. Vérification de postcss.config.js..." -ForegroundColor Yellow
$postcssConfig = @"
export default {
  plugins: {
 tailwindcss: {},
    autoprefixer: {},
  },
}
"@

if (!(Test-Path "postcss.config.js") -or (Get-Item "postcss.config.js").Length -eq 0) {
    Write-Host "  Création de postcss.config.js..." -ForegroundColor Cyan
    $postcssConfig | Out-File -FilePath "postcss.config.js" -Encoding utf8
    Write-Host "  ? postcss.config.js créé" -ForegroundColor Green
} else {
    Write-Host "  ? postcss.config.js existe" -ForegroundColor Green
}

# 4. Vérifier index.css
Write-Host "`n4. Vérification de src/index.css..." -ForegroundColor Yellow
$indexCss = @"
@import './styles/theme.css';
@import './styles/utilities.css';

@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  margin: 0;
  min-height: 100vh;
}
"@

if (Test-Path "src/index.css") {
    $currentContent = Get-Content "src/index.css" -Raw
    if ($currentContent -match "display:\s*flex" -or $currentContent -match "place-items:\s*center") {
        Write-Host "  ? CSS par défaut Vite détecté - Remplacement..." -ForegroundColor Yellow
        $indexCss | Out-File -FilePath "src/index.css" -Encoding utf8
        Write-Host "  ? src/index.css corrigé" -ForegroundColor Green
    } else {
        Write-Host "  ? src/index.css correct" -ForegroundColor Green
    }
} else {
  Write-Host "  Création de src/index.css..." -ForegroundColor Cyan
    $indexCss | Out-File -FilePath "src/index.css" -Encoding utf8
    Write-Host "  ? src/index.css créé" -ForegroundColor Green
}

# 5. Nettoyer le cache
Write-Host "`n5. Nettoyage du cache..." -ForegroundColor Yellow
if (Test-Path ".vite") {
    Write-Host "  Suppression du cache Vite..." -ForegroundColor Cyan
    Remove-Item -Recurse -Force .vite
    Write-Host "  ? Cache Vite supprimé" -ForegroundColor Green
}

if (Test-Path "dist") {
    Write-Host "  Suppression du dossier dist..." -ForegroundColor Cyan
    Remove-Item -Recurse -Force dist
    Write-Host "  ? Dossier dist supprimé" -ForegroundColor Green
}

# 6. Test de build
Write-Host "`n6. Test de build..." -ForegroundColor Yellow
try {
    npm run build
    if ($LASTEXITCODE -eq 0) {
 Write-Host "  ? Build réussi!" -ForegroundColor Green
    } else {
        Write-Host "  ? Build échoué" -ForegroundColor Red
        Write-Host "  Consultez les erreurs ci-dessus" -ForegroundColor Yellow
}
} catch {
 Write-Host "  ? Erreur pendant le build: $_" -ForegroundColor Red
}

# Résumé
Write-Host "`n=== RÉPARATION TERMINÉE ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "Étapes suivantes:" -ForegroundColor Yellow
Write-Host "1. npm run dev           # Démarrer le serveur de développement" -ForegroundColor White
Write-Host "2. Ouvrir http://localhost:5173 dans votre navigateur" -ForegroundColor White
Write-Host "3. Faire Ctrl+Shift+R pour forcer le rechargement" -ForegroundColor White
Write-Host ""

Set-Location ..
