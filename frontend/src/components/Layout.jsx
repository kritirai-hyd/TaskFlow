import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import s from "../styles/layout.module.css";
import Navbar from "./Navbar";
import { Briefcase, Home, Layers } from "lucide-react";
const Layout = ({ children }) => {
  const navigate = useNavigate();
  const [menu, setmenu] = useState(false);
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  }
  return (
    <div className={s.layout}>
     <Navbar menu={menu} setmenu={setmenu} />
      {menu && <div className={s.overlay} onClick={() => setmenu(false)} />}
      <aside className={`${s.left} ${menu ? s.left : ""}`}>
        <h2 className={s.logo}>TaskFlow</h2>
        <nav className={s.nav}>
          <NavLink to="/dashboard" onClick={() => setmenu(false)}><Home size={18} />&nbsp;Dashboard</NavLink>
          <NavLink to="/projects" onClick={() => setmenu(false)}><Briefcase size={18} />&nbsp;Projects</NavLink>
          <NavLink to="/tasks" onClick={() => setmenu(false)}><Layers size={18} />&nbsp;My Tasks</NavLink>
        </nav>
        <div className={s.bottom}>
          <span>{user.name || user.email || "User"}</span>
          <button className={s.signout} onClick={logout}>Sign out</button>
        </div>
      </aside>
      <main className={s.main}>{children}</main>
    </div>
  );
};
export default Layout;
