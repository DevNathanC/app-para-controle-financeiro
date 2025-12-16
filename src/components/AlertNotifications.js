import React, { useState, useEffect } from 'react';
import { getDaysUntilDue } from '../utils/formatters';
import '../styles/AlertNotifications.css';

function AlertNotifications({ bills }) {
  const [alerts, setAlerts] = useState([]);
  const [showAlerts, setShowAlerts] = useState(true);

  useEffect(() => {
    // Filtrar contas não pagas que estão próximas do vencimento
    const upcomingBills = bills.filter(bill => {
      if (bill.paid) return false;
      const daysUntil = getDaysUntilDue(bill.dueDate);
      return daysUntil <= 7 && daysUntil >= -30; // Alertar até 7 dias antes e 30 dias após vencimento
    });

    // Ordenar por urgência (mais próximos primeiro)
    const sortedAlerts = upcomingBills.sort((a, b) => {
      return new Date(a.dueDate) - new Date(b.dueDate);
    });

    setAlerts(sortedAlerts);

    // Mostrar notificação do navegador para contas muito urgentes
    if (sortedAlerts.length > 0) {
      const urgentBills = sortedAlerts.filter(bill => getDaysUntilDue(bill.dueDate) <= 1);
      
      if (urgentBills.length > 0 && Notification.permission === 'granted') {
        urgentBills.forEach(bill => {
          const daysUntil = getDaysUntilDue(bill.dueDate);
          const message = daysUntil === 0 
            ? `${bill.description} vence HOJE!`
            : daysUntil === 1
            ? `${bill.description} vence AMANHÃ!`
            : `${bill.description} está ${Math.abs(daysUntil)} dias atrasado!`;
          
          new Notification('🔔 Alerta de Vencimento', {
            body: message,
            icon: '💰',
            tag: `bill-${bill.id}`
          });
        });
      }
    }
  }, [bills]);

  // Solicitar permissão para notificações
  useEffect(() => {
    if (Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  const getAlertType = (bill) => {
    const daysUntil = getDaysUntilDue(bill.dueDate);
    if (daysUntil < 0) return 'overdue';
    if (daysUntil === 0) return 'today';
    if (daysUntil === 1) return 'tomorrow';
    if (daysUntil <= 3) return 'urgent';
    return 'warning';
  };

  const getAlertMessage = (bill) => {
    const daysUntil = getDaysUntilDue(bill.dueDate);
    if (daysUntil < 0) {
      return `⚠️ Conta atrasada há ${Math.abs(daysUntil)} dias!`;
    }
    if (daysUntil === 0) return '🔔 Vence hoje!';
    if (daysUntil === 1) return '🔔 Vence amanhã!';
    if (daysUntil <= 3) return `⏰ Vence em ${daysUntil} dias`;
    return `📅 Vence em ${daysUntil} dias`;
  };

  if (alerts.length === 0) {
    return null;
  }

  return (
    <div className={`alert-notifications ${showAlerts ? 'show' : 'hide'}`}>
      <div className="alert-header">
        <h3>🔔 Alertas de Vencimento ({alerts.length})</h3>
        <button 
          className="btn-toggle-alerts"
          onClick={() => setShowAlerts(!showAlerts)}
          title={showAlerts ? 'Ocultar alertas' : 'Mostrar alertas'}
        >
          {showAlerts ? '▼' : '▶'}
        </button>
      </div>
      
      {showAlerts && (
        <div className="alert-list">
          {alerts.map(bill => (
            <div key={bill.id} className={`alert-item alert-${getAlertType(bill)}`}>
              <div className="alert-icon">
                {bill.type === 'receita' ? '📈' : '📉'}
              </div>
              <div className="alert-content">
                <strong>{bill.description}</strong>
                <span className="alert-message">{getAlertMessage(bill)}</span>
              </div>
              <div className="alert-amount">
                R$ {parseFloat(bill.amount).toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AlertNotifications;
