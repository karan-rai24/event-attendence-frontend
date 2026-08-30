import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { createEvent } from "../../services/event.service";

const eventSchema = z
  .object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    venue: z.string().min(1, "Venue is required"),
    start_time: z.string().min(1, "Start time is required"),
    end_time: z.string().min(1, "End time is required"),
    capacity: z.number().min(1, "Capacity must be greater than 0"),
  })
  .refine((data) => new Date(data.end_time) > new Date(data.start_time), {
    message: "End time must be after start time",
    path: ["end_time"],
  });

type EventFormData = z.infer<typeof eventSchema>;

export default function EventForm() {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EventFormData>({
    resolver: zodResolver(eventSchema),
  });

  const onSubmit = async (data: EventFormData) => {
    setServerError(null);
    try {
      await createEvent({
        title: data.title,
        description: data.description,
        venue: data.venue,
        start_time: new Date(data.start_time).toISOString(),
        end_time: new Date(data.end_time).toISOString(),
        capacity: data.capacity,
      });
      setToast("Event created successfully");
      setTimeout(() => navigate("/organizer/events"), 1000);
    } catch (err: any) {
      const detail = err.response?.data?.detail;
      setServerError(typeof detail === "string" ? detail : "Failed to create event.");
    }
  };

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-text mb-6">Create Event</h1>

      {serverError && (
        <div className="bg-error-bg text-error px-4 py-3 rounded-lg mb-4 text-sm">
          {serverError}
        </div>
      )}

      {toast && (
        <div className="bg-success-bg text-success px-4 py-3 rounded-lg mb-4 text-sm">
          {toast}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-surface border border-border rounded-card p-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-text mb-1">
            Title
          </label>
          <input
            id="title"
            type="text"
            {...register("title")}
            className="w-full px-4 py-2 border border-border rounded-lg bg-surface text-text focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {errors.title && (
            <p className="text-error text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-text mb-1">
            Description
          </label>
          <textarea
            id="description"
            {...register("description")}
            rows={4}
            className="w-full px-4 py-2 border border-border rounded-lg bg-surface text-text focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {errors.description && (
            <p className="text-error text-sm mt-1">{errors.description.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="venue" className="block text-sm font-medium text-text mb-1">
            Venue
          </label>
          <input
            id="venue"
            type="text"
            {...register("venue")}
            className="w-full px-4 py-2 border border-border rounded-lg bg-surface text-text focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {errors.venue && (
            <p className="text-error text-sm mt-1">{errors.venue.message}</p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="start_time" className="block text-sm font-medium text-text mb-1">
              Start Time
            </label>
            <input
              id="start_time"
              type="datetime-local"
              {...register("start_time")}
              className="w-full px-4 py-2 border border-border rounded-lg bg-surface text-text focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {errors.start_time && (
              <p className="text-error text-sm mt-1">{errors.start_time.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="end_time" className="block text-sm font-medium text-text mb-1">
              End Time
            </label>
            <input
              id="end_time"
              type="datetime-local"
              {...register("end_time")}
              className="w-full px-4 py-2 border border-border rounded-lg bg-surface text-text focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {errors.end_time && (
              <p className="text-error text-sm mt-1">{errors.end_time.message}</p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="capacity" className="block text-sm font-medium text-text mb-1">
            Capacity
          </label>
          <input
            id="capacity"
            type="number"
            {...register("capacity", { valueAsNumber: true })}
            className="w-full px-4 py-2 border border-border rounded-lg bg-surface text-text focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {errors.capacity && (
            <p className="text-error text-sm mt-1">{errors.capacity.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-primary text-white py-2.5 rounded-lg font-medium hover:bg-primary-hover disabled:opacity-50"
        >
          {isSubmitting ? "Creating..." : "Create Event"}
        </button>
      </form>
    </div>
  );
}
