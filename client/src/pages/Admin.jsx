import { useState, useEffect, useMemo, useRef } from 'react';
import { Lock, Trash2, Edit3, Save, X, Eye, EyeOff, Plus, ChevronLeft, ChevronRight, Upload, Film, Home, LayoutGrid, Star, GripVertical } from 'lucide-react';
import Toast from '../components/Toast';

const ICE_CREAM_CATEGORIES = ['Ice Cream Elite', 'Ice Cream Premium'];

export default function Admin() {
  const [token, setToken] = useState(localStorage.getItem('melado-admin-token'));
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [items, setItems] = useState([]);
  const [sections, setSections] = useState([]);
  const [activeTab, setActiveTab] = useState('hero');
  const [editingItem, setEditingItem] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState(null);
  const [confirmDialogClosing, setConfirmDialogClosing] = useState(false);
  const fileInputRef = useRef(null);

  const [videos, setVideos] = useState([]);
  const [videoTitle, setVideoTitle] = useState('');
  const [videoFile, setVideoFile] = useState(null);
  const [uploadingVideo, setUploadingVideo] = useState(false);
  const videoInputRef = useRef(null);

  const [showAddSection, setShowAddSection] = useState(false);
  const [newSectionHeading, setNewSectionHeading] = useState('');
  const [newSectionSubheading, setNewSectionSubheading] = useState('');
  const [dragIndex, setDragIndex] = useState(null);

  const [heroBanners, setHeroBanners] = useState(null);
  const [uploadingDesktop, setUploadingDesktop] = useState(false);
  const [uploadingMobile, setUploadingMobile] = useState(false);

  const [carouselCategories, setCarouselCategories] = useState([]);
  const [catHeading, setCatHeading] = useState('');
  const [catImage, setCatImage] = useState(null);
  const [catImagePreview, setCatImagePreview] = useState(null);
  const [uploadingCatImage, setUploadingCatImage] = useState(false);
  const [editingCatId, setEditingCatId] = useState(null);
  const catFileInputRef = useRef(null);

  const activeSection = sections.find(s => s._id === activeTab) || null;
  const isHeroView = activeTab === 'hero';
  const isCategoriesView = activeTab === 'categories';
  const isPopularView = activeTab === 'popular';
  const isSectionView = !isHeroView && !isCategoriesView && !isPopularView;

  function closeConfirmDialog() {
    setConfirmDialogClosing(true);
    setTimeout(() => {
      setConfirmDialog(null);
      setConfirmDialogClosing(false);
    }, 200);
  }

  const emptyForm = {
    name: '', category: activeSection?.heading || '', description: '',
    singlePrice: 0, prices: { cup: 0, cone: 0, tub: 0 },
    image: '', available: true, featured: false, isNew: false, order: 0
  };
  const [formData, setFormData] = useState(emptyForm);

  const categoryCounts = useMemo(() => {
    const counts = {};
    sections.forEach(s => { counts[s.heading] = 0; });
    items.forEach(item => { if (counts[item.category] !== undefined) counts[item.category]++; });
    return counts;
  }, [items, sections]);

  const filteredItems = useMemo(() => {
    if (!isSectionView) return [];
    return items.filter(item => item.category === activeSection?.heading).sort((a, b) => a.order - b.order);
  }, [items, activeSection, isSectionView]);

  const featuredItems = useMemo(() => {
    return items.filter(item => item.featured);
  }, [items]);

  useEffect(() => { if (token) { fetchItems(); fetchSections(); fetchVideos(); fetchCarouselCategories(); fetchHeroBanners(); } }, [token]);

  function switchTab(tab) {
    setActiveTab(tab);
    setShowAddForm(false);
    setEditingItem(null);
    setFormData(prev => ({ ...emptyForm, category: tab === 'hero' ? '' : sections.find(s => s._id === tab)?.heading || '' }));
    setImagePreview(null);
  }

  async function handleLogin(e) {
    e.preventDefault(); setLoading(true); setToast(null);
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
    try { const res = await fetch('/api/menu'); if (res.ok) setItems(await res.json()); else setItems([]); } catch { setToast({ message: 'Failed to load items', type: 'error' }); setItems([]); }
  }

  async function fetchSections() {
    try { const res = await fetch('/api/sections'); if (res.ok) setSections(await res.json()); else setSections([]); } catch { setSections([]); }
  }

  async function fetchVideos() {
    try { const res = await fetch('/api/videos'); if (res.ok) setVideos(await res.json()); else setVideos([]); } catch { setVideos([]); }
  }

  async function fetchCarouselCategories() {
    try { const res = await fetch('/api/carousel-categories'); if (res.ok) setCarouselCategories(await res.json()); else setCarouselCategories([]); } catch { setCarouselCategories([]); }
  }

  async function fetchHeroBanners() {
    try { const res = await fetch('/api/hero'); if (res.ok) setHeroBanners(await res.json()); else setHeroBanners(null); } catch { setHeroBanners(null); }
  }

  async function uploadHeroBanner(type) {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async () => {
      const file = input.files[0];
      if (!file) return;
      if (type === 'desktop') setUploadingDesktop(true); else setUploadingMobile(true);
      const body = new FormData();
      body.append('image', file);
      try {
        const res = await fetch('/api/upload', {
          method: 'POST', headers: { Authorization: `Bearer ${token}` }, body
        });
        const data = await res.json();
        if (res.ok) {
          const update = type === 'desktop' ? { desktopBanner: data.url } : { mobileBanner: data.url };
          await fetch('/api/hero', {
            method: 'PUT', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
            body: JSON.stringify(update)
          });
          setToast({ message: `${type === 'desktop' ? 'Desktop' : 'Mobile'} banner updated!`, type: 'success' });
          fetchHeroBanners();
        } else { setToast({ message: data.message || 'Upload failed', type: 'error' }); }
      } catch { setToast({ message: 'Upload error', type: 'error' }); }
      if (type === 'desktop') setUploadingDesktop(false); else setUploadingMobile(false);
    };
    input.click();
  }

  async function handleAddSection(e) {
    e.preventDefault();
    if (!newSectionHeading.trim()) { setToast({ message: 'Section heading is required', type: 'error' }); return; }
    try {
      const res = await fetch('/api/sections', {
        method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ heading: newSectionHeading.trim(), subheading: newSectionSubheading.trim() })
      });
      if (res.ok) {
        setToast({ message: `Section "${newSectionHeading}" added!`, type: 'success' });
        setShowAddSection(false);
        setNewSectionHeading('');
        setNewSectionSubheading('');
        fetchSections();
      } else { const d = await res.json(); setToast({ message: d.message || 'Failed to add section', type: 'error' }); }
    } catch { setToast({ message: 'Connection error', type: 'error' }); }
  }

  async function handleDeleteSection(section) {
    setConfirmDialog({
      title: `Delete "${section.heading}"?`,
      message: `Items in this section will be moved to "Uncategorized".`,
      onConfirm: async () => {
        closeConfirmDialog();
        try {
          await fetch(`/api/sections/${section._id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
          setToast({ message: 'Section deleted!', type: 'error' });
          if (activeTab === section._id) switchTab('hero');
          fetchSections(); fetchItems();
        } catch { setToast({ message: 'Error deleting section', type: 'error' }); }
      }
    });
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
        setToast({ message: 'Video uploaded!', type: 'success' });
        setVideoTitle(''); setVideoFile(null);
        if (videoInputRef.current) videoInputRef.current.value = '';
        fetchVideos();
      } else { const d = await res.json(); setToast({ message: d.message || 'Upload failed', type: 'error' }); }
    } catch { setToast({ message: 'Upload error', type: 'error' }); }
    setUploadingVideo(false);
  }

  async function handleDeleteVideo(id) {
    setConfirmDialog({
      title: 'Delete Video?',
      message: 'This action cannot be undone.',
      onConfirm: async () => {
        closeConfirmDialog();
        try {
          await fetch(`/api/videos/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
          setToast({ message: 'Video deleted!', type: 'error' }); fetchVideos();
        } catch { setToast({ message: 'Error deleting video', type: 'error' }); }
      }
    });
  }

  async function handleImageUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
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
        setToast({ message: 'Image uploaded!', type: 'success' });
      } else { setToast({ message: data.message || 'Upload failed', type: 'error' }); }
    } catch { setToast({ message: 'Upload error', type: 'error' }); }
    setUploading(false);
  }

  function removeImage() {
    setFormData(prev => ({ ...prev, image: '' }));
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  }

  async function handleCatImageUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    setUploadingCatImage(true);
    const body = new FormData();
    body.append('image', file);
    try {
      const res = await fetch('/api/upload', {
        method: 'POST', headers: { Authorization: `Bearer ${token}` }, body
      });
      const data = await res.json();
      if (res.ok) {
        setCatImage(data.url);
        setCatImagePreview(data.url);
      } else { setToast({ message: data.message || 'Upload failed', type: 'error' }); }
    } catch { setToast({ message: 'Upload error', type: 'error' }); }
    setUploadingCatImage(false);
  }

  function resetCatForm() {
    setCatHeading('');
    setCatImage(null);
    setCatImagePreview(null);
    setEditingCatId(null);
    if (catFileInputRef.current) catFileInputRef.current.value = '';
  }

  async function handleSaveCategory(e) {
    e.preventDefault();
    if (!catHeading.trim() || !catImage) { setToast({ message: 'Heading and image are required', type: 'error' }); return; }
    const method = editingCatId ? 'PUT' : 'POST';
    const url = editingCatId ? `/api/carousel-categories/${editingCatId}` : '/api/carousel-categories';
    try {
      const res = await fetch(url, {
        method, headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ heading: catHeading.trim(), image: catImage })
      });
      if (res.ok) {
        setToast({ message: editingCatId ? 'Category updated!' : 'Category added!', type: 'success' });
        resetCatForm();
        fetchCarouselCategories();
      } else { const d = await res.json(); setToast({ message: d.message || 'Error', type: 'error' }); }
    } catch { setToast({ message: 'Connection error', type: 'error' }); }
  }

  function handleEditCategory(cat) {
    setEditingCatId(cat._id);
    setCatHeading(cat.heading);
    setCatImage(cat.image);
    setCatImagePreview(cat.image);
  }

  async function handleDeleteCategory(id) {
    setConfirmDialog({
      title: 'Delete Category?',
      message: 'This carousel category will be removed.',
      onConfirm: async () => {
        closeConfirmDialog();
        try {
          await fetch(`/api/carousel-categories/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
          setToast({ message: 'Category deleted!', type: 'error' });
          fetchCarouselCategories();
        } catch { setToast({ message: 'Error deleting', type: 'error' }); }
      }
    });
  }

  async function handleToggleFeatured(item) {
    try {
      await fetch(`/api/menu/${item._id}`, {
        method: 'PUT', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ featured: !item.featured })
      });
      fetchItems();
    } catch { setToast({ message: 'Error updating', type: 'error' }); }
  }

  async function handleSave(e) {
    e.preventDefault(); setLoading(true); setToast(null);
    const method = editingItem ? 'PUT' : 'POST';
    const url = editingItem ? `/api/menu/${editingItem._id}` : '/api/menu';
    try {
      const res = await fetch(url, {
        method, headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setToast({ message: editingItem ? 'Item updated!' : 'Item added!', type: 'success' });
        setEditingItem(null); setShowAddForm(false);
        setFormData({ ...emptyForm, category: activeSection?.heading || '' });
        setImagePreview(null);
        fetchItems();
      } else { const d = await res.json(); setToast({ message: d.message || 'Error', type: 'error' }); }
    } catch { setToast({ message: 'Connection error', type: 'error' }); }
    setLoading(false);
  }

  async function handleDelete(id) {
    setConfirmDialog({
      title: 'Delete Item?',
      message: 'This item will be permanently removed.',
      onConfirm: async () => {
        closeConfirmDialog();
        try {
          await fetch(`/api/menu/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
          setToast({ message: 'Item deleted!', type: 'error' }); fetchItems();
        } catch { setToast({ message: 'Error deleting', type: 'error' }); }
      }
    });
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
  }

  async function handleReorder(fromIndex, toIndex) {
    if (fromIndex === toIndex) return;
    const reordered = [...sections];
    const [moved] = reordered.splice(fromIndex, 1);
    reordered.splice(toIndex, 0, moved);
    const updated = reordered.map((s, i) => ({ ...s, order: i }));
    setSections(updated);
    try {
      await fetch('/api/sections/reorder', {
        method: 'PUT', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ orders: updated.map(s => ({ _id: s._id, order: s.order })) })
      });
    } catch {}
  }

  function startAddNew() {
    setEditingItem(null);
    setFormData({ ...emptyForm, category: activeSection?.heading || '' });
    setImagePreview(null);
    setShowAddForm(true);
  }

  function cancelForm() {
    setEditingItem(null); setShowAddForm(false);
    setFormData({ ...emptyForm, category: activeSection?.heading || '' });
    setImagePreview(null);
  }

  function logout() {
    setToken(null); localStorage.removeItem('melado-admin-token');
    setItems([]); setSections([]); setShowAddForm(false); setEditingItem(null);
  }

  const isActive = (tab) => {
    if (tab === activeTab) return true;
    if (tab === 'hero' && isHeroView) return true;
    return false;
  };

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
            {toast && toast.type === 'error' && <p className="text-red-500 text-sm font-body bg-red-50 p-2 rounded-lg">{toast.message}</p>}
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
    <>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      {confirmDialog && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 transition-opacity duration-200 ease-out"
          style={{ backgroundColor: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)', opacity: confirmDialogClosing ? 0 : 1 }}
          onClick={closeConfirmDialog}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 text-center transition-all duration-200 ease-out"
            style={{ opacity: confirmDialogClosing ? 0 : 1, transform: confirmDialogClosing ? 'scale(0.9) translateY(10px)' : 'scale(1) translateY(0)' }}
            onClick={e => e.stopPropagation()}>
            <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
              <Trash2 size={24} className="text-red-500" />
            </div>
            <h3 className="font-heading font-bold text-[#6C3439] text-lg mb-1">{confirmDialog.title}</h3>
            <p className="font-body text-gray-500 text-sm mb-6">{confirmDialog.message}</p>
            <div className="flex gap-3">
              <button onClick={closeConfirmDialog}
                className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-body text-sm font-semibold hover:bg-gray-50 transition">Cancel</button>
              <button onClick={confirmDialog.onConfirm}
                className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white font-body text-sm font-semibold transition shadow">Delete</button>
            </div>
          </div>
        </div>
      )}

      {showAddSection && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowAddSection(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <h3 className="font-heading font-bold text-[#6C3439] text-lg">Add New Section</h3>
              <button onClick={() => setShowAddSection(false)} className="p-1 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-red-500 transition"><X size={20} /></button>
            </div>
            <form onSubmit={handleAddSection} className="p-5 space-y-4">
              <div>
                <label className="text-xs font-body text-gray-500 mb-1 block">Section Heading *</label>
                <input type="text" placeholder="e.g. Popsicles" value={newSectionHeading}
                  onChange={e => setNewSectionHeading(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:border-[#F8789C] focus:ring-2 focus:ring-[#F8789C]/20 outline-none text-sm font-body transition" required />
              </div>
              <div>
                <label className="text-xs font-body text-gray-500 mb-1 block">Subheading (optional)</label>
                <input type="text" placeholder="e.g. Our delicious ice pops" value={newSectionSubheading}
                  onChange={e => setNewSectionSubheading(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:border-[#F8789C] focus:ring-2 focus:ring-[#F8789C]/20 outline-none text-sm font-body transition" />
              </div>
              <div className="flex items-center gap-2 pt-2">
                <button type="submit"
                  className="flex-1 bg-gradient-to-r from-[#F8789C] to-[#6C3439] text-white font-heading font-bold text-sm py-2.5 rounded-xl hover:opacity-90 transition shadow">
                  <Plus size={14} className="inline mr-1" /> Add Section</button>
                <button type="button" onClick={() => setShowAddSection(false)}
                  className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-500 text-sm font-body hover:bg-gray-50 transition">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showAddForm && isSectionView && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={cancelForm} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <h3 className="font-heading font-bold text-[#6C3439] text-lg">
                {editingItem ? `Edit: ${editingItem.name}` : `Add to ${activeSection?.heading}`}</h3>
              <button onClick={cancelForm} className="p-1 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-red-500 transition"><X size={20} /></button>
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
                <input type="file" ref={fileInputRef} accept="image/*" onChange={handleImageUpload} className="hidden" id="imageUpload" />
                {imagePreview ? (
                  <div className="relative w-full h-40 rounded-lg border border-gray-200 overflow-hidden group">
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                    <button type="button" onClick={removeImage}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition shadow"><X size={14} /></button>
                  </div>
                ) : (
                  <label htmlFor="imageUpload"
                    className="flex flex-col items-center justify-center w-full h-40 rounded-lg border-2 border-dashed border-gray-200 hover:border-[#F8789C] cursor-pointer transition bg-gray-50 hover:bg-[#F8789C]/5">
                    {uploading ? <span className="text-sm text-gray-400">Uploading...</span> : (
                      <><Upload size={24} className="text-gray-400 mb-2" /><span className="text-sm text-gray-400">Click to upload image</span></>
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
                  <Save size={14} /> {loading ? 'Saving...' : editingItem ? 'Update Item' : 'Add Item'}</button>
                <button type="button" onClick={cancelForm}
                  className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-500 text-sm font-body hover:bg-gray-50 transition">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="min-h-screen bg-gray-50">
        <aside
          className="fixed left-0 top-0 h-screen z-40 bg-white border-r border-gray-200 flex flex-col overflow-y-auto transition-all duration-300 ease-in-out"
          style={{ width: sidebarOpen ? '256px' : '0px', opacity: sidebarOpen ? 1 : 0 }}
        >
          <div className="p-4 border-b border-gray-200 shrink-0" style={{ minWidth: '256px' }}>
            <div className="flex items-center gap-3">
              <img src="/images/Logo.jpg" alt="Melado" className="h-9 w-auto rounded" />
              <div>
                <h1 className="font-heading font-bold text-base text-[#6C3439]">Admin Panel</h1>
                <p className="text-xs text-gray-400">{sections.length} sections</p>
              </div>
            </div>
          </div>

          <nav className="flex-1 overflow-y-auto p-2 space-y-0.5" style={{ minWidth: '256px' }}>
            <button onClick={() => switchTab('hero')}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-body flex items-center gap-2 transition-all duration-200 ${
                isHeroView ? 'bg-gradient-to-r from-[#F8789C] to-[#6C3439] text-white font-semibold shadow' : 'text-gray-600 hover:bg-gray-100'}`}>
              <Home size={16} /><span>Hero</span>
            </button>
            <button onClick={() => switchTab('categories')}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-body flex items-center gap-2 transition-all duration-200 ${
                isCategoriesView ? 'bg-gradient-to-r from-[#F8789C] to-[#6C3439] text-white font-semibold shadow' : 'text-gray-600 hover:bg-gray-100'}`}>
              <LayoutGrid size={16} /><span>Categories</span>
              <span className={`ml-auto text-xs px-2 py-0.5 rounded-full font-bold ${
                isCategoriesView ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'}`
              }>{carouselCategories.length}</span>
            </button>
            <button onClick={() => switchTab('popular')}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-body flex items-center gap-2 transition-all duration-200 ${
                isPopularView ? 'bg-gradient-to-r from-[#F8789C] to-[#6C3439] text-white font-semibold shadow' : 'text-gray-600 hover:bg-gray-100'}`}>
              <Star size={16} /><span>Popular Items</span>
              <span className={`ml-auto text-xs px-2 py-0.5 rounded-full font-bold ${
                isPopularView ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'}`
              }>{featuredItems.length}</span>
            </button>

            <div className="border-t border-gray-200 my-2" />

            {sections.map((section, idx) => (
              <div
                key={section._id}
                draggable
                onDragStart={() => setDragIndex(idx)}
                onDragOver={(e) => { e.preventDefault(); }}
                onDragEnd={() => setDragIndex(null)}
                onDrop={() => { handleReorder(dragIndex, idx); setDragIndex(null); }}
                className={`relative ${dragIndex === idx ? 'opacity-50' : ''}`}
              >
                <button onClick={() => switchTab(section._id)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm font-body flex items-center justify-between transition-all duration-200 ${
                    activeTab === section._id
                      ? 'bg-gradient-to-r from-[#F8789C] to-[#6C3439] text-white font-semibold shadow'
                      : 'text-gray-600 hover:bg-gray-100'}`}>
                  <GripVertical size={12} className="shrink-0 text-gray-300 mr-1" />
                  <span className="truncate">{section.heading}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-bold shrink-0 ml-2 ${
                    activeTab === section._id ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'
                  }`}>{categoryCounts[section.heading] || 0}</span>
                </button>
                {section.type !== 'hero' && (
                  <button onClick={() => handleDeleteSection(section)}
                    className="absolute right-8 top-1/2 -translate-y-1/2 p-1 rounded-md text-gray-300 hover:text-red-500 hover:bg-red-50 transition-all duration-200"
                    title="Delete section"><Trash2 size={13} /></button>
                )}
              </div>
            ))}

            <button onClick={() => setShowAddSection(true)}
              className="w-full text-left px-3 py-2 rounded-lg text-sm font-body flex items-center gap-2 text-gray-400 hover:text-[#F8789C] hover:bg-[#F8789C]/5 transition-all duration-200 border border-dashed border-gray-200 mt-1">
              <Plus size={14} /><span>Add Section</span>
            </button>
          </nav>

          <div className="p-3 border-t border-gray-200 space-y-2 shrink-0" style={{ minWidth: '256px' }}>
            <a href="/" className="block text-center text-xs text-gray-400 hover:text-[#F8789C] transition">View Site</a>
            <button onClick={logout}
              className="w-full text-center text-xs text-red-400 hover:text-red-600 font-semibold transition py-1">Logout</button>
          </div>
        </aside>

        <div className="min-h-screen flex flex-col transition-all duration-300 ease-in-out"
          style={{ marginLeft: sidebarOpen ? '256px' : '0px' }}
        >
          <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3">
            <button onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 transition-all duration-200">
              {sidebarOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
            </button>
            <div className="flex-1">
              <h2 className="font-heading font-bold text-lg text-[#6C3439]">
                {isHeroView ? 'Hero' : isCategoriesView ? 'Categories' : isPopularView ? 'Popular Items' : activeSection?.heading}
                {isSectionView && activeSection?.subheading && (
                  <span className="text-sm font-body text-gray-400 ml-2 font-normal">— {activeSection.subheading}</span>
                )}
              </h2>
              <p className="text-xs text-gray-400">
                {isHeroView ? `${videos.length} videos` : isCategoriesView ? `${carouselCategories.length} categories` : isPopularView ? `${featuredItems.length} items` : `${filteredItems.length} items`}
              </p>
            </div>
            {isSectionView && (
              <button onClick={startAddNew}
                className="bg-gradient-to-r from-[#F8789C] to-[#6C3439] text-white font-heading font-bold text-sm px-4 py-2 rounded-xl flex items-center gap-1.5 hover:opacity-90 transition shadow">
                <Plus size={14} /> Add Item</button>
            )}
          </header>

          <main className="flex-1 overflow-y-auto p-4">
            {isHeroView && (
              <div className="max-w-2xl mx-auto">
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 mb-5">
                  <h3 className="font-heading font-bold text-[#6C3439] mb-4">Hero Banners</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-body text-gray-500 mb-2 block">Desktop Banner</label>
                      <div className="rounded-lg border border-gray-200 overflow-hidden bg-gray-50 mb-2">
                        <img
                          src={heroBanners?.desktopBanner || '/images/DesktopBanner.jfif'}
                          alt="Desktop banner"
                          className="w-full h-28 object-cover"
                        />
                      </div>
                      <button onClick={() => uploadHeroBanner('desktop')} disabled={uploadingDesktop}
                        className="w-full text-center text-sm py-2 rounded-lg border border-dashed border-gray-200 text-gray-400 hover:text-[#F8789C] hover:border-[#F8789C] transition">
                        {uploadingDesktop ? 'Uploading...' : 'Change Desktop Banner'}</button>
                    </div>
                    <div>
                      <label className="text-xs font-body text-gray-500 mb-2 block">Mobile Banner</label>
                      <div className="rounded-lg border border-gray-200 overflow-hidden bg-gray-50 mb-2">
                        <img
                          src={heroBanners?.mobileBanner || '/images/MobileBanner.jpg'}
                          alt="Mobile banner"
                          className="w-full h-28 object-cover"
                        />
                      </div>
                      <button onClick={() => uploadHeroBanner('mobile')} disabled={uploadingMobile}
                        className="w-full text-center text-sm py-2 rounded-lg border border-dashed border-gray-200 text-gray-400 hover:text-[#F8789C] hover:border-[#F8789C] transition">
                        {uploadingMobile ? 'Uploading...' : 'Change Mobile Banner'}</button>
                    </div>
                  </div>
                </div>

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
                      <Upload size={14} /> {uploadingVideo ? 'Uploading...' : 'Upload Video'}</button>
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
                            className="p-2 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition"><Trash2 size={16} /></button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {isCategoriesView && (
              <div className="max-w-3xl mx-auto">
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 mb-5">
                  <h3 className="font-heading font-bold text-[#6C3439] mb-4">{editingCatId ? 'Edit Category' : 'Add Category'}</h3>
                  <form onSubmit={handleSaveCategory} className="space-y-3">
                    <div>
                      <label className="text-xs font-body text-gray-500 mb-1 block">Heading *</label>
                      <input type="text" placeholder="e.g. Deals" value={catHeading}
                        onChange={e => setCatHeading(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:border-[#F8789C] focus:ring-2 focus:ring-[#F8789C]/20 outline-none text-sm font-body transition" required />
                    </div>
                    <div>
                      <label className="text-xs font-body text-gray-500 mb-1 block">Image *</label>
                      <input type="file" ref={catFileInputRef} accept="image/*" onChange={handleCatImageUpload} className="hidden" id="catImageUpload" />
                      {catImagePreview ? (
                        <div className="flex items-center gap-3">
                          <img src={catImagePreview} alt="Preview" className="w-16 h-16 rounded-lg object-cover border" />
                          <span className="text-xs text-gray-400">Uploaded</span>
                          <button type="button" onClick={() => { setCatImage(null); setCatImagePreview(null); }}
                            className="text-xs text-red-500 hover:text-red-700">Remove</button>
                        </div>
                      ) : (
                        <label htmlFor="catImageUpload"
                          className="flex flex-col items-center justify-center w-full h-28 rounded-lg border-2 border-dashed border-gray-200 hover:border-[#F8789C] cursor-pointer transition bg-gray-50 hover:bg-[#F8789C]/5">
                          {uploadingCatImage ? <span className="text-sm text-gray-400">Uploading...</span> : (
                            <><Upload size={24} className="text-gray-400 mb-2" /><span className="text-sm text-gray-400">Click to upload image</span></>
                          )}
                        </label>
                      )}
                    </div>
                    <div className="flex items-center gap-2 pt-1">
                      <button type="submit"
                        className="bg-gradient-to-r from-[#F8789C] to-[#6C3439] text-white font-heading font-bold text-sm px-5 py-2.5 rounded-xl hover:opacity-90 transition shadow">
                        {editingCatId ? 'Update' : 'Add'} Category</button>
                      {editingCatId && (
                        <button type="button" onClick={resetCatForm}
                          className="px-4 py-2.5 rounded-xl border border-gray-200 text-gray-500 text-sm font-body hover:bg-gray-50 transition">Cancel</button>
                      )}
                    </div>
                  </form>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {carouselCategories.map(cat => (
                    <div key={cat._id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-3 text-center">
                      <img src={cat.image} alt={cat.heading} className="w-16 h-16 object-contain mx-auto mb-2" />
                      <h4 className="font-heading font-bold text-sm text-[#6C3439]">{cat.heading}</h4>
                      <div className="flex items-center justify-center gap-2 mt-2">
                        <button onClick={() => handleEditCategory(cat)}
                          className="p-1.5 rounded-lg hover:bg-blue-50 text-gray-400 hover:text-blue-600 transition"><Edit3 size={14} /></button>
                        <button onClick={() => handleDeleteCategory(cat._id)}
                          className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition"><Trash2 size={14} /></button>
                      </div>
                    </div>
                  ))}
                  {carouselCategories.length === 0 && (
                    <div className="col-span-full text-center py-10 text-gray-400 text-sm">No categories yet</div>
                  )}
                </div>
              </div>
            )}

            {isPopularView && (
              <div className="max-w-3xl mx-auto">
                {featuredItems.length === 0 ? (
                  <div className="text-center py-20 bg-white rounded-xl border border-gray-100">
                    <Star size={40} className="mx-auto text-gray-300 mb-3" />
                    <h3 className="font-heading font-bold text-lg text-gray-400">No popular items</h3>
                    <p className="text-sm text-gray-400 mt-1">Mark items as featured in their section to show here</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {featuredItems.map(item => (
                      <div key={item._id} className="bg-white rounded-xl border border-gray-100 shadow-sm px-4 py-3 flex items-center gap-3">
                        {item.image ? (
                          <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover shrink-0" />
                        ) : (
                          <div className="w-12 h-12 rounded-lg bg-gray-100 shrink-0 flex items-center justify-center text-gray-300 text-xs">No img</div>
                        )}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-heading font-bold text-sm text-[#6C3439] truncate">{item.name}</h4>
                          <p className="text-xs text-gray-400">{item.category} · Rs.{item.singlePrice || item.prices?.cup || 0}</p>
                        </div>
                        <button onClick={() => handleToggleFeatured(item)}
                          className={`p-1.5 rounded-lg transition ${item.featured ? 'text-amber-500 hover:text-amber-600' : 'text-gray-300 hover:text-gray-500'}`}
                          title="Remove from popular">
                          <Star size={16} className={item.featured ? 'fill-amber-500' : ''} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {isSectionView && filteredItems.length === 0 && !isHeroView && (
              <div className="text-center py-20">
                <div className="text-5xl mb-4">🍦</div>
                <h3 className="font-heading font-bold text-lg text-gray-400 mb-1">No items yet</h3>
                <p className="text-sm text-gray-400 mb-4">Add your first item to {activeSection?.heading}</p>
                <button onClick={startAddNew}
                  className="bg-gradient-to-r from-[#F8789C] to-[#6C3439] text-white font-heading font-bold text-sm px-5 py-2.5 rounded-xl inline-flex items-center gap-1.5 hover:opacity-90 transition shadow">
                  <Plus size={14} /> Add Item</button>
              </div>
            )}

            {isSectionView && filteredItems.length > 0 && (
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
                          item.available ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-500'}`}>
                          {item.available ? 'ON' : 'OFF'}</span>
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
                          <Edit3 size={12} /> Edit</button>
                        <button onClick={() => handleDelete(item._id)}
                          className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg bg-gray-50 hover:bg-red-50 text-gray-500 hover:text-red-500 text-xs font-body transition">
                          <Trash2 size={12} /> Delete</button>
                        {item.featured && <span className="text-[10px] bg-amber-100 text-amber-600 px-1.5 py-0.5 rounded-full font-bold">★</span>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </>
  );
}
