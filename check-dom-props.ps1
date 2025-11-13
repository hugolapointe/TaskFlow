#!/usr/bin/env pwsh
Write-Host "=== RECHERCHE D'ERREURS PROP DOM ===" -ForegroundColor Cyan
Write-Host ""

Set-Location TaskFlow.WebSite/src

# Props personnalisés communs qui ne doivent PAS être passés au DOM
$customProps = @(
    'inputClassName',
    'onToggle',
    'isPriority',
    'isActive',
    'setSortBy',
    'setStatusFilter',
    'setPriorityFilter'
)

Write-Host "Recherche de props personnalisés potentiellement problématiques..." -ForegroundColor Yellow
Write-Host ""

$filesChecked = 0
$issuesFound = 0

Get-ChildItem -Recurse -Include *.jsx,*.js | ForEach-Object {
    $filesChecked++
    $file = $_.FullName
    $relativePath = $_.FullName.Replace((Get-Location).Path + "\", "")
    $content = Get-Content $file -Raw
    
    # Chercher des spreads {...props} après des props personnalisés
    if ($content -match '\.\.\.(props|rest|otherProps)') {
        foreach ($prop in $customProps) {
            # Vérifier si le prop custom est défini avant le spread
        if ($content -match "$prop\s*[,}]" -and $content -notmatch "$prop\s*[:=]") {
         Write-Host "? $relativePath" -ForegroundColor Yellow
     Write-Host "  Prop potentiellement problématique: $prop" -ForegroundColor Gray
$issuesFound++
    break
            }
 }
    }
}

Write-Host ""
Write-Host "=== RÉSUMÉ ===" -ForegroundColor Cyan
Write-Host "Fichiers vérifiés: $filesChecked" -ForegroundColor White
Write-Host "Problèmes potentiels: $issuesFound" -ForegroundColor $(if ($issuesFound -eq 0) { "Green" } else { "Yellow" })

if ($issuesFound -eq 0) {
    Write-Host ""
Write-Host "? Aucun problème de prop DOM détecté!" -ForegroundColor Green
} else {
    Write-Host ""
    Write-Host "Vérifiez les fichiers listés ci-dessus." -ForegroundColor Yellow
    Write-Host "Assurez-vous que les props personnalisés sont filtrés avant {...props}" -ForegroundColor Yellow
}

Set-Location ../..
