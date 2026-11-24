import { Menu } from "lucide-react";
import s from "../styles/layout.module.css";
const Navbar = ({ menu, setmenu }) => {
  return (
    <header className={s.header}>
      <h2 className={s.logo}>TaskFlow</h2>
      <button className={s.menu} onClick={() => setmenu(!menu)} >
        <Menu />
      </button>
    </header>
  );
};
export default Navbar;
