## Aula 12 - Request e Response Advanced

Na Aula 12 de Codificação Backend, desenvolvi uma aplicação utilizando o framework **NestJS**, dando continuidade aos estudos sobre construção de APIs e aprofundando os conhecimentos relacionados ao funcionamento de **requisições (Request) e respostas (Response)**.

Nesta aula, trabalhei com a comunicação entre **Controller e Service**, criação de rotas utilizando o método HTTP **GET**, utilização de **Headers** para envio e recebimento de informações e controle personalizado das respostas da aplicação.

Também foi desenvolvida uma funcionalidade de segurança utilizando uma **API Key**, permitindo validar se uma requisição possui uma chave de acesso válida antes de liberar o conteúdo de uma rota protegida.

### Objetivos da aula

Os principais objetivos desta aula foram:

- Compreender melhor o funcionamento de **Request e Response** em uma API;
- Aprender a receber informações enviadas pelo cliente através dos **HTTP Headers**;
- Utilizar o `@Headers()` do NestJS para acessar informações presentes nos cabeçalhos da requisição;
- Aprender a utilizar o `@Res()` para controlar diretamente a resposta enviada pela API;
- Trabalhar com diferentes **Status Codes HTTP**;
- Implementar uma validação de acesso utilizando uma **API Key**;
- Compreender a diferença entre uma requisição autorizada e uma requisição sem autorização;
- Praticar a organização da aplicação utilizando **Controllers e Services**;
- Utilizar **injeção de dependência** entre Controller e Service;
- Desenvolver respostas HTTP personalizadas contendo mensagens, headers e códigos de status;
- Registrar informações de data e hora durante o processamento das requisições.

### Desenvolvimento da aplicação

Durante a aula, a aplicação foi estruturada utilizando os recursos disponibilizados pelo **NestJS**, mantendo a separação de responsabilidades entre os componentes.

O `AppService` foi utilizado para concentrar uma parte da lógica da aplicação, enquanto o `AppController` ficou responsável por receber as requisições e disponibilizar a rota correspondente.

Também foi criado um controller específico para trabalhar com a parte de segurança da aplicação.

### 1. Criação do AppService

Foi desenvolvido o arquivo `app.service.ts`, responsável por disponibilizar o método `getHello()`.

Esse método retorna a mensagem:

```text
Servidor ativo!