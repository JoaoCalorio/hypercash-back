import { serial, pgTable, varchar, timestamp, integer } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: serial("id").primaryKey(),
  nome_completo: varchar({ length: 255 }).notNull().unique(),
  email: varchar({ length: 255 }).notNull().unique(),
  cnpj: varchar({ length: 50 }).notNull().unique(),
  faturamento_medio: integer().notNull(),
  whatsapp_admin: varchar({ length: 50 }).notNull(),
  whatsapp_suporte: varchar({ length: 50 }).notNull(),
  senha: varchar({ length: 255 }).notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
});
