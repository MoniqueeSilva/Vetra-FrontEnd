# Vetra - Frontend

Interface web do sistema Vetra, desenvolvido para auxiliar no gerenciamento de depósitos de bebidas.

O frontend foi desenvolvido utilizando ReactJS e Vite, sendo servido em produção por meio do servidor web Nginx em um container Docker.

## Tecnologias utilizadas

- ReactJS
- JavaScript
- Vite
- HTML5
- CSS3
- Nginx
- Docker

## Estrutura do projeto

O frontend possui uma estrutura organizada para separar os componentes e funcionalidades da interface.

Principais arquivos e diretórios:

- `src/`: código-fonte da aplicação.
- `public/`: arquivos públicos, quando utilizados.
- `package.json`: dependências e scripts do projeto.
- `package-lock.json`: controle das versões das dependências.
- `index.html`: documento HTML principal.
- `Dockerfile`: configuração da imagem Docker.
- `.dockerignore`: arquivos e diretórios ignorados durante a construção da imagem.

## Dockerfile Multi-stage Build

O frontend utiliza a estratégia **Multi-stage Build** para otimizar a geração da imagem Docker.

O processo possui duas etapas:

### 1. Etapa de build

Utiliza a imagem `node:22-alpine` para:

- Configurar o diretório de trabalho.
- Copiar os arquivos de dependências.
- Instalar as dependências com `npm ci`.
- Copiar os arquivos da aplicação.
- Gerar a versão de produção com `npm run build`.

### 2. Etapa de execução

Utiliza a imagem `nginx:alpine` para:

- Receber os arquivos gerados na etapa anterior.
- Copiar os arquivos de produção para o diretório público do Nginx.
- Disponibilizar a aplicação pela porta 80.

Com essa estratégia, a imagem final não precisa incluir Node.js nem as dependências utilizadas somente durante o build.

## Como executar o projeto

### Pré-requisitos

- Git
- Docker
- Docker Compose

### Executar utilizando Docker Compose

O Docker Compose está configurado no repositório do backend e realiza a inicialização dos três serviços da aplicação.

Primeiro, clone os dois repositórios:

```bash
mkdir Vetra
cd Vetra

git clone https://github.com/MoniqueeSilva/Vetra-BackEnd.git
git clone https://github.com/MoniqueeSilva/Vetra-FrontEnd.git
```

Acesse o backend:

```bash
cd Vetra-BackEnd
```

Execute:

```bash
docker compose up --build -d
```

O frontend será construído e executado automaticamente em um container Nginx.

### Executar somente o frontend

Também é possível construir e executar o frontend separadamente.

Acesse a pasta do projeto:

```bash
cd Vetra-FrontEnd
```

Construa a imagem:

```bash
docker build -t vetra-frontend .
```

Execute o container:

```bash
docker run -d --name vetra-frontend -p 5173:80 vetra-frontend
```

Acesse pelo navegador:

http://localhost:5173

**Observação:** para utilizar todas as funcionalidades que dependem da API, o backend também precisa estar em execução na porta 5000.

## Porta de execução

| Serviço | Porta |
|---|---|
| Nginx | 80 (interna) |
| Frontend | 5173 (acesso pelo navegador) |

## Repositórios relacionados

- **Frontend:** https://github.com/MoniqueeSilva/Vetra-FrontEnd
- **Backend:** https://github.com/MoniqueeSilva/Vetra-BackEnd
