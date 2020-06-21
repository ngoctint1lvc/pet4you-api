import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'oc_product_description' })
export class Product {
    @PrimaryGeneratedColumn({ name: 'product_id' })
    product_id: number;

    @Column({ name: 'language_id' })
    language_id: number;

    @Column({ name: "name" })
    name: string;

    @Column({ name: "description" })
    description: string;

    @Column({ name: "meta_title" })
    meta_title: string;

    @Column({ name: "meta_description" })
    meta_description: string;

    @Column({ name: "meta_keyword" })
    meta_keyword: string;
}