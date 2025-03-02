import { useState, useEffect } from 'react';
import { Pencil, Link, Ellipsis, Plus, Save, X } from 'lucide-react';

interface LinkItem {
  id: string;
  title: string;
  url: string;
}

const QuickLinks = () => {
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newLink, setNewLink] = useState({ title: '', url: '' });
  const [editLink, setEditLink] = useState({ title: '', url: '' });

  useEffect(() => {
    const savedLinks = localStorage.getItem('quickLinks');
    if (savedLinks) {
      setLinks(JSON.parse(savedLinks));
    } else {
      // Default links
      const defaultLinks: LinkItem[] = [
        { id: '1', title: 'Google', url: 'https://google.com' },
        { id: '2', title: 'YouTube', url: 'https://youtube.com' },
        { id: '3', title: 'GitHub', url: 'https://github.com' },
      ];
      setLinks(defaultLinks);
      localStorage.setItem('quickLinks', JSON.stringify(defaultLinks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('quickLinks', JSON.stringify(links));
  }, [links]);

  const addLink = () => {
    if (newLink.title.trim() === '' || newLink.url.trim() === '') return;
    
    // Add https:// if not present
    let url = newLink.url;
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url;
    }
    
    const newLinkItem: LinkItem = {
      id: Date.now().toString(),
      title: newLink.title,
      url
    };
    
    setLinks([...links, newLinkItem]);
    setNewLink({ title: '', url: '' });
    setShowAddForm(false);
  };

  const startEditing = (link: LinkItem) => {
    setEditingId(link.id);
    setEditLink({ title: link.title, url: link.url });
  };

  const saveEdit = () => {
    if (editLink.title.trim() === '' || editLink.url.trim() === '' || !editingId) return;
    
    // Add https:// if not present
    let url = editLink.url;
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url;
    }
    
    setLinks(links.map(link => 
      link.id === editingId 
        ? { ...link, title: editLink.title, url } 
        : link
    ));
    
    setEditingId(null);
  };

  const deleteLink = (id: string) => {
    setLinks(links.filter(link => link.id !== id));
    if (editingId === id) {
      setEditingId(null);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Link className="w-5 h-5 mr-2 text-slate-600" />
          <h2 className="text-lg font-semibold text-slate-700">Quick Links</h2>
        </div>
        <button 
          onClick={() => setShowAddForm(!showAddForm)}
          className="p-1.5 rounded-full hover:bg-slate-100 transition-colors"
        >
          {showAddForm ? <X size={18} /> : <Plus size={18} />}
        </button>
      </div>

      {showAddForm && (
        <div className="bg-slate-50 rounded-lg p-4 mb-4">
          <h3 className="text-sm font-medium mb-3">Add New Link</h3>
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Title"
              value={newLink.title}
              onChange={(e) => setNewLink({ ...newLink, title: e.target.value })}
              className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="URL"
              value={newLink.url}
              onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
              className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex justify-end">
              <button 
                onClick={addLink}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm"
              >
                Add Link
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {links.map(link => (
          <div key={link.id} className="relative group">
            {editingId === link.id ? (
              <div className="bg-slate-50 rounded-lg p-3">
                <input
                  type="text"
                  value={editLink.title}
                  onChange={(e) => setEditLink({ ...editLink, title: e.target.value })}
                  className="w-full px-2 py-1 mb-2 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <input
                  type="text"
                  value={editLink.url}
                  onChange={(e) => setEditLink({ ...editLink, url: e.target.value })}
                  className="w-full px-2 py-1 mb-2 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <div className="flex justify-between">
                  <button 
                    onClick={() => setEditingId(null)}
                    className="text-xs text-slate-500 hover:text-slate-700"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={saveEdit}
                    className="flex items-center text-xs text-blue-500 hover:text-blue-700"
                  >
                    <Save size={12} className="mr-1" /> Save
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-slate-50 hover:bg-slate-100 rounded-lg p-4 transition-colors">
                <a 
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center truncate"
                >
                  <div className="text-sm font-medium mb-1 truncate">{link.title}</div>
                  <div className="text-xs text-slate-500 truncate">{link.url.replace(/^https?:\/\//, '')}</div>
                </a>
                <div className="absolute invisible group-hover:visible top-1 right-1 flex">
                  <button 
                    onClick={() => startEditing(link)}
                    className="p-1 text-slate-400 hover:text-slate-600"
                  >
                    <Pencil size={14} />
                  </button>
                  <button 
                    onClick={() => deleteLink(link.id)}
                    className="p-1 text-slate-400 hover:text-red-500"
                  >
                    <X size={14} />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {links.length === 0 && !showAddForm && (
        <div className="text-center py-8 text-slate-400">
          <p className="mb-2">No quick links added yet</p>
          <button 
            onClick={() => setShowAddForm(true)}
            className="text-blue-500 hover:text-blue-700 text-sm flex items-center mx-auto"
          >
            <Plus size={16} className="mr-1" /> Add your first link
          </button>
        </div>
      )}
    </div>
  );
};

export default QuickLinks;
