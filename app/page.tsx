"use client";

import React, { useState } from 'react';
import { Button, Card, Container, Grid, Title, Space } from '@mantine/core';
import TodoList from '../components/TodoList/TodoList'; // Ensure the path is correct

interface TodoListData {
  id: number;
  title: string;
}

export default function HomePage() {
  const [todoLists, setTodoLists] = useState<TodoListData[]>([]);

  const addNewList = () => {
    const newList = { id: Date.now(), title: `Todo List ${todoLists.length + 1}` };
    setTodoLists([...todoLists, newList]);
  };

  const deleteTodoList = (id: number) => {
    setTodoLists(todoLists.filter(list => list.id !== id));
  };  

  return (
    <Container size="md">
      <Space h="xl" />
      <Space h="xl" />
      {/* Use flexbox to position elements apart */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 40 }}>
        <Title>TodoForest</Title>
        <Button onClick={addNewList}>New List</Button>
      </div>
      <Grid>
        {todoLists.map((list) => (
          <Grid.Col span={6} key={list.id}>
            <TodoList deleteTodoList={() => deleteTodoList(list.id)} />
          </Grid.Col>
        ))}
      </Grid>
    </Container>
  );
}
