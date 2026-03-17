import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, LessThanOrEqual, MoreThanOrEqual, Repository } from "typeorm";
import { Produto } from "../entities/produto.entity";
import { CategoriaService } from "../../categoria/services/categoria.service";


@Injectable()
export class ProdutoService{

    constructor(
        @InjectRepository(Produto)
        private produtoRepository: Repository<Produto>,
        private readonly categoriaService: CategoriaService
    ) {}

    async findAll(): Promise<Produto[]>{
        return this.produtoRepository.find({
            relations:{ categoria: true }
        });
    }

    async findById(id: number): Promise<Produto>{
      
        const produto = await this.produtoRepository.findOne({
            where: { id },
            relations: { categoria: true }
        })
        if (!produto)
            throw new HttpException('Produto não encontrado!', HttpStatus.NOT_FOUND);
        
        return produto;
    }

     async findAllByNome(nome: string): Promise<Produto[]>{

        return this.produtoRepository.find({
            where: { nome: ILike(`%${nome}%`) },
            relations: { categoria: true }
        });
    }

    async findAllBigger(valor: number): Promise<Produto[]>{
        
        return this.produtoRepository.find({
            where: { preco: MoreThanOrEqual(valor) },
            order: { preco: 'ASC' },
            relations: { categoria: true }
        });
    }
    
    async findAllLesser(valor: number): Promise<Produto[]>{
        
        return this.produtoRepository.find({
            where: { preco: LessThanOrEqual(valor) },
            order: { preco: 'DESC'},
            relations: { categoria: true }
         });
    }

     async findAllGenericos(): Promise<Produto[]>{
        
        return this.produtoRepository.find({
            where: { generico: true},
            order: { nome: 'ASC' },
            relations: { categoria: true }
        });
    }


    async create(produto: Produto): Promise<Produto>{

        await this.categoriaService.findById(produto.categoria.id)

        return await this.produtoRepository.save(produto);
    }

    async update(produto: Produto): Promise<Produto>{
        
        if(!produto.id || produto.id <= 0)
            throw new HttpException('O ID do produto é inválido', HttpStatus.BAD_REQUEST);
       

        await this.findById(produto.id);

        await this.categoriaService.findById(produto.categoria.id)

        return this.produtoRepository.save(produto);
    }

    async delete(id: number): Promise<DeleteResult>{
        
        await this.findById(id);

        return this.produtoRepository.delete(id);
    }


        
}