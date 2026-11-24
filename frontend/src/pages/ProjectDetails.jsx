import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Plus, X } from "lucide-react";
import Layout from "../components/Layout";
import TaskCard from "../components/TaskCard";
import api from "../services/api";
import styles from "../styles/projectDetails.module.css";
const ProjectDetails = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", priority: "MEDIUM", dueDate: "", assigneeId: "" });
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({
  title: "",
  description: "",
  priority: "MEDIUM",
  dueDate: "",
  assigneeId: ""
  });
  const fetchProject = async () => {
    try {
      const [p, t] = await Promise.all([api.get(`/projects/${projectId}`), api.get(`/projects/${projectId}/tasks`)]);
      setProject(p.data);
      setTasks(t.data);
      setError("");
    } catch (err) { setError(err.response?.data?.message || "Could not load project tasks."); }
  };
  useEffect(() => { fetchProject(); }, [projectId]);
  const createTask = async e => {
    e.preventDefault();
    setError("");
    try {
      await api.post(`/projects/${projectId}/tasks`, { ...form, assigneeId: form.assigneeId ? Number(form.assigneeId) : null });
      setForm({ title: "", description: "", priority: "MEDIUM", dueDate: "", assigneeId: "" });
      setOpen(false);
      await fetchProject();
    } catch (err) { setError(err.response?.data?.message || "Could not create task."); }
  };
  const editTask = (task) => {
    setEditId(task.id);
    setEditForm({
    title: task.title,
    description: task.description,
    priority: task.priority,
    dueDate: task.dueDate,
    assigneeId: task.assigneeId
    })
    setOpen(false);
    setError("");
  }
  const updateTask = async(e) => {
     e.preventDefault();
     setError("");
    try{
      const res = await api.put(`/projects/${projectId}/tasks/${editId}`, {
        ...editForm, assigneeId: editForm.assigneeId ? Number(editForm.assigneeId): null
      })
      
   setEditId(null);
    setEditForm({
      title: "",
      description: "",
      priority: "MEDIUM",
      dueDate: "",
      assigneeId: ""
    });

    await fetchProject();
  } catch (err) {
    setError(err.response?.data?.message || "Could not update task.");
  }
  };
  const cancel = () => {
  setEditId(null);
  setEditForm({
    title: "",
    description: "",
    priority: "MEDIUM",
    dueDate: "",
    assigneeId: ""
  });
  };
  
  const deleteTask = async id => {
    if (!window.confirm("Delete this task?")) return;
    try {
      await api.delete(`/projects/${projectId}/tasks/${id}`);
      setTasks(current => current.filter(task => task.id !== id));
    } catch (err) { setError(err.response?.data?.message || "Could not delete task."); }
  };
  const changeStatus = async (id, status) => {
    try {
      await api.patch(`/projects/${projectId}/tasks/${id}/status`, { status });
      await fetchProject();
    } catch (err) { setError(err.response?.data?.message || "Could not update task status."); }
  };

  return (
    <Layout>
      <div className={styles.projects}>
        <div>
          <h1>{project?.name}</h1>
         </div>
        <button type="button" className={styles.add} onClick={() => setOpen(!open)}>
          {open ? <X size={16} /> : <Plus size={16} />}
        </button>
      </div>
      {error && <div className={styles.msg}>{error}</div>}
      {open && (
        <form className={styles.form} onSubmit={createTask}>
          <h2>Create a Task</h2>
          <div className={styles.wrap}>
            <table className={styles.table}>
              <thead><tr><th>Task Title</th><th>Description</th><th>Priority</th><th>Due Date</th><th>Action</th></tr></thead>
              <tbody>
                <tr>
                  <td><input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Enter task title" required /></td>
                  <td><textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Task description" rows="2" /></td>
                  <td>
                    <select value={form.priority} onChange={e => setForm({ ...form, priority: e.target.value })}>
                      <option value="LOW">Low</option><option value="MEDIUM">Medium</option><option value="HIGH">High</option>
                    </select>
                  </td>
                  <td><input type="date" value={form.dueDate} onChange={e => setForm({ ...form, dueDate: e.target.value })} required /></td>
                  <td>
                    <div className={styles.action}>
                      <button type="submit" className={styles.create}>Create</button>
                      <button type="button" className={styles.del} onClick={() => setOpen(false)}>Cancel</button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </form>
      )}
      {editId !== null && (
      <form className={styles.form} onSubmit={updateTask}>
    <h2>Edit Task</h2>
    <div className={styles.wrap}>
      <table className={styles.table}>
        <tbody>
          <tr>
            <td><input value={editForm.title} onChange={e => setEditForm({...editForm, title: e.target.value})} placeholder="Task title" required maxLength={120} /></td>
            <td><textarea value={editForm.description} onChange={e => setEditForm({...editForm, description: e.target.value})} placeholder="Description" rows="2" maxLength={2000} /></td>
            <td>
              <select value={editForm.priority} onChange={e => setEditForm({...editForm, priority: e.target.value})}>
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
              </select>
            </td>
            <td><input type="date" value={editForm.dueDate} onChange={e => setEditForm({...editForm, dueDate: e.target.value})} required /></td>
            <td>
              <div className={styles.action}>
                <button type="submit" className={styles.create}>Update</button>
                <button type="button" className={styles.del} onClick={cancel}>Cancel</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
      </form>
       )}
      <section className={styles.tasks}>
        <div className={styles.header}>
          <h2>Project Tasks</h2>
          <span className={styles.count}>Total Tasks: {tasks.length}</span>
        </div>
        <div className={styles.container}>
          <table className={styles.task}>
            <thead><tr><th>Task Name</th><th>Description</th><th>Project</th><th>Priority</th><th>Due Date</th><th>Status</th><th>Action</th></tr></thead>
            <tbody>
              {!tasks.length ? (
                <tr><td colSpan="7" className={styles.blank}>No tasks created yet.</td></tr>
              ) : tasks.map(task => (
                <TaskCard key={task.id} task={{ ...task, projectId, projectName: project?.name }} onChangeStatus={changeStatus} onUpdate={editTask} onDelete={deleteTask} />
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </Layout>
  );
};
export default ProjectDetails;
