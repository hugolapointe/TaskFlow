# Script de réorganisation des composants common
Write-Host "?? Début de la réorganisation des composants..." -ForegroundColor Cyan

$projectRoot = "TaskFlow.WebSite\src"

# Créer la structure de dossiers pour common
Write-Host "`n?? Création de la structure common..." -ForegroundColor Yellow
$commonFolders = @(
  "$projectRoot\common\inputs",
    "$projectRoot\common\buttons",
 "$projectRoot\common\feedback",
    "$projectRoot\common\surfaces",
    "$projectRoot\common\navigation"
)

foreach ($folder in $commonFolders) {
    if (!(Test-Path $folder)) {
      New-Item -ItemType Directory -Path $folder -Force | Out-Null
  Write-Host "  ? Créé: $folder" -ForegroundColor Green
}
}

# Créer la structure de dossiers pour toDos/common
Write-Host "`n?? Création de la structure toDos/common..." -ForegroundColor Yellow
$todosFolders = @(
    "$projectRoot\toDos\common\buttons",
    "$projectRoot\toDos\common\inputs"
)

foreach ($folder in $todosFolders) {
    if (!(Test-Path $folder)) {
   New-Item -ItemType Directory -Path $folder -Force | Out-Null
        Write-Host "  ? Créé: $folder" -ForegroundColor Green
    }
}

Write-Host "`n? Structure de dossiers créée avec succès!" -ForegroundColor Green
Write-Host "`n??  Les fichiers devront être déplacés manuellement via l'outil edit" -ForegroundColor Yellow
