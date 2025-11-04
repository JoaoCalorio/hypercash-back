import { z } from "zod";

export const userSchema = z.object({
  nome_completo: z.string()
    .min(3, "Nome deve ter no mínimo 3 caracteres")
    .max(255, "Nome deve ter no máximo 255 caracteres"),
  
  email: z.string()
    .email("Email inválido")
    .max(255, "Email deve ter no máximo 255 caracteres"),
  
  cnpj: z.string()
    .length(14, "CNPJ deve ter 14 dígitos")
    .regex(/^\d+$/, "CNPJ deve conter apenas números"),
  
  faturamento_medio: z.number()
    .positive("Faturamento deve ser um valor positivo")
    .int("Faturamento deve ser um número inteiro"),
  
  whatsapp_admin: z.string()
    .min(10, "WhatsApp admin deve ter no mínimo 10 dígitos")
    .max(50, "WhatsApp admin deve ter no máximo 50 caracteres")
    .regex(/^\d+$/, "WhatsApp deve conter apenas números"),
  
  whatsapp_suporte: z.string()
    .min(10, "WhatsApp suporte deve ter no mínimo 10 dígitos")
    .max(50, "WhatsApp suporte deve ter no máximo 50 caracteres")
    .regex(/^\d+$/, "WhatsApp deve conter apenas números"),
    
  
  senha: z.string()
    .min(6, "Senha deve ter no mínimo 6 caracteres")
    .max(255, "Senha deve ter no máximo 255 caracteres")
    .regex(
      /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])/, 
      "Senha deve conter pelo menos uma letra maiúscula e um caractere especial"
    ),
});

export type UserInput = z.infer<typeof userSchema>;