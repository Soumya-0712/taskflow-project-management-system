import DashboardLayout from "../components/layout/DashboardLayout";

import StatsCard from "../components/dashboard/StatsCard";
import TaskStatusChart from "../components/dashboard/TaskStatusChart";
import RecentProjects from "../components/dashboard/RecentProjects";

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>

          <p className="text-slate-500">Welcome back</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          <StatsCard title="Projects" value="12" color="text-blue-600" />

          <StatsCard title="Tasks" value="42" color="text-purple-600" />

          <StatsCard title="Completed" value="28" color="text-green-600" />

          <StatsCard title="Pending" value="14" color="text-orange-500" />
        </div>

        <div className="grid lg:grid-cols-2 gap-5">
          <TaskStatusChart />

          <RecentProjects />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
