import client from "../database/client.js";

class TarefaRepository {
  async buscarTodos() {
    console.log("Repository: buscarTodos chamado");
    const resultado = await client.query(`
      SELECT id, descricao, concluido, criada_em
      FROM tarefas
      ORDER BY id
    `);
    return resultado.rows;
  }

  async buscarPorId(id) {
    console.log("Repository: buscarPorId chamado");
    const resultado = await client.query(
      `
        SELECT id, descricao, concluido, criada_em
        FROM tarefas
        WHERE id = $1
      `,
      [id],
    );
    return resultado.rows[0] ?? null;
  }

  async salvar(tarefa) {
    console.log("Repository: salvar chamado");
    const resultado = await client.query(
      `
        INSERT INTO tarefas (descricao, concluido)
        VALUES ($1, $2)
        RETURNING id, descricao, concluido, criada_em
      `,
      [tarefa.descricao, tarefa.concluido],
    );
    return resultado.rows[0];
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

    const resultado = await client.query(
      `
        UPDATE tarefas
        SET descricao = $1,
            concluido = $2
        WHERE id = $3
        RETURNING id, descricao, concluido, criada_em
      `,
      [tarefaFinal.descricao, tarefaFinal.concluido, id],
    );

    return resultado.rows[0] ?? null;
  }

  async remover(id) {
    console.log("Repository: remover chamado");
    const resultado = await client.query(
      `
        DELETE FROM tarefas
        WHERE id = $1
      `,
      [id],
    );
    return resultado.rowCount > 0;
  }

  async buscarPendentes() {
    console.log("Repository: buscarPendentes chamado");
    const resultado = await client.query(
      `
        SELECT id, descricao, concluido, criada_em
        FROM tarefas
        WHERE concluido = false
        ORDER BY id
      `,
    );
    return resultado.rows;
  }
}

export default TarefaRepository;
