"use client";

import { useState } from 'react';
import { Grid, Button, Title, TextInput } from '@mantine/core';
import TodoItem from '../TodoItem/TodoItem';
import { ColorSchemeToggle } from '@/components/ColorSchemeToggle/ColorSchemeToggle';
import { v4 as uuidv4 } from 'uuid';

interface Todo {
    id: string;
    text: string;
    completed: boolean;
    isEditing: boolean;
    parentId?: string;
    children?: Todo[];
}

function TodoCanvas() {
    const [todos, setTodos] = useState<Todo[]>([]);

    const addTodo = (parentId?: string) => {
        const newTodo: Todo = { id: generateNewId(), text: '', completed: false, isEditing: true };

        if (typeof parentId === 'undefined') {
            // Add a root-level todo
            setTodos([...todos, newTodo]);
        } else {
            // Add a child todo
            setTodos(todos.map(todo => {
                if (todo.id === String(parentId)) {
                    const updatedTodo = {
                        ...todo,
                        children: todo.children ? [...todo.children, newTodo] : [newTodo]
                    };
                    return updatedTodo;
                }
                return todo;
            }));
        }
    };

    const saveTodo = (id: string, newText: string) => {
        setTodos(todos.map(todo => {
            if (todo.id === id) {
                return { ...todo, text: newText, isEditing: false };
            }
            return todo;
        }));
    };

    const toggleTodo = (id: string) => {
        setTodos(todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo));
    };

    const onDelete = (id: string) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    const toggleEdit = (id: string) => {
        setTodos(todos.map(todo => todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo));
    };

    const generateNewId = () => {
        return uuidv4(); // Generates a unique ID
    };

    const handleAddChildTodo = (parentId: string) => {
        // Assuming you have a state named 'todos' that you're updating
        // Add logic here to add a new todo item with the given parentId
        setTodos([...todos, { id: generateNewId(), text: '', parentId: parentId, completed: false, isEditing: false }]);
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 40 }}>
                <Title>TodoForest</Title>
                <ColorSchemeToggle />
                <Button onClick={() => addTodo(undefined)}>New Item</Button>
            </div>
            <Grid>
                {todos.map((todo, index) => (
                    <Grid.Col key={todo.id} span={4}>
                            <TodoItem
                                key={todo.id}
                                todo={todo}
                                onAddChild={handleAddChildTodo}
                                onChange={toggleTodo}
                                onDelete={onDelete}
                                onSave={saveTodo}
                                onUpdate={() => toggleEdit(todo.id)}
                                isEditing={todo.isEditing}
                            />
                    </Grid.Col>
                ))}
            </Grid>
        </div>
    );
}

export default TodoCanvas;
