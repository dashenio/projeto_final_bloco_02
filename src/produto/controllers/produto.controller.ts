import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { ProdutoService } from "../services/produto.service";
import { Produto } from "../entities/produto.entity";
import { Roles } from "../../auth/decorators/roles.decorator";
import { Role } from "../../usuario/entities/usuario.entity";
import { JwtAuthGuard } from "../../auth/guard/jwt-auth.guard";
import { RolesGuard } from "../../auth/guard/roles.guard";

@Controller('/produtos')
export class ProdutoController{
    
    constructor( private readonly produtoService: ProdutoService ){}

    @UseGuards(JwtAuthGuard)
    @Get('/all')
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Produto[]>{
        return this.produtoService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get('/genericos')
    @HttpCode(HttpStatus.OK)
    findAllGenericos(): Promise<Produto[]>{
        return this.produtoService.findAllGenericos();
    }
    @UseGuards(JwtAuthGuard)
    @Get('/:id')
    @HttpCode(HttpStatus.OK) 
    findById(@Param('id', ParseIntPipe) id: number): Promise<Produto>{
        return this.produtoService.findById(id);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/nome/:nome') 
    @HttpCode(HttpStatus.OK) 
    findAllByNome(@Param('nome') nome: string): Promise<Produto[]>{
        return this.produtoService.findAllByNome(nome);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/maior_que/:valor')
    @HttpCode(HttpStatus.OK)
    findAllBigger(@Param('valor', ParseIntPipe) valor: number): Promise<Produto[]>{
        return this.produtoService.findAllBigger(valor);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/menor_que/:valor')
    @HttpCode(HttpStatus.OK)
    findAllLesser(@Param('valor', ParseIntPipe) valor: number): Promise<Produto[]>{
        return this.produtoService.findAllLesser(valor);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin)
    @Post('/cadastrar')
    @HttpCode(HttpStatus.CREATED) 
    create(@Body() produto: Produto): Promise<Produto>{
        return this.produtoService.create(produto);
  
    }
    
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin)
    @Put('/atualizar')
    @HttpCode(HttpStatus.OK) 
    update(@Body() produto: Produto): Promise<Produto>{
        return this.produtoService.update(produto);
    
    }
    
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin)
    @Delete("/:id")
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id', ParseIntPipe) id: number){
        return this.produtoService.delete(id);
    }


}