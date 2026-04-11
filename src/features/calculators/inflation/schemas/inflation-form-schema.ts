import z from "zod";

export const InflationFormSchema = z
  .object({
    startMonth: z.number(),
    startYear: z.number(),
    endMonth: z.number(),
    endYear: z.number(),
    amount: z
      .number("Debe ser un número")
      .min(0, "Debe ser positivo")
      .optional(),
  })
  .refine(
    (data) => {
      const start = new Date(data.startYear, data.startMonth - 1);
      const end = new Date(data.endYear, data.endMonth - 1);

      return start <= end;
    },
    {
      message: "La fecha de inicio debe ser menor o igual a la final",
      path: ["endMonth"],
    },
  );

export type InflationFormType = z.infer<typeof InflationFormSchema>;
