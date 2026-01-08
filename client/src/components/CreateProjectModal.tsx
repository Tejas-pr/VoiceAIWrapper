import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { CREATE_PROJECT } from "../graphql/mutations";
import { GET_PROJECTS } from "../graphql/queries";
import type { ProjectStatus, Project } from "../types/project";

interface CreateProjectData {
  createProject: {
    project: Project;
  };
}

interface CreateProjectVariables {
  organizationSlug: string;
  name: string;
  status: string;
  description?: string;
}

interface GetProjectsData {
  projects: Project[];
}

interface Props {
  organizationSlug: string;
  onClose: () => void;
}

export default function CreateProjectModal({ organizationSlug, onClose }: Props) {
  const [name, setName] = useState("");
  const [status, setStatus] = useState<ProjectStatus>("ACTIVE");
  const [description, setDescription] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const [createProject, { loading }] = useMutation<CreateProjectData, CreateProjectVariables>(CREATE_PROJECT, {
    update(cache, { data }) {
      const newProject = data?.createProject.project;
      if (!newProject) return;

      const existing = cache.readQuery<GetProjectsData>({
        query: GET_PROJECTS,
        variables: { organizationSlug },
      });

      if (!existing) return;

      cache.writeQuery({
        query: GET_PROJECTS,
        variables: { organizationSlug },
        data: {
          projects: [...existing.projects, newProject],
        },
      });
    },
    onCompleted() {
      onClose();
    },
  });

  const handleSubmit = () => {
    if (!name.trim()) {
      setErrorMsg("Project name is required");
      return;
    }

    createProject({
      variables: {
        organizationSlug,
        name,
        status,
        description,
      },
    });
  };

  return (
    <div 
      className="fixed inset-0 bg-gray-900/60 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl shadow-gray-900/20 w-full max-w-md border border-gray-200/60 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 pt-6 pb-5 border-b border-gray-100 bg-gradient-to-r from-indigo-50/50 to-white rounded-t-2xl">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/25">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Create New Project</h2>
              <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">
                Add a new project to your workspace
              </p>
            </div>
          </div>
        </div>

        {/* Form Content */}
        <div className="px-6 py-6 space-y-5">
          {/* Error Message */}
          {errorMsg && (
            <div className="bg-gradient-to-r from-red-50 to-red-50/50 border border-red-200 rounded-xl p-4 flex items-start gap-3 shadow-sm animate-in slide-in-from-top-2 duration-200">
              <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-red-600 text-xs font-bold">!</span>
              </div>
              <p className="text-sm text-red-700 font-semibold">{errorMsg}</p>
            </div>
          )}

          {/* Project Name */}
          <div>
            <label htmlFor="project-name" className="block text-sm font-semibold text-gray-700 mb-2.5">
              Project Name <span className="text-red-500">*</span>
            </label>
            <input
              id="project-name"
              type="text"
              className="w-full px-4 py-3 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 placeholder:text-gray-400 bg-white shadow-sm hover:border-gray-400"
              placeholder="Enter project name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setErrorMsg("");
              }}
              autoFocus
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="project-description" className="block text-sm font-semibold text-gray-700 mb-2.5">
              Description
            </label>
            <textarea
              id="project-description"
              rows={3}
              className="w-full px-4 py-3 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 placeholder:text-gray-400 resize-none bg-white shadow-sm hover:border-gray-400"
              placeholder="Add a brief description (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Status */}
          <div>
            <label htmlFor="project-status" className="block text-sm font-semibold text-gray-700 mb-2.5">
              Status
            </label>
            <select
              id="project-status"
              className="w-full px-4 py-3 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-white cursor-pointer shadow-sm hover:border-gray-400"
              value={status}
              onChange={(e) => setStatus(e.target.value as ProjectStatus)}
            >
              <option value="ACTIVE">Active</option>
              <option value="ON_HOLD">On Hold</option>
              <option value="COMPLETED">Completed</option>
            </select>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-5 bg-gradient-to-r from-gray-50/80 to-white border-t border-gray-100 rounded-b-2xl flex justify-end gap-3">
          <button
            type="button"
            className="px-5 py-2.5 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 transition-all duration-200 focus-visible:outline-none shadow-sm"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="button"
            className="px-6 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-indigo-700 rounded-xl shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/30 hover:from-indigo-700 hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none inline-flex items-center gap-2 transform hover:scale-105 active:scale-100"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Creating...
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                Create Project
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
