import React, { useState, useEffect } from 'react';
import '../styles/BillForm.css';

function BillForm({ onSubmit, onCancel, initialData }) {
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    dueDate: '',
    type: 'despesa',
    category: '',
    paid: false,
    notes: '',
    isRecurring: false,
    frequency: 'monthly'
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.description || !formData.amount || !formData.dueDate) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }
    onSubmit(formData);
    setFormData({
      description: '',
      amount: '',
      dueDate: '',
      type: 'despesa',
      category: '',
      paid: false,
      notes: '',
      isRecurring: false,
      frequency: 'monthly'
    });
  };

  const categories = {
    despesa: ['Alimentação', 'Transporte', 'Moradia', 'Saúde', 'Educação', 'Lazer', 'Outros'],
    receita: ['Salário', 'Freelance', 'Investimentos', 'Vendas', 'Outros']
  };

  return (
    <form className="bill-form" onSubmit={handleSubmit}>
      <h2>{initialData ? '✏️ Editar Conta' : '➕ Nova Conta'}</h2>
      
      <div className="form-row">
        <div className="form-group">
          <label>Tipo *</label>
          <select name="type" value={formData.type} onChange={handleChange}>
            <option value="despesa">Despesa</option>
            <option value="receita">Receita</option>
          </select>
        </div>

        <div className="form-group">
          <label>Categoria</label>
          <select name="category" value={formData.category} onChange={handleChange}>
            <option value="">Selecione...</option>
            {categories[formData.type].map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-group">
        <label>Descrição *</label>
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Ex: Conta de luz, Salário..."
          required
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Valor (R$) *</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="0.00"
            step="0.01"
            min="0"
            required
          />
        </div>

        <div className="form-group">
          <label>Data de Vencimento *</label>
          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="form-group">
        <label>Observações</label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          placeholder="Adicione observações..."
          rows="3"
        />
      </div>

      <div className="form-group checkbox-group">
        <label>
          <input
            type="checkbox"
            name="paid"
            checked={formData.paid}
            onChange={handleChange}
          />
          Marcar como pago
        </label>
      </div>

      <div className="form-group checkbox-group">
        <label>
          <input
            type="checkbox"
            name="isRecurring"
            checked={formData.isRecurring}
            onChange={handleChange}
          />
          🔄 Conta Fixa (Recorrente)
        </label>
      </div>

      {formData.isRecurring && (
        <div className="form-group recurring-info">
          <label>Frequência</label>
          <select name="frequency" value={formData.frequency} onChange={handleChange}>
            <option value="monthly">Mensal</option>
            <option value="bimonthly">Bimestral</option>
            <option value="quarterly">Trimestral</option>
            <option value="semiannual">Semestral</option>
            <option value="annual">Anual</option>
          </select>
          <small className="recurring-hint">
            ℹ️ Esta conta será gerada automaticamente no próximo período
          </small>
        </div>
      )}

      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          {initialData ? 'Atualizar' : 'Adicionar'}
        </button>
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Cancelar
        </button>
      </div>
    </form>
  );
}

export default BillForm;
