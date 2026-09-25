## Aula 10 - Rotas Dinâmicas

Na aula 10 de Codificação Backend, desenvolvi uma API utilizando o framework **NestJS**, trabalhando com **rotas dinâmicas** e organização da aplicação em módulos, controllers e services.

### O que foi desenvolvido

Durante a aula, foi criada uma estrutura para consulta de jogos cadastrados na aplicação. Para isso, foram utilizados três componentes principais:

- **JogosService:** responsável por armazenar os dados dos jogos e implementar a lógica de busca.
- **JogosController:** responsável por receber as requisições HTTP e disponibilizar a rota para consulta de um jogo específico.
- **AppModule:** responsável por registrar o controller e o service na aplicação.

### Rotas dinâmicas

Foi criada a rota:

`GET /jogos/:id`

O `:id` representa um parâmetro dinâmico da URL. Dessa forma, é possível informar o ID do jogo diretamente na requisição, por exemplo:

`GET /jogos/1`

O controller utiliza o `@Param()` para capturar esse valor e encaminhá-lo para o service:

```typescript
@Get(':id')
buscarPorId(@Param('id') id: string) {
    const numId = +id;
    return this.jogosService.buscarPorId(numId);

## Objetivo da aula

O principal objetivo da aula foi compreender como criar uma rota capaz de receber informações diretamente pela URL e utilizar essas informações para executar uma determinada ação no backend.

Neste caso, foi criada uma rota para buscar jogos pelo seu ID.
}