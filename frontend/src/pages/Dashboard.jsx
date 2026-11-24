import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Search, Eye, Plus } from "lucide-react";
import api from "../services/api";
import Layout from "../components/Layout";
import s from "../styles/dash.module.css";
const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await api.get("/projects");
        setProjects(res.data);
      } catch (err) {
        setError(err.response?.data?.message || "Could not load projects.");
      } finally { setLoading(false); }
    };
    fetchProjects();
  }, []);
  return (
    <Layout>
      <section>
        <div className={s.dashboard}>
          <h1>Dashboard</h1>
          <div>
            <Link className={s.search}><Search size={14} /></Link>{" "}
            <Link className={s.search} to="/projects"><Plus size={14} /></Link>
          </div>
        </div>
        {error && <div className={s.msg}>{error}</div>}
        {loading ? <p>Loading Projects...</p> : (
          <div className={s.wrap}>
            <table className={s.table}>
              <thead><tr><th>ID</th><th>Project Name</th><th>Description</th><th>Status</th><th>Action</th></tr></thead>
              <tbody>
                {projects.slice(0, 6).map((project, index) => (
                  <tr key={project.id}>
                    <td>{index + 1}</td>
                    <td className={s.name}>{project.name}</td>
                    <td className={s.description}>{project.description}</td>
                    <td><span className={s.status}>Active</span></td>
                    <td><Link to={`/projects/${project.id}`} className={s.view}><Eye size={14} /></Link></td>
                  </tr>
                ))}
                {!projects.length && <tr><td colSpan="5" className={s.blank}>No projects found.</td></tr>}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </Layout>
  );
};
export default Dashboard;
