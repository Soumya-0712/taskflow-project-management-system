const projects = [
  {
    id: 1,
    name: "TaskFlow",
  },
  {
    id: 2,
    name: "Inventory System",
  },
  {
    id: 3,
    name: "CRM Dashboard",
  },
];

const RecentProjects = () => {
  return (
    <div className="bg-white rounded-xl border shadow-sm p-5">
      <h3 className="font-semibold mb-4">Recent Projects</h3>

      <div className="space-y-3">
        {projects.map((project) => (
          <div key={project.id} className="p-3 rounded-lg bg-slate-50">
            {project.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentProjects;
