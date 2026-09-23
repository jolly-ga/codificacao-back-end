## Aula 08 e 09 - Codificação Backend

Durante as aulas 08 e 09, desenvolvi novas funcionalidades para a API de gerenciamento de convidados utilizando NestJS e TypeScript.

### O que foi desenvolvido:
- Criação do `CriarConvidadoDto` para organizar os dados de nome e idade dos convidados.
- Implementação das rotas para listar e criar convidados.
- Implementação do método `PATCH` para atualizar a idade de um convidado pelo ID.
- Implementação do método `DELETE` para remover um convidado pelo ID.
- Utilização de `@Param()` e `@Body()` para receber dados das requisições.
- Uso do `NotFoundException` para tratar situações em que o convidado não é encontrado.
- Organização das funcionalidades entre `Controller`, `Service` e `DTO`.
- Testes e implementação das respostas da API para as operações realizadas.

### Objetivo da aula

O objetivo foi praticar a criação de uma API REST utilizando os principais métodos HTTP (`GET`, `POST`, `PATCH` e `DELETE`), aplicando uma estrutura organizada com NestJS.