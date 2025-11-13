#!/usr/bin/env pwsh
Write-Host "=== DIAGNOSTIC TAILWIND CSS ===" -ForegroundColor Cyan
Write-Host ""

Set-Location TaskFlow.WebSite

# 1. Vérifier que Tailwind est installé
Write-Host "1. Vérification de l'installation Tailwind..." -ForegroundColor Yellow
if (Test-Path "node_modules/tailwindcss") {
    $tailwindVersion = (Get-Content "node_modules/tailwindcss/package.json" | ConvertFrom-Json).version
    Write-Host "  ? Tailwind CSS installé: v$tailwindVersion" -ForegroundColor Green
} else {
    Write-Host "? Tailwind CSS NON installé!" -ForegroundColor Red
    Write-Host "  Exécutez: npm install -D tailwindcss" -ForegroundColor Yellow
    Set-Location ..
    exit 1
}

# 2. Vérifier PostCSS
Write-Host "`n2. Vérification PostCSS..." -ForegroundColor Yellow
if (Test-Path "node_modules/postcss") {
    Write-Host "  ? PostCSS installé" -ForegroundColor Green
} else {
  Write-Host "  ? PostCSS NON installé!" -ForegroundColor Red
}

if (Test-Path "node_modules/autoprefixer") {
    Write-Host "  ? Autoprefixer installé" -ForegroundColor Green
} else {
    Write-Host "  ? Autoprefixer NON installé!" -ForegroundColor Red
}

# 3. Vérifier tailwind.config.js
Write-Host "`n3. Vérification tailwind.config.js..." -ForegroundColor Yellow
if (Test-Path "tailwind.config.js") {
    $config = Get-Content "tailwind.config.js" -Raw
    Write-Host "  ? Fichier existe" -ForegroundColor Green
    
    if ($config -match "content:\s*\[") {
        Write-Host "  ? Section 'content' trouvée" -ForegroundColor Green
     
        if ($config -match '"\./src/\*\*/\*\.\{js,ts,jsx,tsx\}"' -or $config -match "'\.\/src\/\*\*\/\*\.\{js,ts,jsx,tsx\}'") {
      Write-Host "  ? Scan des fichiers src configuré" -ForegroundColor Green
        } else {
            Write-Host "  ? Pattern de scan src peut être incorrect" -ForegroundColor Yellow
        }
    } else {
        Write-Host "  ? Section 'content' manquante!" -ForegroundColor Red
    }
} else {
    Write-Host "  ? tailwind.config.js MANQUANT!" -ForegroundColor Red
}

# 4. Vérifier postcss.config.js
Write-Host "`n4. Vérification postcss.config.js..." -ForegroundColor Yellow
if (Test-Path "postcss.config.js") {
    $config = Get-Content "postcss.config.js" -Raw
    Write-Host "  ? Fichier existe" -ForegroundColor Green
    
    if ($config -match "tailwindcss") {
        Write-Host "  ? Plugin tailwindcss configuré" -ForegroundColor Green
    } else {
        Write-Host "  ? Plugin tailwindcss manquant!" -ForegroundColor Red
    }
    
  if ($config -match "autoprefixer") {
     Write-Host "  ? Plugin autoprefixer configuré" -ForegroundColor Green
    } else {
        Write-Host "  ? Plugin autoprefixer manquant!" -ForegroundColor Red
    }
} else {
    Write-Host "  ? postcss.config.js MANQUANT!" -ForegroundColor Red
}

# 5. Vérifier index.css
Write-Host "`n5. Vérification src/index.css..." -ForegroundColor Yellow
if (Test-Path "src/index.css") {
    $css = Get-Content "src/index.css" -Raw
    Write-Host "  ? Fichier existe" -ForegroundColor Green
    
    $directives = @("@tailwind base", "@tailwind components", "@tailwind utilities")
    foreach ($directive in $directives) {
      if ($css -match [regex]::Escape($directive)) {
    Write-Host "  ? '$directive' présent" -ForegroundColor Green
 } else {
      Write-Host "  ? '$directive' MANQUANT!" -ForegroundColor Red
        }
    }
    
    # Vérifier imports
    if ($css -match "@import") {
 Write-Host "  ? @import détectés" -ForegroundColor Green
    }
} else {
    Write-Host "  ? src/index.css MANQUANT!" -ForegroundColor Red
}

# 6. Vérifier main.jsx
Write-Host "`n6. Vérification src/main.jsx..." -ForegroundColor Yellow
if (Test-Path "src/main.jsx") {
    $main = Get-Content "src/main.jsx" -Raw
    
    if ($main -match "import\s+['\"]\.\/index\.css['\"]") {
     Write-Host "  ? index.css importé" -ForegroundColor Green
    } else {
        Write-Host "  ? index.css NON importé!" -ForegroundColor Red
    }
} else {
    Write-Host "  ? src/main.jsx MANQUANT!" -ForegroundColor Red
}

# 7. Test de génération CSS
Write-Host "`n7. Test de génération Tailwind CSS..." -ForegroundColor Yellow
Write-Host "  Génération du CSS..." -ForegroundColor Cyan

$testOutput = npx tailwindcss -i ./src/index.css -o ./test-output.css --minify 2>&1

if ($LASTEXITCODE -eq 0) {
    if (Test-Path "test-output.css") {
        $size = (Get-Item "test-output.css").Length
        Write-Host "  ? CSS généré avec succès ($size bytes)" -ForegroundColor Green
        
        # Vérifier quelques classes Tailwind
      $generated = Get-Content "test-output.css" -Raw
        $classes = @("bg-slate-900", "text-slate-100", "flex", "gap-3")
   $foundClasses = 0
        
        foreach ($class in $classes) {
  if ($generated -match [regex]::Escape($class)) {
       $foundClasses++
 }
      }
   
      if ($foundClasses -gt 0) {
            Write-Host "  ? Classes Tailwind trouvées ($foundClasses/$($classes.Count))" -ForegroundColor Green
        } else {
            Write-Host "  ? Aucune classe Tailwind trouvée dans le CSS généré" -ForegroundColor Yellow
        }
        
        # Nettoyer
        Remove-Item "test-output.css" -ErrorAction SilentlyContinue
    }
} else {
    Write-Host "  ? Échec de la génération CSS" -ForegroundColor Red
    Write-Host $testOutput -ForegroundColor Gray
}

# 8. Vérifier le build Vite
Write-Host "`n8. Vérification du process de build..." -ForegroundColor Yellow
if (Test-Path "node_modules/.vite") {
    Write-Host "  ? Cache Vite détecté (.vite/)" -ForegroundColor Yellow
    Write-Host "    Recommandation: Supprimer le cache si problème persiste" -ForegroundColor Gray
}

# 9. Vérifier un composant
Write-Host "`n9. Vérification d'un composant..." -ForegroundColor Yellow
if (Test-Path "src/common/PageLayout.jsx") {
    $component = Get-Content "src/common/PageLayout.jsx" -Raw
    
    if ($component -match 'className="[^"]*bg-slate-900') {
        Write-Host "  ? Classes Tailwind utilisées dans PageLayout" -ForegroundColor Green
  } else {
  Write-Host "  ? Pas de classes Tailwind détectées" -ForegroundColor Yellow
    }
}

# Résumé et recommandations
Write-Host "`n=== RÉSUMÉ ===" -ForegroundColor Cyan

Write-Host "`nRECOMMANDATIONS:" -ForegroundColor Yellow
Write-Host "1. Supprimer le cache Vite:" -ForegroundColor White
Write-Host "   Remove-Item -Recurse -Force .vite" -ForegroundColor Gray
Write-Host ""
Write-Host "2. Supprimer le dossier dist:" -ForegroundColor White
Write-Host "   Remove-Item -Recurse -Force dist" -ForegroundColor Gray
Write-Host ""
Write-Host "3. Redémarrer le serveur de développement:" -ForegroundColor White
Write-Host "   npm run dev" -ForegroundColor Gray
Write-Host ""
Write-Host "4. Forcer le rechargement du navigateur:" -ForegroundColor White
Write-Host "   Ctrl + Shift + R (ou Cmd + Shift + R sur Mac)" -ForegroundColor Gray
Write-Host ""
Write-Host "5. Vérifier la console du navigateur (F12)" -ForegroundColor White
Write-Host ""

Set-Location ..
Write-Host "=== FIN DU DIAGNOSTIC ===" -ForegroundColor Cyan
