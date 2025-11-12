/**
 * API Service
 * Handles all HTTP requests to the backend API
 */

import axios from 'axios';
import { API_BASE_URL } from '../constants';

// Create axios instance with default configuration
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

/**
 * Builds a query string from filter object
 * @param {Object} filters - Filter parameters
 * @returns {string} Query string (e.g., "?sortBy=CreatedAt&isPriority=true")
 */
const buildQueryString = (filters) => {
 const params = new URLSearchParams();
    
    Object.entries(filters).forEach(([key, value]) => {
     if (value !== undefined && value !== null) {
       params.append(key, value);
        }
    });
    
    const queryString = params.toString();
    return queryString ? `?${queryString}` : '';
};

// ==================== TODO CRUD OPERATIONS ====================

/**
 * Fetches all todos with optional filters
 * @param {Object} filters - Optional filter parameters (sortBy, isPriority, isCompleted)
 * @returns {Promise<Object>} Response containing todos array and metadata
 */
export const getTodos = async (filters = {}) => {
    const queryString = buildQueryString(filters);
    const response = await apiClient.get(`/todos${queryString}`);
    return response.data;
};

/**
 * Fetches a single todo by ID
 * @param {number} id - Todo ID
 * @returns {Promise<Object>} Todo object
 */
export const getTodoById = async (id) => {
    const response = await apiClient.get(`/todos/${id}`);
    return response.data;
};

/**
 * Creates a new todo
 * @param {Object} todoData - Todo data (description, dueDate, isPriority)
 * @returns {Promise<Object>} Created todo object
 */
export const createTodo = async (todoData) => {
    const response = await apiClient.post('/todos', {
        description: todoData.description,
        dueDate: todoData.dueDate || null,
        isPriority: todoData.isPriority || false,
    });
    return response.data;
};

/**
 * Updates an existing todo
 * @param {number} id - Todo ID
 * @param {Object} updates - Fields to update
 * @returns {Promise<Object>} Updated todo object
 */
export const updateTodo = async (id, updates) => {
    const response = await apiClient.put(`/todos/${id}`, updates);
    return response.data;
};

/**
 * Toggles the priority status of a todo
 * @param {number} id - Todo ID
 * @returns {Promise<Object>} Updated todo object
 */
export const togglePriority = async (id) => {
    const response = await apiClient.patch(`/todos/${id}/toggle-priority`);
    return response.data;
};

/**
 * Marks a todo as completed (or reopens it)
 * @param {number} id - Todo ID
 * @returns {Promise<Object>} Updated todo object
 */
export const markAsCompleted = async (id) => {
    const response = await apiClient.patch(`/todos/${id}/mark-as-completed`);
    return response.data;
};

/**
 * Archives a todo (soft delete)
 * @param {number} id - Todo ID
 * @returns {Promise<void>}
 */
export const archiveTodo = async (id) => {
    await apiClient.delete(`/todos/${id}/archive`);
};

// ==================== STATISTICS ====================

/**
 * Fetches todo statistics
 * @returns {Promise<Object>} Statistics object (total, priority, nonPriority, completed)
 */
export const getStats = async () => {
    const response = await apiClient.get('/todos/stats');
    return response.data;
};

export default apiClient;
