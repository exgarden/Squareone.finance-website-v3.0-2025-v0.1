import { useContext, useState } from 'react';
import { AccountContext } from '../context/AccountContext';
import { Squircle, Plus, Target, Trash2 } from 'lucide-react';
import { FinancialGoal } from '../types';

const GoalsWidget = () => {
  const { goals, addGoal, updateGoal, deleteGoal } = useContext(AccountContext);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingGoal, setEditingGoal] = useState<FinancialGoal | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    targetAmount: '',
    currentAmount: '',
    deadline: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newGoal: FinancialGoal = {
      id: editingGoal ? editingGoal.id : Date.now().toString(),
      name: formData.name,
      targetAmount: parseFloat(formData.targetAmount),
      currentAmount: parseFloat(formData.currentAmount),
      deadline: formData.deadline || undefined
    };
    
    if (editingGoal) {
      updateGoal(newGoal);
      setEditingGoal(null);
    } else {
      addGoal(newGoal);
    }
    
    setFormData({ name: '', targetAmount: '', currentAmount: '', deadline: '' });
    setShowAddForm(false);
  };

  const startEditing = (goal: FinancialGoal) => {
    setEditingGoal(goal);
    setFormData({
      name: goal.name,
      targetAmount: goal.targetAmount.toString(),
      currentAmount: goal.currentAmount.toString(),
      deadline: goal.deadline || ''
    });
    setShowAddForm(true);
  };

  const calculateProgress = (current: number, target: number) => {
    return Math.min(Math.round((current / target) * 100), 100);
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <Target size={18} className="mr-2 text-slate-600 dark:text-slate-300" />
          <h3 className="text-lg font-semibold text-slate-800 dark:text-white">Financial Goals</h3>
        </div>
        <button 
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center text-sm bg-slate-100 dark:bg-slate-700 px-3 py-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600"
        >
          <Plus size={14} className="mr-1" />
          {editingGoal ? 'Edit Goal' : 'Add Goal'}
        </button>
      </div>

      {showAddForm && (
        <div className="bg-slate-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
          <h4 className="text-sm font-medium mb-3 dark:text-white">
            {editingGoal ? 'Edit Goal' : 'Add New Goal'}
          </h4>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Goal Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 dark:bg-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="targetAmount" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Target Amount ($)
                </label>
                <input
                  type="number"
                  id="targetAmount"
                  name="targetAmount"
                  value={formData.targetAmount}
                  onChange={handleChange}
                  required
                  min="0"
                  step="0.01"
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 dark:bg-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label htmlFor="currentAmount" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Current Amount ($)
                </label>
                <input
                  type="number"
                  id="currentAmount"
                  name="currentAmount"
                  value={formData.currentAmount}
                  onChange={handleChange}
                  required
                  min="0"
                  step="0.01"
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 dark:bg-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="deadline" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Target Date (Optional)
              </label>
              <input
                type="date"
                id="deadline"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 dark:bg-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => {
                  setShowAddForm(false);
                  setEditingGoal(null);
                  setFormData({ name: '', targetAmount: '', currentAmount: '', deadline: '' });
                }}
                className="px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700"
              >
                {editingGoal ? 'Update Goal' : 'Add Goal'}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-6">
        {goals.length > 0 ? (
          goals.map(goal => (
            <div key={goal.id} className="border-b border-slate-100 dark:border-slate-700 pb-4 last:border-0 last:pb-0">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-medium text-slate-800 dark:text-white">{goal.name}</h4>
                  <div className="text-sm text-slate-500 dark:text-slate-400">
                    ${goal.currentAmount.toLocaleString()} of ${goal.targetAmount.toLocaleString()}
                    {goal.deadline && ` • Due ${new Date(goal.deadline).toLocaleDateString()}`}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => startEditing(goal)}
                    className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                  >
                    <Squircle size={16} />
                  </button>
                  <button 
                    onClick={() => deleteGoal(goal.id)}
                    className="text-slate-400 hover:text-red-500"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              
              <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-2.5 mt-2">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: `${calculateProgress(goal.currentAmount, goal.targetAmount)}%` }}
                ></div>
              </div>
              <div className="text-xs text-right mt-1 text-slate-500 dark:text-slate-400">
                {calculateProgress(goal.currentAmount, goal.targetAmount)}% complete
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-slate-400 dark:text-slate-500">
            <p>No financial goals set yet</p>
            <button 
              onClick={() => setShowAddForm(true)}
              className="text-blue-500 hover:text-blue-700 mt-2 text-sm"
            >
              Click here to add your first goal
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GoalsWidget;
