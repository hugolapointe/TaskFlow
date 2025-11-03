# TaskFlow - React Frontend

A simple and clean React app to manage your daily tasks. Get stuff done! ??

## ?? Technologies

- **React 19** - UI Framework
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **React Toastify** - Notifications
- **React Context API** - Global state management

## ?? Installation

```bash
npm install
```

## ?? Getting Started

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

**Important**: Make sure the backend API is running on `http://localhost:5154`

## ?? Project Structure

```
src/
??? main.jsx    # Entry point
??? App.jsx        # Main component
??? contexts/
?   ??? TodoContext.jsx      # Context API - Global state
??? services/
?   ??? todoApi.js # Axios client - API requests
??? components/
    ??? TodoList.jsx         # Task list + filters
    ??? TodoItem.jsx         # Individual task item
    ??? TodoForm.jsx         # Create/edit form
```

## ?? Features

### Task Management
- ? Create new tasks
- ?? Edit existing tasks
- ?? Mark as completed
- ?? Set priority
- ??? Delete tasks
- ?? Add due dates

### Filters & Sorting
- Filter by status (all, pending, completed)
- Filter by priority (all, high priority, normal)
- Sort by creation date or due date

### Statistics
- Total tasks count
- Pending tasks
- Completed tasks
- High priority tasks

## ?? Design

- Minimalist design with Tailwind CSS
- Mobile-first & responsive
- Toast notifications for actions
- Visual indicators (priority, overdue)

## ?? Configuration

### API URL

The API URL is configured in `src/services/todoApi.js`:

```javascript
const API_BASE_URL = 'http://localhost:5154/api';
```

Change this value if your API is on a different port.

### CORS

CORS is configured in the backend API (`TaskFlow.WebAPI/Program.cs`) to accept requests from:
- `http://localhost:5173` (Vite default)
- `http://localhost:5174` (Vite alternative)

## ?? React Concepts Used

### React Context API
The `TodoContext` centralizes:
- Global task state
- Filters and sorting
- All CRUD operations

### Custom Hooks
```javascript
const { todos, createTodo, updateTodo, deleteTodo } = useTodos();
```

### Controlled Components
All forms use controlled components with `useState`.

### Effects
- `useEffect` to load tasks on mount
- `useEffect` to sync form with selected task

## ?? User Workflow

1. **Create a task**: Fill the form at the top
2. **Edit a task**: Click the ?? icon, form fills automatically
3. **Quick actions**: Checkbox to complete, ?? icon for priority
4. **Filter**: Use filters to refine the list
5. **Notifications**: Toast for each successful or failed action

## ?? Debugging

Errors are logged to the console:
```javascript
console.error('Error createTodo:', error);
```

Toast notifications display user-friendly error messages.

## ?? Notes

- Dates are in Canadian format: `YYYY-MM-DD`
- Pagination was removed (see `SIMPLIFICATION-PAGINATION.md`)
- API uses in-memory database (data lost on restart)

## ?? Production Build

```bash
npm run build
```

Production files will be in the `dist/` folder.

## ?? License

This project is for educational purposes.
