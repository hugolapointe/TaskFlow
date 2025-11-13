#!/usr/bin/env pwsh
Write-Host "=== NETTOYAGE PRÉ-COMMIT ===" -ForegroundColor Cyan
Write-Host ""

$cleaned = @()
$kept = @()

# 1. Supprimer les fichiers .md sauf README
Write-Host "1. Nettoyage des fichiers .md..." -ForegroundColor Yellow

$docFiles = Get-ChildItem -Filter "*.md" | Where-Object { $_.Name -ne "README.md" }
if ($docFiles.Count -gt 0) {
 Write-Host "  Fichiers à supprimer:" -ForegroundColor Gray
    $docFiles | ForEach-Object { 
 Write-Host "    - $($_.Name)" -ForegroundColor Gray 
    }
    
    $response = Read-Host "`n  Supprimer ces fichiers? (O/N)"
    if ($response -eq "O" -or $response -eq "o") {
     $docFiles | ForEach-Object {
        Remove-Item $_.FullName -Force
            $cleaned += "Supprimé: $($_.Name)"
        }
 Write-Host "? Fichiers .md nettoyés" -ForegroundColor Green
    } else {
        $kept += "Gardé: fichiers .md"
    }
} else {
    Write-Host "  ? Pas de fichiers .md à nettoyer" -ForegroundColor Green
}

# 2. Supprimer les scripts de test/diagnostic
Write-Host "`n2. Nettoyage des scripts temporaires..." -ForegroundColor Yellow

$tempScripts = Get-ChildItem -Filter "*.ps1" | Where-Object { 
    $_.Name -match "test-|diagnose-|check-|fix-|audit-|install-|verify-|quick-|final-|auto-|exhaustive-" -and
  $_.Name -ne "pre-commit-audit.ps1" -and
  $_.Name -ne "clean-for-commit.ps1"
}

if ($tempScripts.Count -gt 0) {
  Write-Host "  Scripts à supprimer:" -ForegroundColor Gray
 $tempScripts | ForEach-Object { 
    Write-Host "    - $($_.Name)" -ForegroundColor Gray 
 }
    
 $response = Read-Host "`n  Supprimer ces scripts? (O/N)"
    if ($response -eq "O" -or $response -eq "o") {
        $tempScripts | ForEach-Object {
     Remove-Item $_.FullName -Force
          $cleaned += "Supprimé: $($_.Name)"
 }
   Write-Host "  ? Scripts temporaires nettoyés" -ForegroundColor Green
    } else {
   $kept += "Gardé: scripts temporaires"
    }
} else {
    Write-Host "  ? Pas de scripts temporaires à nettoyer" -ForegroundColor Green
}

# 3. Nettoyer les commentaires JSDoc dans src/
Write-Host "`n3. Nettoyage des JSDoc..." -ForegroundColor Yellow

Set-Location TaskFlow.WebSite

$filesWithJsDoc = @()
Get-ChildItem -Path src -Recurse -Include *.jsx,*.js | ForEach-Object {
    $content = Get-Content $_.FullName -Raw
    if ($content -match "/\*\*[\s\S]*?@(param|returns)") {
        $filesWithJsDoc += $_
    }
}

if ($filesWithJsDoc.Count -gt 0) {
    Write-Host "  $($filesWithJsDoc.Count) fichiers avec JSDoc trouvés" -ForegroundColor Gray
    $response = Read-Host "  Nettoyer automatiquement? (O/N)"
    
    if ($response -eq "O" -or $response -eq "o") {
   foreach ($file in $filesWithJsDoc) {
        $content = Get-Content $file.FullName -Raw
  
         # Supprimer les blocs JSDoc
            $content = $content -replace "/\*\*[\s\S]*?\*/\s*\n", ""
    
         # Nettoyer les lignes vides multiples
   $content = $content -replace "\n\n\n+", "`n`n"
     
      $content | Out-File -FilePath $file.FullName -Encoding utf8 -NoNewline
            $cleaned += "Nettoyé JSDoc: $($file.Name)"
   }
      Write-Host "  ? JSDoc supprimés" -ForegroundColor Green
  } else {
        $kept += "Gardé: JSDoc"
    }
} else {
    Write-Host "  ? Pas de JSDoc à nettoyer" -ForegroundColor Green
}

# 4. Supprimer les console.log (sauf console.error)
Write-Host "`n4. Nettoyage des console.log..." -ForegroundColor Yellow

$filesWithConsole = @()
Get-ChildItem -Path src -Recurse -Include *.jsx,*.js | ForEach-Object {
    $content = Get-Content $_.FullName -Raw
    if ($content -match 'console\.log\(') {
 $filesWithConsole += $_
    }
}

if ($filesWithConsole.Count -gt 0) {
    Write-Host "  $($filesWithConsole.Count) fichiers avec console.log trouvés" -ForegroundColor Gray
    $response = Read-Host "  Supprimer les console.log? (O/N)"
    
    if ($response -eq "O" -or $response -eq "o") {
   foreach ($file in $filesWithConsole) {
  $lines = Get-Content $file.FullName
            $newLines = $lines | Where-Object { $_ -notmatch '^\s*console\.log\(' }
   $newLines | Out-File -FilePath $file.FullName -Encoding utf8
  $cleaned += "Nettoyé console.log: $($file.Name)"
        }
        Write-Host "? console.log supprimés" -ForegroundColor Green
    } else {
$kept += "Gardé: console.log"
    }
} else {
    Write-Host "  ? Pas de console.log à nettoyer" -ForegroundColor Green
}

# 5. Nettoyer node_modules et caches (optionnel)
Write-Host "`n5. Nettoyage des caches..." -ForegroundColor Yellow

$cacheToClean = @()
if (Test-Path ".vite") { $cacheToClean += ".vite" }
if (Test-Path "dist") { $cacheToClean += "dist" }

if ($cacheToClean.Count -gt 0) {
    Write-Host "  Caches trouvés: $($cacheToClean -join ', ')" -ForegroundColor Gray
    $response = Read-Host "  Nettoyer les caches? (O/N)"

  if ($response -eq "O" -or $response -eq "o") {
  foreach ($cache in $cacheToClean) {
            Remove-Item $cache -Recurse -Force -ErrorAction SilentlyContinue
            $cleaned += "Supprimé: $cache"
 }
      Write-Host "  ? Caches nettoyés" -ForegroundColor Green
    } else {
   $kept += "Gardé: caches"
    }
} else {
    Write-Host "  ? Pas de caches à nettoyer" -ForegroundColor Green
}

Set-Location ..

# RÉSUMÉ
Write-Host "`n=== RÉSUMÉ DU NETTOYAGE ===" -ForegroundColor Cyan
Write-Host ""

if ($cleaned.Count -gt 0) {
    Write-Host "? Nettoyé: $($cleaned.Count) éléments" -ForegroundColor Green
  $cleaned | ForEach-Object { Write-Host "  $_" -ForegroundColor Gray }
}

if ($kept.Count -gt 0) {
    Write-Host "`n? Conservé:" -ForegroundColor Yellow
  $kept | ForEach-Object { Write-Host "  $_" -ForegroundColor Gray }
}

Write-Host "`n? Nettoyage terminé!" -ForegroundColor Green
Write-Host ""
Write-Host "Prochaines étapes:" -ForegroundColor Cyan
Write-Host "  1. Exécuter: .\pre-commit-audit.ps1" -ForegroundColor White
Write-Host "  2. Si OK, commiter les changements" -ForegroundColor White
Write-Host ""
