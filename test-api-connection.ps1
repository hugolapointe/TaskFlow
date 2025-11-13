#!/usr/bin/env pwsh
Write-Host "=== TEST API TaskFlow ===" -ForegroundColor Cyan
Write-Host ""

$apiUrl = "http://localhost:5154/api"

Write-Host "Test de connexion à l'API..." -ForegroundColor Yellow
Write-Host "URL: $apiUrl" -ForegroundColor Gray
Write-Host ""

# Test 1: Health check / base URL
Write-Host "1. Test de connexion de base..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "$apiUrl/todos" -Method Get -UseBasicParsing -TimeoutSec 5
    Write-Host "  ? API accessible!" -ForegroundColor Green
Write-Host "  Status: $($response.StatusCode)" -ForegroundColor Gray
} catch {
    Write-Host "  ? API non accessible" -ForegroundColor Red
    Write-Host "  Erreur: $($_.Exception.Message)" -ForegroundColor Gray
    Write-Host ""
 Write-Host "Vérifications:" -ForegroundColor Yellow
    Write-Host "  1. L'API est-elle démarrée?" -ForegroundColor White
    Write-Host "  2. Port 5154 est-il correct?" -ForegroundColor White
    Write-Host "  3. CORS configuré?" -ForegroundColor White
    exit 1
}

# Test 2: Get todos
Write-Host "`n2. Test GET /todos..." -ForegroundColor Yellow
try {
    $todos = Invoke-RestMethod -Uri "$apiUrl/todos" -Method Get
    Write-Host "  ? Endpoint fonctionnel" -ForegroundColor Green
  
    if ($todos.items) {
        Write-Host "  ? Structure: { items: [...] }" -ForegroundColor Green
        Write-Host "  Nombre de tâches: $($todos.items.Count)" -ForegroundColor Gray
        
   if ($todos.items.Count -gt 0) {
      $firstTodo = $todos.items[0]
Write-Host "  Exemple de tâche:" -ForegroundColor Gray
            Write-Host "    - id: $($firstTodo.id)" -ForegroundColor Gray
         Write-Host "    - description: $($firstTodo.description)" -ForegroundColor Gray
   Write-Host "    - isPriority: $($firstTodo.isPriority)" -ForegroundColor Gray
 Write-Host "    - isCompleted: $($firstTodo.isCompleted)" -ForegroundColor Gray
        }
    } elseif ($todos -is [Array]) {
        Write-Host "? Structure: Array direct (pas { items: [...] })" -ForegroundColor Yellow
  Write-Host "  Nombre de tâches: $($todos.Count)" -ForegroundColor Gray
    } else {
        Write-Host "? Structure inconnue" -ForegroundColor Yellow
        Write-Host "  Type: $($todos.GetType().Name)" -ForegroundColor Gray
    }
} catch {
    Write-Host "  ? Erreur GET /todos" -ForegroundColor Red
    Write-Host "  $($_.Exception.Message)" -ForegroundColor Gray
}

# Test 3: Get stats
Write-Host "`n3. Test GET /todos/stats..." -ForegroundColor Yellow
try {
    $stats = Invoke-RestMethod -Uri "$apiUrl/todos/stats" -Method Get
  Write-Host "? Endpoint fonctionnel" -ForegroundColor Green
    Write-Host "  Stats:" -ForegroundColor Gray
    Write-Host "    - Total: $($stats.total)" -ForegroundColor Gray
    Write-Host "    - Priority: $($stats.priority)" -ForegroundColor Gray
    Write-Host "    - NonPriority: $($stats.nonPriority)" -ForegroundColor Gray
    Write-Host "    - Completed: $($stats.completed)" -ForegroundColor Gray
} catch {
    Write-Host "  ? Erreur GET /todos/stats" -ForegroundColor Red
    Write-Host "  $($_.Exception.Message)" -ForegroundColor Gray
}

# Test 4: CORS Headers
Write-Host "`n4. Vérification CORS..." -ForegroundColor Yellow
try {
    $headers = @{
        "Origin" = "http://localhost:5173"
        "Access-Control-Request-Method" = "GET"
    }
    $response = Invoke-WebRequest -Uri "$apiUrl/todos" -Method Options -Headers $headers -UseBasicParsing -TimeoutSec 5
    
    $corsHeader = $response.Headers["Access-Control-Allow-Origin"]
    if ($corsHeader) {
        Write-Host "  ? CORS configuré" -ForegroundColor Green
  Write-Host "  Allow-Origin: $corsHeader" -ForegroundColor Gray
    } else {
        Write-Host "  ? CORS peut ne pas être configuré" -ForegroundColor Yellow
    }
} catch {
    Write-Host "  ? Impossible de vérifier CORS" -ForegroundColor Yellow
}

Write-Host "`n=== RÉSUMÉ ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "Configuration frontend:" -ForegroundColor Yellow
Write-Host "  baseURL: 'http://localhost:5154/api' ?" -ForegroundColor White
Write-Host ""
Write-Host "Si l'API fonctionne mais pas le frontend:" -ForegroundColor Yellow
Write-Host "  1. Vérifier la console navigateur (F12)" -ForegroundColor White
Write-Host "  2. Vérifier l'onglet Network pour les requêtes" -ForegroundColor White
Write-Host "  3. Vérifier que l'API retourne bien { items: [...] }" -ForegroundColor White
Write-Host "  4. Vérifier CORS dans Program.cs de l'API" -ForegroundColor White
Write-Host ""
