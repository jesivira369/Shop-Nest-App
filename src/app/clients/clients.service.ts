import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Client } from './entity/client.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientDto } from './dto/client.dto';
import { Address } from './entity/address.entity';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private clientRepository: Repository<Client>,
    @InjectRepository(Address)
    private addressRepository: Repository<Address>
  ) {}

  findClient(client: ClientDto) {
    return this.clientRepository.findOne({
      where: [{ id: client.id }, { email: client.email }],
    });
  }

  async createClient(client: ClientDto): Promise<Client> {
    const clientExists = await this.clientRepository.findOne({ where: { email: client.email } });
  
    if (clientExists) {
      throw new ConflictException('Email already registered with another client');
    }
  
    let addressEntity;
    if (client.address) {
      const addressDto = client.address;
  
      addressEntity = await this.addressRepository.findOne({
        where: {
          street: addressDto.street,
          city: addressDto.city,
          state: addressDto.state,
          country: addressDto.country,
        },
      });
  
      if (!addressEntity) {
        addressEntity = this.addressRepository.create(addressDto);
        addressEntity = await this.addressRepository.save(addressEntity);
      } else {
        throw new ConflictException('Address already exists');
      }
    }
  
    const newClient = this.clientRepository.create({
      ...client,
      address: addressEntity,
    });
  
    return await this.clientRepository.save(newClient);
  }

  async getClients() {
    return await this.clientRepository.find();
  }

  async getClient(id: number) {
    return await this.clientRepository.findOne({
      where: { id },
    });
  }

  async updateClient(id: number, clientDto: ClientDto) {
    const client = await this.clientRepository.findOne({
      where: { id },
      relations: ['address'],
    });

    if (!client) {
      throw new NotFoundException('Client not found');
    }

    if (clientDto.email && clientDto.email !== client.email) {
      const emailExists = await this.clientRepository.findOne({
        where: { email: clientDto.email },
      });
  
      if (emailExists) {
        throw new ConflictException('Email already registered');
      }
    }

    this.clientRepository.merge(client, clientDto);

    if (clientDto.address) {
      if (client.address) {
        this.addressRepository.merge(client.address, clientDto.address);
        await this.addressRepository.save(client.address);
      } else {
        const address = this.addressRepository.create(clientDto.address);
        client.address = await this.addressRepository.save(address);
      }
    }

    return await this.clientRepository.save(client);
  }

  async deleteClient(id: number) {
    const client = await this.clientRepository.findOne({
      where: { id },
    });

    if (!client) {
      throw new NotFoundException('Client not found');
    }

    const rows = await this.clientRepository.delete({ id });

    if (rows.affected == 1) {
      await this.addressRepository.delete({ id: client.address.id});
      return true
    }
    return false;
  }
}
