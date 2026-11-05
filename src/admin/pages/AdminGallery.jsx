import React, { useState, useEffect } from 'react';
import { Plus, Trash2, X, Upload, Image as ImageIcon } from 'lucide-react';
import { getGallery, createGalleryItem, deleteGalleryItem } from '../../firebase/firestore';
import { uploadFile } from '../../firebase/storage';
import { useSEO } from '../../utils/seo';

export const AdminGallery = () => {
  useSEO({
    title: 'Gallery Management | Bharath Enterprises Admin',
  });

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [category, setCategory] = useState('Manufacturing');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await getGallery();
      setImages(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const url = await uploadFile(file, 'gallery');
      setImageUrl(url);
    } catch (err) {
      console.warn('Upload error:', err);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!title.trim() || !imageUrl.trim()) return;

    setIsSubmitting(true);
    try {
      await createGalleryItem({
        title,
        description,
        imageUrl,
        category,
      });
      setIsModalOpen(false);
      setTitle('');
      setDescription('');
      setImageUrl('');
      await loadData();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (item) => {
    if (!window.confirm(`Delete image "${item.title}"?`)) return;
    await deleteGalleryItem(item.imageId || item.id);
    await loadData();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-accent uppercase tracking-wider block">
            Media Management
          </span>
          <h1 className="text-2xl font-bold text-primary font-sans mt-0.5">
            Gallery Photographs ({images.length})
          </h1>
          <p className="text-xs text-slate-500">
            Control visual portfolio, facilities, warehouse stock, and equipment photography.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary hover:bg-primary-light text-white text-xs font-semibold rounded-lg shadow-sm transition-colors self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 text-accent" />
          <span>Upload Image</span>
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {images.map((item) => (
          <div
            key={item.imageId || item.id}
            className="group bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs relative flex flex-col justify-between"
          >
            <div className="h-44 bg-slate-100 overflow-hidden relative">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-2 left-2 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-semibold px-2 py-0.5 rounded">
                {item.category}
              </span>
            </div>

            <div className="p-3.5 flex items-center justify-between">
              <div className="max-w-[75%]">
                <h4 className="text-xs font-bold text-primary truncate">{item.title}</h4>
                <p className="text-[10px] text-slate-400 truncate">{item.description || 'Facility visual'}</p>
              </div>
              <button
                type="button"
                onClick={() => handleDelete(item)}
                className="p-1.5 text-slate-400 hover:text-rose-600 rounded"
                title="Delete image"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="relative bg-white rounded-2xl shadow-xl max-w-md w-full p-6 text-left border border-slate-200">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-base font-bold text-primary mb-1">Upload Gallery Image</h3>
            <p className="text-xs text-slate-500 mb-5">Provide media title, category, and photo.</p>

            <form onSubmit={handleSave} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Image Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none"
                  placeholder="e.g. Coimbatore Foundry Yard"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none bg-white"
                >
                  <option value="Manufacturing">Manufacturing</option>
                  <option value="Warehousing">Warehousing</option>
                  <option value="Products">Products</option>
                  <option value="Logistics">Logistics</option>
                  <option value="Trading">Trading</option>
                  <option value="Quality">Quality</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Image Description (Optional)</label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none"
                  placeholder="Short note about the photo..."
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Image File / URL</label>
                <div className="flex items-center gap-2">
                  <input
                    type="url"
                    required
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="flex-1 px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none"
                    placeholder="https://..."
                  />
                  <label className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg cursor-pointer inline-flex items-center gap-1 border border-slate-300">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload</span>
                    <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
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
                  {isSubmitting ? 'Saving...' : 'Add Photo'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

