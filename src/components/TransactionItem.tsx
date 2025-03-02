import { useState, useContext } from 'react';
import { Bitcoin, Briefcase, Coffee, CreditCard, Pencil, Gift, House, ShoppingBag, Trash, TrendingUp } from 'lucide-react';
import { Transaction } from '../types';
import { AccountContext } from '../context/AccountContext';

interface TransactionItemProps {
  transaction: Transaction;
}

const TransactionItem = ({ transaction }: TransactionItemProps) => {
  const { updateTransaction, deleteTransaction } = useContext(AccountContext);
  const [showActions, setShowActions] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    description: transaction.description,
    amount: Math.abs(transaction.amount).toString(),
    category: transaction.category,
    type: transaction.amount > 0 ? 'income' : 'expense',
    date: new Date(transaction.date).toISOString().split('T')[0]
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const amount = editData.type === 'income' 
      ? Math.abs(parseFloat(editData.amount)) 
      : -Math.abs(parseFloat(editData.amount));
    
    updateTransaction({
      id: transaction.id,
      description: editData.description,
      amount,
      category: editData.category,
      date: new Date(editData.date).toISOString()
    });
    
    setIsEditing(false);
  };

  const getIcon = (category: string) => {
    switch (category) {
      case 'shopping': return <ShoppingBag className="text-blue-500" />;
      case 'food': return <Coffee className="text-orange-500" />;
      case 'bills': return <House className="text-violet-500" />;
      case 'transport': return <CreditCard className="text-green-500" />;
      case 'entertainment': return <Gift className="text-pink-500" />;
      case 'investment': return <TrendingUp className="text-teal-500" />;
      case 'crypto': return <Bitcoin className="text-yellow-500" />;
      case 'salary': return <Briefcase className="text-indigo-500" />;
      default: return <CreditCard className="text-slate-500" />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  if (isEditing) {
    return (
      <form onSubmit={handleSubmit} className="bg-slate-50 dark:bg-slate-700 p-4 rounded-lg mb-4">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Description</label>
            <input
              type="text"
              name="description"
              value={editData.description}
              onChange={handleChange}
              className="w-full px-3 py-1.5 text-sm border border-slate-300 dark:border-slate-600 dark:bg-slate-800 dark:text-white rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Amount</label>
            <div className="flex">
              <select
                name="type"
                value={editData.type}
                onChange={handleChange}
                className="px-2 py-1.5 text-sm border-y border-l border-slate-300 dark:border-slate-600 dark:bg-slate-800 dark:text-white rounded-l focus:outline-none"
              >
                <option value="expense">-</option>
                <option value="income">+</option>
              </select>
              <input
                type="number"
                name="amount"
                step="0.01"
                min="0"
                value={editData.amount}
                onChange={handleChange}
                className="w-full px-3 py-1.5 text-sm border border-slate-300 dark:border-slate-600 dark:bg-slate-800 dark:text-white rounded-r focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Category</label>
            <select
              name="category"
              value={editData.category}
              onChange={handleChange}
              className="w-full px-3 py-1.5 text-sm border border-slate-300 dark:border-slate-600 dark:bg-slate-800 dark:text-white rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="shopping">Shopping</option>
              <option value="food">Food & Drinks</option>
              <option value="transport">Transport</option>
              <option value="bills">Bills & Utilities</option>
              <option value="entertainment">Entertainment</option>
              <option value="investment">Investment</option>
              <option value="crypto">Crypto</option>
              <option value="salary">Salary</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Date</label>
            <input
              type="date"
              name="date"
              value={editData.date}
              onChange={handleChange}
              className="w-full px-3 py-1.5 text-sm border border-slate-300 dark:border-slate-600 dark:bg-slate-800 dark:text-white rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>
        
        <div className="flex justify-end space-x-2 mt-2">
          <button
            type="button"
            onClick={() => setIsEditing(false)}
            className="px-3 py-1 text-xs text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-white"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </form>
    );
  }

  return (
    <div 
      className="flex items-center justify-between py-3 border-b border-slate-100 dark:border-slate-700 last:border-0 relative"
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <div className="flex items-center">
        <div className="bg-slate-100 dark:bg-slate-700 p-2 rounded-lg mr-4">
          {getIcon(transaction.category)}
        </div>
        <div>
          <h4 className="text-sm font-medium text-slate-800 dark:text-white">{transaction.description}</h4>
          <p className="text-xs text-slate-500 dark:text-slate-400">{formatDate(transaction.date)}</p>
        </div>
      </div>
      <div className="flex items-center">
        <div className={`font-medium ${transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
          {transaction.amount > 0 ? '+' : ''}{transaction.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
        </div>
        
        {showActions && (
          <div className="flex ml-4">
            <button 
              onClick={() => setIsEditing(true)}
              className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
            >
              <Pencil size={14} />
            </button>
            <button 
              onClick={() => deleteTransaction(transaction.id)}
              className="p-1 text-slate-400 hover:text-red-500"
            >
              <Trash size={14} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionItem;
