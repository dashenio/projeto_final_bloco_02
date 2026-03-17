import { Body,Controller, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards} from "@nestjs/common";
import { UsuarioService } from "../services/usuario.service";
import { Role, Usuario } from "../entities/usuario.entity";
import { JwtAuthGuard } from "../../auth/guard/jwt-auth.guard";
import { RolesGuard } from "../../auth/guard/roles.guard";
import { Roles } from "../../auth/decorators/roles.decorator";



@Controller("/usuarios")
export class UsuarioController{

    constructor(private readonly usuarioService: UsuarioService){ }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin)
    @Get('/all')
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Usuario[]>{
        return this.usuarioService.findAll();
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin)
    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    findById(@Param('id', ParseIntPipe) id: number): Promise<Usuario>{
        return this.usuarioService.findById(id)
    }

    @Post('/cadastrar')
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() usuario: Usuario): Promise<Usuario>{
        return this.usuarioService.create(usuario)
    }

    @UseGuards(JwtAuthGuard)
    @Put('/atualizar')
    @HttpCode(HttpStatus.OK)
    async update(@Body() usuario: Usuario): Promise<Usuario>{
        return this.usuarioService.update(usuario)
    }

}