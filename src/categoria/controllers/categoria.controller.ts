import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards} from "@nestjs/common";
import { Categoria } from "../entities/catgoria.entity";
import { CategoriaService } from "../services/categoria.service";


@Controller('/categorias')
export class CategoriaController{
    
    constructor( private readonly categoriaService: CategoriaService){}

    @Get('/all')
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Categoria[]>{
        return this.categoriaService.findAll();
    }

    @Get('/:id')
    @HttpCode(HttpStatus.OK) 
    findById(@Param('id', ParseIntPipe) id: number): Promise<Categoria>{
        return this.categoriaService.findById(id);
    }

    @Get('/tipo/:tipo') 
    @HttpCode(HttpStatus.OK) 
    findAllByTipo(@Param('tipo') tipo: string): Promise<Categoria[]>{
        return this.categoriaService.findAllByTipo(tipo);
    }

    @Post('/cadastrar')
    @HttpCode(HttpStatus.CREATED) 
    create(@Body() categoria: Categoria): Promise<Categoria>{
        return this.categoriaService.create(categoria);
  
    }

    @Put('/atualizar')
    @HttpCode(HttpStatus.OK) 
    update(@Body() categoria: Categoria): Promise<Categoria>{
        return this.categoriaService.update(categoria);
    
    }

    @Delete("/:id")
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id', ParseIntPipe) id: number){
        return this.categoriaService.delete(id);
    }


}