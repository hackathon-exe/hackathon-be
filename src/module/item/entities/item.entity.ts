import { OrderItemEntity } from "src/module/orderItem/entities/orderItem.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'item' })
export class ItemEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string

    @Column()
    cost: number

    @Column()
    desc: string

    @OneToMany(() => OrderItemEntity, (orderItem) => orderItem.item, { cascade: true })
    public orderItem: OrderItemEntity[];

}