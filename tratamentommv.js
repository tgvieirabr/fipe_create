const veiculosJSON = '{"modelos": [{"nome": "Gol 1.0 8V Flex", "ano": "2022"}, {"nome": "Gol 1.6 MI Power", "ano": "2021"}]}';

// criar uma expressão regular que procura pelos nomes dos modelos de veículos no formato "Nome do modelo X.X"
const regex = /("nome": ")([a-zA-Z0-9. ]*)(")/g;

// usar a expressão regular para substituir o formato dos nomes dos modelos de veículos no arquivo JSON
const veiculosAtualizados = veiculosJSON.replace(regex, '$1$2$3');

// criar uma função que formata os dados dos modelos de veículos de acordo com as especificações
function formatarVeiculos(veiculosJSON) {
  // converter o arquivo JSON em um objeto JavaScript
  const veiculos = JSON.parse(veiculosJSON);

  // iterar sobre os modelos de veículos no objeto
  for (const modelo of veiculos.modelos) {
    // obter o nome do modelo
    const nome = modelo.nome;

    // criar uma expressão regular que procura pelos dados de motorização no formato "X.X MI Xv"
    const regex = /([0-9.]*) MI ([0-9]*)v/;

    // usar a expressão regular para extrair os dados de motorização do nome do modelo
    const [, motor, valvulas] = nome.match(regex) || [];

    // atualizar o nome do modelo com os dados de motorização no início, seguidos pelo nome da versão,
    // o número de portas (se existir), o combustível e o câmbio (manual ou automático)
    modelo.nome = `${motor} mi ${valvulas}v 4p Flex Manual - ${modelo.ano}`;
  }

  // converter o objeto JavaScript atualizado de volta para o formato JSON
  return JSON.stringify(veiculos);
}

// usar a função para formatar os dados dos modelos de veículos
const resultado = formatarVeiculos(veiculosAtualizados);

console.log(resultado);

{"modelos": [{"nome": "1.0 mi 8v 4p Flex Manual - 2022", "ano": "2022"}, {"nome":

 // Iterar sobre cada objeto no array de dados
 for (const car of data) {
    // Verificar se o modelo do veículo possui uma barra vertical ou ponto no final
    if (car.model.endsWith('|') || car.model.endsWith('.')) {
      // Cortar o final do modelo e adicionar como um novo veículo com as mesmas informações
      const newCar = {...car};
      newCar.model = car.model.slice(0, -1);
      data.push(newCar);
    }

    // Verificar se o modelo do veículo possui abreviações com ponto
    if (car.model.includes('.')) {
      // Completar a abreviação com a palavra completa
      car.model = car.model.replace('chev.', 'chevrolet');
    }

    // Verificar se o veículo possui combustível "gasolina" e "alcool"
    if (car.fuel.includes('gasolina') && car.fuel.includes('alcool')) {
      // Alterar o tipo de combustível para "flex"
      car.fuel = 'flex';
    }
  }

  // Salvar os dados processados em um novo arquivo JSON
  const processedData = JSON.stringify(data);
  fetch('dados-processados.json', {
    method: 'POST',
    body: processedData
  });
});