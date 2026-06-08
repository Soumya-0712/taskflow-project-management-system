import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  {
    name: "Todo",
    value: 6,
  },
  {
    name: "In Progress",
    value: 4,
  },
  {
    name: "Done",
    value: 8,
  },
];

const COLORS = ["#f59e0b", "#3b82f6", "#10b981"];

const TaskStatusChart = () => {
  return (
    <div className="bg-white rounded-xl border shadow-sm p-5 h-87.5">
      <h3 className="font-semibold mb-4">Task Distribution</h3>

      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} dataKey="value" outerRadius={100} label>
            {data.map((entry, index) => (
              <Cell key={index} fill={COLORS[index]} />
            ))}
          </Pie>

          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TaskStatusChart;
