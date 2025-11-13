#!/usr/bin/env pwsh
Write-Host "=== INSTALLATION/VÉRIFICATION HEROICONS ===" -ForegroundColor Cyan
Write-Host ""

Set-Location TaskFlow.WebSite

# Vérifier si déjà installé
if (Test-Path "node_modules/@heroicons/react") {
 Write-Host "? @heroicons/react déjà installé" -ForegroundColor Green
    
    $pkg = Get-Content "node_modules/@heroicons/react/package.json" | ConvertFrom-Json
    Write-Host "  Version actuelle: $($pkg.version)" -ForegroundColor Gray
    
    Write-Host "`nVoulez-vous réinstaller/mettre à jour? (O/N)" -ForegroundColor Yellow
    $response = Read-Host
    
 if ($response -ne "O" -and $response -ne "o") {
 Write-Host "Installation annulée" -ForegroundColor Gray
        Set-Location ..
      exit 0
    }
}

Write-Host "`nInstallation de @heroicons/react..." -ForegroundColor Cyan
npm install @heroicons/react

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n? Installation réussie!" -ForegroundColor Green
    
    # Vérifier la version installée
    if (Test-Path "node_modules/@heroicons/react/package.json") {
    $pkg = Get-Content "node_modules/@heroicons/react/package.json" | ConvertFrom-Json
        Write-Host "  Version installée: $($pkg.version)" -ForegroundColor Gray
    }
    
    Write-Host "`nIcônes disponibles:" -ForegroundColor Cyan
    Write-Host "  - Outline (24x24): @heroicons/react/24/outline" -ForegroundColor White
    Write-Host "  - Solid (24x24): @heroicons/react/24/solid" -ForegroundColor White
    
    Write-Host "`nExemple d'utilisation:" -ForegroundColor Cyan
    Write-Host @"
import { SparklesIcon } from '@heroicons/react/24/solid';
import { FunnelIcon } from '@heroicons/react/24/outline';

<SparklesIcon className="w-6 h-6 text-blue-400" />
<FunnelIcon className="w-5 h-5 text-slate-400" />
"@ -ForegroundColor Gray

} else {
    Write-Host "`n? Échec de l'installation" -ForegroundColor Red
    Write-Host "Vérifiez votre connexion internet et réessayez" -ForegroundColor Yellow
}

Write-Host ""
Set-Location ..
