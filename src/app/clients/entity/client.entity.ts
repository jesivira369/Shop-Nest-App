import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Address } from "./address.entity";

@Entity()
export class Client {

    @PrimaryGeneratedColumn()
    id?: number;

    @Column({ type: String, nullable: false, length: 50})
    name: string;

    @Column({ type: String, nullable: false, unique: true, length: 200})
    email: string;

    @OneToOne(() => Address, {cascade: ['insert', 'update'], eager: true})
    @JoinColumn()
    address: Address;
}