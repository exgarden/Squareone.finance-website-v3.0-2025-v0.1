import { Car, Coffee, House, ChartPie, ShoppingBag } from 'lucide-react';

const ExpenseSummary = () => {
  const categories = [
    { name: 'Food & Drinks', amount: 650, icon: Coffee, color: 'bg-orange-500', percentage: 30 },
    { name: 'Shopping', amount: 420, icon: ShoppingBag, color: 'bg-blue-500', percentage: 20 },
    { name: 'Housing', amount: 800, icon: House, color: 'bg-violet-500', percentage: 36 },
    { name: 'Transport', amount: 310.50, icon: Car, color: 'bg-green-500', percentage: 14 },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm h-full">
      <div className="flex items-center mb-6">
        <ChartPie size={18} className="mr-2 text-slate-600" />
        <h3 className="text-lg font-semibold text-slate-800">Expense Summary</h3>
      </div>

      <div className="space-y-5">
        {categories.map((category) => (
          <div key={category.name}>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center">
                <div className={`${category.color} p-1.5 rounded-lg mr-3`}>
                  <category.icon size={16} className="text-white" />
                </div>
                <span className="text-sm font-medium">{category.name}</span>
              </div>
              <span className="text-sm font-semibold">${category.amount.toFixed(2)}</span>
            </div>
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
              <div 
                className={`h-full ${category.color}`} 
                style={{ width: `${category.percentage}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpenseSummary;
