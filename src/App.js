import React, { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import BillForm from './components/BillForm';
import BillList from './components/BillList';
import AlertNotifications from './components/AlertNotifications';
import RecurringBillsManager from './components/RecurringBillsManager';
import { checkAndGenerateRecurringBills } from './utils/recurringBills';
import './styles/App.css';

function App() {
  const [bills, setBills] = useState([]);
  const [editingBill, setEditingBill] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showRecurringManager, setShowRecurringManager] = useState(false);

  // Carregar contas do localStorage ao iniciar
  useEffect(() => {
    const savedBills = localStorage.getItem('bills');
    if (savedBills) {
      setBills(JSON.parse(savedBills));
    }
  }, []);

  // Salvar contas no localStorage sempre que houver mudança
  useEffect(() => {
    localStorage.setItem('bills', JSON.stringify(bills));
  }, [bills]);

  // Verificar e gerar contas recorrentes automaticamente
  useEffect(() => {
    const interval = setInterval(() => {
      const newBills = checkAndGenerateRecurringBills(bills);
      if (newBills.length > 0) {
        setBills([...bills, ...newBills]);
        console.log(`${newBills.length} conta(s) recorrente(s) gerada(s) automaticamente`);
      }
    }, 60000); // Verificar a cada 1 minuto

    // Também verificar imediatamente ao carregar
    const newBills = checkAndGenerateRecurringBills(bills);
    if (newBills.length > 0) {
      setBills([...bills, ...newBills]);
    }

    return () => clearInterval(interval);
  }, [bills]);

  const addBill = (bill) => {
    const newBill = {
      ...bill,
      id: Date.now(),
      createdAt: new Date().toISOString()
    };
    setBills([...bills, newBill]);
    setShowForm(false);
  };

  const updateBill = (updatedBill) => {
    setBills(bills.map(bill => 
      bill.id === updatedBill.id ? updatedBill : bill
    ));
    setEditingBill(null);
    setShowForm(false);
  };

  const deleteBill = (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta conta?')) {
      setBills(bills.filter(bill => bill.id !== id));
    }
  };

  const togglePaid = (id) => {
    setBills(bills.map(bill =>
      bill.id === id ? { ...bill, paid: !bill.paid } : bill
    ));
  };

  const handleEdit = (bill) => {
    setEditingBill(bill);
    setShowForm(true);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingBill(null);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>💰 Controle Financeiro</h1>
        <p>Gerencie suas contas e receba alertas de vencimento</p>
      </header>

      <AlertNotifications bills={bills} />

      <div className="container">
        <Dashboard bills={bills} />

        <div className="actions">
          <button 
            className="btn btn-primary"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? '❌ Cancelar' : '➕ Nova Conta'}
          </button>
          <button 
            className="btn btn-secondary"
            onClick={() => setShowRecurringManager(!showRecurringManager)}
          >
            {showRecurringManager ? '❌ Fechar' : '🔄 Contas Fixas'}
          </button>
        </div>

        {showForm && (
          <BillForm
            onSubmit={editingBill ? updateBill : addBill}
            onCancel={handleCancelForm}
            initialData={editingBill}
          />
        )}

        {showRecurringManager && (
          <RecurringBillsManager
            bills={bills}
            onEdit={handleEdit}
            onDelete={deleteBill}
          />
        )}

        <BillList
          bills={bills}
          onDelete={deleteBill}
          onTogglePaid={togglePaid}
          onEdit={handleEdit}
        />
      </div>
    </div>
  );
}

export default App;
