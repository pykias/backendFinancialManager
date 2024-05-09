import Button from "react-bootstrap/esm/Button";
import Icon from "@mdi/react";
import { mdiPencil, mdiTrashCan } from "@mdi/js";

function TransactionActions({ transaction }) {
    return (
        <div style={actionsStyle()}>
            <Button variant="danger" size="sm" onClick={() => handleDelete(transaction.id)}>
                <Icon path={mdiTrashCan} size={0.8} color="white" />
            </Button>
        </div>
    );
}

function handleDelete(transactionId) {
    // Logika pro odstranění transakce
    console.log(`Odstranit transakci s ID: ${transactionId}`);
}

function actionsStyle() {
    return {
        display: "flex",
        justifyContent: "space-around",
        padding: "8px",
    };
}

export default TransactionActions;
