function TransactionSummary({ totalAmount }) {
    return (
        <div style={summaryStyle()}>
            <h4>Celková Částka</h4>
            <p>{totalAmount} Kč</p>
        </div>
    );
}

function summaryStyle() {
    return {
        padding: "16px",
        backgroundColor: "#f4f4f4",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        textAlign: "center",
    };
}

export default TransactionSummary;
