import { Link } from "react-router-dom";
import s from "../styles/pcard.module.css";
const ProjectCard = ({ project, onDelete }) => (
  <div className={s.card}>
    <h3>{project.name}</h3>
    <p>{project.description}</p>
    <div className={s.open}>
      <Link to={`/projects/${project.id}`}>Open project</Link>
      <button className={s.delete} onClick={() => onDelete(project.id)}>Delete</button>
    </div>
  </div>
);
export default ProjectCard;
