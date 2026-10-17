# 📘 Aula 17: Documentação Técnica de APIs com NestJS e Swagger

Este repositório contém a aplicação desenvolvida durante a **Aula 17 da disciplina de Codificação Back-End**. O foco principal desta aula foi a integração da especificação **OpenAPI (Swagger)** em uma aplicação **NestJS**, permitindo gerar automaticamente uma interface gráfica interativa para documentação e testes de rotas da API.

---

## 📑 Sumário

- [Visão Geral do Projeto](#-visão-geral-do-projeto)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Arquitetura e Implementação](#-arquitetura-e-implementação)
  - [1. Configuração do Swagger (`main.ts`)](#1-configuração-do-swagger-maints)
  - [2. Módulo Principal (`app.module.ts`)](#2-módulo-principal-appmodulets)
  - [3. Mapeamento dos Dados com DTO (`criar-produto.dto.ts`)](#3-mapeamento-dos-dados-com-dto-criar-produtodtots)
  - [4. Controle de Rotas e Validação HTTP (`produtos.controller.ts`)](#4-controle-de-rotas-e-validação-http-produtoscontrollerts)
- [Testes e Validação na Interface Interativa](#-testes-e-validação-na-interface-interativa)
- [Como Executar o Projeto](#-como-executar-o-projeto)

---

## 📌 Visão Geral do Projeto

A aplicação simula o gerenciamento de um estoque de alimentos. O endpoint criado permite o cadastro de novos produtos, recebendo informações essenciais (`nome`, `preco` e `categoria`) e retornando as devidas respostas de sucesso ou erro formatadas.

Com o Swagger integrado:
- A documentação fica sincronizada com o código-fonte em tempo real.
- Desenvolvedores front-end ou parceiros de integração podem visualizar os schemas dos dados e testar as requisições via navegador.

---

## 🛠️ Tecnologias Utilizadas

- **Framework:** NestJS (Node.js)
- **Linguagem:** TypeScript
- **Documentação:** `@nestjs/swagger`
- **Driver da Interface:** `swagger-ui-express`

---

## 📐 Arquitetura e Implementação

Abaixo está o detalhamento de cada arquivo modificado para viabilizar a documentação da API.

### 1. Configuração do Swagger (`src/main.ts`)

No arquivo de entrada da aplicação, utilizamos a classe `DocumentBuilder` para estruturar os metadados da API (título, descrição, versão e tags de agrupamento) e disponibilizar a rota `/docs`.

```typescript
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Construção dos metadados da documentação
  const config = new DocumentBuilder()
    .setTitle('API de Estoque de Alimentos')
    .setDescription('Documenta técnica interativa para integração')
    .setVersion('1.0')
    .addTag('Produtos')
    .addBearerAuth()
    .build();

  // Criação e inicialização do documento Swagger na rota /docs
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);
}
bootstrap();
```

---

### 2. Módulo Principal (`src/app.module.ts`)

O `AppModule` organiza e registra os controllers responsáveis pelas rotas da aplicação.

```typescript
import { Module } from '@nestjs/common';
import { ProdutosController } from './produtos/produtos.controller.js';

@Module({
  imports: [],
  controllers: [ProdutosController],
  providers: [],
})
export class AppModule {}
```

---

### 3. Mapeamento dos Dados com DTO (`src/produtos/dto/criar-produto.dto.ts`)

O **Data Transfer Object (DTO)** define a estrutura dos dados que a API espera receber no corpo (`body`) da requisição. Cada propriedade é anotada com `@ApiProperty`, que enriquece a documentação do Swagger informando exemplos de preenchimento e descrições detalhadas.

```typescript
import { ApiProperty } from '@nestjs/swagger';

export class CriarProdutoDto {
  // Nome do produto
  @ApiProperty({
    example: 'Café Grão de Ouro 500g',
    description: 'Nome comercial do produto cadastrado.',
  })
  nome: string;

  // Preço do produto
  @ApiProperty({
    example: 9.99,
    description: 'Preço unitário do produto',
  })
  preco: number;

  // Gênero / Categoria do produto
  @ApiProperty({
    example: 'Alimentos',
    description: 'Categoria do produto',
  })
  categoria: string;
}
```

---

### 4. Controle de Rotas e Validação HTTP (`src/produtos/produtos.controller.ts`)

No controller, mapeamos o endpoint `POST /produtos` utilizando decorators do Swagger para descrever a operação e listar todas as respostas HTTP possíveis (`201` e `400`).

```typescript
import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CriarProdutoDto } from './dto/criar-produto.dto.js';

@ApiTags('produtos')
@Controller('Produtos')
export class ProdutosController {
  
  @Post()
  @ApiOperation({
    summary: 'Cadastrar um novo produto no estoque',
  })
  @ApiResponse({
    status: 201,
    description: 'Produto cadastrado com sucesso.',
  })
  @ApiResponse({
    status: 400,
    description: 'Payload enviado contém dados mal formatados e/ou inválidos.',
  })
  async criar(@Body() criarprodutodto: CriarProdutoDto) {
    return {
      id: 67,
      ...criarprodutodto,
      CriadoEm: new Date().toLocaleDateString(),
    };
  }
}
```

---

## 🧪 Testes e Validação na Interface Interativa

A validação foi feita acessando o endereço `http://localhost:3000/docs`.

### **Exemplo de Corpo da Requisição (Request Body):**

```json
{
  "nome": "Café Grão de Ouro 500g",
  "preco": 9.99,
  "categoria": "Alimentos"
}
```

### **Códigos de Resposta Documentados e Testados:**

| Código HTTP | Significado | Situação de Uso na API |
| :---: | :--- | :--- |
| **`201`** | **Created** | O produto foi validado e inserido com sucesso no estoque. Retorna o objeto com `id` gerado e a data `CriadoEm`. |
| **`400`** | **Bad Request** | A requisição falhou porque o corpo (`payload`) continha campos mal formatados, tipos divergentes ou dados ausentes. |

---

## 🚀 Como Executar o Projeto

1. **Clonar o repositório e acessar a pasta do projeto:**
   ```bash
   cd aula-17-documentacao-tecnica-com-swagger-nestjs
   ```

2. **Instalar as dependências do Node.js:**
   ```bash
   npm install
   ```

3. **Iniciar o servidor de desenvolvimento:**
   ```bash
   npm run start:dev
   ```

4. **Acessar a documentação no navegador:**
   Navegue até [http://localhost:3000/docs](http://localhost:3000/docs) para interagir com os endpoints da aplicação.