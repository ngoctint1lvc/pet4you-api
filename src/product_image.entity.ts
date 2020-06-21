import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'oc_product' })
export class ProductImage {
    @PrimaryGeneratedColumn({ name: 'product_id' })
    product_id: number;

    @Column({ name: 'image' })
    imageUrl: string;
}