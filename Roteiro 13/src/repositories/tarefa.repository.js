import pool from "../database/pool.js";

class TarefaRepository {
  async buscarTodos() {
    console.log("Repository: buscarTodos chamado");
    const resultado = await pool.query(`
      SELECT
        t.id,
        t.descricao,
        t.concluido,
        t.criada_em,
        t.projeto_id,
        p.nome AS projeto_nome
      FROM tarefas t
      LEFT JOIN projetos p
        ON p.id = t.projeto_id
      ORDER BY t.id
    `);
    return resultado.rows;
  }

  async buscarPorId(id) {
    console.log("Repository: buscarPorId chamado");
    const resultado = await pool.query(
      `
        SELECT
          t.id,
          t.descricao,
          t.concluido,
          t.criada_em,
          t.projeto_id,
          p.nome AS projeto_nome
        FROM tarefas t
        LEFT JOIN projetos p
          ON p.id = t.projeto_id
        WHERE t.id = $1
      `,
      [id],
    );
    return resultado.rows[0] ?? null;
  }

  async salvar(tarefa) {
    console.log("Repository: salvar chamado");
    const resultado = await pool.query(
      `
        INSERT INTO tarefas (descricao, concluido, projeto_id)
        VALUES ($1, $2, $3)
        RETURNING id
      `,
      [tarefa.descricao, tarefa.concluido, tarefa.projetoId],
    );
    return this.buscarPorId(resultado.rows[0].id);
  }

  async atualizar(id, dadosAtualizados) {
    console.log("Repository: atualizar chamado");
    const tarefaAtual = await this.buscarPorId(id);
    if (!tarefaAtual) return null;

    const tarefaFinal = {
      ...tarefaAtual,
      ...dadosAtualizados,
      id: tarefaAtual.id,
    };

    const resultado = await pool.query(
      `
        UPDATE tarefas
        SET descricao = $1,
            concluido = $2,
            projeto_id = $3
        WHERE id = $4
        RETURNING id
      `,
      [
        tarefaFinal.descricao,
        tarefaFinal.concluido,
        tarefaFinal.projeto_id,
        id,
      ],
    );

    return this.buscarPorId(resultado.rows[0]?.id);
  }

  async remover(id) {
    console.log("Repository: remover chamado");
    const resultado = await pool.query(
      `
        DELETE FROM tarefas
        WHERE id = $1
      `,
      [id],
    );
    return resultado.rowCount > 0;
  }

  async buscarPorProjeto(projetoId) {
    console.log("Repository: buscarPorProjeto chamado");
    const resultado = await pool.query(
      `
        SELECT
          t.id,
          t.descricao,
          t.concluido,
          t.criada_em,
          t.projeto_id,
          p.nome AS projeto_nome
        FROM tarefas t
        INNER JOIN projetos p
          ON p.id = t.projeto_id
        WHERE p.id = $1
        ORDER BY t.id
      `,
      [projetoId],
    );
    return resultado.rows;
  }

  async buscarPendentes() {
    console.log("Repository: buscarPendentes chamado");
    const resultado = await pool.query(
      `
        SELECT
          t.id,
          t.descricao,
          t.concluido,
          t.criada_em,
          t.projeto_id,
          p.nome AS projeto_nome
        FROM tarefas t
        LEFT JOIN projetos p
          ON p.id = t.projeto_id
        WHERE t.concluido = false
        ORDER BY t.id
      `,
    );
    return resultado.rows;
  }
}

export default TarefaRepository;
