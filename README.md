# Desafio Devops

O projeto contém uma aplicação básica com Node, Ngnix e MySQL.

A cada atualização da página, um novo registro será cadastrado no banco de dados e será mostrado na listagem, na mesma página.

O projeto contém algumas falhas e erros, analise e implemente as devidas correções.

Se não entender algum conceito ou parte do problema, não é motivo para se preocupar! Queremos que faça o desafio até onde souber.

### O que deve ser feito?

- ajustes que fazem todas as aplicações subirem e se comunicarem
- um README contendo os seus pensamentos ao longo do projeto para identificação e correção dos erros

Faça um fork e realize commits ao longo do processo para que possamos entender o seu modo de pensar! :)

## Como rodar a aplicação


- Clone o projeto `https://github.com/JoaoDiasDev/desafio-devops.git`
- Na raiz do projeto, onde se encontra o arquivo `docker-compose.yaml` use o comando `docker-compose build`
- Opcional: Após a finalização das builds das imagens dos containers proceda para a pasta `node` e dentro dela rode o comando `npm install` verifique se não gerou nenhum erro
- Volte para a raiz do projeto e rode o comando `docker-compose up -d`
- Agora já é possivel acessar a aplicação na url `http://localhost:3000`

#

## Ajustes Feitos no Projeto


### MYSQL

> Após a aplicação estar rodando verifiquei no banco que o Dockerfile do MYSQL não estava sendo configurado para UTF-8, sendo assim gerando caracteres indevidos no banco por conta de acentuação, pois os nomes gerados das pessoas continham acentos.

`Foi adicionada a linha ENV LANG=C.UTF-8 ao Dockerfile`

#

### NGINX

> Não estava sendo copiado o `nginx.conf` para o container, fazendo com que o NGINX não efetuasse o proxy corretamente.

`Foi adicionada a linha COPY nginx.conf /etc/nginx/conf.d ao Dockerfile`

#

> O nginx.conf não estava passando a porta que a aplicação estaria rodando de acordo na linha `proxy_pass`.

`Foi modificada a linha proxy_pass http://app; para proxy_pass http://app:3000; no nginx.conf`

#

### NODE

> O Dockerfile do NODE não estava copiando o package.json para o container.

`Foi adicionada a linha COPY package*.json ./ ao Dockerfile`

#

> Para executar a instalação dos modules no container é necessário rodar o npm install.

`Foi adicionada a linha RUN npm install ao Dockerfile logo após a linha COPY . . que copia todo conteudo do work directory para o container`

#

> No final do arquivo era preciso adicionar uma linha para executar os comandos e iniciar o container corretamente.

`Foi adicionada a linha CMD ["npm","run","start"] ao final do Dockerfile`

#

> No arquivo connectionDb.js o nome da base de dados estava declarado incorretamente, não estava de acordo com o que estava no docker-compose.

`Foi modificada a linha database: process.env.DATABASE || "nodedb", para database: process.env.DATABASE || "node_db", no connectionDb.js`

#

> Foi adicionado semicolons nos arquivos que estavam faltando como boa pratica, apesar de não se fazer necessário o uso em javascript. Importante destacar que não utilizar semicolons pode gerar erros dependendo de como é escrito o codigo ou se por exemplo for minificar os arquivos.

`Arquivos modificados index.js e routes.js`

#

> No arquivo docker-compose.yaml não havia sido declarado o bloco networks.

`Foi declarado no final do docker-compose o bloco`

```yaml
networks:
  node-network:
    driver: bridge
```

#
