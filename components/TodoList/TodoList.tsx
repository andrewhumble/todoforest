"use client";

import { useState } from 'react';
import { Grid, Button, Title, TextInput } from '@mantine/core';
import TodoItem from '../TodoItem/TodoItem';

interface Todo {
    id: number;
    text: string;
    completed: boolean;
    isEditing: boolean;
}

function TodoList() {
    const [todos, setTodos] = useState<Todo[]>([]);

    const addTodo = () => {
        const newTodo: Todo = { id: Date.now(), text: '', completed: false, isEditing: true };
        setTodos([...todos, newTodo]);
    };

    const saveTodo = (id: number, newText: string) => {
        setTodos(todos.map(todo => {
            if (todo.id === id) {
                return { ...todo, text: newText, isEditing: false };
            }
            return todo;
        }));
    };

    const toggleTodo = (id: number) => {
        setTodos(todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo));
    };

    const onDelete = (id: number) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    const toggleEdit = (id: number) => {
        setTodos(todos.map(todo => todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo));
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 40 }}>
                <Title>TodoForest</Title>
                <Button onClick={addTodo}>New Item</Button>
            </div>
            <Grid>
                {todos.map(todo => (
                    <Grid.Col key={todo.id} span={4}>
                        <TodoItem
                            todo={todo}
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

export default TodoList;
