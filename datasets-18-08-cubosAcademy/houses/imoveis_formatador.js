const chalk = require("chalk");
const fs = require('fs');
const csvParser = require('csv-parser');
const createCsvWriter = require("csv-writer").createObjectCsvWriter;

let conteudo = [];
const nome_do_arquivo = "houses_out.csv";
console.log(chalk.red("Arquivo começou a ser processado" ));
let stream = fs.createReadStream("houses.csv");
    stream.pipe(csvParser()).on("data", (data) => {
        conteudo.push({
            id: conteudo.length + 1,
            city: data["city"].trim(),
            area: data["area"].trim(),
            rooms: Number(data["rooms"]),
            bathroom: Number(data["bathroom"].trim()),
            "parking spaces": Number(data["parking spaces"]),
            floor: Number(data["floor"].replace("-","0")),
            animal: data["animal"].trim(),
            furniture: data["furniture"].trim(),
            hoa: Number(data["hoa"].replace(/["Sem info""Incluso"]/g,"0")) * 100,
            "rent amount": Number(data["rent amount"]) * 100,
            "property tax": Number(data["property tax"]) * 100,
            "fire insurance": Number(data["fire insurance"]) * 100,
            total: Number(data["total"]) * 100
        })
    });

    stream.on("end",() => {
        const csvWriter = createCsvWriter ({
            path: nome_do_arquivo,
            header: [
                {id: "id", title:"id"},
                {id: "city", title:"city"},
                {id: "area", title:"area"},
                {id: "rooms", title:"rooms"},
                {id: "bathroom", title:"bathroom"},
                {id: "parking spaces", title:"parking spaces"},
                {id: "floor", title:"floor"},
                {id: "animal", title:"animal"},
                {id: "furniture", title:"furniture"},
                {id: "hoa", title:"hoa"},
                {id: "rent amount", title:"rent amount"},
                {id: "property tax", title:"property tax"},
                {id: "fire insurance", title:"fire insurance"},
                {id: "total", title:"total"}
            ]
        })
        console.log(chalk.green(`${nome_do_arquivo} terminou de ser processado e foi criado`));
        csvWriter.writeRecords(conteudo);
    });