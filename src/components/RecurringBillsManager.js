import React from 'react';
import { getFrequencyLabel } from '../utils/recurringBills';
import { formatCurrency } from '../utils/formatters';
import '../styles/RecurringBillsManager.css';

function RecurringBillsManager({ bills, onEdit, onDelete }) {
  const recurringBills = bills.filter(bill => bill.isRecurring);

  if (recurringBills.length === 0) {
    return (
      <div className="recurring-manager">
        <h2>🔄 Contas Fixas (Recorrentes)</h2>
        <div className="empty-state">
          <p>📝 Você ainda não tem contas fixas cadastradas.</p>
          <p>Marque a opção "Conta Fixa (Recorrente)" ao adicionar uma conta para que ela seja gerada automaticamente todo mês!</p>
        </div>
      </div>
    );
  }

  const getRecurringBillInfo = (bill) => {
    const relatedBills = bills.filter(b => 
      b.description === bill.description && 
      b.amount === bill.amount &&
      !b.isRecurring
    );
    
    return {
      totalGenerated: relatedBills.length,
      paidCount: relatedBills.filter(b => b.paid).length,
      pendingCount: relatedBills.filter(b => !b.paid).length
    };
  };

  return (
    <div className="recurring-manager">
      <h2>🔄 Contas Fixas (Recorrentes) - {recurringBills.length}</h2>
      <p className="recurring-info">
        ℹ️ Estas contas serão geradas automaticamente de acordo com a frequência configurada.
        Quando faltar 30 dias para o próximo vencimento, uma nova parcela será criada automaticamente.
      </p>

      <div className="recurring-list">
        {recurringBills.map(bill => {
          const info = getRecurringBillInfo(bill);
          return (
            <div key={bill.id} className={`recurring-item ${bill.type}`}>
              <div className="recurring-badge">
                {bill.type === 'receita' ? '📈' : '📉'}
              </div>
              
              <div className="recurring-content">
                <div className="recurring-header">
                  <h3>{bill.description}</h3>
                  <div className="recurring-amount">{formatCurrency(bill.amount)}</div>
                </div>
                
                <div className="recurring-details">
                  <span className="recurring-frequency">
                    🔄 {getFrequencyLabel(bill.frequency)}
                  </span>
                  {bill.category && (
                    <span className="recurring-category">
                      🏷️ {bill.category}
                    </span>
                  )}
                  <span className="recurring-type">
                    {bill.type === 'receita' ? 'Receita' : 'Despesa'}
                  </span>
                </div>

                {bill.notes && (
                  <p className="recurring-notes">📝 {bill.notes}</p>
                )}

                <div className="recurring-stats">
                  <div className="stat">
                    <strong>{info.totalGenerated}</strong>
                    <span>Geradas</span>
                  </div>
                  <div className="stat success">
                    <strong>{info.paidCount}</strong>
                    <span>Pagas</span>
                  </div>
                  <div className="stat pending">
                    <strong>{info.pendingCount}</strong>
                    <span>Pendentes</span>
                  </div>
                </div>
              </div>

              <div className="recurring-actions">
                <button
                  className="btn-icon btn-edit"
                  onClick={() => onEdit(bill)}
                  title="Editar conta recorrente"
                >
                  ✏️
                </button>
                <button
                  className="btn-icon btn-delete"
                  onClick={() => {
                    if (window.confirm(`Tem certeza que deseja excluir esta conta recorrente?\n\nIsso NÃO excluirá as contas já geradas, apenas impedirá a geração de novas.`)) {
                      onDelete(bill.id);
                    }
                  }}
                  title="Excluir conta recorrente"
                >
                  🗑️
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="recurring-help">
        <h4>💡 Como funciona?</h4>
        <ul>
          <li>✅ Contas fixas são geradas automaticamente quando falta 30 dias para o próximo vencimento</li>
          <li>✅ Você receberá notificações normalmente para as contas geradas</li>
          <li>✅ Editar uma conta fixa afeta apenas a configuração, não as contas já geradas</li>
          <li>✅ Excluir uma conta fixa não exclui as contas já geradas</li>
          <li>✅ As frequências disponíveis são: Mensal, Bimestral, Trimestral, Semestral e Anual</li>
        </ul>
      </div>
    </div>
  );
}

export default RecurringBillsManager;
