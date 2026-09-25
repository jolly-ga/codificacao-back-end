import { Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
export class JogosService {
    private jogos = [
        {id: 1, titulo: 'Minecraft', estudio:'Mojang Studio' },
        {id: 2, titulo:'The Legend of Zelda: Ocarina of time', Studio:'Nintendo'},
        {id: 3, titulo: 'Grand theft Auto V', estudio: 'Rockstar North'},
        {id: 4, titulo: 'Elde Ring', estudio: 'FromSoftware'},
        {id: 5, titulo: 'God of war', estudio: 'Santa Monica Studio'},
    ];
    buscarPorId(id: number){
        const jogo = this.jogos.find((j) => j.id === id);
        if (!jogo){
            throw new NotFoundException(`Jogo com ID ${id} não localizado em estoque.`);
        }
        return jogo;
    }
}