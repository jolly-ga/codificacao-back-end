# Aula 14 - Servidor Edge Runtime com Vercel

## Introdução

Na aula 14 de Codificação Backend, foi desenvolvido um servidor utilizando o **Vercel** e o conceito de **Edge Runtime**. O objetivo da atividade foi compreender como criar uma função capaz de responder a requisições HTTP e executar essa função utilizando o ambiente de execução disponibilizado pela Vercel.

Durante a atividade, foi criada uma API responsável por informar dados sobre a execução do servidor, como o horário em que a função foi executada, a região de execução e o tempo necessário para processar a requisição.

Além da implementação do código, também foram realizados testes para verificar se o servidor estava funcionando corretamente. Para isso, foi utilizada a extensão **Thunder Client**, integrada ao Visual Studio Code, permitindo realizar uma requisição `GET` para a API e analisar a resposta retornada.

---

## Objetivos da aula

Os principais objetivos desenvolvidos durante a aula foram:

- Compreender o funcionamento do **Vercel Edge Runtime**;
- Criar uma função para atender requisições HTTP;
- Trabalhar com o objeto `Request`;
- Utilizar o objeto `Response` para retornar informações ao cliente;
- Configurar uma função para utilizar o ambiente `edge`;
- Trabalhar com respostas no formato **JSON**;
- Calcular o tempo de execução de uma função;
- Compreender a execução de aplicações em ambientes distribuídos;
- Utilizar o **Vercel CLI** para executar e configurar o projeto;
- Realizar testes de uma API utilizando o **Thunder Client**.

---

## Vercel e Edge Runtime

O **Vercel** é uma plataforma utilizada para hospedagem e execução de aplicações web e funções backend. Durante a aula, foi utilizado o ambiente **Edge Runtime**, que permite executar funções em uma infraestrutura distribuída, aproximando a execução do servidor dos usuários.

Diferentemente de um servidor tradicional executado apenas em uma máquina específica, o conceito de execução na borda permite que determinadas funções sejam executadas em diferentes regiões da infraestrutura da plataforma.

Na atividade, essa configuração foi realizada no arquivo da API por meio da propriedade:

```ts
export const config = {
  runtime: 'edge',
};