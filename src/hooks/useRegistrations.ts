import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as registrationService from "../services/registration.service";

export function useMyRegistrations() {
  return useQuery({
    queryKey: ["registrations", "me"],
    queryFn: registrationService.getMyRegistrations,
  });
}

export function useRegisterForEvent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (eventId: number) => registrationService.registerForEvent(eventId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["registrations", "me"] });
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });
}
