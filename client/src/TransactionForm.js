import { useContext, useState } from "react";
import { TransactionListContext } from "./TransactionListContext.js";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

import Icon from "@mdi/react";
import { mdiLoading } from "@mdi/js";

function TransactionForm({ setShowTransactionForm, transaction }) {
    const { state, handlerMap } = useContext(TransactionListContext);
    const [showAlert, setShowAlert] = useState(null);
    const isPending = state === "pending";

    const handleSubmit = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        const formData = Object.fromEntries(new FormData(e.target));
        formData.amount = parseFloat(formData.amount); // Zajištění, že amount je číslo
        formData.date = new Date(formData.date).toISOString(); // Konverze data na ISO string

        if (!isNaN(formData.amount) && formData.type) {
            try {
                if (transaction.id) {
                    formData.id = transaction.id;
                    await handlerMap.handleUpdate(formData);
                } else {
                    await handlerMap.handleCreate(formData);
                }
                setShowTransactionForm(false);
            } catch (error) {
                console.error(error);
                setShowAlert(`Chyba při zpracování: ${error.message}`);
            }
        } else {
            setShowAlert("Prosím, zadejte všechny potřebné informace správně.");
        }
    };

    return (
        <Modal
            show={true}
            onHide={() => setShowTransactionForm(false)}
            centered
        >
            <Form onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>{transaction.id ? "Upravit" : "Vytvořit"} transakci</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ position: "relative" }}>
                    {showAlert && (
                        <Alert variant="danger" onClose={() => setShowAlert(null)} dismissible>
                            <Alert.Heading>Chyba</Alert.Heading>
                            <pre>{showAlert}</pre>
                        </Alert>
                    )}
                    {isPending && (
                        <div style={pendingStyle()}>
                            <Icon path={mdiLoading} size={2} spin />
                        </div>
                    )}
                    <Form.Group className="mb-3">
                        <Form.Label>Datum transakce</Form.Label>
                        <Form.Control
                            type="datetime-local"
                            name="date"
                            required
                            defaultValue={transactionDateToInput(transaction.date)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Název transakce</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            required
                            minLength={3}
                            defaultValue={transaction.name}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Částka</Form.Label>
                        <Form.Control
                            type="number"
                            name="amount"
                            required
                            defaultValue={transaction.amount}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Typ transakce</Form.Label>
                        <Form.Select name="type" required defaultValue={transaction.type || ""}>
                            <option value="">Vyberte typ...</option>
                            <option value="income">Příjem</option>
                            <option value="expense">Výdaj</option>
                        </Form.Select>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowTransactionForm(false)} disabled={isPending}>
                        Zavřít
                    </Button>
                    <Button type="submit" variant="primary" disabled={isPending}>
                        {transaction.id ? "Upravit" : "Vytvořit"}
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}

function pendingStyle() {
    return {
        position: "absolute",
        top: "0",
        right: "0",
        bottom: "0",
        left: "0",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(255, 255, 255, 0.8)",
    };
}

function transactionDateToInput(date) {
    const normalizedDate = new Date(date);
    const year = normalizedDate.getFullYear();
    const month = (normalizedDate.getMonth() + 1).toString().padStart(2, '0');
    const day = normalizedDate.getDate().toString().padStart(2, '0');
    const hours = normalizedDate.getHours().toString().padStart(2, '0');
    const minutes = normalizedDate.getMinutes().toString().padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
}

export default TransactionForm;
