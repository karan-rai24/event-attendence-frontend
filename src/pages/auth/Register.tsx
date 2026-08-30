import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const registerSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.string().min(1, "Email is required").email("Invalid email format"),
    phone: z.string().min(1, "Phone is required").regex(/^\d{10}$/, "Phone must be 10 digits"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    role: z.enum(["student", "organizer"]),
    organizer_code: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.role === "organizer") {
        return data.organizer_code !== undefined && data.organizer_code.length > 0;
      }
      return true;
    },
    { message: "Organizer invite code is required", path: ["organizer_code"] }
  );

type RegisterFormData = z.infer<typeof registerSchema>;

export default function Register() {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: { role: "student" },
  });

  const selectedRole = watch("role");

  const onSubmit = async (data: RegisterFormData) => {
    setServerError(null);
    try {
      await registerUser({
        name: data.name,
        email: data.email,
        phone: data.phone,
        password: data.password,
        role: data.role,
        organizer_code: data.role === "organizer" ? data.organizer_code : undefined,
      });
      navigate("/login");
    } catch (err: any) {
      const detail = err.response?.data?.detail;
      if (typeof detail === "string") {
        setServerError(detail);
      } else {
        setServerError("Registration failed. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-surface border border-border rounded-card p-8">
        <h1 className="text-2xl font-bold text-text mb-6">Register</h1>

        {serverError && (
          <div className="bg-error-bg text-error px-4 py-3 rounded-lg mb-4 text-sm">
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-text mb-1">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              {...register("name")}
              className="w-full px-4 py-2 border border-border rounded-lg bg-surface text-text focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {errors.name && (
              <p className="text-error text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-text mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register("email")}
              className="w-full px-4 py-2 border border-border rounded-lg bg-surface text-text focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {errors.email && (
              <p className="text-error text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-text mb-1">
              Phone
            </label>
            <input
              id="phone"
              type="tel"
              {...register("phone")}
              className="w-full px-4 py-2 border border-border rounded-lg bg-surface text-text focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {errors.phone && (
              <p className="text-error text-sm mt-1">{errors.phone.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-text mb-1">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                {...register("password")}
                className="w-full px-4 py-2 pr-10 border border-border rounded-lg bg-surface text-text focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-secondary text-sm"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            {errors.password && (
              <p className="text-error text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-text mb-2">I want to</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  value="student"
                  {...register("role")}
                  className="w-4 h-4 text-primary"
                />
                <span className="text-sm text-text">Register as Student</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  value="organizer"
                  {...register("role")}
                  className="w-4 h-4 text-primary"
                />
                <span className="text-sm text-text">Register as Organizer</span>
              </label>
            </div>
          </div>

          {selectedRole === "organizer" && (
            <div>
              <label htmlFor="organizer_code" className="block text-sm font-medium text-text mb-1">
                Organizer Invite Code
              </label>
              <input
                id="organizer_code"
                type="text"
                {...register("organizer_code")}
                className="w-full px-4 py-2 border border-border rounded-lg bg-surface text-text focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {errors.organizer_code && (
                <p className="text-error text-sm mt-1">{errors.organizer_code.message}</p>
              )}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary text-white py-2.5 rounded-lg font-medium hover:bg-primary-hover disabled:opacity-50"
          >
            {isSubmitting ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="text-sm text-text-secondary text-center mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-primary hover:underline font-medium">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
