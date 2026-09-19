## 🚀 Aula 06 — Servidor Web com Node.js

Nesta aula, desenvolvi um servidor web utilizando o módulo nativo `http` do **Node.js**, trabalhando conceitos básicos de requisições, respostas, rotas e códigos de status HTTP.

### 🎯 O que foi desenvolvido

- **Servidor HTTP:** Criação de um servidor utilizando `http.createServer()`.
- **Rota `/status`:** Retorna o status do servidor em formato JSON.
- **Tratamento de erros:** Rotas inexistentes retornam o código `404`.
- **Cabeçalhos HTTP:** Configuração de cabeçalhos de segurança, como `X-Content-Type-Options` e `X-Frame-Options`.
- **Logs:** Registro do método HTTP e da rota acessada no terminal.
- **ES Modules:** Configuração do projeto para utilizar `import` através do `"type": "module"`.

### 🛠️ Tecnologias utilizadas

| Tecnologia | Utilização |
|---|---|
| JavaScript | Linguagem utilizada |
| Node.js | Ambiente de execução |
| HTTP | Criação do servidor web |
| JSON | Formato das respostas |
| NPM | Gerenciamento do projeto |

### 📌 Funcionamento

A aplicação utiliza a porta **3000** e possui dois comportamentos principais:

| Requisição | Resposta |
|---|---|
| `GET /status` | `200` + status do servidor |
| Outras rotas | `404` + mensagem de erro |

### 📚 Aprendizado

A aula permitiu praticar os conceitos fundamentais de um servidor Backend, como **requisições HTTP, rotas, respostas JSON, códigos de status e cabeçalhos HTTP**.
