import React, {useState} from 'react';
import s from "./App.module.css"
import {Button, Input, List, Checkbox, Space, Typography} from 'antd';
import {DownOutlined} from "@ant-design/icons";

interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

const App: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [filter, setFilter] = useState<'all' | 'completed' | 'incomplete'>('all');
    const [newTodo, setNewTodo] = useState('');

    const addTodo = () => {
        if (newTodo.trim()) {
            const newTask: Todo = {id: Date.now(), text: newTodo, completed: false};
            setTodos([...todos, newTask]);
            setNewTodo('');
        }
    };

    const toggleTodo = (id: number) => {
        setTodos(todos.map(todo => (todo.id === id ? {...todo, completed: !todo.completed} : todo)));
    };

    const deleteCompleted = () => {
        setTodos(todos.filter(todo => !todo.completed));
    };

    const filteredTodos = todos.filter(todo => {
        if (filter === 'completed') return todo.completed;
        if (filter === 'incomplete') return !todo.completed;
        return true;
    });

    const incompleteCount = todos.filter(todo => !todo.completed).length;

    return (
        <div className={s.main}>
            <Typography.Title style={{textAlign: "center"}} level={1}>todos</Typography.Title>
            <Space direction="vertical" style={{width: '100%'}}>
                <Input
                    size="large"
                    data-testid="add-todo-icon"
                    prefix={<DownOutlined onClick={addTodo} style={{
                        marginRight: '10px',
                        fontSize: '20px',
                        color: 'rgba(0,0,0,.25)'
                    }}></DownOutlined>}
                    value={newTodo}
                    name="outlined"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewTodo(e.target.value)}
                    onPressEnter={addTodo}
                    placeholder="Добавьте новую задачу"
                    style={{paddingTop: "20px", paddingBottom: "20px"}}
                />
            </Space>

            {filteredTodos.length > 0 &&
                <List
                    style={{borderTop: "none"}}
                    bordered
                    dataSource={filteredTodos}
                    renderItem={(todo: Todo) => (
                        <List.Item style={{
                            padding: '20px 11px',
                            fontSize: "16px",
                            background: "white",
                            justifyContent: "flex-start"
                        }}>
                            <Checkbox
                                style={{marginRight: '15px'}}
                                checked={todo.completed}
                                onChange={() => toggleTodo(todo.id)}
                            />
                            {todo.completed ? <s>{todo.text}</s> : <span>{todo.text}</span>}
                        </List.Item>
                    )}
                />
            }

            <div className={s.bottom}>
                <Typography.Text className={s.left}>
                    {incompleteCount} items left
                </Typography.Text>
                <Space>
                    <Button type="text" className={filter === 'all' ? s.active : ""}
                            onClick={() => setFilter('all')}>All</Button>
                    <Button type="text" className={filter === 'completed' ? s.active : ""}
                            onClick={() => setFilter('completed')}>Completed</Button>
                    <Button type="text" className={filter === 'incomplete' ? s.active : ""}
                            onClick={() => setFilter('incomplete')}>Active</Button>
                </Space>
                <Button
                    className={s.right}
                    type="text"
                    onClick={deleteCompleted}
                >
                    Clear Completed
                </Button>
            </div>
        </div>
    )
};

export default App;

