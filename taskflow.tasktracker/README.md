# Task Tracker

Application React de gestion de tâches intégrée à la solution TaskFlow.

## Prérequis

- Node.js 24+
- npm
- API TaskFlow.WebAPI en cours d'exécution sur http://localhost:5154

## Installation

```bash
npm install
```

## Configuration

Créez un fichier `.env` à la racine du projet (optionnel) :

```bash
VITE_API_BASE_URL=http://localhost:5154/api/todos
```

Par défaut, l'application se connecte à `http://localhost:5154/api/todos`.

## Commandes

```bash
npm run dev        # Démarrer le serveur de développement (port 3000)
npm run build      # Construire pour la production
npm run preview    # Prévisualiser la version de production
npm run lint       # Vérifier le code avec ESLint
```

## Structure

```
taskflow.tasktracker/
??? src/
?   ??? components/     # Composants React
?   ??? contexts/       # Contextes React
?   ??? config.js# Configuration de l'API
?   ??? main.jsx        # Point d'entrée
?   ??? site.css        # Styles globaux
??? public/   # Ressources statiques
??? index.html  # Template HTML
??? vite.config.js   # Configuration Vite
```

## Technologies

- React 18
- Vite 6
- Axios
- React Icons
- React DatePicker
- Heroicons

## Démarrage rapide

1. **Démarrez l'API TaskFlow.WebAPI**
2. **Installez les dépendances** : `npm install`
3. **Lancez le serveur de développement** : `npm run dev`
4. **Ouvrez** http://localhost:3000

## Dépannage

### Erreur ERR_SSL_PROTOCOL_ERROR

Si vous voyez cette erreur, vérifiez que l'URL de l'API utilise `http://` et non `https://` pour le port 5154.

### L'API n'est pas accessible

Vérifiez que TaskFlow.WebAPI est en cours d'exécution :
```powershell
Get-Process | Where-Object { $_.ProcessName -like "*TaskFlow*" }
netstat -ano | Select-String "5154"
```
