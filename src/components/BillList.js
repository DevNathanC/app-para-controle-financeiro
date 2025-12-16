import React, { useState } from 'react';
import { formatCurrency, formatDate, getDaysUntilDue } from '../utils/formatters';
import '../styles/BillList.css';

function BillList({ bills, onDelete, onTogglePaid, onEdit }) {
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('dueDate');

  const filteredBills = bills.filter(bill => {
    if (filter === 'all') return true;
    if (filter === 'pending') return !bill.paid;
    if (filter === 'paid') return bill.paid;
    if (filter === 'receita') return bill.type === 'receita';
    if (filter === 'despesa') return bill.type === 'despesa';
    return true;
  });

  const sortedBills = [...filteredBills].sort((a, b) => {
    if (sortBy === 'dueDate') {
      return new Date(a.dueDate) - new Date(b.dueDate);
    }
    if (sortBy === 'amount') {
      return parseFloat(b.amount) - parseFloat(a.amount);
    }
    if (sortBy === 'description') {
      return a.description.localeCompare(b.description);
    }
    return 0;
  });

  const getStatusClass = (bill) => {
    if (bill.paid) return 'status-paid';
    const daysUntil = getDaysUntilDue(bill.dueDate);
    if (daysUntil < 0) return 'status-overdue';
    if (daysUntil <= 3) return 'status-urgent';
    if (daysUntil <= 7) return 'status-warning';
    return 'status-normal';
  };

  const getStatusText = (bill) => {
    if (bill.paid) return '✅ Pago';
    const daysUntil = getDaysUntilDue(bill.dueDate);
    if (daysUntil < 0) return `⚠️ Atrasado ${Math.abs(daysUntil)} dias`;
    if (daysUntil === 0) return '🔔 Vence hoje!';
    if (daysUntil === 1) return '🔔 Vence amanhã';
    return `📅 ${daysUntil} dias`;
  };

  return (
    <div className="bill-list-container">
      <div className="bill-list-header">
        <h2>📋 Minhas Contas ({sortedBills.length})</h2>
        
        <div className="filters">
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">Todas</option>
            <option value="pending">Pendentes</option>
            <option value="paid">Pagas</option>
            <option value="receita">Receitas</option>
            <option value="despesa">Despesas</option>
          </select>

          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="dueDate">Ordenar por Vencimento</option>
            <option value="amount">Ordenar por Valor</option>
            <option value="description">Ordenar por Descrição</option>
          </select>
        </div>
      </div>

      {sortedBills.length === 0 ? (
        <div className="empty-state">
          <p>📝 Nenhuma conta cadastrada ainda.</p>
          <p>Clique em "Nova Conta" para começar!</p>
        </div>
      ) : (
        <div className="bill-list">
          {sortedBills.map(bill => (
            <div key={bill.id} className={`bill-item ${bill.type} ${getStatusClass(bill)}`}>
              <div className="bill-main">
                <div className="bill-info">
                  <h3>{bill.description}</h3>
                  <div className="bill-details">
                    <span className="bill-type">
                      {bill.type === 'receita' ? '📈' : '📉'} {bill.type}
                    </span>
                    {bill.category && (
                      <span className="bill-category">🏷️ {bill.category}</span>
                    )}
                    <span className="bill-date">📅 {formatDate(bill.dueDate)}</span>
                    {bill.isRecurring && (
                      <span className="bill-recurring">🔄 Fixa</span>
                    )}
                  </div>
                  {bill.notes && (
                    <p className="bill-notes">📝 {bill.notes}</p>
                  )}
                </div>

                <div className="bill-amount-section">
                  <div className="bill-amount">{formatCurrency(bill.amount)}</div>
                  <div className="bill-status">{getStatusText(bill)}</div>
                </div>
              </div>

              <div className="bill-actions">
                <button
                  className={`btn-icon ${bill.paid ? 'btn-unpay' : 'btn-pay'}`}
                  onClick={() => onTogglePaid(bill.id)}
                  title={bill.paid ? 'Marcar como não pago' : 'Marcar como pago'}
                >
                  {bill.paid ? '↩️' : '✓'}
                </button>
                <button
                  className="btn-icon btn-edit"
                  onClick={() => onEdit(bill)}
                  title="Editar"
                >
                  ✏️
                </button>
                <button
                  className="btn-icon btn-delete"
                  onClick={() => onDelete(bill.id)}
                  title="Excluir"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BillList;
