#!/usr/bin/env pwsh
Write-Host "=== AUDIT FINAL AVANT COMMIT ===" -ForegroundColor Cyan
Write-Host ""

Set-Location TaskFlow.WebSite

$issues = @()
$warnings = @()
$success = @()

# 1. Vérifier qu'il n'y a pas de fichiers de documentation inutiles
Write-Host "1. Vérification des fichiers de documentation..." -ForegroundColor Yellow

$docFiles = Get-ChildItem -Recurse -Include *.md | Where-Object { 
    $_.Name -ne "README.md" -and $_.FullName -notmatch "node_modules"
}

if ($docFiles.Count -gt 1) {
    $warnings += "  ? $($docFiles.Count) fichiers .md trouvés (garder seulement README)"
    $docFiles | ForEach-Object { Write-Host "    - $($_.Name)" -ForegroundColor Gray }
} else {
    $success += "  ? Pas de fichiers .md superflus"
}

# 2. Vérifier l'absence de JSDoc et commentaires excessifs
Write-Host "`n2. Vérification des commentaires..." -ForegroundColor Yellow

$filesWithJsDoc = @()
Get-ChildItem -Path src -Recurse -Include *.jsx,*.js | ForEach-Object {
    $content = Get-Content $_.FullName -Raw
    if ($content -match "/\*\*[\s\S]*?@param" -or $content -match "/\*\*[\s\S]*?@returns") {
 $filesWithJsDoc += $_.Name
    }
}

if ($filesWithJsDoc.Count -gt 0) {
    $issues += "  ? $($filesWithJsDoc.Count) fichiers avec JSDoc trouvés"
    $filesWithJsDoc | ForEach-Object { Write-Host "    - $_" -ForegroundColor Red }
} else {
    $success += "  ? Pas de JSDoc trouvé"
}

# 3. Vérifier l'absence de scripts PowerShell temporaires
Write-Host "`n3. Vérification des scripts temporaires..." -ForegroundColor Yellow

$tempScripts = Get-ChildItem -Path .. -Filter "*.ps1" | Where-Object { 
  $_.Name -match "test-|diagnose-|check-|fix-|audit-|install-" 
}

if ($tempScripts.Count -gt 0) {
    $warnings += "  ? $($tempScripts.Count) scripts temporaires à nettoyer"
    Write-Host "    Scripts à supprimer avant commit:" -ForegroundColor Gray
    $tempScripts | ForEach-Object { Write-Host "    - $($_.Name)" -ForegroundColor Gray }
} else {
    $success += "  ? Pas de scripts temporaires"
}

# 4. Vérifier les noms de composants (PascalCase)
Write-Host "`n4. Vérification des noms de composants..." -ForegroundColor Yellow

$badNames = @()
Get-ChildItem -Path src/common -Include *.jsx | ForEach-Object {
    if ($_.BaseName -notmatch "^[A-Z][a-zA-Z]*$") {
  $badNames += $_.Name
    }
}

if ($badNames.Count -gt 0) {
    $issues += "? Composants avec mauvais nommage"
    $badNames | ForEach-Object { Write-Host "    - $_" -ForegroundColor Red }
} else {
    $success += "  ? Tous les composants en PascalCase"
}

# 5. Vérifier l'utilisation cohérente des composants common
Write-Host "`n5. Vérification de l'utilisation des composants common..." -ForegroundColor Yellow

$inputIssues = @()
Get-ChildItem -Path src/toDos -Recurse -Include *.jsx | ForEach-Object {
    $content = Get-Content $_.FullName -Raw
    
    # Input direct au lieu de DescriptionInput
    if ($content -match '<input[^>]*type="text"' -and 
   $content -notmatch 'DescriptionInput' -and
   $content -notmatch 'TextInput') {
        $inputIssues += "$($_.Name): utilise <input type=text> direct"
    }
    
    # Input date direct au lieu de DueDatePicker
    if ($content -match '<input[^>]*type="date"' -and $content -notmatch 'DueDatePicker') {
        $inputIssues += "$($_.Name): utilise <input type=date> direct"
    }
}

if ($inputIssues.Count -gt 0) {
    $issues += "  ? Inputs directs trouvés"
  $inputIssues | ForEach-Object { Write-Host "    - $_" -ForegroundColor Red }
} else {
    $success += "  ? Composants common utilisés correctement"
}

# 6. Vérifier la cohérence des largeurs (DueDatePicker = w-44)
Write-Host "`n6. Vérification des largeurs..." -ForegroundColor Yellow

$widthIssues = @()
Get-ChildItem -Path src -Recurse -Include *.jsx | ForEach-Object {
    $content = Get-Content $_.FullName -Raw
    if ($content -match 'DueDatePicker' -and $content -match 'className="w-(?!44)') {
        $widthIssues += "$($_.Name): DueDatePicker avec largeur != w-44"
    }
}

if ($widthIssues.Count -gt 0) {
    $issues += "  ? Largeurs incohérentes"
    $widthIssues | ForEach-Object { Write-Host "    - $_" -ForegroundColor Red }
} else {
    $success += "  ? Largeurs cohérentes (DueDatePicker = w-44)"
}

# 7. Vérifier les tailles d'icônes (w-5 h-5 pour IconButton)
Write-Host "`n7. Vérification des tailles d'icônes..." -ForegroundColor Yellow

$iconIssues = @()
Get-ChildItem -Path src -Recurse -Include *.jsx | ForEach-Object {
    $content = Get-Content $_.FullName -Raw
    if ($content -match 'IconButton' -and $content -match 'className="w-(?!5 h-5)') {
        $iconIssues += "$($_.Name): Icônes avec taille != w-5 h-5"
    }
}

if ($iconIssues.Count -gt 0) {
    $warnings += "  ? Tailles d'icônes potentiellement incohérentes"
    $iconIssues | ForEach-Object { Write-Host "    - $_" -ForegroundColor Yellow }
} else {
    $success += "  ? Tailles d'icônes cohérentes"
}

# 8. Vérifier les imports Heroicons
Write-Host "`n8. Vérification des imports Heroicons..." -ForegroundColor Yellow

$badImports = @()
Get-ChildItem -Path src -Recurse -Include *.jsx | ForEach-Object {
    $content = Get-Content $_.FullName -Raw
    if ($content -match "from '@heroicons/react/[^2]") {
        $badImports += "$($_.Name): Import Heroicons v1 (utiliser /24/)"
    }
}

if ($badImports.Count -gt 0) {
    $issues += "  ? Imports Heroicons incorrects"
    $badImports | ForEach-Object { Write-Host "    - $_" -ForegroundColor Red }
} else {
    $success += "  ? Imports Heroicons corrects (/24/solid ou /24/outline)"
}

# 9. Vérifier l'absence de console.log
Write-Host "`n9. Vérification des console.log..." -ForegroundColor Yellow

$consoleLogs = @()
Get-ChildItem -Path src -Recurse -Include *.jsx,*.js | ForEach-Object {
    $content = Get-Content $_.FullName -Raw
    if ($content -match 'console\.log\(' -and $content -notmatch 'console\.error') {
        $consoleLogs += $_.Name
    }
}

if ($consoleLogs.Count -gt 0) {
    $warnings += "  ? $($consoleLogs.Count) fichiers avec console.log"
 $consoleLogs | ForEach-Object { Write-Host "    - $_" -ForegroundColor Yellow }
} else {
    $success += "  ? Pas de console.log"
}

# 10. Vérifier la structure des dossiers
Write-Host "`n10. Vérification de la structure..." -ForegroundColor Yellow

$requiredFolders = @(
    "src/common",
    "src/toDos/components",
    "src/toDos/pages",
    "src/context",
    "src/hooks",
    "src/api",
    "src/utils",
    "src/styles"
)

$missingFolders = @()
foreach ($folder in $requiredFolders) {
    if (!(Test-Path $folder)) {
        $missingFolders += $folder
    }
}

if ($missingFolders.Count -gt 0) {
 $issues += "  ? Dossiers manquants"
  $missingFolders | ForEach-Object { Write-Host "    - $_" -ForegroundColor Red }
} else {
    $success += "  ? Structure de dossiers correcte"
}

# 11. Test de build
Write-Host "`n11. Test de build..." -ForegroundColor Yellow

$buildOutput = npm run build 2>&1 | Out-String
if ($LASTEXITCODE -eq 0) {
    $success += "  ? Build réussi"
} else {
    $issues += "  ? Build échoué"
  Write-Host "    Voir les erreurs ci-dessus" -ForegroundColor Red
}

# RÉSUMÉ
Write-Host "`n=== RÉSUMÉ ===" -ForegroundColor Cyan
Write-Host ""

Write-Host "? Succès: $($success.Count)" -ForegroundColor Green
$success | ForEach-Object { Write-Host $_ -ForegroundColor Green }

if ($warnings.Count -gt 0) {
    Write-Host "`n? Avertissements: $($warnings.Count)" -ForegroundColor Yellow
    $warnings | ForEach-Object { Write-Host $_ -ForegroundColor Yellow }
}

if ($issues.Count -gt 0) {
    Write-Host "`n? Problèmes: $($issues.Count)" -ForegroundColor Red
    $issues | ForEach-Object { Write-Host $_ -ForegroundColor Red }
    Write-Host "`n? CORRECTION REQUISE AVANT COMMIT" -ForegroundColor Red
} else {
    Write-Host "`n? PRÊT POUR COMMIT!" -ForegroundColor Green
}

Write-Host ""
Set-Location ..
