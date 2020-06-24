import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'oc_product' })
export class ProductInfo {
    @PrimaryGeneratedColumn({ name: 'product_id' })
    product_id: number;

    @Column({ name: 'image' })
    imageUrl: string;

    @Column({ name: 'price'})
    price: number;
}