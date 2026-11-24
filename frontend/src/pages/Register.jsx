import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import s from '../styles/auth.module.css'
import api from '../services/api'
const Register = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({name: "", email: "", password: "",});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    function registerChange(e) {
        setForm({...form, [e.target.name]:e.target.value,})
    }
    async function registerSubmit(e) {
        e.preventDefault();
        setError("");
        setLoading(true);
        try{
            const res = await api.post("/auth/register", form);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));
            navigate("/dashboard")
        }catch(err){
            console.log("Registration error:", err);
    console.log("Backend response:", err.response?.data);
    console.log("Status:", err.response?.status);

    setError(
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        "Registration failed. Please try again."
    );
        }finally{
            setLoading(false)
        }
    }
    return (
<div className={s.login}>
    <div className={s.left}>
        <h1>TaskFlow</h1>
        <p>Start organizing your work with TaskFlow.</p>
    </div>
     <div className={s.right}>
    <form className={s.card} onSubmit={registerSubmit}>
        <h2>Create your account</h2>
        <p className={s.heading}>Sign in to manage your projects and tasks.</p>
        {error && <div className={s.msg}>{error}</div>}
        <label>Full name</label>
        <input type="text" name="name" value={form.name} onChange={registerChange} placeholder="Enter your name" required />
        <label>Email address</label>
        <input type="email" name="email" value={form.email} onChange={registerChange} placeholder="abc@example.com" required />
        <label>Password</label>
        <input type="password" name="password" value={form.password} onChange={registerChange} placeholder="Enter your password" required />
        <button type="submit" className={s.signin} disabled={loading}>{loading ? "Creating account..." : "Create account"}</button>
        <p className={s.bottom}>Already registered? <Link to="/login">Sign in</Link></p>
    </form>
    </div>
</div>
    )
}
export default Register;