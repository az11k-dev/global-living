import {
    Bar,
    BarChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
    Cell
} from "recharts";
import {Country} from "@/types";

type CountryProps = {
    country: Country;
}
export default function MonthlyExpensesChart({ country }: CountryProps) {
    const expenseData = [
        { name: "Rent", value: country?.costs?.rent, color: "#4c6ef5" },
        { name: "Food", value: country?.costs?.food, color: "#40c057" },
        { name: "Transport", value: country?.costs?.transport, color: "#fab005" },
        { name: "Internet", value: country?.costs?.internet, color: "#9c36b5" },
        { name: "Utilities", value: country?.costs?.utilities, color: "#f03e3e" },
    ];

    return (
        <div className="w-full lg:w-1/2 p-6 border-r border-gray-100">
            <h2 className="text-[18px] font-[500] text-gray-800 mb-6">
                Monthly Expenses
            </h2>

            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={expenseData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis tickFormatter={(v) => `$${v}`} />
                    <Tooltip />

                    <Bar dataKey="value" maxBarSize={80}>
                        {expenseData.map((item, index) => (
                            <Cell key={index} fill={item.color} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
