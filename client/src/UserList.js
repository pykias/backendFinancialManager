import React, { useState, useContext } from 'react';
import { UserContext } from './UserProvider';
import { Form, Button } from 'react-bootstrap';

function UserList() {
    const { userList, handlerMap } = useContext(UserContext);
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });

    const handleSubmit = async (event) => {
        event.preventDefault();
        await handlerMap.handleCreateUser(formData);
        setFormData({ name: '', email: '', password: '' });
    };

    const handleDelete = async (userId) => {
        await handlerMap.handleDeleteUser(userId);
    };

    return (
        <div>
            <h2>Uživatelé</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formName">
                    <Form.Label>Jméno</Form.Label>
                    <Form.Control
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                </Form.Group>
                <Form.Group controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                </Form.Group>
                <Form.Group controlId="formPassword">
                    <Form.Label>Heslo</Form.Label>
                    <Form.Control
                        type="password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Přidat uživatele
                </Button>
            </Form>
            <h3>Seznam uživatelů</h3>
            <ul>
                {userList.map(user => (
                    <li key={user.id}>
                        {user.name} - {user.email}
                        <Button variant="danger" onClick={() => handleDelete(user.id)} style={{ marginLeft: '10px' }}>
                            Odstranit
                        </Button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default UserList;
