import fetch from 'node-fetch';

import * as fs from 'fs/promises';

async function main() {
    const tiposVeiculo = ['carros', 'motos', 'caminhoes'];

    for (const tipoVeiculo of tiposVeiculo) {
        console.log(`Consultando tipo de veículo: ${tipoVeiculo}`);

        // Faz uma consulta à API para obter a lista de marcas
        const response = await fetch(`https://veiculos.fipe.org.br/api/veiculos/ConsultarMarcas?codigoTipoVeiculo=${tipoVeiculo}`);
        const marcas = await response.json();

        // Cria um objeto vazio para armazenar os resultados da consulta
        const resultados = {};

        // Para cada marca, consulta a lista de modelos
        for (const marca of marcas) {
            console.log(`Consultando modelos da marca: ${marca.Nome}`);

            const response = await fetch(`https://veiculos.fipe.org.br/api/veiculos/ConsultarModelos?codigoTipoVeiculo=${tipoVeiculo}&codigoMarca=${marca.Codigo}`);
            const modelos = await response.json();

            // Armazena os modelos da marca no objeto de resultados
            resultados[marca.Nome] = modelos;

            // Para cada modelo, consulta a lista de anos
            for (const modelo of modelos) {
                console.log(`Consultando anos do modelo: ${modelo.Nome}`);

                const response = await fetch(`https://veiculos.fipe.org.br/api/veiculos/ConsultarAnoModelo?codigoTipoVeiculo=${tipoVeiculo}&codigoModelo=${modelo.Codigo}`);
                const anos = await response.json();

                // Armazena os anos do modelo no objeto de resultados
                resultados[marca.Nome][modelo.Nome] = anos;

                // Para cada ano, consulta os preços
                for (const ano of anos) {
                    console.log(`Consultando preços do ano: ${ano.AnoModelo}`);

                    const response = await fetch(`https://veiculos.fipe.org.br/api/veiculos/ConsultarValorComTodosParametros?codigoTipoVeiculo=${tipoVeiculo}&codigoModelo=${modelo.Codigo}&codigoModelo=${ano.Codigo}`);
                    const precos = await response.json();

                    // Armazena os preços do ano no objeto de resultados
                    resultados[marca.Nome][modelo.Nome] = anos;

                    // Para cada ano, consulta os preços
                    for (const ano of anos) {
                        console.log(`Consultando preços do ano: ${ano.AnoModelo}`);


                        const response = await fetch(`https://veiculos.fipe.org.br/api/veiculos/ConsultarValorComTodosParametros?codigoTipoVeiculo=${tipoVeiculo}&codigoModelo=${modelo.Codigo}&codigoAnoModelo=${ano.Codigo}`);
                        const precos = await response.json();

                        // Armazena os preços do ano no objeto de resultados
                        resultados[marca.Nome][modelo.Nome][ano.AnoModelo] = precos;
                    }
                }
            }

            // Salva os resultados em um arquivo JSON
            fs.writeFileSync(`${tipoVeiculo}.json`, JSON.stringify(resultados));
        }
    }

    main();
}


