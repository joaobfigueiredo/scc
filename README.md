# Sistema de cadastro de clientes

Este projeto possui back e front end no mesmo repositório

## Baixar código 

git clone https://github.com/joaobfigueiredo/scc.git

## Backend

Este projeto foi gerado com [Spring initializr](https://start.spring.io/).
Observação: para executar o projeto, é necessário ter o Java na versão 17 instalado na máquina.

## Banco de dados

O banco de dados preferencial é o Postgres, onde deve ser criado o schema chamado db_scc confirme está descrito no arquivo src\main\resources\application.properties. 
Este arquivo contém as configurações do banco url, porta, usuário, senha e outros.
Deve ser editado com as configurações da maquina onde o projeto irá rodar.

```
spring.datasource.url=jdbc:postgresql://localhost:5432/db_scc
spring.datasource.username=postgres
spring.datasource.password=123mudar
```


## Instalar dependencias

cd backend-scc
mvn clean package

## Subindo a aplicação 

mvn spring-boot:run

# Frontend

## Instalar dependencias

cd frontend-scc
npm install

## Subir aplicação para acessar no navegador

Execute `npm start` para um servidor de desenvolvimento. Navegue até `http://localhost:3000/`. 

