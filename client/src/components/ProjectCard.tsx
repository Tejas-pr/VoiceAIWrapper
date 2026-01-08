import type { Project } from "../types/project";

interface Props {
  project: Project;
}

const statusConfig: Record<string, { bg: string; text: string; dot: string }> = {
  ACTIVE: {
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    dot: "bg-emerald-500",
  },
  COMPLETED: {
    bg: "bg-indigo-50",
    text: "text-indigo-700",
    dot: "bg-indigo-500",
  },
  ON_HOLD: {
    bg: "bg-amber-50",
    text: "text-amber-700",
    dot: "bg-amber-500",
  },
};

export default function ProjectCard({ project }: Props) {
  const status = statusConfig[project.status] || statusConfig.ACTIVE;

  return (
    <div className="group bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200/60 shadow-md shadow-gray-200/20 hover:shadow-lg hover:shadow-gray-300/30 hover:border-gray-300/80 transition-all duration-300 p-5 flex flex-col h-full transform hover:-translate-y-0.5">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-100 to-indigo-50 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-3.5 h-3.5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-base font-bold text-gray-900 leading-snug truncate">
              {project.name}
            </h3>
          </div>
        </div>
        <span
          className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full ${status.bg} ${status.text} shrink-0 shadow-sm`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${status.dot} animate-pulse`}></span>
          {project.status.replace("_", " ")}
        </span>
      </div>

      {/* Progress Section */}
      <div className="mt-auto space-y-4">
        {/* Progress Bar */}
        <div>
          <div className="flex items-center justify-between text-xs font-semibold text-gray-700 mb-2">
            <span className="flex items-center gap-1">
              <svg className="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              Progress
            </span>
            <span className="text-sm font-bold text-gray-900">{project.completionRate}%</span>
          </div>
          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full transition-all duration-500"
              style={{ width: `${project.completionRate}%` }}
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 pt-3 border-t border-gray-100">
          <div className="bg-gradient-to-br from-gray-50 to-white rounded-lg p-2.5 border border-gray-100">
            <div className="flex items-center gap-1.5 mb-1">
              <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <p className="text-xs font-medium text-gray-600">Total Tasks</p>
            </div>
            <p className="text-lg font-bold text-gray-900">{project.taskCount}</p>
          </div>
          <div className="bg-gradient-to-br from-indigo-50 to-indigo-50/50 rounded-lg p-2.5 border border-indigo-100">
            <div className="flex items-center gap-1.5 mb-1">
              <svg className="w-3.5 h-3.5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-xs font-medium text-indigo-700">Completed</p>
            </div>
            <p className="text-lg font-bold text-indigo-900">{project.completedTasks}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
