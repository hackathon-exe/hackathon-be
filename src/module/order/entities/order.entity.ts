import { OrderStatus } from 'src/common/enum/orderStatus.enum';
import { OrderItemEntity } from 'src/module/orderItem/entities/orderItem.entity';
import { UserEntity } from 'src/module/user/entities/user.entity';
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryColumn,
    UpdateDateColumn,

} from 'typeorm';

@Entity({ name: 'order' })
export class OrderEntity {
    @PrimaryColumn()
    id: string;

    @Column({
        type: 'enum',
        enum: OrderStatus
    })
    status: OrderStatus

    @OneToMany(() => OrderItemEntity, (itemOrder) => itemOrder.order, { cascade: true })
    public orderItem: OrderItemEntity[];

    @ManyToOne(() => UserEntity, (user) => user.order)
    @JoinColumn({ name: 'user_id' })
    userId: UserEntity

    @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
    public createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', name: 'last_updated_at' })
    public lastUpdatedAt: Date;
}

