import { Client } from 'src/app/clients/entity/client.entity';
import { Product } from 'src/app/product/entity/product.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, ManyToMany, JoinColumn, JoinTable } from 'typeorm';

@Entity()
export class Order {
    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @CreateDateColumn()
    createdAt?: Date;

    @UpdateDateColumn()
    updatedAt?: Date;

    @Column({ type: Date, nullable: true })
    confirmedAt?: Date;

    @ManyToOne(() => Client, client => client.orders)
    client: Client;

    @ManyToMany(() => Product)
    @JoinTable()
    products: Product[];
}