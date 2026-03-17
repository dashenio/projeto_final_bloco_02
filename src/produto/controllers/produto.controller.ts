import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { ProdutoService } from "../services/produto.service";
import { Produto } from "../entities/produto.entity";

@Controller('/produtos')
export class ProdutoController{
    
    constructor( private readonly produtoService: ProdutoService ){}

    @Get('/all')
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Produto[]>{
        return this.produtoService.findAll();
    }

    
    @Get('/genericos')
    @HttpCode(HttpStatus.OK)
    findAllGenericos(): Promise<Produto[]>{
        return this.produtoService.findAllGenericos();
    }

    @Get('/:id')
    @HttpCode(HttpStatus.OK) 
    findById(@Param('id', ParseIntPipe) id: number): Promise<Produto>{
        return this.produtoService.findById(id);
    }

    @Get('/nome/:nome') 
    @HttpCode(HttpStatus.OK) 
    findAllByNome(@Param('nome') nome: string): Promise<Produto[]>{
        return this.produtoService.findAllByNome(nome);
    }

    @Get('/maior_que/:valor')
    @HttpCode(HttpStatus.OK)
    findAllBigger(@Param('valor', ParseIntPipe) valor: number): Promise<Produto[]>{
        return this.produtoService.findAllBigger(valor);
    }

    @Get('/menor_que/:valor')
    @HttpCode(HttpStatus.OK)
    findAllLesser(@Param('valor', ParseIntPipe) valor: number): Promise<Produto[]>{
        return this.produtoService.findAllLesser(valor);
    }

    @Post('/cadastrar')
    @HttpCode(HttpStatus.CREATED) 
    create(@Body() produto: Produto): Promise<Produto>{
        return this.produtoService.create(produto);
  
    }
   
    @Put('/atualizar')
    @HttpCode(HttpStatus.OK) 
    update(@Body() produto: Produto): Promise<Produto>{
        return this.produtoService.update(produto);
    
    }
    
    @Delete("/:id")
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id', ParseIntPipe) id: number){
        return this.produtoService.delete(id);
    }


}