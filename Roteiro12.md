Resolução dos Exercícios - Arquitetura em Camadas e PostgreSQL

Exercício 1 — Filtro por descrição

O filtro deve ser implementado sem alterar o papel das camadas.

Controller:
Recebe o parâmetro de busca da requisição e encaminha para o Service.

Service:
Valida ou trata regras de negócio relacionadas à busca.

Repository:
Executa a consulta SQL utilizando o filtro informado.

Exemplo:
SELECT * FROM tarefas
WHERE descricao ILIKE '%' || $1 || '%';

Caso o texto de busca esteja vazio ou não seja informado:
SELECT * FROM tarefas;


Exercício 2 — Filtro por concluído

O filtro deve seguir a separação de responsabilidades:

Controller:
Recebe o parâmetro concluido da requisição.

Service:
Decide qual operação executar e valida o parâmetro.

Repository:
Realiza a consulta SQL.

Exemplo:
SELECT * FROM tarefas
WHERE concluido = $1;

Conclusão:
O filtro não deve ser resolvido diretamente no Controller.
O Service coordena a operação.
O Repository é responsável pelo acesso ao banco de dados.


Exercício 3 — Resumo com dados reais

Abordagem 1 – Buscar tudo e calcular em memória

SELECT * FROM tarefas;

Vantagens:
- Implementação simples.
- Reaproveita dados já carregados.

Desvantagens:
- Consome mais memória.
- Traz registros desnecessários.
- Menor desempenho em grandes volumes.

Abordagem 2 – Contar diretamente no PostgreSQL

SELECT COUNT(*) AS total FROM tarefas;

SELECT COUNT(*) AS concluidas
FROM tarefas
WHERE concluido = true;

SELECT COUNT(*) AS pendentes
FROM tarefas
WHERE concluido = false;

Vantagens:
- Melhor desempenho.
- Menor consumo de memória.
- Banco faz o processamento.

Desvantagens:
- Exige consultas específicas.

Conclusão:
Para sistemas reais, contar diretamente no banco é a melhor abordagem.


Exercício 4 — Explicação da arquitetura

1. Por que o SQL de laboratório não deveria continuar no server.js?

Porque o server.js deve apenas iniciar a aplicação e configurar rotas. Misturar SQL nessa camada gera acoplamento, dificulta manutenção e quebra a separação de responsabilidades.

2. Por que o Repository é o lugar correto para acesso a dados?

Porque o Repository centraliza toda a comunicação com o banco de dados. Assim, caso a tecnologia de persistência seja alterada, as demais camadas continuam praticamente inalteradas.

3. O que mudou e o que não mudou na arquitetura do sistema?

Mudou:
- A persistência passou do array em memória para PostgreSQL.
- O Repository passou a executar SQL real.

Não mudou:
- A divisão em Controller, Service e Repository.
- As regras de negócio do Service.
- A responsabilidade das camadas.
- O fluxo principal da aplicação.


Resumo Final

A migração para PostgreSQL manteve a arquitetura organizada e demonstrou a importância da separação de responsabilidades. O Controller continua responsável pelas requisições, o Service pelas regras de negócio e o Repository pelo acesso aos dados. Dessa forma, a aplicação torna-se mais escalável, organizada e fácil de manter.
