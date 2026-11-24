import { Link } from "react-router-dom";
import { Trash2, ExternalLink, Edit } from "lucide-react";
import styles from "../styles/tcard.module.css";
const TaskCard = ({ task, onChangeStatus, onUpdate, onDelete }) => (
  <tr>
    <td className={styles.name}>{task.title}</td>
    <td className={styles.subheading}>{task.subheading}</td>
    <td>{task.projectName}</td>
    <td><span className={`${styles.prior} ${styles[`prior${task.prior}`]}`}>{task.priority}</span></td>
    <td>{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "—"}</td>
    <td>
      {onChangeStatus ? (
        <select className={styles.status} value={task.status} onChange={e => onChangeStatus(task.id, e.target.value)}>
          <option value="TODO">To Do</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="DONE">Done</option>
        </select>
      ) : <span className={styles.stactic}>{task.status?.replace("_", " ")}</span>}
    </td>
    <td>
      <div className={styles.buttons}>
        {onDelete && <button type="button" className={styles.del} onClick={() => onDelete(task.id)}><Trash2 size={14} /></button>}
        {onUpdate && <button type="button" className={styles.view} onClick={() => onUpdate(task)}><Edit size={14} /></button>}
        <Link className={styles.view} to={`/projects/${task.projectId}`}><ExternalLink size={14} /></Link>
      </div>
    </td>
  </tr>
);
export default TaskCard;
