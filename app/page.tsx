import React from 'react';
import { Container, Space } from '@mantine/core';
import TodoList from '../components/TodoList/TodoList'; // Ensure the path is correct

export default function HomePage() {

  return (
    <Container size="md">
      <Space h="lg" />
      <TodoList />
    </Container>
  );
}
