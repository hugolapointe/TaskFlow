# Script de diagnostic CSS/Build
Write-Host "=== Diagnostic TaskFlow WebSite ===" -ForegroundColor Cyan

# Vérifier si node_modules existe
if (Test-Path "TaskFlow.WebSite/node_modules") {
    Write-Host "? node_modules existe" -ForegroundColor Green
} else {
    Write-Host "? node_modules manquant - Installation des dépendances..." -ForegroundColor Yellow
    Set-Location TaskFlow.WebSite
    npm install
    Set-Location ..
}

# Vérifier Tailwind
Write-Host "`nVérification des dépendances Tailwind..." -ForegroundColor Cyan
Set-Location TaskFlow.WebSite
$packageJson = Get-Content package.json | ConvertFrom-Json

if ($packageJson.devDependencies.tailwindcss) {
    Write-Host "? tailwindcss: $($packageJson.devDependencies.tailwindcss)" -ForegroundColor Green
} else {
    Write-Host "? tailwindcss manquant" -ForegroundColor Red
}

if ($packageJson.devDependencies.autoprefixer) {
    Write-Host "? autoprefixer: $($packageJson.devDependencies.autoprefixer)" -ForegroundColor Green
} else {
    Write-Host "? autoprefixer manquant" -ForegroundColor Red
}

if ($packageJson.devDependencies.postcss) {
    Write-Host "? postcss: $($packageJson.devDependencies.postcss)" -ForegroundColor Green
} else {
    Write-Host "? postcss manquant" -ForegroundColor Red
}

# Vérifier les fichiers de configuration
Write-Host "`nVérification des fichiers de configuration..." -ForegroundColor Cyan

$files = @(
    "tailwind.config.js",
    "postcss.config.js",
    "src/index.css",
    "src/styles/theme.css",
    "src/styles/utilities.css"
)

foreach ($file in $files) {
    if (Test-Path $file) {
        $size = (Get-Item $file).Length
  if ($size -gt 0) {
            Write-Host "? $file ($size bytes)" -ForegroundColor Green
   } else {
            Write-Host "? $file (VIDE!)" -ForegroundColor Red
        }
    } else {
      Write-Host "? $file (MANQUANT!)" -ForegroundColor Red
    }
}

Write-Host "`n=== Fin du diagnostic ===" -ForegroundColor Cyan
Set-Location ..
