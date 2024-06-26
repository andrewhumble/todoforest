import React from 'react';
import { Container, Space } from '@mantine/core';
import TodoCanvas from '../components/TodoCanvas/TodoCanvas'; // Ensure the path is correct

export default function HomePage() {

  return (
    <Container size="lg">
      <Space h="lg" />
      <TodoCanvas />
    </Container>
  );
}
