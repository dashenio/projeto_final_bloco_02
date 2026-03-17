import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty, IsNumber, IsPositive, Length } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import { Categoria } from "../../categoria/entities/catgoria.entity";
import { NumericTransformer } from "../../util/numerictransformer";

@Entity({name:'tb_produtos'})
export class Produto{

    @PrimaryGeneratedColumn()
    id: number;

    @Transform(({ value } : TransformFnParams) => value?.trim())
    @IsNotEmpty() 
    @Length(5, 100, {message: 'O nome deve ter entre 5 e 100 caracteres'})
    @Column({type: 'varchar', length: 100}) 
    nome: string;
    
    @Transform(({ value } : TransformFnParams) => value?.trim())
    @IsNotEmpty()
    @Column({type: 'varchar', length: 255})
    foto: string;
    
    @Transform(({ value } : TransformFnParams) => value?.trim())
    @IsNotEmpty() 
    @Column({type: 'varchar', length: 255})
    apresentacao: string;

    @IsPositive()
    @IsNotEmpty() 
    @Column({type: 'int', nullable: false})
    quantidade: number;

    @Transform(({ value } : TransformFnParams) => value?.trim())
    @IsNotEmpty() 
    @Length(1, 50, {message: 'O nome do fabricante deve ter entre 5 e 100 caracteres'})
    @Column({type: 'varchar', length: 50, nullable: false})
    fabricante: string;

    @Column({type: 'boolean', default: false, nullable: false})
    generico: boolean;

    @Transform(({ value } : TransformFnParams) => value?.trim())
    @IsNotEmpty() 
    @Length(10, 1000, {message: 'A descrição deve ter entre 10 e 1000 caracteres'})
    @Column({type: 'varchar', length: 1000})
    descricao: string;

    @IsNumber({ maxDecimalPlaces: 2 })
    @IsNotEmpty()
    @IsPositive()
    @Column({ type: "decimal", precision: 10, scale: 2, transformer: new NumericTransformer()})
    preco: number
    
    @ManyToOne( () => Categoria, (categoria) => categoria.produto, {
        onDelete: 'CASCADE'
        })
   categoria: Categoria; 

}