## Aula 08 e 09 - Codificação Backend

Nas aulas 08 e 09, demos continuidade ao desenvolvimento da API de gerenciamento de convidados utilizando **NestJS** e **TypeScript**. O foco dessas aulas foi trabalhar com as principais operações de uma API REST, utilizando diferentes métodos HTTP e organizando o projeto em **Controller, Service e DTO**.

### Estrutura e organização

Durante o desenvolvimento, foi utilizada a separação de responsabilidades do NestJS:

- **Controller:** responsável por receber as requisições HTTP, definir as rotas e encaminhar os dados para o Service.
- **Service:** responsável por concentrar a lógica de manipulação dos convidados.
- **DTO (Data Transfer Object):** utilizado para definir e organizar os dados recebidos pela API.

### DTO para criação de convidados

Foi criado o arquivo `criar-convidado-dto.ts`, contendo a classe `CriarConvidadoDto`.

O DTO define os dados necessários para cadastrar um convidado:

- `nome`: nome do convidado;
- `idade`: idade do convidado.

Essa estrutura ajuda a manter os dados recebidos pela API organizados e padronizados.

### Operações com convidados

No `ConvidadosController`, foram implementadas diferentes rotas para trabalhar com os convidados.

#### GET - Listar convidados

Foi criada uma rota `GET` responsável por solicitar a lista de convidados.

Essa requisição chama o método `listarConvidados()` do `ConvidadosService`, que retorna os dados armazenados.

#### POST - Criar convidado

Foi implementada uma rota `POST` para adicionar novos convidados.

Os dados são recebidos através do `@Body()` e utilizam o `CriarConvidadoDto` para definir a estrutura das informações recebidas.

Após o cadastro, a API retorna uma mensagem informando que o convidado foi adicionado com sucesso.

#### PATCH - Atualizar convidado

Também foi implementada uma rota `PATCH` para atualizar a idade de um convidado.

O ID do convidado é recebido através do `@Param('id')` e a nova idade é recebida pelo `@Body()`.

No `ConvidadosService`, o método `atualizarIdade()` localiza o convidado pelo ID e altera sua idade.

#### DELETE - Remover convidado

Foi criada uma rota `DELETE` para remover um convidado da lista.

O ID é recebido através do parâmetro da URL e enviado para o método `removerConvidadoLista()` do Service.

Para realizar a remoção, foi utilizado o método `findIndex()` para localizar a posição do convidado e, posteriormente, o `splice()` para removê-lo da lista.

### Tratamento de erros

Foi utilizado o `NotFoundException` do NestJS para tratar situações em que um convidado não é encontrado pelo ID.

Dessa forma, quando uma operação de atualização ou remoção é realizada com um ID inexistente, a aplicação retorna uma exceção informando que o convidado não foi encontrado.

### Service

No `ConvidadosService`, foi criada uma lista inicial de convidados contendo informações como:

- ID;
- Nome;
- Idade.

Além disso, foram implementados métodos responsáveis por:

- listar os convidados;
- localizar um convidado pelo ID;
- atualizar a idade de um convidado;
- remover um convidado da lista.

### AppService

Também foi trabalhado o `AppService`, responsável por disponibilizar uma mensagem simples de status da aplicação:

`Servidor Ativo!`

Essa funcionalidade permite verificar se o servidor da aplicação está funcionando corretamente.

### Objetivo das aulas

O principal objetivo das aulas 08 e 09 foi aprofundar os conhecimentos sobre o desenvolvimento de APIs utilizando **NestJS**, colocando em prática os métodos HTTP **GET, POST, PATCH e DELETE**.

Também foi possível compreender melhor como **Controllers, Services e DTOs** trabalham em conjunto para organizar uma aplicação backend, além de praticar o recebimento de parâmetros, dados no corpo das requisições e o tratamento de erros.

Com essas implementações, a API passou a permitir não apenas consultar e cadastrar convidados, mas também **atualizar e excluir registros**, tornando o projeto mais completo e próximo de uma aplicação backend real.