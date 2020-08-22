const chalk = require("chalk");
const fs = require('fs');
const csvParser = require('csv-parser');
const createCsvWriter = require("csv-writer").createObjectCsvWriter;

let conteudoCervejas= [];
const nome_do_arquivoCervejas= "cervejas_saida.csv";
    
let streamCervejas = fs.createReadStream("beers.csv");
    streamCervejas.pipe(csvParser()).on("data",(data) => {
        conteudoCervejas.push({
            id: Number(data["id"]),
            abv: Number(data["abv"]).toFixed(2),
            ibu: Number(data["ibu"]).toFixed(2),
            "national_id": data["national_id"].trim(),
            name: (data["name"].trim()).replace(/['`"]/g,""),
            style: (data["style"].trim()).replace(/['`"]/g,""),
            "brewery_id": Number(data["brewery_id"]),
            ounces: Number(data["ounces"]).toFixed(2)
        })
    }); 

    streamCervejas.on("end",() => {
        const csvWriter = createCsvWriter({
            path: nome_do_arquivoCervejas,
            header: [
                {id: "id", title: "id"},
                {id: "abv", title: "abv"},
                {id: "ibu", title: "ibu"},
                {id: "national_id", title: "national_id"},
                {id: "name", title: "name"},
                {id: "style", title: "style"},
                {id: "brewery_id", title: "brewery_id"},
                {id: "ounces", title: "ounces"}
            ]
        })
        console.log(chalk.green(`${nome_do_arquivoCervejas} criado com sucesso`));
        csvWriter.writeRecords(conteudoCervejas)
    });