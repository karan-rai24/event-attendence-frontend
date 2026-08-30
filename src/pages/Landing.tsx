import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="bg-surface border-b border-border px-4 py-3">
        <nav className="flex items-center justify-between max-w-7xl mx-auto">
          <span className="text-xl font-bold text-primary">College Event</span>
          <div className="flex items-center gap-4">
            <Link to="/login" className="text-sm text-text-secondary hover:text-text">
              Login
            </Link>
            <Link
              to="/register"
              className="text-sm bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-hover"
            >
              Register
            </Link>
          </div>
        </nav>
      </header>
      <main className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-text mb-4">College Event Management</h1>
          <p className="text-text-secondary mb-8">Register for events, get certificates, manage attendance.</p>
          <Link
            to="/register"
            className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-hover font-medium"
          >
            Get Started
          </Link>
        </div>
      </main>
    </div>
  );
}
