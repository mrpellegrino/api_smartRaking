import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import {CriarJogadorDto} from './dtos/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import { v4 as uuidv4 } from 'uuid';
import { json } from 'stream/consumers';
import { InjectModel } from '@nestjs/mongoose';
import {Model} from 'mongoose';
@Injectable()
export class JogadoresService {

    private jogadores: Jogador[]=[];

    constructor(@InjectModel('Jogador') private readonly jogadorModel : Model<Jogador>){

    }

    private readonly logger = new Logger(JogadoresService.name);

    async criarAtualizarJogador(criarJogadorDto:CriarJogadorDto):Promise<void>
     {
         
       const{email}=criarJogadorDto;
       
       //const jogadorEncontrado =await this.jogadorModel.findOne({email}).exec()

       const jogadorEncontrado = await this.jogadorModel.findOne({email}).exec();

       if(jogadorEncontrado) {
            await this.atualizar(criarJogadorDto)
       }
       else{
           await this.criar(criarJogadorDto)
       }

    this.criar(criarJogadorDto);
    }


    async consultarTodosJogadores():Promise <Jogador[]>{
       return await this.jogadorModel.find().exec();
    }

    private async criar(criarJogadorDto:CriarJogadorDto):Promise<Jogador>
    {   
        /*
        const{nome, telefoneCelular ,email} = criarJogadorDto;

        const jogador: Jogador ={
            nome,
            telefoneCelular,
            email,
            ranking:'A',
            posicaoRanking: 1,
            urlFotoJogador :'www.google.com.br'
        }

        this.logger.log(`criarJogadorDto:${JSON.stringify(jogador)}`)
        this.jogadores.push(jogador )
        */
        
        const JogadorCriado = new this.jogadorModel(criarJogadorDto)
        return await JogadorCriado.save();


    }

    
    async deletarJogador(email):Promise<any>
        {
            return await this.jogadorModel.remove({email}).exec();
        }

        private async atualizar(jogadorDTO:CriarJogadorDto): Promise<Jogador>
        {
            /*
                const{nome}=jogadorDTO;
                jogadorEncontrado.nome = nome;
             */

                return await this.jogadorModel.findByIdAndUpdate({email:CriarJogadorDto.email},{$set:CriarJogadorDto    }).exec();

        }

        async consultaPorEmail(email:string):Promise<Jogador>
        {
            const jogadorEncontrado= await this.jogadorModel.findOne({email}).exec();
            
            if(jogadorEncontrado!)
            {
                throw new NotFoundException (`jOGADOR COM O EMAIL ${email} não foi encontrado`);
            }
            return jogadorEncontrado;
        }
        
}
