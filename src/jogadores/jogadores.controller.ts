import { Body, Controller, Delete, Get, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { get } from 'http';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import {JogadoresService} from './jogadores.service';

@Controller('api/v1/jogadores')
export class JogadoresController {

constructor(private readonly JogadoresService:JogadoresService){}

    @Post()
    @UsePipes(ValidationPipe)
    async criarAtualizarJogador(
        @Body() criarJogadorDto:CriarJogadorDto){ 
            
        await this.JogadoresService.criarAtualizarJogador(criarJogadorDto)
    }
    
   @Get()
        async consultarJogadores(@Query('email') email:string ):Promise<Jogador[]| Jogador>
        {
            if (email) {
                    return await this.JogadoresService.consultaPorEmail(email);
            }else 
            {return await this.JogadoresService.consultarTodosJogadores();}
        }

        @Delete()
        async deletarJogador(@Query('email') email:string):Promise<void>
        {
            this.JogadoresService.deletarJogador(email)
        }
}
