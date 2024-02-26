import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ClientDto } from './dto/client.dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Clients')
@Controller('clients')
export class ClientsController {
  constructor(private clientsService: ClientsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new client' })
  @ApiResponse({ status: 201, description: 'The client has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiBody({
    type: ClientDto,
    description: 'Client data',
    examples: {
      client1: {
        value: {
          name: 'John Doe',
          email: 'jhon@example.com',
          street: '123 Main St',
          city: 'Springfield',
          state: 'IL',
          country: 'USA',
        },
      },
    },
  })
  createClient(@Body() client: ClientDto) {
    return this.clientsService.createClient(client);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all clients' })
  @ApiResponse({ status: 200, description: 'List of clients retrieved successfully.' })
  getClients() {
    return this.clientsService.getClients();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a client by id' })
  @ApiResponse({ status: 200, description: 'Client retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'Client not found.' })
  @ApiParam({ name: 'id', type: 'number', description: 'Client ID' })
  getClient(@Param('id') id: number) {
    return this.clientsService.getClient(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a client' })
  @ApiResponse({ status: 200, description: 'The client has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Client not found.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiParam({ name: 'id', type: 'number', description: 'Client ID' })
  @ApiBody({ type: ClientDto })
  updateClient(@Param('id') id: number, @Body() client: ClientDto) {
    return this.clientsService.updateClient(id, client);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a client' })
  @ApiResponse({ status: 200, description: 'The client has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Client not found.' })
  @ApiParam({ name: 'id', type: 'number', description: 'Client ID' })
  deleteClient(@Param('id') id: number) {
    return this.clientsService.deleteClient(id);
  }
}
