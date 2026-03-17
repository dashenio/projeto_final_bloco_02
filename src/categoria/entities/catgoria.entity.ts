import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty, Length } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Produto } from "../../produto/entities/produto.entity";
import { ApiProperty } from "@nestjs/swagger";
import { Usuario } from "../../usuario/entities/usuario.entity";

@Entity({name:'tb_categorias'})
export class Categoria{

    @ApiProperty() 
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty() 
    @Transform(({ value } : TransformFnParams) => value?.trim())
    @IsNotEmpty() 
    @Length(1, 100, {message: 'O tipo deve ter entre 1 e 100 caracteres'})
    @Column({type: 'varchar', length: 100, nullable: false}) 
    tipo: string; //'cosmético', 'medicamento', 'higiene pessoal'  

    @ApiProperty()
    @OneToMany( () => Produto, (produto) => produto.categoria)
    produto: Produto[];
}
