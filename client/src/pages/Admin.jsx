import { useState, useEffect } from 'react';
import { Lock, Trash2, Edit3, Save, X, Eye, EyeOff } from 'lucide-react';

const CATEGORIES = [
  'New Arrivals', 'Ice Cream Elite', 'Ice Cream Premium', 'Shakes',
  'Popsicles', 'Toppings', 'Sundaes', 'Boba Cup', 'Chillers',
  'Desserts', 'Kids Corner', 'Super Cup'
];

export default function Admin() {
  const [token, setToken] = useState(localStorage.getItem('melado-admin-token'));
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    name: '', category: 'Ice Cream Elite', description: '',
    singlePrice: 0, prices: { cup: 0, cone: 0, tub: 0 },
    image: '', available: true, featured: false, isNew: false, order: 0
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => { if (token) fetchItems(); }, [token]);

  async function handleLogin(e) {
    e.preventDefault(); setLoading(true);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginForm)
      });
      const data = await res.json();
      if (res.ok) { setToken(data.token); localStorage.setItem('melado-admin-token', data.token); }
      else setMessage(data.message || 'Login failed');
    } catch { setMessage('Connection error'); }
    setLoading(false);
  }

  async function fetchItems() {
    try { const res = await fetch('/api/menu'); setItems(await res.json()); } catch {}
  }

  async function handleSave(e) {
    e.preventDefault(); setLoading(true);
    const method = editingItem ? 'PUT' : 'POST';
    const url = editingItem ? `/api/menu/${editingItem._id}` : '/api/menu';
    try {
      const res = await fetch(url, {
        method, headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(formData)
      });
      if (res.ok) { setMessage(editingItem ? 'Item updated!' : 'Item created!'); setEditingItem(null); resetForm(); fetchItems(); }
      else { const d = await res.json(); setMessage(d.message || 'Error'); }
    } catch { setMessage('Connection error'); }
    setLoading(false);
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete?')) return;
    try { await fetch(`/api/menu/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } }); setMessage('Deleted'); fetchItems(); } catch { setMessage('Error'); }
  }

  function handleEdit(item) {
    setEditingItem(item);
    setFormData({ name: item.name, category: item.category, description: item.description || '', singlePrice: item.singlePrice || 0, prices: item.prices || { cup: 0, cone: 0, tub: 0 }, image: item.image || '', available: item.available, featured: item.featured, isNew: item.isNew || false, order: item.order || 0 });
  }

  function resetForm() {
    setFormData({ name: '', category: 'Ice Cream Elite', description: '', singlePrice: 0, prices: { cup: 0, cone: 0, tub: 0 }, image: '', available: true, featured: false, isNew: false, order: 0 });
  }

  function logout() { setToken(null); localStorage.removeItem('melado-admin-token'); setItems([]); }

  if (!token) {
    return (
      <div className="min-h-screen bg-melado-pink flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
          <div className="text-center mb-6">
            <img src="/images/Logo.jpg" alt="Melado" className="h-12 w-auto rounded mx-auto mb-3" />
            <h1 className="font-heading font-bold text-2xl text-melado-maroon">Admin Panel</h1>
            <p className="font-body text-melado-maroon/50 text-sm">Melado Menu Management</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="font-body text-sm text-melado-maroon/70 mb-1 block">Username</label>
              <input type="text" value={loginForm.username} onChange={e => setLoginForm({ ...loginForm, username: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-melado-pink focus:border-melado-red focus:outline-none font-body" required />
            </div>
            <div>
              <label className="font-body text-sm text-melado-maroon/70 mb-1 block">Password</label>
              <div className="relative">
                <input type={showPassword ? 'text' : 'password'} value={loginForm.password} onChange={e => setLoginForm({ ...loginForm, password: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-melado-pink focus:border-melado-red focus:outline-none font-body pr-10" required />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-melado-maroon/40">
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            {message && <p className="text-melado-red text-sm font-body">{message}</p>}
            <button type="submit" disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2">
              <Lock size={16} /> {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-melado-pink p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-heading font-bold text-2xl text-melado-maroon">Menu Manager</h1>
          <div className="flex items-center gap-3">
            <a href="/" className="font-body text-sm text-melado-maroon/60 hover:text-melado-red">View Site</a>
            <button onClick={logout} className="font-heading font-semibold text-sm text-melado-red">Logout</button>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-heading font-bold text-lg text-melado-maroon">{editingItem ? 'Edit Item' : 'Add New Item'}</h2>
            {editingItem && <button onClick={() => { setEditingItem(null); resetForm(); }} className="text-melado-maroon/40 hover:text-melado-red"><X size={18} /></button>}
          </div>
          <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <input type="text" placeholder="Name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="px-4 py-2.5 rounded-xl border border-melado-pink focus:border-melado-red focus:outline-none font-body text-sm" required />
            <select value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} className="px-4 py-2.5 rounded-xl border border-melado-pink focus:border-melado-red focus:outline-none font-body text-sm">
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <input type="number" placeholder="Single Price" value={formData.singlePrice} onChange={e => setFormData({ ...formData, singlePrice: Number(e.target.value) })} className="px-4 py-2.5 rounded-xl border border-melado-pink focus:border-melado-red focus:outline-none font-body text-sm" />
            <input type="number" placeholder="Cup" value={formData.prices.cup} onChange={e => setFormData({ ...formData, prices: { ...formData.prices, cup: Number(e.target.value) } })} className="px-4 py-2.5 rounded-xl border border-melado-pink focus:border-melado-red focus:outline-none font-body text-sm" />
            <input type="number" placeholder="Cone" value={formData.prices.cone} onChange={e => setFormData({ ...formData, prices: { ...formData.prices, cone: Number(e.target.value) } })} className="px-4 py-2.5 rounded-xl border border-melado-pink focus:border-melado-red focus:outline-none font-body text-sm" />
            <input type="number" placeholder="Tub" value={formData.prices.tub} onChange={e => setFormData({ ...formData, prices: { ...formData.prices, tub: Number(e.target.value) } })} className="px-4 py-2.5 rounded-xl border border-melado-pink focus:border-melado-red focus:outline-none font-body text-sm" />
            <input type="text" placeholder="Image URL" value={formData.image} onChange={e => setFormData({ ...formData, image: e.target.value })} className="px-4 py-2.5 rounded-xl border border-melado-pink focus:border-melado-red focus:outline-none font-body text-sm md:col-span-2" />
            <input type="number" placeholder="Order" value={formData.order} onChange={e => setFormData({ ...formData, order: Number(e.target.value) })} className="px-4 py-2.5 rounded-xl border border-melado-pink focus:border-melado-red focus:outline-none font-body text-sm" />
            <textarea placeholder="Description" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} className="px-4 py-2.5 rounded-xl border border-melado-pink focus:border-melado-red focus:outline-none font-body text-sm md:col-span-2 lg:col-span-3" rows={2} />
            <div className="flex items-center gap-4 md:col-span-2 lg:col-span-3">
              {['available', 'featured', 'isNew'].map(key => (
                <label key={key} className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={formData[key]} onChange={e => setFormData({ ...formData, [key]: e.target.checked })} className="w-4 h-4 accent-melado-red" />
                  <span className="font-body text-sm text-melado-maroon/70 capitalize">{key === 'isNew' ? 'New' : key}</span>
                </label>
              ))}
            </div>
            <div className="md:col-span-2 lg:col-span-3">
              <button type="submit" disabled={loading} className="btn-primary flex items-center gap-2 text-sm">
                <Save size={14} /> {loading ? 'Saving...' : editingItem ? 'Update' : 'Add Item'}
              </button>
            </div>
          </form>
          {message && <p className="mt-3 text-sm font-body text-melado-green">{message}</p>}
        </div>
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-4 border-b border-melado-pink/20">
            <h2 className="font-heading font-bold text-lg text-melado-maroon">Items ({items.length})</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-melado-pink/20">
                <tr>
                  <th className="text-left font-heading font-semibold text-sm text-melado-maroon px-4 py-3">Name</th>
                  <th className="text-left font-heading font-semibold text-sm text-melado-maroon px-4 py-3">Category</th>
                  <th className="text-left font-heading font-semibold text-sm text-melado-maroon px-4 py-3">Price</th>
                  <th className="text-center font-heading font-semibold text-sm text-melado-maroon px-4 py-3">Status</th>
                  <th className="text-right font-heading font-semibold text-sm text-melado-maroon px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map(item => (
                  <tr key={item._id} className="border-b border-melado-pink/10 hover:bg-melado-pink-light/20">
                    <td className="px-4 py-3 font-body text-sm text-melado-maroon">{item.name}</td>
                    <td className="px-4 py-3 font-body text-sm text-melado-maroon/60">{item.category}</td>
                    <td className="px-4 py-3 font-heading font-bold text-sm text-melado-red">Rs. {item.singlePrice || item.prices?.cup || 0}</td>
                    <td className="px-4 py-3 text-center">
                      <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-heading font-bold ${item.available ? 'bg-melado-green/20 text-melado-green-dark' : 'bg-red-100 text-red-500'}`}>
                        {item.available ? 'Active' : 'Off'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => handleEdit(item)} className="p-1.5 rounded-lg hover:bg-melado-pink/30 text-melado-maroon/50 hover:text-melado-red transition-colors"><Edit3 size={14} /></button>
                        <button onClick={() => handleDelete(item._id)} className="p-1.5 rounded-lg hover:bg-red-100 text-melado-maroon/50 hover:text-red-500 transition-colors"><Trash2 size={14} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
