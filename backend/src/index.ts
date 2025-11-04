import 'dotenv/config';
import { Hono } from 'hono'
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { usersTable } from './db/schema';
import { userSchema } from './validations/userSchema';
import { z } from 'zod';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const db = drizzle(pool);

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.get('/users', async (c) => {
  try {
    const users = await db.select().from(usersTable);

    return c.json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    return c.json({ success: false, error: 'Erro ao buscar usuários' }, 500);
  }
});


app.post('/users', async (c) => {
  try {
    const body = await c.req.json()
    
    const validatedData = userSchema.parse(body)
    

    const novoUsuario = await db.insert(usersTable)
      .values(validatedData)
      .returning({
        id: usersTable.id,
        nome_completo: usersTable.nome_completo,
        email: usersTable.email,
        cnpj: usersTable.cnpj,
        faturamento_medio: usersTable.faturamento_medio,
        whatsapp_admin: usersTable.whatsapp_admin,
        whatsapp_suporte: usersTable.whatsapp_suporte,
        created_at: usersTable.created_at
      });

    return c.json({
      success: true,
      user: novoUsuario[0]
    })

  } catch (error) {
    if (error instanceof z.ZodError) {
      return c.json({
        success: false,
        errors: error.message
      }, 400)
    }


    if (error instanceof Error) {
      console.error('Erro ao criar o usuario:', error);
      const pgError = error as any;
      
      if (pgError.code === '23505') {
        return c.json({
          success: false,
          error: 'Duplicate entry',
          detail: pgError.detail
        }, 409)
      }

      return c.json({
        success: false,
        error: error.message
      }, 500)
    }

    return c.json({
      success: false,
      error: '?'
    }, 500)
  }
})



export default app
