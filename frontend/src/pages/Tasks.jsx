import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Eye, Search } from "lucide-react";
import Layout from "../components/Layout";
import api from "../services/api";
import styles from "../styles/tasks.module.css";
const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    const loadTasks = async () => {
      try {
        const res = await api.get("/projects");
        const results = await Promise.all(
          res.data.map(async p => {
            const { data } = await api.get(`/projects/${p.id}/tasks`);
            return data.map(t => ({ ...t, projectName: p.name, projectId: p.id }));
          })
        );
        setTasks(results.flat());
      } catch (err) {
        setError(err.response?.data?.message || "Could not load tasks.");
      } finally {
        setLoading(false);
      }
    };
    loadTasks();
  }, []);
  return (
    <Layout>
      <div className={styles.projects}>
        <div>
          <h1>My Tasks</h1>
        </div>
      </div>
      {error && <div className={styles.msg}>{error}</div>}
      {loading ? (
        <p className={styles.muted}>Loading tasks...</p>
      ) : (
        <>
          <div className={styles.container}>
            <table className={styles.task}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Task Name</th>
                  <th>Project</th>
                  <th>Description</th>
                  <th>Priority</th>
                  <th>Due Date</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {tasks.length ? tasks.map((t, i) => (
                  <tr key={`${t.projectId}-${t.id}`}>
                    <td>{i + 1}</td>
                    <td className={styles.name}>{t.title}</td>
                    <td>{t.projectName}</td>
                    <td className={styles.description}>{t.description || "No description"}</td>
                    <td>
                      <span className={`${styles.priority} ${styles["priority" + t.priority]}`}>
                        {t.priority}
                      </span>
                    </td>
                    <td>{t.dueDate ? new Date(t.dueDate).toLocaleDateString() : "—"}</td>
                    <td>
                      <span className={styles.status}>
                        {t.status?.replace("_", " ") || "TODO"}
                      </span>
                    </td>
                    <td>
                      <Link to={`/projects/${t.projectId}`} className={styles.open}>
                        <Eye size={14} />
                      </Link>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="8" className={styles.blank}>No tasks found. Create a task inside a project.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </Layout>
  );
};
export default Tasks;
