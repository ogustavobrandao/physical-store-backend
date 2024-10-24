import {Table, Column, Model, DataType} from 'sequelize-typescript'

@Table({
    tableName: 'lojas',
    timestamps: true,
    underscored: true,
})

export class Loja extends Model {
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    nome!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    logradouro!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    cep!: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    telefone?: string;


}