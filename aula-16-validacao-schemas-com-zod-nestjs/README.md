# 📘 Aula 16: Validação de Schemas com Zod no NestJS

Este repositório contém a implementação prática da **Aula 16 da disciplina de Codificação Back-End**, cujo objetivo principal foi integrar a biblioteca **Zod** ao framework **NestJS** para realizar validações de payloads via *Custom Pipe*.

---

## 📌 Visão Geral do Projeto

A aplicação gerencia a rota de cadastro de colaboradores (`POST /colaboradores`). 

Antes que os dados enviados no corpo da requisição (`body`) cheguem ao método do *Controller*, eles passam por um *Pipe* customizado (`ZodValidationPipe`) que valida o formato, os tipos e as restrições com base no schema definido em `colaboradorSchema`.

Caso ocorra qualquer falha de validação, a API interrompe o fluxo e responde com o status HTTP **`400 Bad Request`**, retornando a lista detalhada de erros com os respectivos campos e mensagens.

---

## 🛠️ Tecnologias Utilizadas

* **Framework:** NestJS
* **Linguagem:** TypeScript
* **Biblioteca de Validação:** Zod
* **Exceções HTTP:** `@nestjs/common` (`BadRequestException`)

---

## 📂 Estrutura de Arquivos da Aula

 Os arquivos principais do projeto e suas respectivas responsabilidades:

```text
src/
├── colaborador.schema.ts      # Schema Zod com regras de validação do colaborador
├── zod-validation.pipe.ts     # Pipe customizado que executa a validação Zod
├── colaboradores.controller.ts # Controller que define a rota POST /colaboradores
├── app.controller.ts          # Controller básico (rota padrão GET /)
├── app.module.ts              # Módulo principal da aplicação
└── main.ts                    # Ponto de entrada (bootstrapping da aplicação)
```

---

## 💻 Código Fonte Detalhado

### 1. Schema de Validação (`src/colaborador.schema.ts`)
Define as regras do objeto `Colaborador`:
* `nome`: String com mínimo de 3 caracteres.
* `email`: String em formato válido de e-mail.
* `idade`: Número entre 18 e 65 anos.
* `departamento`: Apenas um dos valores do enum: `'TI'`, `'RH'`, `'Comercial'` ou `'Financeiro'`.

```typescript
import { z } from "zod";

export const colaboradorSchema = z.object({
  nome: z.string()
    .min(3, { message: 'O nome deve ter no mínimo 3 letras!' }),
  email: z.email({ message: 'O email deve ser válido!' }),
  idade: z.number({ message: 'A idade deve ser um número válido!' })
    .min(18, { message: 'A idade mínima permitida é 18 anos!' })
    .max(65, { message: 'A idade máxima permitida é 65 anos!' }),
  departamento: z.enum(['TI', 'RH', 'Comercial', 'Financeiro'], {
    error: () => ({ message: 'Departamento deve ser obrigatoriamente um dos válidos' }),
  }),
});

export type Colaborador = z.infer<typeof colaboradorSchema>;
```

---

### 2. Custom Pipe de Validação (`src/zod-validation.pipe.ts`)
Implementa a interface `PipeTransform`. Intercepta os dados enviados na requisição e valida usando o método `safeParse` do Zod.

```typescript
import { BadRequestException, PipeTransform, ArgumentMetadata } from '@nestjs/common';
import { z } from 'zod';

export class ZodValidationPipe implements PipeTransform {
  constructor(private z: z.ZodType) {}

  transform(value: unknown, metadata: ArgumentMetadata) {
    if (metadata.type !== 'body') return value;

    const parseResult = this.z.safeParse(value);

    if (!parseResult.success) {
      const formatedErrors = parseResult.error.issues.map((issue) => ({
        campo: issue.path.join('.'),
        mensagem: issue.message,
      }));

      throw new BadRequestException({
        statusCode: 400,
        errors: formatedErrors,
      });
    }

    return parseResult.data;
  }
}
```

---

### 3. Controller (`src/colaboradores.controller.ts`)
Aplica o `ZodValidationPipe` na rota `POST /colaboradores` através do decorator `@UsePipes`.

```typescript
import { Controller, Post, Body, UsePipes } from "@nestjs/common";
import { colaboradorSchema } from "./colaborador.schema.js";
import type { Colaborador } from "./colaborador.schema.js";
import { ZodValidationPipe } from "./zod-validation.pipe.js";

@Controller('colaboradores')
export class ColaboradoresController {
  @Post()
  @UsePipes(new ZodValidationPipe(colaboradorSchema))
  async create(@Body() body: Colaborador) {
    return {
      mensagem: 'Colaborador cadastrado com sucesso',
      dados: body,
    };
  }
}
```

---

### 4. Controller Raiz (`src/app.controller.ts`)

```typescript
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service.js';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
```

---

### 5. Módulo Principal (`src/app.module.ts`)

```typescript
import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ColaboradoresController } from './colaboradores.controller.js';
import { ZodValidationPipe } from './zod-validation.pipe.js';

@Module({
  imports: [],
  controllers: [AppController, ColaboradoresController],
  providers: [AppService],
})
export class AppModule {}
```

---

### 6. Ponto de Entrada (`src/main.ts`)

```typescript
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}

await bootstrap();
```

---

## 🧪 Exemplos de Requisição e Resposta

### ✅ Sucesso (HTTP 201 Created)
**`POST /colaboradores`**
```json
{
  "nome": "Ana Garcia",
  "email": "ana.garcia@empresa.com",
  "idade": 25,
  "departamento": "TI"
}
```
**Resposta:**
```json
{
  "mensagem": "Colaborador cadastrado com sucesso",
  "dados": {
    "nome": "Ana Garcia",
    "email": "ana.garcia@empresa.com",
    "idade": 25,
    "departamento": "TI"
  }
}
```

### ❌ Erro de Validação (HTTP 400 Bad Request)
**`POST /colaboradores`**
```json
{
  "nome": "An",
  "email": "email-invalido",
  "idade": 15,
  "departamento": "Marketing"
}
```
**Resposta:**
```json
{
  "statusCode": 400,
  "errors": [
    {
      "campo": "nome",
      "mensagem": "O nome deve ter no mínimo 3 letras!"
    },
    {
      "campo": "email",
      "mensagem": "O email deve ser válido!"
    },
    {
      "campo": "idade",
      "mensagem": "A idade mínima permitida é 18 anos!"
    },
    {
      "campo": "departamento",
      "mensagem": "Departamento deve ser obrigatoriamente um dos válidos"
    }
  ]
}
```

---

## 🚀 Como Executar

1. Instale as dependências:
   ```bash
   npm install
   ```

2. Execute em modo de desenvolvimento:
   ```bash
   npm run start:dev
   ```

3. A aplicação estará disponível em `http://localhost:3000`.