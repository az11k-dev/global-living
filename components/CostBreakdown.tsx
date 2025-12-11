export default function CostBreakdown(){
    const expenseData = [
        {name: 'Rent', value: 700, color: '#4c6ef5'},
        {name: 'Food', value: 300, color: '#40c057'},
        {name: 'Transport', value: 40, color: '#fab005'},
        {name: 'Internet', value: 30, color: '#9c36b5'},
        {name: 'Utilities', value: 80, color: '#f03e3e'},
        {name: 'Entertainment', value: 150, color: '#fa5252'},
    ];

    const totalMonthly = expenseData.reduce((sum, item) => sum + item.value, 0);
    return (
        <div className="w-full lg:w-1/2 p-6">
            <h2 className="text-[18px] font-[500] text-gray-800 mb-6">Cost Breakdown</h2>

            <div className="space-y-4">
                {expenseData.map((item, index) => {

                    const percentage = Math.round((item.value / totalMonthly) * 100);

                    return (
                        <div key={index} className="flex flex-col">
                            <div className="flex justify-between items-center mb-1">

                                <span className="text-gray-700 font-[500]">{item.name} ({index === 0 ? '1BR' : ' '})</span>
                                <span className="text-gray-700 font-[500]">€{item.value}</span>
                            </div>

                            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">

                                <div
                                    style={{width: `${percentage}%`, backgroundColor: item.color}}
                                    className={`h-full transition-all duration-500 ease-out`}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>


            <div className="border-t border-gray-200 mt-6 pt-4 flex justify-between items-center">
                <span className="text-[16px] font-[600] text-gray-800">Total Monthly</span>
                <span className="text-[18px] font-[600] text-blue-600">€{totalMonthly.toLocaleString()}</span>
            </div>
        </div>
    );

}