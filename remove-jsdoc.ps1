#!/usr/bin/env pwsh
Write-Host "=== SUPPRESSION RAPIDE DES JSDOC ===" -ForegroundColor Cyan
Write-Host ""

Set-Location TaskFlow.WebSite

$cleaned = 0

Get-ChildItem -Path src -Recurse -Include *.jsx,*.js | ForEach-Object {
    $file = $_
    $content = Get-Content $file.FullName -Raw
    
    if ($content -match "/\*\*[\s\S]*?@(param|returns)") {
  Write-Host "Nettoyage de $($file.Name)..." -ForegroundColor Yellow
        
    # Supprimer tous les blocs JSDoc
      $newContent = $content -replace "/\*\*[\s\S]*?\*/\s*\n", ""
  
        # Nettoyer les lignes vides multiples
      $newContent = $newContent -replace "\n\n\n+", "`n`n"

    # Sauvegarder
        $newContent | Out-File -FilePath $file.FullName -Encoding utf8 -NoNewline
    $cleaned++
    }
}

Write-Host ""
Write-Host "? $cleaned fichiers nettoyés" -ForegroundColor Green

Set-Location ..
