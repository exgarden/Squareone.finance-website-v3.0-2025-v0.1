import { useContext, useState } from 'react';
import { ChevronDown, Filter } from 'lucide-react';
import { AccountContext } from '../context/AccountContext';
import TransactionItem from './TransactionItem';

const RecentTransactions = () => {
  const { transactions } = useContext(AccountContext);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filter, setFilter] = useState('all');

  const filteredTransactions = transactions.filter(transaction => {
    if (filter === 'all') return true;
    if (filter === 'income') return transaction.amount > 0;
    if (filter === 'expense') return transaction.amount < 0;
    return true;
  }).slice(0, 10); // Show only 10 recent transactions

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm h-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-slate-800">Recent Transactions</h3>
        
        <div className="relative">
          <button 
            onClick={() => setFilterOpen(!filterOpen)}
            className="flex items-center text-sm text-slate-600 bg-slate-100 px-3 py-1.5 rounded-lg hover:bg-slate-200"
          >
            <Filter size={14} className="mr-2" />
            {filter === 'all' ? 'All' : filter === 'income' ? 'Income' : 'Expenses'}
            <ChevronDown size={14} className="ml-2" />
          </button>
          
          {filterOpen && (
            <div className="absolute right-0 mt-1 bg-white shadow-md rounded-lg py-1 w-36 z-10">
              <button 
                onClick={() => { setFilter('all'); setFilterOpen(false); }}
                className="w-full text-left px-4 py-2 text-sm hover:bg-slate-100"
              >
                All
              </button>
              <button 
                onClick={() => { setFilter('income'); setFilterOpen(false); }}
                className="w-full text-left px-4 py-2 text-sm hover:bg-slate-100"
              >
                Income
              </button>
              <button 
                onClick={() => { setFilter('expense'); setFilterOpen(false); }}
                className="w-full text-left px-4 py-2 text-sm hover:bg-slate-100"
              >
                Expenses
              </button>
            </div>
          )}
        </div>
      </div>
      
      <div className="space-y-4">
        {filteredTransactions.length > 0 ? (
          filteredTransactions.map(transaction => (
            <TransactionItem key={transaction.id} transaction={transaction} />
          ))
        ) : (
          <p className="text-center text-slate-500 py-8">No transactions found</p>
        )}
      </div>
    </div>
  );
};

export default RecentTransactions;
