import { IsEmail, IsNotEmpty, MinLength } from "class-validator"
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"
import { Exclude, Transform, TransformFnParams } from "class-transformer"

export enum Role {
    Admin = "admin",
    User = "user"
}

@Entity({name: "tb_usuarios"})
export class Usuario {

    @PrimaryGeneratedColumn() 
    id: number;

    @Transform(({ value } : TransformFnParams) => value?.trim())
    @IsNotEmpty()
    @Column({length: 255, nullable: false}) 
    nome: string;

    @Transform(({ value } : TransformFnParams) => value?.trim())
    @IsEmail()
    @IsNotEmpty()
    @Column({length: 255, nullable: false })
    usuario: string;
    
    @Transform(({ value } : TransformFnParams) => value?.trim())
    @MinLength(8)
    @IsNotEmpty()
    @Column({length: 255, nullable: false }) 
    senha: string;

    @Column({
        type: 'enum',
        enum: Role,
        default: Role.User
    })
    roles: Role;

}