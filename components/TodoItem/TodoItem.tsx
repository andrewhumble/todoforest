import { Checkbox, Group, Text, Textarea, ActionIcon, TextInput, Space } from '@mantine/core';
import { IconMinus, IconEdit, IconCheck } from '@tabler/icons-react';
import { useState } from 'react';

// Assuming the Todo interface is defined in the same file
// If it's not, import it from where it is defined
interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

// Updated TodoItemProps interface to include onUpdate
interface TodoItemProps {
    todo: Todo;
    onChange: (id: number) => void;
    onDelete: (id: number) => void;
    onUpdate: (id: number, text: string) => void; // Updated to include id parameter
}

function TodoItem({ todo, onChange, onDelete, onUpdate }: TodoItemProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(todo.text);

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
        setEditText(todo.text); // Reset edit text to current todo text when entering edit mode
    };

    const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setEditText(event.target.value);
    };

    const handleUpdate = () => {
        onUpdate(todo.id, editText);
        setIsEditing(false);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === 'Enter') {
            handleUpdate();
        }
    };

    return (
        <Group align="center" style={{ width: '100%', justifyContent: 'space-between', display: 'flex' }}>
            <Checkbox
                checked={todo.completed}
                onChange={() => onChange(todo.id)}
                style={{ flexShrink: 0, marginTop: 5 }} // Prevent checkbox from shrinking
            />

            {/* This is the text column */}
            <div style={{ flexGrow: 1, flexBasis: '0', overflow: 'hidden' }}> {/* Ensure some spacing around the text */}
                {isEditing ? (
                    <Textarea
                        autoFocus
                        value={editText}
                        onChange={handleTextChange}
                        onBlur={handleUpdate}
                        onKeyDown={handleKeyDown}
                        size="sm"
                        style={{ width: '100%' }}
                    />
                ) : (
                    <Text size="sm" onClick={() => setIsEditing(true)} style={{ textDecoration: todo.completed ? 'line-through' : 'none', whiteSpace: 'pre-wrap', overflowWrap: 'break-word' }}>
                        {todo.text}
                    </Text>
                )}
            </div>

            {/* Action icons column */}
            <ActionIcon variant="subtle" onClick={() => onDelete(todo.id)} style={{ flexShrink: 0 }}> {/* Prevent icon from shrinking */}
                <IconMinus size={16} />
            </ActionIcon>
        </Group>
    );
}

export default TodoItem;
