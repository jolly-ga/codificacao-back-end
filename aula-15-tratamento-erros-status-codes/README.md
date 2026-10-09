# 📚 Aula 15: Tratamento de Erros e Status Codes no NestJS

Este projeto foi desenvolvido como parte do curso de **Codificação Back-End**. O objetivo desta aula foi implementar rotas para consulta de produtos e aplicar o tratamento de exceções HTTP nativo do **NestJS**, garantindo validações de entrada, logs estruturados do sistema e o retorno apropriado de status codes para o cliente.

---

## 🛠️ Tecnologias Utilizadas

- **Node.js**
- **NestJS** (Framework do ecossistema Node.js)
- **TypeScript**

---

## 📁 Estrutura do Projeto

O código do projeto está organizado dentro do diretório `src/`:


---

## ⚙️ Funcionalidades e Implementações

### 1. Injeção de Dependências e Módulos
No arquivo `app.module.ts`, registramos o `ProdutosController` nos *controllers* e o `ProdutosService` nos *providers*, tornando o serviço injetável no controller através do padrão de Injeção de Dependência do NestJS.

### 2. Fonte de Dados (`ProdutosService`)
O arquivo `produtos.service.ts` armazena uma lista em memória contendo os produtos com seus respectivos atributos (`id`, `nome` e `preco`):
- `id: 1` - Arroz namorados (R$ 9.99)
- `id: 2` - Feijão Timbiras (R$ 7.99)
- `id: 3` - Macarrão Galo (R$ 5.99)
- `id: 4` - Açúcar União (R$ 4.99)
- `id: 5` - Sal Lebre (R$ 2.99)

E expõe o método `listarProdutos()`, que retorna a lista completa.

### 3. Rotas e Endpoints (`ProdutosController`)

#### `GET /produtos`
Retorna a lista completa de produtos cadastrados no serviço.

#### `GET /produtos/:id`
Busca um produto específico através do identificador informado na URL.

---

## 🛡️ Validações, Tratamento de Erros e Logs

No endpoint `GET /produtos/:id`, foram implementadas validações defensivas e exceções personalizadas para lidar com erros de cliente (*Client Errors*):

### 1. Validação de Parâmetro Numérico (`400 Bad Request`)
- O parâmetro de rota `:id` é recebido como `string` e convertido usando `Number(idProduto)`.
- Se a conversão resultar em `NaN` (por exemplo, ao acessar `/produtos/abcde`), o sistema:
  1. Registra um **aviso de log** no terminal via `Logger`:
     `Tentativa de buscar com ID {idProduto} não numérico.`
  2. Lança uma exceção **`BadRequestException`**, retornando status **`400 Bad Request`** com a mensagem: `"O ID do produto deve ser número inteiro."`.

### 2. Validação de Existência do Recurso (`404 Not Found`)
- É realizada a busca do produto dentro da lista pelo seu `id`.
- Se o produto não for localizado (por exemplo, ao buscar `/produtos/999`):
  1. Registra um **aviso de log** no terminal via `Logger`:
     `Produto com ID {id} não localizado.`
  2. Lança uma exceção **`NotFoundException`**, retornando status **`404 Not Found`** com a mensagem: `"Produto com ID {id} não encontrado."`.

---

## 🚀 Como Executar o Projeto

1. Instale as dependências:
   ```bash
   npm install
Execute a aplicação em modo de desenvolvimento:

Bash
npm run start:dev