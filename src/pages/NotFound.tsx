import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-text-muted mb-4">404</h1>
        <p className="text-text-secondary mb-8">Page not found</p>
        <Link
          to="/"
          className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-hover font-medium"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
