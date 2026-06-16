import Fastify from "fastify";
import cors from "@fastify/cors";

import tarefaRoutes from "./routes/tarefa.routes.js";
import TarefaRepository from "./repositories/tarefa.repository.js";
import TarefaService from "./services/tarefa.service.js";
import TarefaController from "./controllers/tarefa.controller.js";
import { AppError } from "./errors/AppError.js";
import client from "./database/client.js";

const server = Fastify();

server.register(cors, {
  origin: "*",
  methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
});

// Composition Root: criação e conexão das dependências
const repository = new TarefaRepository();
const service = new TarefaService(repository);
const controller = new TarefaController(service);

server.get("/laboratorio/tarefas-db", async (request, reply) => {
  const resultado = await client.query(`
    SELECT id, descricao, concluido, criada_em
    FROM tarefas
    ORDER BY id
  `);

  return reply.send(resultado.rows);
});

server.post("/laboratorio/tarefas-db", async (request, reply) => {
  const { descricao } = request.body;

  if (!descricao || descricao.trim() === "") {
    return reply.status(400).send({
      status: "error",
      message: "A descrição da tarefa é obrigatória",
    });
  }

  const resultado = await client.query(
    `
      INSERT INTO tarefas (descricao)
      VALUES ($1)
      RETURNING id, descricao, concluido, criada_em
    `,
    [descricao.trim()],
  );

  return reply.status(201).send(resultado.rows[0]);
});

// ==========================================
// TRATAMENTO DE ERROS GLOBAL (A Rede de Segurança)
// ==========================================
server.setErrorHandler((error, request, reply) => {
  if (error instanceof AppError) {
    return reply.status(error.statusCode).send({
      status: "error",
      message: error.message,
    });
  }
  console.error("🔥 ERRO INTERNO:", error);
  return reply.status(500).send({
    status: "error",
    message: "Internal Server Error",
  });
});

// Registra as rotas, passando o controller via options
server.register(tarefaRoutes, { controller });

const PORT = 3000;

const start = async () => {
  try {
    await client.connect();
    console.log("Conectado ao PostgreSQL com sucesso");

    await server.listen({ port: PORT });
    console.log(`Servidor rodando em http://localhost:${PORT}`);
  } catch (err) {
    console.error("Falha ao iniciar a aplicação:", err);
    process.exit(1);
  }
};

start();
