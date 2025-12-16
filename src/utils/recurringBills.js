// Funções para gerenciar contas recorrentes

export const getNextDueDate = (currentDate, frequency) => {
  const date = new Date(currentDate + 'T00:00:00');
  
  switch (frequency) {
    case 'monthly':
      date.setMonth(date.getMonth() + 1);
      break;
    case 'bimonthly':
      date.setMonth(date.getMonth() + 2);
      break;
    case 'quarterly':
      date.setMonth(date.getMonth() + 3);
      break;
    case 'semiannual':
      date.setMonth(date.getMonth() + 6);
      break;
    case 'annual':
      date.setFullYear(date.getFullYear() + 1);
      break;
    default:
      date.setMonth(date.getMonth() + 1);
  }
  
  // Formatar para YYYY-MM-DD
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  
  return `${year}-${month}-${day}`;
};

export const shouldGenerateNextBill = (bill, allBills) => {
  if (!bill.isRecurring) return false;
  
  const nextDate = getNextDueDate(bill.dueDate, bill.frequency);
  const today = new Date();
  const nextDueDate = new Date(nextDate + 'T00:00:00');
  
  // Gerar se a próxima data está a menos de 30 dias
  const daysUntilNext = Math.ceil((nextDueDate - today) / (1000 * 60 * 60 * 24));
  
  if (daysUntilNext > 30) return false;
  
  // Verificar se já existe uma conta com essa data
  const alreadyExists = allBills.some(b => 
    b.description === bill.description &&
    b.dueDate === nextDate &&
    b.amount === bill.amount
  );
  
  return !alreadyExists;
};

export const generateNextBill = (bill) => {
  return {
    ...bill,
    id: Date.now() + Math.random(), // Novo ID único
    dueDate: getNextDueDate(bill.dueDate, bill.frequency),
    paid: false,
    createdAt: new Date().toISOString(),
    generatedFrom: bill.id // Referência à conta original
  };
};

export const checkAndGenerateRecurringBills = (bills) => {
  const newBills = [];
  
  bills.forEach(bill => {
    if (shouldGenerateNextBill(bill, bills)) {
      newBills.push(generateNextBill(bill));
    }
  });
  
  return newBills;
};

export const getFrequencyLabel = (frequency) => {
  const labels = {
    monthly: 'Mensal',
    bimonthly: 'Bimestral',
    quarterly: 'Trimestral',
    semiannual: 'Semestral',
    annual: 'Anual'
  };
  return labels[frequency] || 'Mensal';
};
