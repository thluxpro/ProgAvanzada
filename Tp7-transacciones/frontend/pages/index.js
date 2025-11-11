import { useState, useEffect, useRef } from 'react';

export default function Home() {
  const [txId, setTxId] = useState(null);
  const [events, setEvents] = useState([]);
  const wsRef = useRef(null);

  useEffect(() => {
    wsRef.current = new WebSocket('ws://localhost:4001');
    wsRef.current.onmessage = msg => {
      const ev = JSON.parse(msg.data);
      setEvents(prev => [...prev, ev]);
    };
    return () => wsRef.current.close();
  }, []);

  async function startTransaction() {
    const res = await fetch('http://localhost:3001/transactions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fromAccount: 'A1', toAccount: 'A2', amount: 100 }),
    });
    const data = await res.json();
    setTxId(data.transactionId);

    wsRef.current.send(JSON.stringify({
      action: 'subscribeTx',
      transactionId: data.transactionId
    }));

    setEvents([]);
  }

  // Traducción clara de eventos a mensajes “humanos”
  const messages = {
    TransactionInitiated: () => `Transacción iniciada...`,
    FundsReserved: (payload) => `Fondos reservados ($${payload.amount}).`,
    FraudChecked: (payload) =>
      payload.risk === "HIGH"
        ? "⚠️ Alerta: posible fraude detectado."
        : "✅ Chequeo antifraude: sin riesgo.",
    Committed: (payload) => `✅ Transferencia acreditada. N° asiento: ${payload.ledgerId}.`,
    Reversed: (payload) => `❌ Transacción revertida. Motivo: ${payload.reason}.`,
    Notified: () => `📩 Usuario notificado.`,
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>TP7 - Sistema Bancario con Kafka</h1>

      <button onClick={startTransaction} style={{
        padding: "10px 18px",
        fontSize: "16px",
        cursor: "pointer",
        marginBottom: 15
      }}>
        Iniciar transacción
      </button>

      {txId && <h3 style={{ marginTop: 10 }}>ID de Transacción: {txId}</h3>}

      <div style={{ marginTop: 20 }}>
        {events.map((e, i) => {
          const display =
            typeof messages[e.type] === "function"
              ? messages[e.type](e.payload)
              : e.type;
          return (
            <div key={i} style={{
              marginBottom: 8,
              padding: "6px 10px",
              borderLeft: "4px solid #444",
              background: "#f5f5f5",
              borderRadius: 4
            }}>
              {display}
            </div>
          );
        })}
      </div>
    </div>
  );
}
