"use client";

import { useState } from 'react';
import { TextInput, Grid, ActionIcon, Menu, Title, Space, rem } from '@mantine/core';
import { IconDots, IconTrash } from '@tabler/icons-react';
import { Draggable, DragDropContext, Droppable, DropResult } from '@hello-pangea/dnd';
import TodoItem from '../TodoItem/TodoItem'; // Adjust the import path as necessary

interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

interface TodoListProps {
    deleteTodoList: () => void; // Assuming no arguments to simplify
}  

function TodoList({ deleteTodoList }: TodoListProps) {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [text, setText] = useState('');
    const [editTitle, setEditTitle] = useState(false); // State for edit mode
    const [title, setTitle] = useState('My Todo List'); // State for title text

    const addTodo = () => {
        if (text.trim()) {
            setTodos([...todos, { id: Date.now(), text, completed: false }]);
            setText('');
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addTodo();
        }
    };

    const toggleTodo = (id: number) => {
        setTodos(todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo));
    };

    const onDelete = (id: number) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    const onUpdate = (id: number, text: string) => {
        setTodos(todos.map(todo => {
            // Check if this todo's id matches the id we want to update
            if (todo.id === id) {
                // If it matches, return a new object with the updated text
                return {
                    ...todo, // Spread operator to copy the existing properties
                    text: text, // Update the text property
                };
            }
            // If it doesn't match, return the todo unchanged
            return todo;
        }));
    };

    const handleTitleDoubleClick = () => {
        setEditTitle(true);
    };

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };

    const handleTitleBlur = () => {
        setEditTitle(false);
    };

    const handleTitleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            setEditTitle(false);
        }
    };

    const onDragEnd = (result: DropResult) => {
        // Dropped outside the list
        if (!result.destination) {
            return;
        }

        const items = Array.from(todos);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setTodos(items);
    };

    const todoItems = todos.map((todo, index) => (
        <Draggable key={todo.id} index={index} draggableId={todo.text}>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                >
                    <div {...provided.dragHandleProps}>
                        <TodoItem
                            key={todo.id}
                            todo={todo}
                            onChange={toggleTodo}
                            onDelete={onDelete}
                            onUpdate={onUpdate}
                        />
                    </div>
                </div>
            )}
        </Draggable>
    ));

    return (
        <div style={{ position: 'relative', border: '1px solid #555555', padding: '20px', borderRadius: '5px', backgroundColor: '#2E2E2E', width: '100%' }}>
            <Grid align="center">
                <Grid.Col span={10}>
                    {editTitle ? (
                        <TextInput
                            autoFocus
                            value={title}
                            onChange={handleTitleChange}
                            onBlur={handleTitleBlur}
                            onKeyDown={handleTitleKeyDown}
                        />
                    ) : (
                        <Title size="sm" onDoubleClick={handleTitleDoubleClick} style={{ cursor: 'pointer' }}>
                            {title}
                        </Title>
                    )}
                </Grid.Col>
                <Grid.Col span={2} style={{ textAlign: 'right' }}>
                    <Menu withinPortal position="right" shadow="sm">
                        <Menu.Target>
                            <ActionIcon variant="subtle" color="gray">
                                <IconDots style={{ width: 16, height: 16 }} />
                            </ActionIcon>
                        </Menu.Target>

                        <Menu.Dropdown>
                            <Menu.Item
                                leftSection={<IconTrash size={14} />}
                                color="red"
                                onClick={() => deleteTodoList()}
                            >
                                Delete
                            </Menu.Item>
                        </Menu.Dropdown>
                    </Menu>
                </Grid.Col>
            </Grid>
            <Space h="sm" />
            <TextInput
                placeholder="Add todo"
                value={text}
                onChange={(event) => setText(event.currentTarget.value)}
                onKeyDown={handleKeyDown}
                style={{ width: '100%' }}
            />
            <Space h="sm" />
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="todos">
                    {(provided) => (
                        <div {...provided.droppableProps} ref={provided.innerRef}>
                            {todoItems}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    );
}

export default TodoList;
