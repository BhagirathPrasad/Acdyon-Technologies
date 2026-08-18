import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Trash2, Edit2, Play, LogOut } from 'lucide-react';

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ name: '', environment: 'Production' });

  useEffect(() => {
    const currentUser = localStorage.getItem('acdyon_currentUser');
    if (!currentUser) {
      navigate('/auth');
    } else {
      setUser(currentUser);
      const storedProjects = JSON.parse(localStorage.getItem(`acdyon_projects_${currentUser}`) || '[]');
      setProjects(storedProjects);
    }
  }, [navigate]);

  const saveProjects = (newProjects) => {
    setProjects(newProjects);
    localStorage.setItem(`acdyon_projects_${user}`, JSON.stringify(newProjects));
  };

  const handleLogout = () => {
    localStorage.removeItem('acdyon_currentUser');
    navigate('/');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      // Update
      const newProjects = projects.map(p => p.id === editingId ? { ...p, ...formData } : p);
      saveProjects(newProjects);
    } else {
      // Create
      const newProject = {
        id: Date.now().toString(),
        name: formData.name,
        environment: formData.environment,
        lastDeployed: new Date().toISOString(),
        status: 'Healthy'
      };
      saveProjects([...projects, newProject]);
    }
    closeModal();
  };

  const handleDelete = (id) => {
    saveProjects(projects.filter(p => p.id !== id));
  };

  const openModal = (project = null) => {
    if (project) {
      setEditingId(project.id);
      setFormData({ name: project.name, environment: project.environment });
    } else {
      setEditingId(null);
      setFormData({ name: '', environment: 'Production' });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
  };

  if (!user) return null;

  return (
    <div className="dashboard-layout">
      <aside className="sidebar">
        <div className="logo" style={{ marginBottom: '40px', cursor: 'pointer' }} onClick={() => navigate('/')}>
          <div className="logo-dot"></div>
          Acdyon Flow
        </div>
        <nav className="sidebar-nav">
          <a href="#" className="sidebar-link active">Pipelines</a>
          <a href="#" className="sidebar-link">Settings</a>
        </nav>
        <div className="sidebar-footer">
          <div className="user-email">{user}</div>
          <button onClick={handleLogout} className="logout-btn"><LogOut size={16} /> Logout</button>
        </div>
      </aside>

      <main className="dashboard-content">
        <div className="dashboard-header">
          <div>
            <h1>Pipelines</h1>
            <p style={{ color: 'var(--text-secondary)' }}>Manage and monitor your deployments.</p>
          </div>
          <button className="btn-accent" onClick={() => openModal()}>
            <Plus size={18} /> New Pipeline
          </button>
        </div>

        <div className="projects-grid">
          {projects.length === 0 ? (
            <div className="empty-state">
              <p>No pipelines found. Create one to get started.</p>
            </div>
          ) : (
            projects.map(project => (
              <div key={project.id} className="project-card">
                <div className="project-header">
                  <h3>{project.name}</h3>
                  <span className={`env-badge ${project.environment.toLowerCase()}`}>{project.environment}</span>
                </div>
                <div className="project-body">
                  <div className="status-row">
                    <div className="status-dot"></div> {project.status}
                  </div>
                  <div className="last-deploy">
                    Deployed: {new Date(project.lastDeployed).toLocaleDateString()}
                  </div>
                </div>
                <div className="project-actions">
                  <button className="action-btn" onClick={() => {}} title="Run Pipeline"><Play size={16} /></button>
                  <button className="action-btn" onClick={() => openModal(project)} title="Edit"><Edit2 size={16} /></button>
                  <button className="action-btn danger" onClick={() => handleDelete(project.id)} title="Delete"><Trash2 size={16} /></button>
                </div>
              </div>
            ))
          )}
        </div>
      </main>

      {/* CRUD Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>&times;</button>
            <h2>{editingId ? 'Edit Pipeline' : 'New Pipeline'}</h2>
            <form onSubmit={handleSubmit} className="login-form">
              <div className="form-group">
                <label>Pipeline Name</label>
                <input 
                  type="text" 
                  required 
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  placeholder="e.g. acdyon-web"
                />
              </div>
              <div className="form-group">
                <label>Environment</label>
                <select 
                  className="custom-select"
                  value={formData.environment}
                  onChange={e => setFormData({...formData, environment: e.target.value})}
                >
                  <option value="Production">Production</option>
                  <option value="Staging">Staging</option>
                  <option value="Development">Development</option>
                </select>
              </div>
              <button type="submit" className="btn-accent" style={{width: '100%', justifyContent: 'center', marginTop: '16px'}}>
                {editingId ? 'Update Pipeline' : 'Create Pipeline'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
