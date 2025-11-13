# Fix CSS & Props - Guide de Résolution Rapide

## ? Problème Résolu: inputClassName

### Erreur
```
React does not recognize the `inputClassName` prop on a DOM element
```

### Cause
`TextInput.jsx` passait `inputClassName` directement au DOM via `{...props}`

### Solution ?
```javascript
// AVANT (? Mauvais)
const TextInput = ({ label, ...props }) => {
  return <input {...props} />;
}

// APRÈS (? Correct)
const TextInput = ({ label, inputClassName, ...props }) => {
  return <input className={cn(baseClasses, inputClassName)} {...props} />;
}
```

**Le prop `inputClassName` est maintenant extrait et ne passe plus au DOM.**

## Autres Erreurs Potentielles React

### 1. Props personnalisés dans les composants

**Règle:** Tous les props personnalisés doivent être extraits AVANT `{...props}`

```javascript
// ? CORRECT
const MyComponent = ({ customProp, anotherCustom, ...props }) => {
  return <div {...props} />;
}

// ? INCORRECT
const MyComponent = ({ ...props }) => {
  const { customProp } = props; // Trop tard! customProp ira dans le DOM
  return <div {...props} />;
}
```

### 2. Props booléens

React accepte certains props booléens mais pas les customs:

```javascript
// ? CORRECT
<input disabled={true} required={true} />

// ? INCORRECT  
<input isActive={true} isPriority={true} />
```

### 3. Fonctions custom

```javascript
// ? CORRECT
const Button = ({ onCustomClick, ...props }) => {
  return <button onClick={onCustomClick} {...props} />;
}

// ? INCORRECT
const Button = (props) => {
  return <button {...props} />; // onCustomClick ira dans le DOM
}
```

## Checklist de Vérification

- [ ] TextInput.jsx - `inputClassName` extrait ?
- [ ] Tous les wrappers de TextInput utilisent `inputClassName` correctement ?
- [ ] Aucun prop custom dans `{...props}` spread
- [ ] Console browser sans erreurs React
- [ ] Styles Tailwind appliqués correctement

## Test Rapide

```powershell
# 1. Vérifier les props DOM
.\check-dom-props.ps1

# 2. Builder et tester
cd TaskFlow.WebSite
npm run build
npm run dev

# 3. Ouvrir la console navigateur (F12)
# Vérifier: Pas d'erreurs "React does not recognize..."
```

## Si d'autres erreurs similaires apparaissent

1. **Identifier le composant** dans le message d'erreur
2. **Trouver le prop** mentionné
3. **Extraire le prop** avant `{...props}`:

```javascript
// Template de correction
const Component = ({ 
  problematicProp,  // ? Extraire ici
  ...props          // ? Reste après
}) => {
  // Utiliser problematicProp sans le passer au DOM
  return <domElement className={problematicProp} {...props} />;
}
```

## Composants Vérifiés ?

- ? TextInput.jsx - inputClassName filtré
- ? DescriptionInput.jsx - utilise inputClassName correctement
- ? DueDatePicker.jsx - utilise inputClassName correctement
- ? IconButton.jsx - pas de props custom dans spread
- ? PriorityToggle.jsx - gère ses props correctement
- ? Select.jsx - pas de conflits
- ? Card.jsx - onClick géré correctement

## État Final

**Le CSS devrait maintenant fonctionner correctement sans erreurs React dans la console ! ??**

Pour confirmer:
1. `npm run dev`
2. Ouvrir http://localhost:5173
3. Ouvrir Console (F12)
4. Vérifier: Aucune erreur rouge
5. Vérifier: Styles appliqués (background dark, cards visibles, etc.)
