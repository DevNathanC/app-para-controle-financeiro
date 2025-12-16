import React from 'react';
import { formatCurrency } from '../utils/formatters';
import '../styles/Dashboard.css';

function Dashboard({ bills }) {
  const totalReceivable = bills
    .filter(bill => bill.type === 'receita' && !bill.paid)
    .reduce((sum, bill) => sum + parseFloat(bill.amount), 0);

  const totalPayable = bills
    .filter(bill => bill.type === 'despesa' && !bill.paid)
    .reduce((sum, bill) => sum + parseFloat(bill.amount), 0);

  const balance = totalReceivable - totalPayable;

  const paidReceivable = bills
    .filter(bill => bill.type === 'receita' && bill.paid)
    .reduce((sum, bill) => sum + parseFloat(bill.amount), 0);

  const paidPayable = bills
    .filter(bill => bill.type === 'despesa' && bill.paid)
    .reduce((sum, bill) => sum + parseFloat(bill.amount), 0);

  return (
    <div className="dashboard">
      <div className="dashboard-card card-receita">
        <div className="card-icon">📈</div>
        <div className="card-content">
          <h3>A Receber</h3>
          <p className="amount">{formatCurrency(totalReceivable)}</p>
          <small>Pago: {formatCurrency(paidReceivable)}</small>
        </div>
      </div>

      <div className="dashboard-card card-despesa">
        <div className="card-icon">📉</div>
        <div className="card-content">
          <h3>A Pagar</h3>
          <p className="amount">{formatCurrency(totalPayable)}</p>
          <small>Pago: {formatCurrency(paidPayable)}</small>
        </div>
      </div>

      <div className={`dashboard-card card-saldo ${balance >= 0 ? 'positive' : 'negative'}`}>
        <div className="card-icon">💵</div>
        <div className="card-content">
          <h3>Saldo Previsto</h3>
          <p className="amount">{formatCurrency(balance)}</p>
          <small>{balance >= 0 ? 'Positivo' : 'Negativo'}</small>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
