import { OrderEntity } from "src/module/order/entities/order.entity";
import { Column, Entity, OneToMany } from "typeorm";
import { PrimaryGeneratedColumn } from "typeorm/decorator/columns/PrimaryGeneratedColumn";

@Entity('user')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column({
        name: 'full_name',
    })
    fullName: string;

    @Column({
    })
    email: string;

    @Column({
    })
    address: string;

    @OneToMany(() => OrderEntity, (order) => order.userId,)
    order: OrderEntity[];
}