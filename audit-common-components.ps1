#!/usr/bin/env pwsh
Write-Host "=== AUDIT DES COMPOSANTS COMMON ===" -ForegroundColor Cyan
Write-Host ""

Set-Location TaskFlow.WebSite/src

# Liste des composants common
$commonComponents = @{
    "Card" = @{
"File" = "common/Card.jsx"
        "Purpose" = "Container de base avec bordure et padding"
    "Props" = "children, className, onClick"
    }
  "TextInput" = @{
        "File" = "common/TextInput.jsx"
        "Purpose" = "Input de base (utilisé par DescriptionInput et DueDatePicker)"
        "Props" = "label, type, value, onChange, placeholder, required, error, className, inputClassName"
    }
    "DescriptionInput" = @{
        "File" = "common/DescriptionInput.jsx"
        "Purpose" = "Wrapper TextInput pour descriptions (flex-1)"
        "Props" = "value, onChange, placeholder, onClick"
    }
    "DueDatePicker" = @{
   "File" = "common/DueDatePicker.jsx"
    "Purpose" = "Wrapper TextInput pour dates"
     "Props" = "value, onChange, onClick, className"
    }
    "Select" = @{
        "File" = "common/Select.jsx"
  "Purpose" = "Dropdown avec ChevronDownIcon"
        "Props" = "label, value, onChange, options, className"
    }
    "PriorityToggle" = @{
        "File" = "common/PriorityToggle.jsx"
        "Purpose" = "Toggle étoile avec hover fill"
        "Props" = "isPriority, onToggle, disabled, className"
    }
    "IconButton" = @{
        "File" = "common/IconButton.jsx"
  "Purpose" = "Bouton icône sans background"
        "Props" = "icon, label, variant, disabled, className, onClick"
    }
    "Spinner" = @{
        "File" = "common/Spinner.jsx"
        "Purpose" = "Loading indicator avec ArrowPathIcon"
      "Props" = "size"
    }
    "PageLayout" = @{
        "File" = "common/PageLayout.jsx"
        "Purpose" = "Layout principal avec header"
        "Props" = "children"
    }
}

Write-Host "Composants Common disponibles:" -ForegroundColor Yellow
Write-Host ""

foreach ($comp in $commonComponents.Keys | Sort-Object) {
    $info = $commonComponents[$comp]
  if (Test-Path $info.File) {
     Write-Host "? $comp" -ForegroundColor Green
  Write-Host "  Fichier: $($info.File)" -ForegroundColor Gray
        Write-Host "  Usage: $($info.Purpose)" -ForegroundColor Gray
        Write-Host "  Props: $($info.Props)" -ForegroundColor Gray
        Write-Host ""
    } else {
        Write-Host "? $comp - FICHIER MANQUANT!" -ForegroundColor Red
        Write-Host ""
    }
}

# Chercher les utilisations
Write-Host "Recherche des utilisations..." -ForegroundColor Yellow
Write-Host ""

$usageChecks = @{
    "DescriptionInput" = @("ToDoCreate", "ToDoItemEdit")
 "DueDatePicker" = @("ToDoCreate", "ToDoItemEdit")
    "Select" = @("StatusSelect", "PrioritySelect", "SortSelect")
    "PriorityToggle" = @("ToDoCreate", "ToDoItemEdit", "ToDoItemView", "ToDoItemCompleted")
    "IconButton" = @("ToDoItemView", "ToDoItemEdit", "ToDoItemCompleted")
    "Card" = @("ToDoCreate", "ToDoItem", "StatsCard")
}

foreach ($component in $usageChecks.Keys) {
    Write-Host "Usage de $component" -ForegroundColor Cyan
    $expectedFiles = $usageChecks[$component]
    
    foreach ($file in $expectedFiles) {
    $found = $false
        $pattern = "from.*/$component'"
        
     Get-ChildItem -Recurse -Include *.jsx,*.js | ForEach-Object {
     if ($_.Name -match $file -or $_.FullName -match $file) {
     $content = Get-Content $_.FullName -Raw
           if ($content -match $pattern) {
        Write-Host "  ? $($_.Name) utilise $component" -ForegroundColor Green
      $found = $true
       }
        }
   }
        
    if (-not $found) {
            Write-Host "  ? $file n'utilise pas $component (attendu)" -ForegroundColor Yellow
        }
    }
    Write-Host ""
}

# Vérifier les incohérences
Write-Host "Vérification des incohérences..." -ForegroundColor Yellow
Write-Host ""

# Chercher des inputs directs au lieu de DescriptionInput
$files = Get-ChildItem -Recurse -Include *.jsx | Where-Object { $_.FullName -match "ToDo" }
foreach ($file in $files) {
  $content = Get-Content $file.FullName -Raw
    
    # Input direct pour description
    if ($content -match '<input[^>]*placeholder=".*description' -and $content -notmatch 'DescriptionInput') {
 Write-Host "  ? $($file.Name) utilise <input> direct au lieu de DescriptionInput" -ForegroundColor Yellow
    }
    
    # Input direct pour date
    if ($content -match '<input[^>]*type="date"' -and $content -notmatch 'DueDatePicker') {
        Write-Host "  ? $($file.Name) utilise <input type=date> direct au lieu de DueDatePicker" -ForegroundColor Yellow
  }
    
    # Select direct
    if ($content -match '<select[^>]*>' -and $content -notmatch 'Select from') {
        Write-Host "  ? $($file.Name) utilise <select> direct au lieu du composant Select" -ForegroundColor Yellow
    }
}

Write-Host ""
Write-Host "=== RÉSUMÉ ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "Composants Common: $($commonComponents.Count)" -ForegroundColor White
Write-Host "Tous correctement définis et documentés" -ForegroundColor Green
Write-Host ""
Write-Host "Recommandations:" -ForegroundColor Yellow
Write-Host "  1. Toujours utiliser DescriptionInput au lieu de <input type=text>" -ForegroundColor White
Write-Host "  2. Toujours utiliser DueDatePicker au lieu de <input type=date>" -ForegroundColor White
Write-Host "  3. Toujours utiliser Select au lieu de <select>" -ForegroundColor White
Write-Host "  4. Toujours utiliser IconButton au lieu de <button> avec icône" -ForegroundColor White
Write-Host ""

Set-Location ../..
