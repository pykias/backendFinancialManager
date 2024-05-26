import React, { useState, useContext, useEffect } from "react";
import { TransactionListContext } from "./TransactionListContext";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function TransactionForm({ transaction, onHide, onSave }) {
    const { handlerMap } = useContext(TransactionListContext);
    const [formData, setFormData] = useState({
        date: transaction?.date || "",
        name: transaction?.name || "",
        amount: transaction?.amount || "",
        type: transaction?.type || "income",
    });

    useEffect(() => {
        console.log("formData", formData); // Debugging: Check formData state
    }, [formData]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { date, name, amount, type } = formData;

        // Debugging: Check which fields are missing
        if (!date) console.error("Date is missing");
        if (!name) console.error("Name is missing");
        if (!amount) console.error("Amount is missing");
        if (!type) console.error("Type is missing");

        // Ensure required fields are present
        if (!date || !name || !amount || !type) {
            console.error("Missing required fields");
            return;
        }

        // Ensure date is in the correct format
        const formattedDate = new Date(date).toISOString();
        const submissionData = { ...formData, date: formattedDate };

        if (transaction && transaction.id) {
            await handlerMap.handleUpdate({ ...submissionData, id: transaction.id });
        } else {
            await handlerMap.handleCreate(submissionData);
        }
        onHide();
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formDate">
                <Form.Label>Date</Form.Label>
                <Form.Control
                    type="datetime-local"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    required
                />
            </Form.Group>
            <Form.Group controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                />
            </Form.Group>
            <Form.Group controlId="formAmount">
                <Form.Label>Amount</Form.Label>
                <Form.Control
                    type="number"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: parseFloat(e.target.value) })}
                    required
                />
            </Form.Group>
            <Form.Group controlId="formType">
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
            <Button variant="primary" type="submit">
                Save
            </Button>
            <Button variant="secondary" onClick={onHide} style={{ marginLeft: "10px" }}>
                Cancel
            </Button>
        </Form>
    );
}

export default TransactionForm;
