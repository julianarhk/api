# <p align="center"><b>API</b></p>

**Esse é um código que usa o Express para criar rotas para um servidor web. Ele usa o MongoDB para armazenar informações sobre cidades e clientes. Vamos agora analisar o código em detalhes!**

As primeiras linhas do código importam as bibliotecas necessárias e definem algumas variáveis. 

*A linha 1 importa o Express.  <br /> 
A linha 2 importa o ObjectId do MongoDB.  <br /> 
A linha 3 cria uma instância do Express. <br /> 
A linha 4 define a porta em que o servidor será executado.  <br /> 
A linha 5 declara uma variável global para armazenar a conexão com o banco de dados MongoDB.*

 - app.use(express.json()) ... Esta linha diz ao Express para usar o
   middleware que analisa o corpo das solicitações como JSON.
   
  - app.use(async (_req, _res, next)... Este middleware conecta-se ao
   banco de dados MongoDB antes de executar qualquer rota. Ele usa o
   arquivo database.js para estabelecer uma conexão com o banco de dados
   e armazena a conexão na variável db. A função next() é chamada para
   continuar a execução do middleware ou passar para a próxima rota.
   
 -  app.post('/cities'... Esta rota trata uma solicitação de criação de
   uma nova cidade. Ela usa o método HTTP POST e espera um corpo JSON
   com as informações da nova cidade. A rota insere os dados no banco de
   dados e retorna uma mensagem JSON com o resultado da operação.
   
 -  app.patch('/cities/:id'... Esta rota trata uma solicitação de
   atualização de uma cidade existente. Ela usa o método HTTP PATCH e
   espera um parâmetro de rota id e um corpo JSON com as informações
   atualizadas. A rota atualiza as informações no banco de dados e
   retorna uma mensagem JSON com o resultado da operação.
   
  - app.delete('/clients/:id'... Esta é a rota para excluir um cliente. É
   uma rota HTTP DELETE que espera um parâmetro ID no final da URL.
   
 -  app.get('/clients', async (req, res)... Essa é uma rota GET que busca
   os clientes no banco de dados de acordo com os parâmetros da query.
   Se houver clientes correspondentes, a resposta HTTP tem um status 200
   e a mensagem 'Client found with the given parameters.' junto com os
   dados. Se não houver clientes correspondentes, a resposta tem um
   status 204 e a mensagem 'No client found with the given parameters.'
   e um array vazio. Em caso de erro, a resposta tem um status 500 e a
   mensagem 'Internal server error.'
   
  - app.listen(port, () => ... Essa última linha de código inicia o
   servidor e faz com que ele comece a "escutar" as requisições HTTP na
   porta especificada. Quando um cliente (por exemplo, um navegador web)
   acessa o servidor através dessa porta, o servidor recebe a requisição
   e pode responder com uma resposta adequada. O console.log é apenas
   uma mensagem de texto que é exibida no terminal para informar que o
   servidor está rodando e pronto para receber requisições.

<h3 align="center">Resumidamente, essas são as rotas criadas e suas funcionalidades.</h3>
