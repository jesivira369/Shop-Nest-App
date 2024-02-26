import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';

@Entity()
export class Address {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({type: String, nullable: false, length: 80})
    street: string;

    @Column({type: String, nullable: false, length: 50})
    city: string;

    @Column({type: String, nullable: false, length: 50})
    state: string;

    @Column({type: String, nullable: true, length: 30})
    country: string;
}