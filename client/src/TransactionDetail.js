import TransactionSummary from "./TransactionSummary";

function TransactionDetail({ transaction }) {
    const totalAmount = transaction.items
        ? transaction.items.reduce((sum, item) => sum + item.amount, 0)
        : 0;

    return (
        <div style={{ display: "grid", rowGap: "8px", padding: "16px", backgroundColor: "#ffffff", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}>
            <h3>{transaction.name}</h3>
            <div className="row" style={{ margin: "0", gap: "16px" }}>
                <div className="col-12 col-sm-6" style={{ padding: "0" }}>
                    <TransactionSummary totalAmount={totalAmount} />
                </div>
            </div>
        </div>
    );
}

export default TransactionDetail;
