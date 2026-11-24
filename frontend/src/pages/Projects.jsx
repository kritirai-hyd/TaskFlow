import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Plus, X, Trash2, Eye } from "lucide-react";
import Layout from "../components/Layout";
import api from "../services/api";
import styles from "../styles/projects.module.css";
const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [open, setopen] = useState(false);
  const fetchProjects = async () => {
    try {
      const res = await api.get("/projects");
      setProjects(res.data);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Could not load projects.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProjects();
  }, []);
  const createProject = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await api.post("/projects", { name, description });
      setName("");
      setDescription("");
      setopen(false);
      fetchProjects();
    } catch (err) {
      setError(err.response?.data?.message || "Could not create project.");
    }
  };
  const deleteProject = async (id) => {
    if (!window.confirm("Delete this project?")) return;
    try {
      await api.delete(`/projects/${id}`);
      setProjects(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      setError(err.response?.data?.message || "Could not delete project.");
    }
  };
  return (
    <Layout>
      <div className={styles.projects}>
        <div>
          <h1>Projects</h1>
        </div>
        <button className={styles.add} onClick={() => setopen(!open)}>
          
          {open ? <X size={16} /> : <Plus size={16} />}
         
        </button>
      </div>
      {error && <div className={styles.msg}>{error}</div>}
      {open && (
        <form className={styles.form} onSubmit={createProject}>
          <h2>Create Project</h2>
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Project name"
            required
          />
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Description"
            rows={2}
          />
          <div className={styles.action}>
            <button type="submit" className={styles.create}>Create</button>
            <button type="button" className={styles.del}
              onClick={() => setopen(false)}>Cancel</button>
          </div>
        </form>
      )}
      <section className={styles.tasks}>
        <div className={styles.header}>
          <h2>All Projects</h2>
          <span className={styles.count}>Total: {projects.length}</span>
        </div>
        {loading ? (
          <p className={styles.muted}>Loading...</p>
        ) : (
          <div className={styles.container}>
            <table className={styles.task}>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Project</th>
                  <th>Description</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {projects.length ? projects.map((p, i) => (
                  <tr key={p.id}>
                    <td>{i + 1}</td>
                    <td>{p.name}</td>
                    <td>{p.description}</td>
                    <td>
                      <div className={styles.action}>
                        <Link to={`/projects/${p.id}`} className={styles.open}>
                          <Eye size={14} />
                        </Link>
                        <button className={styles.delete}
                          onClick={() => deleteProject(p.id)}>
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="4" className={styles.blank}>
                      No projects found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </Layout>
  );
};
export default Projects;
