export interface Transaction {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: string;
}

export interface Budget {
  id: string;
  category: string;
  amount: number;
  period: 'monthly' | 'weekly' | 'annual';
  startDate: string;
  endDate?: string;
}

export interface FinancialGoal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline?: string;
  notes?: string;
}
