import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, X, AlertCircle, Loader2, Upload } from 'lucide-react';
import { getCategories, createCategory, updateCategory, deleteCategory } from '../../firebase/firestore';
import { uploadFile } from '../../firebase/storage';
import { useSEO } from '../../utils/seo';

export const AdminCategories = () => {
  useSEO({
    title: 'Category Management | Bharath Enterprises Admin',
  });

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [status, setStatus] = useState('active');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await getCategories();
      setCategories(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const openAdd = () => {
    setEditingCategory(null);
    setName('');
    setDescription('');
    setImage('');
    setStatus('active');
    setError('');
    setIsModalOpen(true);
  };

  const openEdit = (cat) => {
    setEditingCategory(cat);
    setName(cat.name || '');
    setDescription(cat.description || '');
    setImage(cat.image || '');
    setStatus(cat.status || 'active');
    setError('');
    setIsModalOpen(true);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const url = await uploadFile(file, 'categories');
      setImage(url);
    } catch (err) {
      setError('Upload failed: ' + err.message);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Category name is required.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const payload = {
      name,
      description,
      image: image || 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
      status,
      categoryId: editingCategory ? editingCategory.categoryId || editingCategory.id : slug,
    };

    try {
      if (editingCategory) {
        await updateCategory(editingCategory.categoryId || editingCategory.id, payload);
      } else {
        await createCategory(payload);
      }
      setIsModalOpen(false);
      await loadData();
    } catch (err) {
      setError('Error saving category: ' + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (cat) => {
    const confirm = window.confirm(`Delete category "${cat.name}"?`);
    if (!confirm) return;
    await deleteCategory(cat.categoryId || cat.id);
    await loadData();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-accent uppercase tracking-wider block">
            Domain Organization
          </span>
          <h1 className="text-2xl font-bold text-primary font-sans mt-0.5">
            Business Categories ({categories.length})
          </h1>
          <p className="text-xs text-slate-500">
            Define core commercial domains (Manufacturing, Wholesale, Trading, Import/Export, Industrial Supplies).
          </p>
        </div>

        <button
          type="button"
          onClick={openAdd}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary hover:bg-primary-light text-white text-xs font-semibold rounded-lg shadow-sm transition-colors self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 text-accent" />
          <span>Add New Category</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <div
            key={cat.categoryId || cat.id}
            className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs p-5 flex flex-col justify-between"
          >
            <div>
              <div className="h-32 rounded-lg overflow-hidden mb-3 bg-slate-100">
                <img
                  src={cat.image || 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80'}
                  alt={cat.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-sm font-bold text-primary">{cat.name}</h3>
                <span className="text-[10px] font-mono text-slate-400">
                  {cat.categoryId || cat.id}
                </span>
              </div>
              <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                {cat.description}
              </p>
            </div>

            <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] font-semibold text-emerald-600 capitalize">
                {cat.status || 'Active'}
              </span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => openEdit(cat)}
                  className="p-1 text-slate-500 hover:text-primary rounded"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(cat)}
                  className="p-1 text-slate-400 hover:text-rose-600 rounded"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="relative bg-white rounded-2xl shadow-xl max-w-md w-full p-6 text-left border border-slate-200">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-base font-bold text-primary mb-1">
              {editingCategory ? 'Edit Category' : 'Create Business Category'}
            </h3>
            <p className="text-xs text-slate-500 mb-5">Set category title, overview and showcase photo.</p>

            {error && (
              <div className="mb-4 p-2.5 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-lg">
                {error}
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Category Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none"
                  placeholder="e.g. Industrial Supplies"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Overview Description
                </label>
                <textarea
                  rows="3"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none"
                  placeholder="Summary of capabilities in this discipline..."
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Cover Image URL
                </label>
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
                  {isSubmitting ? 'Saving...' : 'Save Category'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

