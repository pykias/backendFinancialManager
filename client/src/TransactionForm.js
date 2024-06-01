import React, { useState, useContext, useEffect } from "react";
import { TransactionListContext } from "./TransactionListContext";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function TransactionForm({ transaction, onHide }) {
    const { handlerMap } = useContext(TransactionListContext);
    const [formData, setFormData] = useState({
        date: "",
        name: "",
        amount: "",
        type: "income"
    });

    useEffect(() => {
        if (transaction) {
            setFormData({
                date: transaction.date ? new Date(transaction.date).toISOString().slice(0, 16) : "",
                name: transaction.name || "",
                amount: transaction.amount || "",
                type: transaction.type || "income"
            });
        }
    }, [transaction]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!formData.date || !formData.name || !formData.amount || !formData.type) {
            console.error("Missing required fields", formData);
            return;
        }

        const adjustedFormData = {
            ...formData,
            date: new Date(formData.date).toISOString()
        };

        if (transaction && transaction.id) {
            await handlerMap.handleUpdate({ ...adjustedFormData, id: transaction.id });
        } else {
            await handlerMap.handleCreate(adjustedFormData);
        }
        onHide();
    };

    return (
        <Form onSubmit={handleSubmit} style={formStyle()}>
            <Form.Group controlId="formDate" style={formGroupStyle()}>
                <Form.Label>Date</Form.Label>
                <Form.Control
                    type="datetime-local"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    required
                />
            </Form.Group>
            <Form.Group controlId="formName" style={formGroupStyle()}>
                <Form.Label>Name</Form.Label>
                <Form.Control
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                />
            </Form.Group>
            <Form.Group controlId="formAmount" style={formGroupStyle()}>
                <Form.Label>Amount</Form.Label>
                <Form.Control
                    type="number"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: parseFloat(e.target.value) || "" })}
                    required
                />
            </Form.Group>
            <Form.Group controlId="formType" style={formGroupStyle()}>
                <Form.Label>Type</Form.Label>
                <Form.Control
                    as="select"
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    required
                >
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                </Form.Control>
            </Form.Group>
            <div style={buttonGroupStyle()}>
                <Button variant="primary" type="submit">
                    Save
                </Button>
                <Button variant="secondary" onClick={onHide}>
                    Cancel
                </Button>
            </div>
        </Form>
    );
}

function formStyle() {
    return {
        padding: "20px",
        borderRadius: "8px",
        backgroundColor: "#fff",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"
    };
}

function formGroupStyle() {
    return {
        marginBottom: "16px"
    };
}

function buttonGroupStyle() {
    return {
        display: "flex",
        justifyContent: "space-between"
    };
}

export default TransactionForm;
