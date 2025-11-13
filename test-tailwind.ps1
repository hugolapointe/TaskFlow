#!/usr/bin/env pwsh
Write-Host "=== TEST RAPIDE TAILWIND ===" -ForegroundColor Cyan
Write-Host ""

Set-Location TaskFlow.WebSite

Write-Host "Test de génération CSS Tailwind..." -ForegroundColor Yellow
Write-Host ""

# Créer un fichier HTML de test minimal
$testHtml = @"
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Test Tailwind</title>
</head>
<body>
    <div class="bg-slate-900 text-slate-100 p-8 min-h-screen">
      <h1 class="text-2xl font-bold mb-4">Test Tailwind CSS</h1>
        <div class="bg-slate-800 border border-slate-700 rounded-lg p-4">
            <p class="text-slate-400">Si vous voyez ce texte en blanc sur fond noir/gris, Tailwind fonctionne!</p>
        </div>
  </div>
</body>
</html>
"@

$testHtml | Out-File -FilePath "test-tailwind.html" -Encoding utf8

# Générer le CSS
Write-Host "Génération du CSS..." -ForegroundColor Cyan
$output = npx tailwindcss -i ./src/index.css -o ./test-tailwind.css 2>&1

if ($LASTEXITCODE -eq 0) {
    Write-Host "? CSS généré avec succès!" -ForegroundColor Green
    
    if (Test-Path "test-tailwind.css") {
      $size = (Get-Item "test-tailwind.css").Length
        Write-Host "? Taille du fichier: $size bytes" -ForegroundColor Green
        
  # Vérifier quelques classes critiques
$css = Get-Content "test-tailwind.css" -Raw
      
    $checks = @{
      "bg-slate-900" = $css -match "bg-slate-900"
       "text-slate-100" = $css -match "text-slate-100"
            "flex" = $css -match "\.flex"
  "gap-3" = $css -match "gap-3"
        }
    
        Write-Host ""
  Write-Host "Vérification des classes:" -ForegroundColor Yellow
        foreach ($check in $checks.GetEnumerator()) {
   if ($check.Value) {
             Write-Host "  ? $($check.Key) présent" -ForegroundColor Green
            } else {
    Write-Host "  ? $($check.Key) MANQUANT" -ForegroundColor Red
         }
        }
    
        Write-Host ""
     Write-Host "Fichiers de test créés:" -ForegroundColor Cyan
        Write-Host "  - test-tailwind.html" -ForegroundColor White
        Write-Host "  - test-tailwind.css" -ForegroundColor White
        Write-Host ""
        Write-Host "Pour tester visuellement:" -ForegroundColor Yellow
        Write-Host "  1. Ouvrir test-tailwind.html dans un navigateur" -ForegroundColor White
        Write-Host "  2. Vous devriez voir un fond noir/gris avec texte blanc" -ForegroundColor White
        Write-Host ""
        Write-Host "Voulez-vous nettoyer les fichiers de test? (O/N)" -ForegroundColor Yellow
  $response = Read-Host
 
        if ($response -eq "O" -or $response -eq "o") {
        Remove-Item "test-tailwind.html" -ErrorAction SilentlyContinue
            Remove-Item "test-tailwind.css" -ErrorAction SilentlyContinue
            Write-Host "? Fichiers de test supprimés" -ForegroundColor Green
        }
    }
} else {
    Write-Host "? Échec de la génération CSS" -ForegroundColor Red
    Write-Host $output -ForegroundColor Gray
}

Set-Location ..
Write-Host ""
Write-Host "=== FIN DU TEST ===" -ForegroundColor Cyan
