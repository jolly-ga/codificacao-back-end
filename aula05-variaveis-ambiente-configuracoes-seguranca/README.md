Aula 05: Variáveis de Ambiente, Configurações e Segurança

Nesta aula prática de backend, exploramos o gerenciamento de configurações sensíveis, isolamento de variáveis de ambiente e validação inicial da aplicação usando Node.js e a biblioteca dotenv.

🛠️ Tecnologias e Ferramentas

Node.js (Ambiente de execução JavaScript)

dotenv (Gerenciamento de variáveis de ambiente)

VS Code (Editor de código)

📌 O que foi implementado

1. Configuração do Arquivo Local (.env)

Criado para armazenar as credenciais e configurações locais com segurança, evitando a exposição de dados sensíveis no versionamento de código:

PORT: Porta de execução do servidor local.

API_KEY_PAGAMENTO: Chave privada de acesso aos serviços de pagamento.

DATABASE_URL: String de conexão com o banco de dados MongoDB.

2. Criação do Template (.env.example)

Desenvolvido um modelo de documentação para que outros desenvolvedores saibam quais variáveis são necessárias para rodar o projeto, sem expor chaves reais:

PORT=
API_KEY_PAGAMENTO=
DATABASE_URL=


3. Leitura e Validação do Código (app.js)

Configuração do dotenv.config() para carregar as variáveis no objeto global process.env.

Definição de porta fallback (process.env.PORT || 8080).

Validação de Erro Crítico: Verificação para garantir que o sistema encerre a execução (process.exit(1)) caso a chave de API obrigatória não seja fornecida.

