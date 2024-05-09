import Button from "react-bootstrap/esm/Button.js";
import { useNavigate } from "react-router-dom";

import TransactionDateTimeBadge from "./TransactionDateTimeBadge";
import TransactionDetail from "./TransactionDetail";

import Icon from "@mdi/react";
import {mdiEyeOutline, mdiPencil, mdiTrashCan} from "@mdi/js";

function TransactionCard({ transaction, setShowTransactionForm, handleDelete}) {
    const navigate = useNavigate();

    return (
        <div className="card border-0 shadow rounded" style={componentStyle()}>
            <TransactionDateTimeBadge transaction={transaction} />
            <TransactionDetail transaction={transaction} />
            <div
                style={{
                    display: "grid",
                    gap: "2px",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Button
                    onClick={() => navigate("/transactionDetail?id=" + transaction.id)}
                    size={"sm"}
                >
                    <Icon path={mdiEyeOutline} size={0.7}/>
                </Button>
                <Button onClick={() => setShowTransactionForm(transaction)} size={"sm"}>
                    <Icon path={mdiPencil} size={0.7}/>
                </Button>
                    <Button variant="danger" size="sm" onClick={() => handleDelete(transaction.id)}>
                        <Icon path={mdiTrashCan} size={0.8} color="white"/>
                    </Button>
            </div>
        </div>
    );
}

function componentStyle() {
    return {
        margin: "12px auto",
        padding: "8px",
        display: "grid",
        gridTemplateColumns: "max-content auto 32px",
        columnGap: "8px",
        maxWidth: "640px",
    };
}

export default TransactionCard;
