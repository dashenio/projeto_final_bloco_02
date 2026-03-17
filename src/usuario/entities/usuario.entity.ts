import { IsEmail, IsNotEmpty, MinLength } from "class-validator"
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"
import { Exclude, Transform, TransformFnParams } from "class-transformer"
import { ApiProperty } from "@nestjs/swagger";

export enum Role {
    Admin = "admin",
    User = "user"
}

@Entity({name: "tb_usuarios"})
export class Usuario {

    @ApiProperty()
    @PrimaryGeneratedColumn() 
    id: number;

    @ApiProperty()
    @Transform(({ value } : TransformFnParams) => value?.trim())
    @IsNotEmpty()
    @Column({length: 255, nullable: false}) 
    nome: string;

    @ApiProperty()
    @Transform(({ value } : TransformFnParams) => value?.trim())
    @IsEmail()
    @IsNotEmpty()
    @Column({length: 255, nullable: false })
    usuario: string;
    
    @ApiProperty()
    @Transform(({ value } : TransformFnParams) => value?.trim())
    @MinLength(8)
    @IsNotEmpty()
    @Column({length: 255, nullable: false }) 
    senha: string;

    @ApiProperty()
    @Column({
        type: 'enum',
        enum: Role,
        default: Role.User
    })
    roles: Role;

}