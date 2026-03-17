import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty, Length } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'tb_categorias'})
export class Categoria{

    @PrimaryGeneratedColumn()
    id: number;

    @Transform(({ value } : TransformFnParams) => value?.trim())
    @IsNotEmpty() 
    @Length(1, 100, {message: 'O tipo deve ter entre 1 e 100 caracteres'})
    @Column({type: 'varchar', length: 100, nullable: false}) 
    tipo: string; //'cosmético', 'medicamento', 'higiene pessoal'  

}
