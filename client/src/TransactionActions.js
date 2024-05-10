import Button from "react-bootstrap/esm/Button";
import Icon from "@mdi/react";
import { mdiTrashCan } from "@mdi/js";

function TransactionActions({ transaction }) {
    return (
        <div style={actionsStyle()}>
            <Button variant="danger" size="sm" onClick={() => handleDelete(transaction.id)}>
                <Icon path={mdiTrashCan} size={0.8} color="white" />
            </Button>
        </div>
    );
}



function actionsStyle() {
    return {
        display: "flex",
        justifyContent: "space-around",
        padding: "8px",
    };
}

export default TransactionActions;
