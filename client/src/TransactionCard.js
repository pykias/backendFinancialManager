import Button from "react-bootstrap/esm/Button";
import { useNavigate } from "react-router-dom";

import TransactionDateTimeBadge from "./TransactionDateTimeBadge";
import TransactionDetail from "./TransactionDetail";

import Icon from "@mdi/react";
import { mdiEyeOutline, mdiPencil, mdiTrashCan } from "@mdi/js";

function TransactionCard({ transaction, setShowTransactionForm, handleDelete }) {
    const navigate = useNavigate();

    return (
        <div className="card border-0 shadow-lg rounded-lg" style={cardStyle()}>
            <TransactionDateTimeBadge transaction={transaction} />
            <TransactionDetail transaction={transaction} />
            <div style={actionButtonsStyle()}>
                <Button
                    onClick={() => navigate("/transactionDetail?id=" + transaction.id)}
                    size={"sm"}
                    variant="primary"
                >
                    <Icon path={mdiEyeOutline} size={0.7} color="white" />
                </Button>
                <Button
                    onClick={() => setShowTransactionForm(transaction)}
                    size={"sm"}
                    variant="warning"
                >
                    <Icon path={mdiPencil} size={0.7} color="white" />
                </Button>
                <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(transaction.id)}
                >
                    <Icon path={mdiTrashCan} size={0.8} color="white" />
                </Button>
            </div>
        </div>
    );
}

function cardStyle() {
    return {
        margin: "16px auto",
        padding: "16px",
        display: "grid",
        gridTemplateColumns: "max-content auto 48px",
        columnGap: "12px",
        backgroundColor: "#f9f9f9",
        borderRadius: "16px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        maxWidth: "680px",
        transition: "transform 0.2s",
    };
}

function actionButtonsStyle() {
    return {
        display: "grid",
        gap: "4px",
        justifyContent: "center",
        alignItems: "center",
    };
}

export default TransactionCard;
