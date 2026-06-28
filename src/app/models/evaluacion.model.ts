import { z } from 'zod';

export const EvaluacionSchema = z.object({
  dni: z.string().length(8, "El DNI debe tener exactamente 8 caracteres"),
  productoId: z.number().int().positive(),
  scoreObtenido: z.number().min(0).max(1000),
  estado: z.string(),
  comentarios: z.string().optional()
});

export type EvaluacionPayload = z.infer<typeof EvaluacionSchema>;