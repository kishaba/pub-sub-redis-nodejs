<h1 align="center">PUB & SUB - REDIS - NODE</h1>
<h2 align="center">Usando Redis como publisher e subscriber numa aplicação NodeJs</h2>

<br>
<h2>
Como usar?
</h2>

* Ter o redis instalado e rodando
* Rodar os dois servidores `server-1` e `server-2`.
* Enviar uma requisição post para o server-2

<br>

<h2>Como funciona?</h2>
<p>
O <i>server-2</i> recebe a requisição e faz duas ações:

  1. Armazena os dados recebidos no redis
  2. Enviar uma notificação pelo <i>publisher</i> para os <i>subscribers</i> conectados no canal.
</p>

<p>
O <i>server-1</i>, por sua vez, está escutando qualquer notificação do canal <i>canal-teste</i>. Uma vez recebida qualquer notificação, ele dispara a rotina de leitura dos registros inseridos e após isso, deleta o registro recém lido.
</p>
