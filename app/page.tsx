import React from 'react';
import { Container, Space } from '@mantine/core';
import TodoCanvas from '../components/TodoList/TodoCanvas'; // Ensure the path is correct

export default function HomePage() {

  return (
    <Container size="md">
      <Space h="lg" />
      <TodoCanvas />
    </Container>
  );
}
