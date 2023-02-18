import { BaseEntity } from "src/common/base/base.entity";
import { Column, Entity } from "typeorm";

@Entity('dataset')
export class DatasetEntity extends BaseEntity {

    @Column()
    prompt: string

    @Column()
    completion: string


}