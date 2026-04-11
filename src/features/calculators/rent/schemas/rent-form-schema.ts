import z from "zod";

export const RentFormSchema = z.object({
  startMonth: z.number(),
  startYear: z.number(),
  startAmount: z.number("Debe ser un número").min(0, "Debe ser positivo"),
  updateInterval: z
    .number("Debe ser un número")
    .min(1, "Debe ser al menos 1 mes")
    .max(12, "No puede ser más de 12 meses"),
  updateIndex: z.enum(["IPC", "ICL", "CASA_PROPIA"]),
});

export type RentFormType = z.infer<typeof RentFormSchema>;
