import { useState } from "react";

interface ManualCheckInProps {
  onSubmit: (token: string) => void;
  isLoading: boolean;
}

export default function ManualCheckIn({ onSubmit, isLoading }: ManualCheckInProps) {
  const [token, setToken] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (token.trim()) {
      onSubmit(token.trim());
      setToken("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={token}
        onChange={(e) => setToken(e.target.value)}
        placeholder="Enter token (e.g. TKN-8F2A91CD)"
        className="flex-1 px-4 py-2 border border-border rounded-lg bg-surface text-text focus:outline-none focus:ring-2 focus:ring-primary font-mono"
      />
      <button
        type="submit"
        disabled={isLoading || !token.trim()}
        className="bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-hover disabled:opacity-50"
      >
        {isLoading ? "Checking in..." : "Check in"}
      </button>
    </form>
  );
}
