import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import RecentTransactions from './RecentTransactions';
import ExpenseSummary from './ExpenseSummary';

import GoalsWidget from './GoalsWidget';
import { Bell, House, Moon, Plus, Sun } from 'lucide-react';
import { AccountContext } from '../context/AccountContext';
import { ThemeContext } from '../context/ThemeContext';

const Dashboard = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const { totalBalance, monthlyIncome, monthlyExpenses } = useContext(AccountContext);
  const { theme, toggleTheme } = useContext(ThemeContext);

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className={`h-screen overflow-auto p-8 bg-white dark:bg-secondary-900 text-secondary-900 dark:text-white transition-colors duration-200 ${theme === 'dark' ? 'dark' : ''}`}>
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-secondary-900 dark:text-white">Dashboard</h1>
          <p className="text-secondary-500 dark:text-secondary-400">{currentDate}</p>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full bg-secondary-100 text-secondary-600 hover:bg-secondary-200 dark:bg-secondary-800 dark:text-secondary-300 dark:hover:bg-secondary-700"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button className="p-2 rounded-full bg-secondary-100 text-secondary-600 hover:bg-secondary-200 dark:bg-secondary-800 dark:text-secondary-300 dark:hover:bg-secondary-700">
            <Bell size={20} />
          </button>
          <button 
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
          >
            <Plus size={18} />
            Add Transaction
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <AccountSummary 
          title="Total Balance"
          amount={totalBalance}
          change="+2.5%"
          positive={true}
        />
        <AccountSummary 
          title="Monthly Income"
          amount={monthlyIncome}
          change="+10.3%"
          positive={true}
        />
        <AccountSummary 
          title="Monthly Expenses"
          amount={monthlyExpenses}
          change="-4.2%"
          positive={false}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <RecentTransactions />
        </div>
        <div>
          <ExpenseSummary />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-3">
          <GoalsWidget />
        </div>
      </div>

      {/* Floating Exit Button */}
      <button
        onClick={() => navigate('/')}
        className="fixed bottom-8 right-8 bg-primary-600 hover:bg-primary-700 text-white p-4 rounded-full shadow-lg transition-all hover:scale-105 flex items-center justify-center z-50"
        aria-label="Return to home page"
      >
        <House size={24} />
      </button>

      {showModal && <AddTransactionModal onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default Dashboard;
