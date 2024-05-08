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
        textAlign: "center",
    };
}

export default TransactionSummary;
