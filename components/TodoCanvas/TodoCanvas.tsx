"use client";

import React, { useState } from 'react';
import { Button, Title } from '@mantine/core';
import { v4 as uuidv4 } from 'uuid';
import TodoTree from '../TodoTree/TodoTree'; // Assuming TodoTreeComponent is your TodoTree component
import { ColorSchemeToggle } from '@/components/ColorSchemeToggle/ColorSchemeToggle';

interface TodoTree {
    id: string;
}

interface Todo {
    id: string;
    text: string;
    completed: boolean;
    isEditing: boolean;
    parentId?: string;
    children?: Todo[];
}

function TodoCanvas() {
    const [todoTrees, setTodoTrees] = useState<TodoTree[]>([]);

    const addTodoTree = () => {
        const newTree: TodoTree = { id: Date.now().toString() };
        setTodoTrees([...todoTrees, newTree]);
    };

    const generateNewId = () => {
        return uuidv4(); // Generates a unique ID
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 40 }}>
                <Title>TodoForest</Title>
                <Button onClick={addTodoTree}>New Tree</Button>
            </div>
            {todoTrees.map(tree => (
                <TodoTree key={tree.id} id={generateNewId()} />
            ))}
        </div>
    );
}

export default TodoCanvas;
