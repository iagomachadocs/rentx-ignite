# Rentx

![GitHub repo size](https://img.shields.io/github/repo-size/iagomachadocs/rentx-ignite?style=flat-square)

<img src="rentx.png" alt="Rentx logo" height="50">

> API REST de uma locadora de carros

## 💻 Sobre

Aplicação desenvolvida durante o Bootcamp Ignite, na trilha de Node.JS. Consiste em uma API para uma locadora de carros, que permite o gerenciamento dos carros que serão alugados, bem como o cadastro de usuários e a criação de um aluguel e sua devolução. 

O desenvolvimento desta aplicação envolveu conceitos como os princípios SOLID, autenticação (JWT), testes de unidade e testes de integração (Jest e supertest), containerização (Docker), banco de dados (PostgreSQL e TypeORM), envio de emails (AmazonSES), armazenamento em nuvem (AmazonS3) e o deploy em ambiente de produção (Amazon EC2) utilizando Github Actions.

## 🛠 Tecnologias

As seguintes tecnologias e bibliotecas foram usadas na construção do projeto:

- [TypeScript](https://www.typescriptlang.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [Typeorm](https://typeorm.io/)
- [JWT](https://jwt.io/)
- [Jest](https://jestjs.io/)
- [Docker](https://www.docker.com/)
- [Redis](https://redis.io/)
- [Amazon SES](https://aws.amazon.com/pt/ses/)
- [Amazon S3](https://aws.amazon.com/pt/s3/)
- [Amazon EC2](https://aws.amazon.com/pt/ec2)
- [Sentry](https://sentry.io/welcome/)


## 📑 Especificação de Requisitos

### **Cadastro de carro**

**RF**
- Deve ser possível cadastrar um novo carro.

**RN**
- Não deve ser possível cadastrar um carro com uma placa já existente.
- O carro deve ser cadastrado como disponível por padrão.
- O usuário responsável pelo cadastro deve ser um usuário administrador.

### **Listagem de carros**

**RF**
- Deve ser possível listar todos os carros disponíveis.
- Deve ser possível listar todos os carros disponíveis pelo nome da categoria.
- Deve ser possível listar todos os carros disponíveis pelo nome da marca.
- Deve ser possível listar todos os carros disponíveis pelo nome do carro.

**RN**
- O usuário não precisa estar logado no sistema.

### **Cadastro de Especificação de um carro**

**RF**
- Deve ser possível cadastrar uma especificação para um carro.

**RN**
- Não deve ser possível cadastrar uma especificação para um carro não cadastrado.
- Não deve ser possível cadastrar uma especifícação já existente para o mesmo carro.
- O usuário responsável pelo cadastro deve ser um usuário administrador.

### **Cadastro de imagens do carro**

**RF**
- Deve ser possível cadastrar a imagem do carro.

**RNF**
- Utilizar o multer para upload dos arquivos

**RN**
- O usuário deve poder cadastrar mais de uma imagem para o mesmo carro.
- O usuário responsável pelo cadastro deve ser um usuário administrador.

### **Alugel de carro**

**RF**
- Deve ser possível cadastrar um aluguel.

**RN**
- O aluguel deve ter duração mínima de 24 horas.
- Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário.
- Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro.
- O usuário deve estar logado na aplicação.
- Ao realizar um aluguel, o status do carro deverá ser alterado para indisponível.

### **Devolução de carro**

**RF**
- Deve ser possível realizar a devolução de um carro

**RN**
- Se o carro for devolvido com menos de 24 horas, deverá ser cobrada uma diária completa.
- Ao realizar a devolução, o carro deverá ser liberado para outro aluguel.
- Ao realizar a devolução, o usuário deverá ser liberado para outro aluguel.
- Ao realizar a devolução, deverá ser calculado o total do aluguel.
- Caso o horário de devolução seja superior ao horário previsto de entrega, deverá ser cobrado multa proporcional aos dias de atraso.
- Caso haja multa, deverá ser somado ao total do aluguel.
- O usuário deve estar logado na aplicação.

### **Listagem de alugueis para usuário**

**RF**
- Deve ser possível realizar a busca de todos os alugueis para o usuário.

**RN**
- O usuário deve estar logado na aplicação.

### **Recuperação de senha**

**RF**
- Deve ser possível o usuário recuperar senha informando o email.
- O usuário deve receber um e-mail com o passo a passo para a recuperação da senha.
- O usuário deve conseguir inserir uma nova senha.

**RN**
- O usuário precisa informar uma nova senha.
- O link enviado para a recuperação deve expirar em 3 horas.


## ⚙️ Como executar (Ubuntu)

- Com o Docker e o docker-compose instalados, execute:
  ```bash
    docker-compose up -d 
  ```
- Crie um arquivo .env e preencha as variáveis de ambiente:
  ```bash
    cp .env.example .env
  ```
- Crie um arquivo ormconfig.json e preencha as informações do banco de dados:
  ```bash
    cp ormconfig.example.json ormconfig.json
  ```
- Instale as dependências do projeto:
  ```bash
    yarn install
  ```
- Execute as migrations do banco de dados:
  ```bash
    yarn typeorm migration:run
  ```
- Execute a aplicação em ambiente de desenvolvimento:
  ```bash
    yarn dev
  ```