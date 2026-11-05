import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, X, Calendar, Upload } from 'lucide-react';
import { getProjects, createProject, updateProject, deleteProject } from '../../firebase/firestore';
import { uploadFile } from '../../firebase/storage';
import { useSEO } from '../../utils/seo';

export const AdminProjects = () => {
  useSEO({
    title: 'Project Management | Bharath Enterprises Admin',
  });

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('Manufacturing');
  const [completionDate, setCompletionDate] = useState('2025');
  const [status, setStatus] = useState('published');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await getProjects();
      setProjects(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const openAdd = () => {
    setEditingProject(null);
    setTitle('');
    setDescription('');
    setImage('');
    setCategory('Manufacturing');
    setCompletionDate('2025');
    setStatus('published');
    setIsModalOpen(true);
  };

  const openEdit = (proj) => {
    setEditingProject(proj);
    setTitle(proj.title || '');
    setDescription(proj.description || '');
    setImage(proj.image || '');
    setCategory(proj.category || 'Manufacturing');
    setCompletionDate(proj.completionDate || '2025');
    setStatus(proj.status || 'published');
    setIsModalOpen(true);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const url = await uploadFile(file, 'projects');
      setImage(url);
    } catch (err) {
      console.warn('Upload error:', err);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsSubmitting(true);
    const payload = {
      title,
      description,
      image: image || 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
      category,
      completionDate,
      status,
    };

    try {
      if (editingProject) {
        await updateProject(editingProject.projectId || editingProject.id, payload);
      } else {
        await createProject(payload);
      }
      setIsModalOpen(false);
      await loadData();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (proj) => {
    if (!window.confirm(`Delete project "${proj.title}"?`)) return;
    await deleteProject(proj.projectId || proj.id);
    await loadData();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-accent uppercase tracking-wider block">
            Portfolio Management
          </span>
          <h1 className="text-2xl font-bold text-primary font-sans mt-0.5">
            Projects ({projects.length})
          </h1>
          <p className="text-xs text-slate-500">
            Showcase enterprise fulfillment contracts, warehouse racking, and supply deployments.
          </p>
        </div>

        <button
          type="button"
          onClick={openAdd}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary hover:bg-primary-light text-white text-xs font-semibold rounded-lg shadow-sm transition-colors self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 text-accent" />
          <span>Add New Project</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((proj) => (
          <div
            key={proj.projectId || proj.id}
            className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs p-5 flex flex-col justify-between"
          >
            <div>
              <div className="h-40 rounded-lg overflow-hidden mb-3 bg-slate-100 relative">
                <img
                  src={proj.image || 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80'}
                  alt={proj.title}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-2 left-2 bg-primary text-white text-[10px] font-semibold px-2 py-0.5 rounded">
                  {proj.category}
                </span>
              </div>
              <h3 className="text-sm font-bold text-primary mb-1">{proj.title}</h3>
              <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed mb-2">
                {proj.description}
              </p>
              {proj.completionDate && (
                <span className="text-[11px] text-slate-400 flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-accent" />
                  <span>Timeline: {proj.completionDate}</span>
                </span>
              )}
            </div>

            <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-emerald-50 text-emerald-700">
                {proj.status || 'Published'}
              </span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => openEdit(proj)}
                  className="p-1.5 text-slate-500 hover:text-primary rounded"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(proj)}
                  className="p-1.5 text-slate-400 hover:text-rose-600 rounded"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="relative bg-white rounded-2xl shadow-xl max-w-lg w-full p-6 text-left border border-slate-200">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-base font-bold text-primary mb-1">
              {editingProject ? 'Edit Project' : 'Add New Portfolio Project'}
            </h3>
            <p className="text-xs text-slate-500 mb-5">Provide project scope, photos, and domain.</p>

            <form onSubmit={handleSave} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Project Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none"
                  placeholder="e.g. Regional Foundry Supply Integration"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none bg-white"
                  >
                    <option value="Manufacturing">Manufacturing</option>
                    <option value="Wholesale & Distribution">Wholesale & Distribution</option>
                    <option value="Retail & Trading">Retail & Trading</option>
                    <option value="Import & Export">Import & Export</option>
                    <option value="Industrial Supplies">Industrial Supplies</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Completion Timeline</label>
                  <input
                    type="text"
                    value={completionDate}
                    onChange={(e) => setCompletionDate(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none"
                    placeholder="e.g. Q3 2025 or Ongoing"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Project Summary</label>
                <textarea
                  rows="3"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none"
                  placeholder="Contract scope and deliverables achieved..."
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Cover Image</label>
                <div className="flex items-center gap-2">
                  <input
                    type="url"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    className="flex-1 px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none"
                    placeholder="https://..."
                  />
                  <label className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg cursor-pointer inline-flex items-center gap-1 border border-slate-300">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload</span>
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                  </label>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 bg-primary text-white text-xs font-bold rounded-lg"
                >
                  {isSubmitting ? 'Saving...' : 'Save Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
