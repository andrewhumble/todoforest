import React, { useState } from 'react';
import { Grid } from '@mantine/core';
import TodoItem from '../TodoItem/TodoItem';
import { v4 as uuidv4 } from 'uuid';
import Tree from 'react-d3-tree';

interface Todo {
    id: string;
    text: string;
    completed: boolean;
    parentId?: string;
    isEditing: boolean;
    children?: Todo[];
}

interface TodoTreeProps {
    id: string;
}

const TodoTree: React.FC<TodoTreeProps> = ({ id }) => {
    const [todos, setTodos] = useState<Todo[]>(() => {
        // Automatically create a root todo when initializing the state
        const rootTodo: Todo = {
            id: Date.now().toString(), // Consider using uuid for production code
            text: Date.now().toString(), // Optionally provide initial text for the root todo
            completed: false,
            isEditing: false, // Set to true if you want the root todo to be in edit mode initially
        };
        return [rootTodo];
    });

    const generateNewId = () => {
        return uuidv4(); // Generates a unique ID
    };

    const addTodo = (parentId?: string) => {
        const newTodo: Todo = {
            id: Date.now().toString(),
            text: Date.now().toString(),
            completed: false,
            isEditing: true,
            parentId,
        };
        if (!parentId) {
            setTodos(prevTodos => [...prevTodos, newTodo]);
        } else {
            const addTodoToParent = (todos: Todo[], newTodo: Todo, parentId: string): Todo[] =>
                todos.map(todo => {
                    if (todo.id === parentId) {
                        // Found the direct parent, add the new todo as a child
                        return { ...todo, children: [...(todo.children || []), newTodo] };
                    } else if (todo.children) {
                        // Not the direct parent, search in its children
                        return { ...todo, children: addTodoToParent(todo.children, newTodo, parentId) };
                    } else {
                        // No match, return the todo unchanged
                        return todo;
                    }
                });

            setTodos(prevTodos => addTodoToParent(prevTodos, newTodo, parentId));
        }
    };

    const handleChange = (id: string) => {
        setTodos(prevTodos =>
            prevTodos.map(todo => (todo.id === id ? { ...todo, completed: !todo.completed } : todo))
        );
    };

    const handleDelete = (id: string) => {
        const removeTodo = (todos: Todo[], id: string): Todo[] =>
            todos.reduce((acc, todo) => {
                if (todo.id === id) return acc;
                if (todo.children) {
                    todo.children = removeTodo(todo.children, id);
                }
                return [...acc, todo];
            }, [] as Todo[]);
        setTodos(prevTodos => removeTodo(prevTodos, id));
    };

    const handleUpdate = (id: string, text: string) => {
        const updateTodo = (todos: Todo[], id: string, text: string): Todo[] =>
            todos.map(todo =>
                todo.id === id ? { ...todo, text, isEditing: false } : todo
            );
        setTodos(prevTodos => updateTodo(prevTodos, id, text));
    };

    const renderTodos = (todos: Todo[]) => {
        return (
            <Grid>
                {todos.map(todo => (
                    <>
                        <Grid.Col span={12 / todos.length}>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <TodoItem
                                    todo={todo}
                                    onAddChild={addTodo}
                                    onChange={handleChange}
                                    onDelete={handleDelete}
                                    onUpdate={handleUpdate}
                                    onSave={handleUpdate}
                                />
                            </div>
                            {todo.children && renderTodos(todo.children)}
                        </Grid.Col>
                    </>
                ))}
            </Grid>
        );
    };

    return (
        <div>
            {renderTodos(todos)}
        </div>
    );
};

export default TodoTree;
