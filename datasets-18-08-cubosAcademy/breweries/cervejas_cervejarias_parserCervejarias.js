const chalk = require("chalk");
const fs = require('fs');
const csvParser = require('csv-parser');
const createCsvWriter = require("csv-writer").createObjectCsvWriter;

let conteudoCervejarias= [];
const nome_do_arquivoCervejarias= "cervejarias_saida.csv";

let streamCervejarias= fs.createReadStream("breweries.csv");
    streamCervejarias.pipe(csvParser()).on("data", (data) => {
        conteudoCervejarias.push({
            id: Number(data.id.trim()),
            name: data.name.trim().replace(/['`]/g,""),
            city: data.city.trim().replace(/['`]/g,""),
            state: data.state.trim()
        })
    });

    streamCervejarias.on("end",() => {
        const csvWriter = createCsvWriter ({
            path: nome_do_arquivoCervejarias,
            header: [
                {id: "id" , title: "id"},
                {id: "name" , title: "name"},
                {id: "city" , title: "city"},
                {id: "state" , title: "state"}
            ]
        })
        console.log(chalk.green(`${nome_do_arquivoCervejarias} criado com sucesso`));
        csvWriter.writeRecords(conteudoCervejarias);
    });