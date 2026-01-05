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
        { name: "Rent", value: country?.costs?.rent, color: "#629BF8" },
        { name: "Food", value: country?.costs?.food, color: "#4ED17E" },
        { name: "Transport", value: country?.costs?.transport, color: "#EEC239" },
        { name: "Internet", value: country?.costs?.internet, color: "#B977F9" },
        { name: "Utilities", value: country?.costs?.utilities, color: "#F26969" },
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
