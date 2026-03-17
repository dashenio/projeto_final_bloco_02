import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards} from "@nestjs/common";
import { Categoria } from "../entities/catgoria.entity";
import { CategoriaService } from "../services/categoria.service";
import { Roles } from "../../auth/decorators/roles.decorator";
import { Role } from "../../usuario/entities/usuario.entity";
import { JwtAuthGuard } from "../../auth/guard/jwt-auth.guard";
import { RolesGuard } from "../../auth/guard/roles.guard";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";

@ApiTags('Categoria')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
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

    @UseGuards(RolesGuard)
    @Roles(Role.Admin)
    @Post('/cadastrar')
    @HttpCode(HttpStatus.CREATED) 
    create(@Body() categoria: Categoria): Promise<Categoria>{
        return this.categoriaService.create(categoria);
  
    }

    @UseGuards(RolesGuard)
    @Roles(Role.Admin)
    @Put('/atualizar')
    @HttpCode(HttpStatus.OK) 
    update(@Body() categoria: Categoria): Promise<Categoria>{
        return this.categoriaService.update(categoria);
    
    }

    @UseGuards(RolesGuard)
    @Roles(Role.Admin)
    @Delete("/:id")
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id', ParseIntPipe) id: number){
        return this.categoriaService.delete(id);
    }


}