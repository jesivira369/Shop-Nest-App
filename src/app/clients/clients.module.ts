import { Module } from '@nestjs/common';
import { ClientsController } from './clients.controller';
import { ClientsService } from './clients.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './entity/client.entity';
import { Address } from './entity/address.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Client,
      Address
    ]),
  ],
  controllers: [ClientsController],
  providers: [ClientsService]
})
export class ClientsModule {}
