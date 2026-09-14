import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { formatLog } from './utilitario.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function salvarLogSistema(mensagemLog){
    try{

const pastaLog = path.join(__dirname, 'log');
const arquivoLog = path.join(pastaLog, 'sysLog.log');

await fs.mkdir(pastaLog, {recursive:true});
const registro = formatLog(mensagemLog);
await fs.appendFile(arquivoLog, registro, 'utf-8');

console.log('Log Registrado com sucesso...');
    }catch(erro){
console.erro('Erro ao registrar log: ', erro);
    }
}

salvarLogSistema('Inicialização do servidor concluída!\n');
salvarLogSistema('conexão com banco de dados estabelecida!\n');