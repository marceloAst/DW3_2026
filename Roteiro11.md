Resolução dos Exercícios

Exercício 1 — Filtro por descrição

Para implementar esse filtro sem mexer na responsabilidade das camadas, eu faria da seguinte forma:

O Controller apenas recebe o texto informado na requisição e envia para o Service.

O Service verifica se existe algum filtro e encaminha para o Repository.

O Repository fica responsável por executar a consulta no banco.

Quando o usuário informar uma descrição, a consulta pode ser:

SELECT * FROM tarefas
WHERE descricao ILIKE '%' || $1 || '%';

Caso nenhum texto seja informado, basta retornar todas as tarefas:

SELECT * FROM tarefas;

Dessa forma, cada camada continua fazendo apenas o que foi projetada para fazer.


Exercício 2 — Filtro por concluído

Na minha opinião, esse filtro não deve ficar no Controller.

O Controller deve apenas receber o valor informado pelo usuário.

O Service fica responsável por validar o parâmetro e decidir qual consulta utilizar.

Já o Repository executa o SQL necessário para buscar os dados.

Exemplo:

SELECT * FROM tarefas
WHERE concluido = $1;

Assim, toda a lógica relacionada ao banco continua centralizada no Repository, mantendo a arquitetura organizada.


Exercício 3 — Resumo com dados reais

Existem duas formas de fazer esse resumo.

A primeira é buscar todas as tarefas e realizar os cálculos na aplicação.

Vantagens:
- Mais simples de implementar.
- Reaproveita os dados já carregados.

Desvantagens:
- Consome mais memória.
- Pode ficar lento com muitas tarefas.
- Traz informações que nem sempre serão utilizadas.

A segunda forma é deixar o próprio PostgreSQL fazer as contagens.

Exemplos:

SELECT COUNT(*) FROM tarefas;

SELECT COUNT(*) FROM tarefas
WHERE concluido = true;

SELECT COUNT(*) FROM tarefas
WHERE concluido = false;

Na minha análise, essa segunda opção é melhor porque o banco foi criado justamente para trabalhar com grandes volumes de dados e realizar esse tipo de processamento de forma eficiente.


Exercício 4 — Explicação da arquitetura

Por que o SQL de laboratório não deveria continuar no server.js?

Porque o server.js tem a função de iniciar e configurar a aplicação. Se eu colocar SQL diretamente nele, a responsabilidade da camada fica misturada e o código se torna mais difícil de manter.

Por que o Repository é o lugar correto para acesso a dados?

Porque ele centraliza toda a comunicação com o banco de dados. Assim, caso seja necessário trocar PostgreSQL por outra tecnologia no futuro, a maior parte da aplicação continuará funcionando sem alterações.

O que mudou e o que não mudou na arquitetura?

O que mudou:
- A aplicação deixou de utilizar o array em memória.
- Os dados passaram a ser armazenados no PostgreSQL.
- O Repository passou a executar consultas SQL reais.

O que não mudou:
- A estrutura Controller → Service → Repository.
- As regras de negócio do Service.
- As responsabilidades de cada camada.
- O fluxo principal da aplicação.

Conclusão

Durante essa atividade foi possível perceber que a troca da persistência não exigiu mudanças grandes na arquitetura do sistema. A principal alteração aconteceu no Repository, enquanto as demais camadas continuaram praticamente iguais. Isso mostra a importância da separação de responsabilidades, pois deixa o sistema mais organizado, fácil de manter e preparado para futuras alterações.
