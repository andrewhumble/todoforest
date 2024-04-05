import { Checkbox, Group, Text, Textarea, ActionIcon } from '@mantine/core';
import { IconMinus } from '@tabler/icons-react';
import { useState, useEffect } from 'react';

interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

interface TodoItemProps {
    todo: Todo;
    onChange: (id: number) => void;
    onDelete: (id: number) => void;
    onUpdate: (id: number, text: string) => void;
    isEditing?: boolean;
    onSave?: (id: number, text: string) => void;
}

function TodoItem({ todo, onChange, onDelete, onUpdate, isEditing: isEditingProp = false, onSave }: TodoItemProps) {
    const [isEditing, setIsEditing] = useState(isEditingProp);
    const [editText, setEditText] = useState(todo.text);

    useEffect(() => {
        setIsEditing(isEditingProp);
    }, [isEditingProp]);

    const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setEditText(event.target.value);
    };

    const handleUpdate = () => {
        if (onSave) {
            onSave(todo.id, editText);
        } else {
            onUpdate(todo.id, editText);
        }
        setIsEditing(false);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            handleUpdate();
        }
    };

    return (
        <div style={{ position: 'relative', border: '1px solid #555555', padding: '15px', borderRadius: '5px', backgroundColor: '#2E2E2E', width: '100%' }}>
            <Group align="center" style={{ width: '100%', justifyContent: 'space-between', display: 'flex' }}>
                <Checkbox
                    checked={todo.completed}
                    onChange={() => onChange(todo.id)}
                    style={{ flexShrink: 0, marginTop: 5 }}
                />

                <div style={{ flexGrow: 1, flexBasis: '0', overflow: 'hidden' }}>
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

                <ActionIcon variant="subtle" onClick={() => onDelete(todo.id)} style={{ flexShrink: 0 }}>
                    <IconMinus size={16} />
                </ActionIcon>
            </Group>
        </div>
    );
}

export default TodoItem;
