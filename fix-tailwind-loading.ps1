#!/usr/bin/env pwsh
Write-Host "=== FIX AUTOMATIQUE TAILWIND ===" -ForegroundColor Cyan
Write-Host ""

Set-Location TaskFlow.WebSite

# 1. Nettoyer les caches
Write-Host "1. Nettoyage des caches..." -ForegroundColor Yellow
if (Test-Path ".vite") {
    Remove-Item -Recurse -Force .vite
    Write-Host "  ? Cache Vite supprimé" -ForegroundColor Green
}

if (Test-Path "dist") {
    Remove-Item -Recurse -Force dist
    Write-Host "  ? Dossier dist supprimé" -ForegroundColor Green
}

if (Test-Path "node_modules/.cache") {
    Remove-Item -Recurse -Force node_modules/.cache
    Write-Host "  ? Cache node_modules supprimé" -ForegroundColor Green
}

# 2. Vérifier/Installer Tailwind
Write-Host "`n2. Vérification de Tailwind..." -ForegroundColor Yellow
if (!(Test-Path "node_modules/tailwindcss")) {
    Write-Host "  Installation de Tailwind CSS..." -ForegroundColor Cyan
    npm install -D tailwindcss postcss autoprefixer
} else {
    Write-Host "  ? Tailwind déjà installé" -ForegroundColor Green
}

# 3. Générer/Vérifier tailwind.config.js
Write-Host "`n3. Configuration de Tailwind..." -ForegroundColor Yellow
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

$tailwindConfig | Out-File -FilePath "tailwind.config.js" -Encoding utf8 -Force
Write-Host "  ? tailwind.config.js créé/mis à jour" -ForegroundColor Green

# 4. Générer/Vérifier postcss.config.js
Write-Host "`n4. Configuration de PostCSS..." -ForegroundColor Yellow
$postcssConfig = @"
export default {
  plugins: {
    tailwindcss: {},
  autoprefixer: {},
  },
}
"@

$postcssConfig | Out-File -FilePath "postcss.config.js" -Encoding utf8 -Force
Write-Host "  ? postcss.config.js créé/mis à jour" -ForegroundColor Green

# 5. Vérifier/Créer index.css
Write-Host "`n5. Configuration de index.css..." -ForegroundColor Yellow
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

$indexCss | Out-File -FilePath "src/index.css" -Encoding utf8 -Force
Write-Host "  ? src/index.css créé/mis à jour" -ForegroundColor Green

# 6. Vérifier l'import dans main.jsx
Write-Host "`n6. Vérification de main.jsx..." -ForegroundColor Yellow
if (Test-Path "src/main.jsx") {
    $main = Get-Content "src/main.jsx" -Raw
    if ($main -notmatch "import\s+['\"]\.\/index\.css['\"]") {
     Write-Host "  ? index.css pas importé - ajout..." -ForegroundColor Yellow
   $lines = Get-Content "src/main.jsx"
        $newLines = @()
 $imported = $false
     
        foreach ($line in $lines) {
   if ($line -match "^import\s+" -and !$imported) {
        $newLines += $line
       if ($line -match "from\s+['\"]react") {
        $newLines += "import './index.css'"
    $imported = $true
                }
            } else {
      $newLines += $line
 }
        }
 
        $newLines | Out-File -FilePath "src/main.jsx" -Encoding utf8 -Force
        Write-Host "  ? Import ajouté dans main.jsx" -ForegroundColor Green
    } else {
        Write-Host "  ? index.css déjà importé" -ForegroundColor Green
    }
}

# 7. Build de test
Write-Host "`n7. Build de test..." -ForegroundColor Yellow
Write-Host "  Cela peut prendre un moment..." -ForegroundColor Gray
$buildOutput = npm run build 2>&1 | Out-String

if ($LASTEXITCODE -eq 0) {
 Write-Host "  ? Build réussi!" -ForegroundColor Green

    # Vérifier la taille du CSS généré
    $cssFiles = Get-ChildItem -Path "dist/assets" -Filter "*.css" -ErrorAction SilentlyContinue
    if ($cssFiles) {
        $totalSize = ($cssFiles | Measure-Object -Property Length -Sum).Sum
      Write-Host "  ? CSS généré: $([math]::Round($totalSize/1KB, 2)) KB" -ForegroundColor Green
    }
} else {
    Write-Host "  ? Build échoué" -ForegroundColor Red
    Write-Host $buildOutput -ForegroundColor Gray
}

# 8. Instructions finales
Write-Host "`n=== FIX TERMINÉ ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "Prochaines étapes:" -ForegroundColor Yellow
Write-Host "1. npm run dev      # Démarrer le serveur" -ForegroundColor White
Write-Host "2. Ouvrir http://localhost:5173" -ForegroundColor White
Write-Host "3. Ctrl+Shift+R          # Hard refresh du navigateur" -ForegroundColor White
Write-Host "4. F12         # Ouvrir la console pour vérifier" -ForegroundColor White
Write-Host ""
Write-Host "Vous devriez voir:" -ForegroundColor Cyan
Write-Host "  ? Background noir/gris foncé" -ForegroundColor Green
Write-Host "  ? Texte blanc/gris clair" -ForegroundColor Green
Write-Host "  ? Cards avec bordures" -ForegroundColor Green
Write-Host "  ? Layout centré" -ForegroundColor Green
Write-Host ""

Set-Location ..
