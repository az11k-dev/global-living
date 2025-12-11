import {Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";

const expenseData = [
    {name: 'Rent', value: 700, color: '#4c6ef5'},
    {name: 'Food', value: 300, color: '#40c057'},
    {name: 'Transport', value: 40, color: '#fab005'},
    {name: 'Internet', value: 30, color: '#9c36b5'},
    {name: 'Utilities', value: 80, color: '#f03e3e'},
    {name: 'Entertainment', value: 150, color: '#fa5252'},
];

export default function MonthlyExpensesChart() {
    return (
        <div className="w-full lg:w-1/2 p-6 border-r border-gray-100">
            <h2 className="text-[18px] font-[500] text-gray-800 mb-6">Monthly Expenses</h2>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart
                    data={expenseData}
                    margin={{top: 5, right: 30, left: 20, bottom: 5}}
                >

                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee"/>


                    <XAxis dataKey="name" stroke="#666" fontSize={12}/>


                    <YAxis
                        stroke="#666"
                        fontSize={12}
                        tickFormatter={(value) => `€${value}`}
                        domain={[0, 700]}
                    />


                    <Tooltip
                        formatter={(value) => [`€${value}`, 'Amount']}
                        labelStyle={{color: '#333'}}
                        contentStyle={{borderRadius: '6px', border: 'none', boxShadow: '0 2px 10px rgba(0,0,0,0.1)'}}
                    />


                    {expenseData.map((entry, index: number) => (
                        <Bar
                            key={`bar-${index}`}
                            dataKey="value"
                            fill={entry?.color}
                            name={entry?.name}
                            data={[{name: entry?.name, value: entry?.value}]}
                            maxBarSize={80}
                        />
                    ))}
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}