import { Controller, Get } from "@nestjs/common";
import { get } from "http";

@Controller()
export class AppController {
    @Get()
    getPublic(){
        return {
            mensagem: 'Rota pública acessada com sucesso!',
            data:new Date(),
        }
    }
    @Get('admin')
    getPrivate(){
        return {
mensagem: 'Bem-vindo ao painel administrativo',
data: new Date(),
        }
    }
}