import { useState } from "react";
import { useAdmin } from "../hooks/useAdmin";
import { Navigate } from "react-router-dom";
import Spinner from "../components/ui/Spinner";

const AdminLoginPage: React.FC = () => {
  const { user, loading, login } = useAdmin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (loading) return <Spinner className="min-h-screen" />;
  if (user) return <Navigate to="/admin" replace />;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await login(email, password);
    } catch {
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-cream px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white border border-brand-gold/10 p-8"
      >
        <div className="text-center mb-8">
          <h1 className="font-serif text-2xl text-brand-dark mb-1">
            Admin Login
          </h1>
          <p className="text-xs text-brand-gray">House of Anna</p>
        </div>

        {error && (
          <p className="text-xs text-red-500 text-center mb-4">{error}</p>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-xs tracking-widest uppercase text-brand-gray mb-1">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-brand-gold/20 text-sm text-brand-dark bg-transparent focus:outline-none focus:border-brand-gold"
            />
          </div>

          <div>
            <label className="block text-xs tracking-widest uppercase text-brand-gray mb-1">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-brand-gold/20 text-sm text-brand-dark bg-transparent focus:outline-none focus:border-brand-gold"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-brand-navy text-white text-xs tracking-widest uppercase hover:bg-brand-navy/90 transition-colors"
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminLoginPage;
