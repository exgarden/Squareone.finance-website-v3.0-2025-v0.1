import { createContext, useState, useEffect, ReactNode } from 'react';
import { Transaction, Budget, FinancialGoal } from '../types';

interface AccountContextType {
  transactions: Transaction[];
  budgets: Budget[];
  goals: FinancialGoal[];
  addTransaction: (transaction: Transaction) => void;
  updateTransaction: (transaction: Transaction) => void;
  deleteTransaction: (id: string) => void;
  addBudget: (budget: Budget) => void;
  updateBudget: (budget: Budget) => void;
  deleteBudget: (id: string) => void;
  addGoal: (goal: FinancialGoal) => void;
  updateGoal: (goal: FinancialGoal) => void;
  deleteGoal: (id: string) => void;
  totalBalance: number;
  monthlyIncome: number;
  monthlyExpenses: number;
}

const defaultContext: AccountContextType = {
  transactions: [],
  budgets: [],
  goals: [],
  addTransaction: () => {},
  updateTransaction: () => {},
  deleteTransaction: () => {},
  addBudget: () => {},
  updateBudget: () => {},
  deleteBudget: () => {},
  addGoal: () => {},
  updateGoal: () => {},
  deleteGoal: () => {},
  totalBalance: 0,
  monthlyIncome: 0,
  monthlyExpenses: 0,
};

export const AccountContext = createContext<AccountContextType>(defaultContext);

interface AccountProviderProps {
  children: ReactNode;
}

export const AccountProvider = ({ children }: AccountProviderProps) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [goals, setGoals] = useState<FinancialGoal[]>([]);
  const [totalBalance, setTotalBalance] = useState(0);
  const [monthlyIncome, setMonthlyIncome] = useState(0);
  const [monthlyExpenses, setMonthlyExpenses] = useState(0);

  useEffect(() => {
    // Load transactions from localStorage
    const savedTransactions = localStorage.getItem('squareone_transactions');
    
    if (savedTransactions) {
      setTransactions(JSON.parse(savedTransactions));
    } else {
      // Sample transactions for demo
      const sampleTransactions: Transaction[] = [
        {
          id: '1',
          description: 'Salary',
          amount: 4250,
          category: 'salary',
          date: new Date(2023, 9, 1).toISOString(),
        },
        {
          id: '2',
          description: 'Grocery shopping',
          amount: -120.50,
          category: 'shopping',
          date: new Date(2023, 9, 3).toISOString(),
        },
        {
          id: '3',
          description: 'Restaurant dinner',
          amount: -85.20,
          category: 'food',
          date: new Date(2023, 9, 5).toISOString(),
        },
        {
          id: '4',
          description: 'Rent payment',
          amount: -1200,
          category: 'bills',
          date: new Date(2023, 9, 1).toISOString(),
        },
        {
          id: '5',
          description: 'Uber rides',
          amount: -45.75,
          category: 'transport',
          date: new Date(2023, 9, 8).toISOString(),
        },
        {
          id: '6',
          description: 'Freelance work',
          amount: 850,
          category: 'salary',
          date: new Date(2023, 9, 15).toISOString(),
        },
        {
          id: '7',
          description: 'Amazon purchase',
          amount: -129.99,
          category: 'shopping',
          date: new Date(2023, 9, 10).toISOString(),
        },
      ];
      
      setTransactions(sampleTransactions);
      localStorage.setItem('squareone_transactions', JSON.stringify(sampleTransactions));
    }

    // Load budgets from localStorage
    const savedBudgets = localStorage.getItem('squareone_budgets');
    if (savedBudgets) {
      setBudgets(JSON.parse(savedBudgets));
    } else {
      const sampleBudgets: Budget[] = [
        {
          id: '1',
          category: 'food',
          amount: 500,
          period: 'monthly',
          startDate: new Date(2023, 9, 1).toISOString(),
        },
        {
          id: '2',
          category: 'shopping',
          amount: 300,
          period: 'monthly',
          startDate: new Date(2023, 9, 1).toISOString(),
        },
        {
          id: '3',
          category: 'entertainment',
          amount: 200,
          period: 'monthly',
          startDate: new Date(2023, 9, 1).toISOString(),
        },
      ];
      setBudgets(sampleBudgets);
      localStorage.setItem('squareone_budgets', JSON.stringify(sampleBudgets));
    }

    // Load goals from localStorage
    const savedGoals = localStorage.getItem('squareone_goals');
    if (savedGoals) {
      setGoals(JSON.parse(savedGoals));
    } else {
      const sampleGoals: FinancialGoal[] = [
        {
          id: '1',
          name: 'Emergency Fund',
          targetAmount: 10000,
          currentAmount: 5200,
          deadline: new Date(2023, 11, 31).toISOString(),
        },
        {
          id: '2',
          name: 'Vacation',
          targetAmount: 3000,
          currentAmount: 1500,
          deadline: new Date(2023, 11, 31).toISOString(),
        },
      ];
      setGoals(sampleGoals);
      localStorage.setItem('squareone_goals', JSON.stringify(sampleGoals));
    }
  }, []);

  useEffect(() => {
    // Calculate total balance
    const balance = transactions.reduce((sum, transaction) => sum + transaction.amount, 0);
    setTotalBalance(balance);
    
    // Calculate monthly income and expenses
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    
    const monthlyTransactions = transactions.filter(t => {
      const transactionDate = new Date(t.date);
      return transactionDate.getMonth() === currentMonth && 
             transactionDate.getFullYear() === currentYear;
    });
    
    const income = monthlyTransactions
      .filter(t => t.amount > 0)
      .reduce((sum, t) => sum + t.amount, 0);
    
    const expenses = monthlyTransactions
      .filter(t => t.amount < 0)
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);
    
    setMonthlyIncome(income);
    setMonthlyExpenses(expenses);
    
    // Save to localStorage when transactions change
    localStorage.setItem('squareone_transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('squareone_budgets', JSON.stringify(budgets));
  }, [budgets]);

  useEffect(() => {
    localStorage.setItem('squareone_goals', JSON.stringify(goals));
  }, [goals]);

  const addTransaction = (transaction: Transaction) => {
    setTransactions(prev => [transaction, ...prev]);
  };

  const updateTransaction = (transaction: Transaction) => {
    setTransactions(prev => 
      prev.map(t => t.id === transaction.id ? transaction : t)
    );
  };

  const deleteTransaction = (id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  const addBudget = (budget: Budget) => {
    setBudgets(prev => [...prev, budget]);
  };

  const updateBudget = (budget: Budget) => {
    setBudgets(prev => 
      prev.map(b => b.id === budget.id ? budget : b)
    );
  };

  const deleteBudget = (id: string) => {
    setBudgets(prev => prev.filter(b => b.id !== id));
  };

  const addGoal = (goal: FinancialGoal) => {
    setGoals(prev => [...prev, goal]);
  };

  const updateGoal = (goal: FinancialGoal) => {
    setGoals(prev => 
      prev.map(g => g.id === goal.id ? goal : g)
    );
  };

  const deleteGoal = (id: string) => {
    setGoals(prev => prev.filter(g => g.id !== id));
  };

  return (
    <AccountContext.Provider value={{ 
      transactions, 
      budgets,
      goals,
      addTransaction, 
      updateTransaction,
      deleteTransaction,
      addBudget,
      updateBudget,
      deleteBudget,
      addGoal,
      updateGoal,
      deleteGoal,
      totalBalance,
      monthlyIncome,
      monthlyExpenses
    }}>
      {children}
    </AccountContext.Provider>
  );
};
