import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import s from '../styles/auth.module.css'
import api from '../services/api'
const Login = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({email: "", password: "",});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    function loginChange(e) {
        setForm({...form, [e.target.name]:e.target.value,})
    }
    async function loginSubmit(e) {
        e.preventDefault();
        setError("");
        setLoading(true);
        try{
            const res = await api.post("/auth/login", form);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));
            navigate("/dashboard")
        }catch(error){
            setError(error.response?.data?.message || "Login failed. Please check your email and password.")
        }finally{
            setLoading(false)
        }
    }
    return (
<div className={s.login}>
    <div className={s.left}>
        <h1>TaskFlow</h1>
        <h2>Organize your work.<br />Achieve more.</h2>
        <p>Manage your projects, track tasks and stay productive with TaskFlow.</p>
    </div>
     <div className={s.right}>
    <form className={s.card} onSubmit={loginSubmit}>
        <h2>Welcome Back</h2>
        <p className={s.heading}>Sign in to manage your projects and tasks.</p>
        {error && <div className={s.msg}>{error}</div>}
        <label>Email address</label>
        <input type="email" name="email" value={form.email} onChange={loginChange} placeholder="abc@example.com" required />
        <label>Password</label>
        <input type="password" name="password" value={form.password} onChange={loginChange} placeholder="Enter your password" required />
        <button type="submit" className={s.signin} disabled={loading}>{loading ? "Signing in..." : "Sign in"}</button>
        <p className={s.bottom}>Don't have an account? <Link to="/register">Create account</Link></p>
    </form>
    </div>
</div>
    )
}
export default Login