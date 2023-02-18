
import { BaseEntity } from 'src/common/base/base.entity';
import { ItemEntity } from 'src/module/item/entities/item.entity';
import { OrderEntity } from 'src/module/order/entities/order.entity';
import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
} from 'typeorm';

@Entity('order_item')
export class OrderItemEntity extends BaseEntity {

    @Column({ name: 'item_id' })
    public itemId!: number;

    @Column({ name: 'order_id' })
    public orderId!: number;

    @ManyToOne(() => ItemEntity, (item) => item.orderItem)
    @JoinColumn({ name: 'item_id' })
    public item: ItemEntity;

    @ManyToOne(() => OrderEntity, (order) => order.orderItem,)
    @JoinColumn({ name: 'order_id' })
    public order: OrderEntity;

}
