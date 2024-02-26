import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ClientDto } from './dto/client.dto';

@Controller('clients')
export class ClientsController {

    constructor(private clientsService: ClientsService) {
        
    }

    @Post()
    createClient(@Body() client: ClientDto) {
        return this.clientsService.createClient(client);
    }

    @Get()
    getClients() {
        return this.clientsService.getClients();
    }

    @Get(':id')
    getClient(@Param('id') id: number){
        return this.clientsService.getClient(id);
    }

    @Put(':id')
    updateClient(@Param('id') id: number, @Body() client: ClientDto) {
        return this.clientsService.updateClient(id, client);
    }

    @Delete(':id')
    deleteClient(@Param('id') id: number) {
        return this.clientsService.deleteClient(id);
    }

}
