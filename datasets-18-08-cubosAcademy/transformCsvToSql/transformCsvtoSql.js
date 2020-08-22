// TAREFA INCOMPLETA - EXPECÏFICA PARA O BREWERIES.CSV
const chalk = require("chalk");
const fs = require("fs");
const csvParser = require("csv-parser");

const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

let nomeArquivo;
let conteudo = [];
let columns;
let resultado = "";
let create = "CREATE TABLE mytable ";
let insert = "INSERT INTO mytable ";


const perguntaArquivo = (resposta) => {
    //forca o arquivo a ser.csv caso não, da erro
    if (!resposta.includes(".csv")){
        nomeArquivo = `${resposta}.csv`
    }

    else {
        nomeArquivo = resposta;
    }

    const stream = fs.createReadStream(nomeArquivo);
        stream.on("data", (data) => {
            //transforma o array para string
            let string = data.toString();
            //separa por linha
            let formatted = string.split("\n");
            //separa por vírgula(insert)
            columns = formatted[0].split(",");
            
        });

        stream.pipe(csvParser()).on("data", (data) => {
            conteudo.push({
                id: Number(data.id.trim()),
                name: data.name.trim().replace(/['`]/g,""),
                city: data.city.trim().replace(/['`]/g,""),
                state: data.state.trim()
            })
        });
       
        //criar uma string que guarda tudo o que será escrito no formato .sql
        stream.on("data",(data)=> {
            resultado += (`${create} (\n${columns[0]} INT,\n${columns[1]} VARCHAR(30),\n${columns[2]} VARCHAR(30),\n${columns[3]} VARCHAR(30)\n);
            \n\n`);
            for (let i =0; i < conteudo.length; i++){
                resultado += (`${insert}(${columns}) VALUES (${conteudo[i].id}, "${conteudo[i].name}", "${conteudo[i].city}", "${conteudo[0].state}")\n`)
            }
        });

        stream.on("end",()=> {
            fs.writeFileSync("result.sql",resultado);
            console.log(chalk.green("result.sql criado com sucesso"));
            rl.close();
        });
        
}

rl.question ("Qual o nome do arquivo .csv deseja converter para sql? ", perguntaArquivo);
