import { Module } from "@nestjs/common";
import { CategoriaController } from "./controllers/categoria.controller";
import { CategoriaService } from "./services/categoria.service";
import { Categoria } from "./entities/catgoria.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([Categoria])],
  controllers: [CategoriaController],
  providers: [CategoriaService],
})
export class CategoriaModule {}