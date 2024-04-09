"use client";

import { useState } from 'react';
import { Grid, Button, Title, TextInput } from '@mantine/core';
import TodoItem from '../TodoItem/TodoItem';
import { ColorSchemeToggle } from '@/components/ColorSchemeToggle/ColorSchemeToggle';
import { DragDropContext, Droppable, DropResult } from '@hello-pangea/dnd';

interface Todo {
    id: number;
    text: string;
    completed: boolean;
    isEditing: boolean;
    parentId?: number;
    children?: Todo[];
}

function TodoCanvas() {
    const [todos, setTodos] = useState<Todo[]>([]);

    const addTodo = (parentId?: number) => {
        const newTodo: Todo = { id: Date.now(), text: '', completed: false, isEditing: true };
    
        if (typeof parentId === 'undefined') {
            // Add a root-level todo
            setTodos([...todos, newTodo]);
        } else {
            // Add a child todo
            setTodos(todos.map(todo => {
                if (todo.id === parentId) {
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
                <ColorSchemeToggle />
                <Button onClick={() => addTodo(undefined)}>New Item</Button>
            </div>
            <Grid>
                {todos.map(todo => (
                    <Grid.Col key={todo.id} span={4}>
                        {todos.map((todo, index) => (
                            <TodoItem
                                key={todo.id}
                                todo={todo}
                                onAddChild={() => addTodo(todo.id)}
                                onChange={toggleTodo}
                                onDelete={onDelete}
                                onSave={saveTodo}
                                onUpdate={() => toggleEdit(todo.id)}
                                isEditing={todo.isEditing}
                                index={index}
                            />
                        ))}
                    </Grid.Col>
                ))}
            </Grid>
        </div>
    );
}

export default TodoCanvas;
