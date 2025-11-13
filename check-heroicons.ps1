#!/usr/bin/env pwsh
Write-Host "=== DIAGNOSTIC HEROICONS ===" -ForegroundColor Cyan
Write-Host ""

Set-Location TaskFlow.WebSite

# Vérifier l'installation
Write-Host "Vérification de @heroicons/react..." -ForegroundColor Yellow

if (Test-Path "node_modules/@heroicons") {
    Write-Host "? @heroicons installé" -ForegroundColor Green
    
    # Vérifier les versions
    if (Test-Path "node_modules/@heroicons/react/package.json") {
        $pkg = Get-Content "node_modules/@heroicons/react/package.json" | ConvertFrom-Json
        Write-Host "  Version: $($pkg.version)" -ForegroundColor Gray
    }
    
  # Vérifier les dossiers disponibles
    Write-Host "`nDossiers disponibles:" -ForegroundColor Yellow
    if (Test-Path "node_modules/@heroicons/react/24") {
        Write-Host "  ? /24 (icons v2)" -ForegroundColor Green
        
   if (Test-Path "node_modules/@heroicons/react/24/solid") {
        Write-Host "    ? /24/solid" -ForegroundColor Green
        }
        if (Test-Path "node_modules/@heroicons/react/24/outline") {
       Write-Host "    ? /24/outline" -ForegroundColor Green
        }
    }
    
    # Tester quelques imports
    Write-Host "`nTest d'imports critiques:" -ForegroundColor Yellow
    $testIcons = @(
        "24/solid/SparklesIcon.js",
    "24/outline/FunnelIcon.js",
        "24/outline/BarsArrowUpIcon.js",
    "24/outline/CheckIcon.js",
        "24/outline/PencilIcon.js",
        "24/outline/TrashIcon.js",
        "24/outline/XMarkIcon.js"
    )
    
    foreach ($icon in $testIcons) {
        if (Test-Path "node_modules/@heroicons/react/$icon") {
        Write-Host "  ? $icon" -ForegroundColor Green
        } else {
            Write-Host "  ? $icon MANQUANT" -ForegroundColor Red
        }
 }
    
} else {
    Write-Host "? @heroicons/react NON installé" -ForegroundColor Red
    Write-Host ""
    Write-Host "Pour installer:" -ForegroundColor Yellow
 Write-Host "  npm install @heroicons/react" -ForegroundColor White
}

# Vérifier les imports dans les fichiers
Write-Host "`nVérification des imports dans les fichiers:" -ForegroundColor Yellow

$filesToCheck = @(
    "src/common/PageLayout.jsx",
    "src/common/Select.jsx",
    "src/toDos/components/ToDoSelectors/ToDoSelectors.jsx"
)

foreach ($file in $filesToCheck) {
 if (Test-Path $file) {
 $content = Get-Content $file -Raw
        if ($content -match "from '@heroicons/react") {
        Write-Host "  ? $file utilise Heroicons" -ForegroundColor Green
        } else {
        Write-Host "  ? $file n'utilise pas Heroicons" -ForegroundColor Yellow
        }
    }
}

Write-Host ""
Set-Location ..
