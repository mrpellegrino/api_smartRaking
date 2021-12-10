import { Module } from '@nestjs/common';
import { JogadoresModule } from './jogadores/jogadores.module';
import {MongooseModule} from '@nestjs/mongoose';
import { Mongoose } from 'mongoose';


@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://admin:YeU4Je9I2NmTrqfx@cluster0.of3vj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    ),
    JogadoresModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
