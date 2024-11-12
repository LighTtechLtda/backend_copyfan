import { Column, Entity, PrimaryColumn, Timestamp } from "typeorm"
import { v4 as uuid } from "uuid"

@Entity("pagamento")
export class Pagamento {
    @PrimaryColumn()
    id: string
    
    @Column({nullable: false})
    datahorapagamento: Date

    @Column()
    statuspagamento: boolean

    @Column({nullable: false})
    valortotal: Date

    @Column({nullable: false})
    meiopagamento : string

    constructor() {
        this.id = uuid()
        this.statuspagamento = false
        this.datahorapagamento = new Date()
        
    }
}