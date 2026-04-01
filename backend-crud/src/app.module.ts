// Ele é responsável por configurar tudo e conectar as partes do sistema.

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import  {TypeOrmModule} from '@nestjs/typeorm';
import { ProdutosModule } from './produtos/produtos.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({  //Aqui eu configuro a conexão com o banco de dados PostgreSQL usando o TypeORM
      type:'postgres',
      host:'localhost',
      port:5433,
      username: 'postgres',
      password:'',
      database:'cafeteria',
      autoLoadEntities: true,
      synchronize:true,

    }),
     ProdutosModule,  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
