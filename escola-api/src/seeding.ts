import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module.js";
import { AlunosService } from "./alunos/alunos.service.js";
import { faker } from '@faker-js/faker/locale/pt_BR';

async function  bootstrap () {
    const app = await NestFactory.createApplicationContext(AppModule);
    const alunosService = app.get(AlunosService);

    console.log('🌱 Iniciando a geração de alunos de Faker alunos...');

    const cursosDisponiveis = ['Programador Full-stack',
        'Panificação',
        'Eletricista Predial',
        'Excel Básico',
        'Power BI Básico',
        'Apresentações crtiativas no Canva',
        'Corte e Custura',
        'Técnico em Biotecnologia',
        'Técnico em informatica',
        'Técnico em Desenvolvimento de jogos digitais',
        'Técnico em Manutenção e Suporte em informática'
    ];
    for(let i = 0; i<150; i++) {
        const cursosAleatorios = faker.helpers.arrayElements(
            cursosDisponiveis,{min:1, max:3});
            const alunoFaker = {
                nome : faker.person.fullName(),
                idade: faker.number.int({
                    min:16,
                    max:65
                }),
                matricula:faker.string.numeric(5),
                cursos:cursosAleatorios,
                ativo: true,
            };
            try{
                await alunosService.create(alunoFaker);
            }catch (error){
                console.log(`Pular: Erro  ao criar matrícula para ${alunoFaker.nome}! - matrícula duplicada`)
            }
    }
    console.log('Banco de dados populado com sucesso!'),
    console.log('Feliz natal 🎄')

    await app.close();
}
bootstrap();