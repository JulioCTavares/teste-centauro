# Como rodar esse projeto?

Primeiro, você terá que ter instalado no seu computador o Node.js, o GitHub e alguma IDE que rode o projeto.
P.S. se precisar de indicação, aposta sempre no Visual Studio Code.

# Depois que instalei, o que faço?

Você vai ter que clonar o repositório no seu computador. Em cima dessa arquivo tem um botão escrito "Clone", você irá copiar o código dele e depois que tiver ajustado todas as configurações do gitHub no seu computador, irá abrir a IDE e selecionar para abrir o projeto.

# E como eu vejo o projeto?

Agora você vai ter que executar o comando "npm install" (no terminal da IDE ou no cmd) para poder instalar todos os arquivos e extensões que utilizei no meu projeto.
Após a finalização, você irá rodar o comando "npm start", e o projeto vai estar rodando tudo certo no seu link http://localhost:3000/

# Não estou entendo a interface.

Deixa eu te explicar, inicialmente você verá um componente verde com 2 espaços para inserir a localização do cliente com 2 parâmetros.
Depois, você preencherá o número de lojas ao redor juntamente com as posições de cada uma, uma por linha.
Finalizando, você irá clicar no botão de calcular e verá quais as 3 lojas mais próximas do cliente.

# Quais as tecnologias utilizadas?

Eu utilizei o JavaScript, Html, CSS e Reactjs.

# Qual a lógica do projeto?

Como não foi optado pela utilização de um banco de dados, por meio de estados a localização do cliente foi armazenada, e todas as lojas foram inseridas em um array. Em seguida foi calculado a distância de cada loja para o cliente e inserido em um array de objetos com os parâmetros de localização e a distância de cada unidade, sendo lido e mapeado dentro do body com o limite de 3 lojas.
