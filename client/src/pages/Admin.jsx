import { useState, useEffect, useMemo, useRef } from 'react';
import { Lock, Trash2, Edit3, Save, X, Eye, EyeOff, Plus, ChevronLeft, ChevronRight, Upload, Film } from 'lucide-react';
import Toast from '../components/Toast';

const CATEGORIES = [
  'New Arrivals', 'Ice Cream Elite', 'Ice Cream Premium', 'Shakes',
  'Popsicles', 'Toppings', 'Sundaes', 'Boba Cup', 'Chillers',
  'Desserts', 'Kids Corner', 'Super Cup'
];

const ICE_CREAM_CATEGORIES = ['Ice Cream Elite', 'Ice Cream Premium'];

const CATEGORY_COLORS = {
  'New Arrivals': 'bg-amber-100 text-amber-700 border-amber-300',
  'Ice Cream Elite': 'bg-purple-100 text-purple-700 border-purple-300',
  'Ice Cream Premium': 'bg-pink-100 text-pink-700 border-pink-300',
  'Shakes': 'bg-blue-100 text-blue-700 border-blue-300',
  'Popsicles': 'bg-green-100 text-green-700 border-green-300',
  'Toppings': 'bg-yellow-100 text-yellow-700 border-yellow-300',
  'Sundaes': 'bg-rose-100 text-rose-700 border-rose-300',
  'Boba Cup': 'bg-violet-100 text-violet-700 border-violet-300',
  'Chillers': 'bg-cyan-100 text-cyan-700 border-cyan-300',
  'Desserts': 'bg-orange-100 text-orange-700 border-orange-300',
  'Kids Corner': 'bg-indigo-100 text-indigo-700 border-indigo-300',
  'Super Cup': 'bg-teal-100 text-teal-700 border-teal-300',
};

export default function Admin() {
  const [token, setToken] = useState(localStorage.getItem('melado-admin-token'));
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [items, setItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState('Popsicles');
  const [editingItem, setEditingItem] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [showVideos, setShowVideos] = useState(false);
  const fileInputRef = useRef(null);

  const [videos, setVideos] = useState([]);
  const [videoTitle, setVideoTitle] = useState('');
  const [videoFile, setVideoFile] = useState(null);
  const [uploadingVideo, setUploadingVideo] = useState(false);
  const videoInputRef = useRef(null);

  const emptyForm = {
    name: '', category: 'Popsicles', description: '',
    singlePrice: 0, prices: { cup: 0, cone: 0, tub: 0 },
    image: '', available: true, featured: false, isNew: false, order: 0
  };
  const [formData, setFormData] = useState(emptyForm);

  const categoryCounts = useMemo(() => {
    const counts = {};
    CATEGORIES.forEach(c => { counts[c] = 0; });
    items.forEach(item => { if (counts[item.category] !== undefined) counts[item.category]++; });
    return counts;
  }, [items]);

  const filteredItems = useMemo(() => {
    return items.filter(item => item.category === activeCategory).sort((a, b) => a.order - b.order);
  }, [items, activeCategory]);

  useEffect(() => { if (token) fetchItems(); }, [token]);
  useEffect(() => { setFormData(prev => ({ ...prev, category: activeCategory })); }, [activeCategory]);
  useEffect(() => { if (token) fetchVideos(); }, [token]);
  useEffect(() => { if (showVideos && token) fetchVideos(); }, [showVideos, token]);

  async function handleLogin(e) {
    e.preventDefault(); setLoading(true); setMessage('');
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginForm)
      });
      const data = await res.json();
      if (res.ok) { setToken(data.token); localStorage.setItem('melado-admin-token', data.token); }
      else setToast({ message: data.message || 'Login failed', type: 'error' });
    } catch { setToast({ message: 'Connection error — is the server running?', type: 'error' }); }
    setLoading(false);
  }

  async function fetchItems() {
    try { const res = await fetch('/api/menu'); setItems(await res.json()); } catch { setToast({ message: 'Failed to load items', type: 'error' }); }
  }

  async function fetchVideos() {
    try { const res = await fetch('/api/videos'); setVideos(await res.json()); } catch {}
  }

  async function handleVideoUpload(e) {
    e.preventDefault();
    if (!videoFile || !videoTitle.trim()) { setToast({ message: 'Enter a title and select a video', type: 'error' }); return; }
    setUploadingVideo(true);
    const body = new FormData();
    body.append('video', videoFile);
    body.append('title', videoTitle);
    try {
      const res = await fetch('/api/videos', {
        method: 'POST', headers: { Authorization: `Bearer ${token}` }, body
      });
      if (res.ok) {
        setMessage('Video uploaded!');
        setVideoTitle(''); setVideoFile(null);
        if (videoInputRef.current) videoInputRef.current.value = '';
        fetchVideos();
      } else { const d = await res.json(); setMessage(d.message || 'Upload failed'); }
    } catch { setMessage('Upload error'); }
    setUploadingVideo(false);
  }

  async function handleDeleteVideo(id) {
    if (!window.confirm('Delete this video?')) return;
    try {
      await fetch(`/api/videos/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
      setMessage('Video deleted!'); fetchVideos();
    } catch { setMessage('Error deleting'); }
  }

  async function handleImageUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true); setMessage('');
    const body = new FormData();
    body.append('image', file);
    try {
      const res = await fetch('/api/upload', {
        method: 'POST', headers: { Authorization: `Bearer ${token}` }, body
      });
      const data = await res.json();
      if (res.ok) {
        setFormData(prev => ({ ...prev, image: data.url }));
        setImagePreview(data.url);
        setMessage('Image uploaded!');
      } else { setMessage(data.message || 'Upload failed'); }
    } catch { setMessage('Upload error'); }
    setUploading(false);
  }

  function removeImage() {
    setFormData(prev => ({ ...prev, image: '' }));
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  }

  async function handleSave(e) {
    e.preventDefault(); setLoading(true); setMessage('');
    const method = editingItem ? 'PUT' : 'POST';
    const url = editingItem ? `/api/menu/${editingItem._id}` : '/api/menu';
    try {
      const res = await fetch(url, {
        method, headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setMessage(editingItem ? 'Item updated!' : 'Item added!');
        setEditingItem(null); setShowAddForm(false);
        setFormData({ ...emptyForm, category: activeCategory });
        setImagePreview(null);
        fetchItems();
      } else { const d = await res.json(); setMessage(d.message || 'Error'); }
    } catch { setMessage('Connection error'); }
    setLoading(false);
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this item?')) return;
    try {
      await fetch(`/api/menu/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
      setMessage('Deleted!'); fetchItems();
    } catch { setMessage('Error deleting'); }
  }

  function handleEdit(item) {
    setEditingItem(item);
    setShowAddForm(true);
    setFormData({
      name: item.name, category: item.category, description: item.description || '',
      singlePrice: item.singlePrice || 0, prices: item.prices || { cup: 0, cone: 0, tub: 0 },
      image: item.image || '', available: item.available, featured: item.featured,
      isNew: item.isNew || false, order: item.order || 0
    });
    setImagePreview(item.image || null);
    setActiveCategory(item.category);
  }

  function startAddNew() {
    setEditingItem(null);
    setFormData({ ...emptyForm, category: activeCategory });
    setImagePreview(null);
    setShowAddForm(true);
  }

  function cancelForm() {
    setEditingItem(null); setShowAddForm(false);
    setFormData({ ...emptyForm, category: activeCategory });
    setImagePreview(null);
  }

  function logout() {
    setToken(null); localStorage.removeItem('melado-admin-token');
    setItems([]); setShowAddForm(false); setEditingItem(null);
  }

  const isIceCream = ICE_CREAM_CATEGORIES.includes(formData.category);

  if (!token) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F8789C] to-[#6C3439] flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
          <div className="text-center mb-6">
            <img src="/images/Logo.jpg" alt="Melado" className="h-14 w-auto rounded-lg mx-auto mb-3 shadow" />
            <h1 className="font-heading font-bold text-2xl text-[#6C3439]">Admin Panel</h1>
            <p className="font-body text-[#6C3439]/50 text-sm">Melado Menu Management</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="font-body text-sm text-[#6C3439]/70 mb-1 block">Username</label>
              <input type="text" value={loginForm.username} onChange={e => setLoginForm({ ...loginForm, username: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-[#F8789C]/30 focus:border-[#F8789C] focus:ring-2 focus:ring-[#F8789C]/20 outline-none font-body transition" required />
            </div>
            <div>
              <label className="font-body text-sm text-[#6C3439]/70 mb-1 block">Password</label>
              <div className="relative">
                <input type={showPassword ? 'text' : 'password'} value={loginForm.password}
                  onChange={e => setLoginForm({ ...loginForm, password: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-[#F8789C]/30 focus:border-[#F8789C] focus:ring-2 focus:ring-[#F8789C]/20 outline-none font-body pr-10 transition" required />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6C3439]/40 hover:text-[#6C3439]/70 transition">
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            {message && <p className="text-red-500 text-sm font-body bg-red-50 p-2 rounded-lg">{message}</p>}
            <button type="submit" disabled={loading}
              className="w-full bg-gradient-to-r from-[#F8789C] to-[#6C3439] text-white font-heading font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition shadow-lg">
              <Lock size={16} /> {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex overflow-hidden">
      <aside
        className="bg-white border-r border-gray-200 flex flex-col shrink-0 overflow-hidden transition-all duration-300 ease-in-out"
        style={{ width: sidebarOpen ? '256px' : '0px', opacity: sidebarOpen ? 1 : 0, minWidth: sidebarOpen ? '256px' : '0px' }}
      >
        <div className="p-4 border-b border-gray-200" style={{ minWidth: '256px' }}>
          <div className="flex items-center gap-3">
            <img src="/images/Logo.jpg" alt="Melado" className="h-9 w-auto rounded" />
            <div>
              <h1 className="font-heading font-bold text-base text-[#6C3439]">Menu Manager</h1>
              <p className="text-xs text-gray-400">{items.length} items total</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto p-2 space-y-0.5" style={{ minWidth: '256px' }}>
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => { setShowVideos(false); setActiveCategory(cat); setFormData(prev => ({ ...prev, category: cat })); }}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-body flex items-center justify-between transition-all duration-200
                ${!showVideos && activeCategory === cat
                  ? 'bg-gradient-to-r from-[#F8789C] to-[#6C3439] text-white font-semibold shadow'
                  : 'text-gray-600 hover:bg-gray-100'}`}>
              <span className="truncate">{cat}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                !showVideos && activeCategory === cat ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'
              }`}>
                {categoryCounts[cat]}
              </span>
            </button>
          ))}

          <div className="border-t border-gray-200 my-2" />

          <button onClick={() => { setShowVideos(true); cancelForm(); }}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-body flex items-center gap-2 transition-all duration-200
              ${showVideos
                ? 'bg-gradient-to-r from-[#F8789C] to-[#6C3439] text-white font-semibold shadow'
                : 'text-gray-600 hover:bg-gray-100'}`}>
            <Film size={16} />
            <span>Videos</span>
            <span className={`ml-auto text-xs px-2 py-0.5 rounded-full font-bold ${
              showVideos ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'
            }`}>
              {videos.length}
            </span>
          </button>
        </nav>

        <div className="p-3 border-t border-gray-200 space-y-2" style={{ minWidth: '256px' }}>
          <a href="/" className="block text-center text-xs text-gray-400 hover:text-[#F8789C] transition">View Site</a>
          <button onClick={logout}
            className="w-full text-center text-xs text-red-400 hover:text-red-600 font-semibold transition py-1">
            Logout
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3">
          <button onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 transition-all duration-200">
            {sidebarOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
          </button>

          <div className="flex-1">
            <h2 className="font-heading font-bold text-lg text-[#6C3439]">{showVideos ? 'Videos' : activeCategory}</h2>
            <p className="text-xs text-gray-400">{showVideos ? `${videos.length} videos` : `${filteredItems.length} items`}</p>
          </div>

          {showVideos ? (
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold border bg-indigo-100 text-indigo-700 border-indigo-300">
              Videos
            </span>
          ) : (
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${CATEGORY_COLORS[activeCategory] || 'bg-gray-100 text-gray-600 border-gray-300'}`}>
              {activeCategory}
            </span>
          )}

          {!showVideos && (
            <button onClick={startAddNew}
              className="bg-gradient-to-r from-[#F8789C] to-[#6C3439] text-white font-heading font-bold text-sm px-4 py-2 rounded-xl flex items-center gap-1.5 hover:opacity-90 transition shadow">
              <Plus size={14} /> Add Item
            </button>
          )}
        </header>

        {message && (
          <div className={`mx-4 mt-3 px-4 py-2 rounded-lg text-sm font-body ${
            message.includes('Error') || message.includes('error') || message.includes('failed')
              ? 'bg-red-50 text-red-600 border border-red-200'
              : 'bg-green-50 text-green-600 border border-green-200'
          }`}>
            {message}
            <button onClick={() => setMessage('')} className="ml-2 font-bold">×</button>
          </div>
        )}

        {showAddForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={cancelForm} />

            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                <h3 className="font-heading font-bold text-[#6C3439] text-lg">
                  {editingItem ? `Edit: ${editingItem.name}` : `Add to ${activeCategory}`}
                </h3>
                <button onClick={cancelForm} className="p-1 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-red-500 transition">
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSave} className="p-5 space-y-4">
                <div>
                  <label className="text-xs font-body text-gray-500 mb-1 block">Item Name *</label>
                  <input type="text" placeholder="e.g. Strawberry Popsicle" value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:border-[#F8789C] focus:ring-2 focus:ring-[#F8789C]/20 outline-none text-sm font-body transition" required />
                </div>

                {isIceCream ? (
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="text-xs font-body text-gray-500 mb-1 block">Cup (Rs.)</label>
                      <input type="number" placeholder="200" value={formData.prices.cup}
                        onChange={e => setFormData({ ...formData, prices: { ...formData.prices, cup: Number(e.target.value) }, singlePrice: Number(e.target.value) })}
                        className="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:border-[#F8789C] focus:ring-2 focus:ring-[#F8789C]/20 outline-none text-sm font-body transition" />
                    </div>
                    <div>
                      <label className="text-xs font-body text-gray-500 mb-1 block">Cone (Rs.)</label>
                      <input type="number" placeholder="220" value={formData.prices.cone}
                        onChange={e => setFormData({ ...formData, prices: { ...formData.prices, cone: Number(e.target.value) } })}
                        className="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:border-[#F8789C] focus:ring-2 focus:ring-[#F8789C]/20 outline-none text-sm font-body transition" />
                    </div>
                    <div>
                      <label className="text-xs font-body text-gray-500 mb-1 block">Tub (Rs.)</label>
                      <input type="number" placeholder="650" value={formData.prices.tub}
                        onChange={e => setFormData({ ...formData, prices: { ...formData.prices, tub: Number(e.target.value) } })}
                        className="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:border-[#F8789C] focus:ring-2 focus:ring-[#F8789C]/20 outline-none text-sm font-body transition" />
                    </div>
                  </div>
                ) : (
                  <div>
                    <label className="text-xs font-body text-gray-500 mb-1 block">Price (Rs.) *</label>
                    <input type="number" placeholder="150" value={formData.singlePrice}
                      onChange={e => setFormData({ ...formData, singlePrice: Number(e.target.value) })}
                      className="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:border-[#F8789C] focus:ring-2 focus:ring-[#F8789C]/20 outline-none text-sm font-body transition" required />
                  </div>
                )}

                <div>
                  <label className="text-xs font-body text-gray-500 mb-1 block">Image</label>
                  <input type="file" ref={fileInputRef} accept="image/*" onChange={handleImageUpload}
                    className="hidden" id="imageUpload" />
                  {imagePreview ? (
                    <div className="relative w-full h-40 rounded-lg border border-gray-200 overflow-hidden group">
                      <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                      <button type="button" onClick={removeImage}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition shadow">
                        <X size={14} />
                      </button>
                    </div>
                  ) : (
                    <label htmlFor="imageUpload"
                      className="flex flex-col items-center justify-center w-full h-40 rounded-lg border-2 border-dashed border-gray-200 hover:border-[#F8789C] cursor-pointer transition bg-gray-50 hover:bg-[#F8789C]/5">
                      {uploading ? (
                        <span className="text-sm text-gray-400">Uploading...</span>
                      ) : (
                        <>
                          <Upload size={24} className="text-gray-400 mb-2" />
                          <span className="text-sm text-gray-400">Click to upload image</span>
                        </>
                      )}
                    </label>
                  )}
                </div>

                <div className="flex items-center gap-5">
                  {['available', 'featured', 'isNew'].map(key => (
                    <label key={key} className="flex items-center gap-2 cursor-pointer select-none">
                      <input type="checkbox" checked={formData[key]}
                        onChange={e => setFormData({ ...formData, [key]: e.target.checked })}
                        className="w-4 h-4 accent-[#F8789C] rounded" />
                      <span className="font-body text-sm text-gray-600 capitalize">{key === 'isNew' ? 'New Arrival' : key}</span>
                    </label>
                  ))}
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
                  <button type="submit" disabled={loading}
                    className="flex-1 bg-gradient-to-r from-[#F8789C] to-[#6C3439] text-white font-heading font-bold text-sm py-2.5 rounded-xl flex items-center justify-center gap-1.5 hover:opacity-90 transition shadow">
                    <Save size={14} /> {loading ? 'Saving...' : editingItem ? 'Update Item' : 'Add Item'}
                  </button>
                  <button type="button" onClick={cancelForm}
                    className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-500 text-sm font-body hover:bg-gray-50 transition">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <main className="flex-1 overflow-y-auto p-4">
          {showVideos ? (
            <div className="max-w-2xl mx-auto">
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 mb-5">
                <h3 className="font-heading font-bold text-[#6C3439] mb-4">Upload Video</h3>
                <form onSubmit={handleVideoUpload} className="space-y-3">
                  <div>
                    <label className="text-xs font-body text-gray-500 mb-1 block">Video Title *</label>
                    <input type="text" placeholder="e.g. Melado Promo 2024" value={videoTitle}
                      onChange={e => setVideoTitle(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:border-[#F8789C] focus:ring-2 focus:ring-[#F8789C]/20 outline-none text-sm font-body transition" required />
                  </div>
                  <div>
                    <label className="text-xs font-body text-gray-500 mb-1 block">Video File *</label>
                    <input type="file" ref={videoInputRef} accept="video/mp4,video/webm,video/mov"
                      onChange={e => setVideoFile(e.target.files[0])}
                      className="w-full text-sm text-gray-500 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-heading file:font-bold file:bg-[#F8789C]/10 file:text-[#F8789C] hover:file:bg-[#F8789C]/20 transition" required />
                  </div>
                  <button type="submit" disabled={uploadingVideo}
                    className="bg-gradient-to-r from-[#F8789C] to-[#6C3439] text-white font-heading font-bold text-sm px-5 py-2.5 rounded-xl flex items-center gap-1.5 hover:opacity-90 transition shadow">
                    <Upload size={14} /> {uploadingVideo ? 'Uploading...' : 'Upload Video'}
                  </button>
                </form>
              </div>

              {videos.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-xl border border-gray-100">
                  <Film size={40} className="mx-auto text-gray-300 mb-3" />
                  <h3 className="font-heading font-bold text-lg text-gray-400">No videos yet</h3>
                  <p className="text-sm text-gray-400 mt-1">Upload your first video above</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {videos.map(video => (
                    <div key={video._id} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden flex">
                      <video src={video.url} className="w-40 h-24 object-cover shrink-0 bg-black" muted />
                      <div className="flex-1 p-3 flex items-center justify-between">
                        <div>
                          <h4 className="font-heading font-bold text-sm text-[#6C3439]">{video.title}</h4>
                          <p className="text-xs text-gray-400 mt-0.5">{video.url.split('/').pop()}</p>
                        </div>
                        <button onClick={() => handleDeleteVideo(video._id)}
                          className="p-2 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-5xl mb-4">🍦</div>
              <h3 className="font-heading font-bold text-lg text-gray-400 mb-1">No items yet</h3>
              <p className="text-sm text-gray-400 mb-4">Add your first item to {activeCategory}</p>
              <button onClick={startAddNew}
                className="bg-gradient-to-r from-[#F8789C] to-[#6C3439] text-white font-heading font-bold text-sm px-5 py-2.5 rounded-xl inline-flex items-center gap-1.5 hover:opacity-90 transition shadow">
                <Plus size={14} /> Add Item
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
              {filteredItems.map(item => (
                <div key={item._id} className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition overflow-hidden group">
                  {item.image && (
                    <div className="h-36 bg-gray-100 overflow-hidden">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                    </div>
                  )}
                  <div className="p-3">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h4 className="font-heading font-bold text-sm text-[#6C3439] leading-tight">{item.name}</h4>
                      <span className={`shrink-0 text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                        item.available ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-500'
                      }`}>
                        {item.available ? 'ON' : 'OFF'}
                      </span>
                    </div>

                    <div className="text-xs text-gray-400 mb-2">
                      {ICE_CREAM_CATEGORIES.includes(item.category) ? (
                        <span>Cup Rs.{item.prices?.cup || 0} · Cone Rs.{item.prices?.cone || 0} · Tub Rs.{item.prices?.tub || 0}</span>
                      ) : (
                        <span className="font-heading font-bold text-[#F8789C]">Rs. {item.singlePrice || 0}</span>
                      )}
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button onClick={() => handleEdit(item)}
                        className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg bg-gray-50 hover:bg-blue-50 text-gray-500 hover:text-blue-600 text-xs font-body transition">
                        <Edit3 size={12} /> Edit
                      </button>
                      <button onClick={() => handleDelete(item._id)}
                        className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg bg-gray-50 hover:bg-red-50 text-gray-500 hover:text-red-500 text-xs font-body transition">
                        <Trash2 size={12} /> Delete
                      </button>
                      {item.featured && (
                        <span className="text-[10px] bg-amber-100 text-amber-600 px-1.5 py-0.5 rounded-full font-bold">★</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
