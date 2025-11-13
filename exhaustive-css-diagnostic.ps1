#!/usr/bin/env pwsh
Write-Host "=== DIAGNOSTIC CSS EXHAUSTIF ===" -ForegroundColor Cyan
Write-Host ""

$ErrorCount = 0
$WarningCount = 0

# 1. Vérifier Node et NPM
Write-Host "1. Vérification de l'environnement..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "  ? Node.js: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "  ? Node.js non trouvé!" -ForegroundColor Red
    $ErrorCount++
}

try {
    $npmVersion = npm --version
    Write-Host "  ? NPM: $npmVersion" -ForegroundColor Green
} catch {
    Write-Host "  ? NPM non trouvé!" -ForegroundColor Red
    $ErrorCount++
}

# 2. Vérifier package.json
Write-Host "`n2. Vérification de package.json..." -ForegroundColor Yellow
Set-Location TaskFlow.WebSite

if (Test-Path "package.json") {
  $pkg = Get-Content package.json | ConvertFrom-Json
    
    # Vérifier Tailwind
    if ($pkg.devDependencies.tailwindcss) {
        Write-Host "  ? tailwindcss: $($pkg.devDependencies.tailwindcss)" -ForegroundColor Green
    } else {
        Write-Host "  ? tailwindcss MANQUANT" -ForegroundColor Red
        $ErrorCount++
    }
    
    # Vérifier PostCSS
    if ($pkg.devDependencies.postcss) {
        Write-Host "  ? postcss: $($pkg.devDependencies.postcss)" -ForegroundColor Green
    } else {
        Write-Host "  ? postcss MANQUANT" -ForegroundColor Red
        $ErrorCount++
    }
    
    # Vérifier Autoprefixer
    if ($pkg.devDependencies.autoprefixer) {
   Write-Host "  ? autoprefixer: $($pkg.devDependencies.autoprefixer)" -ForegroundColor Green
    } else {
        Write-Host "  ? autoprefixer MANQUANT" -ForegroundColor Red
        $ErrorCount++
    }
    
    # Vérifier Heroicons
    if ($pkg.dependencies.'@heroicons/react') {
        Write-Host "  ? @heroicons/react: $($pkg.dependencies.'@heroicons/react')" -ForegroundColor Green
    } else {
      Write-Host "  ? @heroicons/react MANQUANT" -ForegroundColor Yellow
        $WarningCount++
    }
} else {
 Write-Host "  ? package.json non trouvé!" -ForegroundColor Red
    $ErrorCount++
}

# 3. Vérifier node_modules
Write-Host "`n3. Vérification de node_modules..." -ForegroundColor Yellow
if (Test-Path "node_modules") {
    Write-Host "  ? node_modules existe" -ForegroundColor Green
    
    if (Test-Path "node_modules/tailwindcss") {
 Write-Host "  ? tailwindcss installé" -ForegroundColor Green
    } else {
        Write-Host "? tailwindcss NON installé" -ForegroundColor Red
        $ErrorCount++
    }
    
    if (Test-Path "node_modules/postcss") {
        Write-Host "  ? postcss installé" -ForegroundColor Green
    } else {
     Write-Host "  ? postcss NON installé" -ForegroundColor Red
        $ErrorCount++
    }
} else {
    Write-Host "  ? node_modules MANQUANT - Exécutez 'npm install'" -ForegroundColor Red
    $ErrorCount++
}

# 4. Vérifier les fichiers de configuration
Write-Host "`n4. Vérification des fichiers de configuration..." -ForegroundColor Yellow

$configFiles = @{
    "tailwind.config.js" = "Configuration Tailwind"
    "postcss.config.js" = "Configuration PostCSS"
    "vite.config.js" = "Configuration Vite"
}

foreach ($file in $configFiles.Keys) {
    if (Test-Path $file) {
    $size = (Get-Item $file).Length
    if ($size -gt 0) {
    Write-Host "  ? $file ($size bytes)" -ForegroundColor Green
  } else {
            Write-Host "  ? $file (VIDE!)" -ForegroundColor Red
            $ErrorCount++
        }
    } else {
        Write-Host "  ? $file MANQUANT" -ForegroundColor Red
        $ErrorCount++
    }
}

# 5. Vérifier les fichiers CSS
Write-Host "`n5. Vérification des fichiers CSS..." -ForegroundColor Yellow

$cssFiles = @{
    "src/index.css" = "CSS principal"
    "src/styles/theme.css" = "Thème"
    "src/styles/utilities.css" = "Utilitaires"
}

foreach ($file in $cssFiles.Keys) {
    if (Test-Path $file) {
        $content = Get-Content $file -Raw
        $size = $content.Length
        
 if ($size -gt 0) {
 Write-Host "  ? $file ($size bytes)" -ForegroundColor Green
 
            # Vérifications spécifiques pour index.css
        if ($file -eq "src/index.css") {
     if ($content -match "@tailwind base") {
        Write-Host "  ? @tailwind base trouvé" -ForegroundColor Green
      } else {
      Write-Host "    ? @tailwind base MANQUANT" -ForegroundColor Red
                  $ErrorCount++
          }
                
                if ($content -match "display:\s*flex" -and $content -match "place-items:\s*center") {
    Write-Host "    ? CSS par défaut Vite détecté (problème!)" -ForegroundColor Yellow
  $WarningCount++
     }
    }
    } else {
            Write-Host "  ? $file (VIDE!)" -ForegroundColor Red
   $ErrorCount++
   }
    } else {
        Write-Host "  ? $file MANQUANT" -ForegroundColor Red
        $ErrorCount++
  }
}

# 6. Vérifier les composants clés
Write-Host "`n6. Vérification des composants clés..." -ForegroundColor Yellow

$components = @(
    "src/common/PageLayout.jsx",
    "src/common/Card.jsx",
    "src/App.jsx",
    "src/toDos/pages/TodosPage.jsx"
)

foreach ($comp in $components) {
    if (Test-Path $comp) {
        $content = Get-Content $comp -Raw
        if ($content -match "className") {
   Write-Host "  ? $comp (utilise className)" -ForegroundColor Green
        } else {
       Write-Host "  ? $comp (pas de className?)" -ForegroundColor Yellow
     $WarningCount++
        }
    } else {
        Write-Host "  ? $comp MANQUANT" -ForegroundColor Red
        $ErrorCount++
    }
}

# 7. Test de build
Write-Host "`n7. Test de build (cela peut prendre un moment)..." -ForegroundColor Yellow
try {
    $buildOutput = npm run build 2>&1 | Out-String
    if ($LASTEXITCODE -eq 0) {
        Write-Host "  ? Build réussi!" -ForegroundColor Green
} else {
        Write-Host "  ? Build échoué!" -ForegroundColor Red
    Write-Host $buildOutput -ForegroundColor Gray
        $ErrorCount++
    }
} catch {
    Write-Host "  ? Erreur pendant le build: $_" -ForegroundColor Red
    $ErrorCount++
}

# Résumé
Write-Host "`n=== RÉSUMÉ ===" -ForegroundColor Cyan
if ($ErrorCount -eq 0 -and $WarningCount -eq 0) {
    Write-Host "? Aucun problème détecté!" -ForegroundColor Green
    Write-Host "  L'application devrait fonctionner correctement." -ForegroundColor Green
    Write-Host "  Exécutez: npm run dev" -ForegroundColor Cyan
} else {
    if ($ErrorCount -gt 0) {
   Write-Host "? $ErrorCount erreur(s) critique(s) détectée(s)" -ForegroundColor Red
    }
    if ($WarningCount -gt 0) {
        Write-Host "? $WarningCount avertissement(s)" -ForegroundColor Yellow
    }
    
    Write-Host "`nActions recommandées:" -ForegroundColor Cyan
    Write-Host "1. npm install" -ForegroundColor White
    Write-Host "2. Vérifier les fichiers de configuration" -ForegroundColor White
  Write-Host "3. Supprimer node_modules et réinstaller si nécessaire" -ForegroundColor White
}

Set-Location ..
Write-Host "`n=== FIN DU DIAGNOSTIC ===" -ForegroundColor Cyan
