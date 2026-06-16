-- Modelo relacional para tarefas e projetos

CREATE TABLE IF NOT EXISTS projetos (
  id SERIAL PRIMARY KEY,
  nome TEXT NOT NULL,
  criado_em TIMESTAMP NOT NULL DEFAULT NOW()
);

ALTER TABLE tarefas
ADD COLUMN IF NOT EXISTS projeto_id INTEGER;

ALTER TABLE tarefas
ADD CONSTRAINT IF NOT EXISTS tarefas_projeto_id_fkey
FOREIGN KEY (projeto_id)
REFERENCES projetos(id);
