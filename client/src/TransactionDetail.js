// TransactionDetail.js
import TransactionSummary from "./TransactionSummary";
import TransactionActions from "./TransactionActions";

function TransactionDetail({ transaction }) {
    let totalAmount = 0;

    // Příklad výpočtu celkové částky, pokud existují položky v transakci
    if (transaction.items) {
        totalAmount = transaction.items.reduce((sum, item) => sum + item.amount, 0);
    }

    return (
        <div style={{ display: "grid", rowGap: "4px" }}>
            <div style={{ fontSize: "22px" }}>{transaction.name}</div>
            <div className="row" style={{ margin: "0" }}>
                <div className="col-12 col-sm-6" style={{ padding: "0" }}>
                    <TransactionSummary totalAmount={totalAmount} />
                </div>
                <div className="col-12 col-md-6" style={actionsColumnStyle()}>
                    <TransactionActions transaction={transaction} />
                </div>
            </div>
        </div>
    );
}

function actionsColumnStyle() {
    return { display: "flex", justifyContent: "right", padding: "0" };
}

export default TransactionDetail;
