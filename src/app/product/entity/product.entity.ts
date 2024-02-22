import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Product {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: String, nullable: false, length: 50})
    name: string;

    @Column({ type: Number, nullable: false, default: 0})
    price: number;

    @Column({ type: String, nullable: false, length: 200})
    description: string;

    @Column({ type: Number, nullable: false, default: 0})
    stock: number;

    @Column({ type: Boolean, nullable: false, default: false})
    deleted: boolean;
}