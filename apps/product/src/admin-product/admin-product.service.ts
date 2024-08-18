import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAdminProductDto } from './dto/create-admin-product.dto';
import { UpdateAdminProductDto } from './dto/update-admin-product.dto';
import { RepositoriesService } from '@app/repositories';

@Injectable()
export class AdminProductService {

  constructor(private respos: RepositoriesService){}
  
  async create(createAdminProductDto: CreateAdminProductDto) {
    return await this.respos.product.create(createAdminProductDto);
  }

  async findAll(user_id:string) {
    return await this.respos.product.findAllByUser(user_id);
  }

  async findOne(id: string) {
    const product = await this.respos.product.findOneById(id)

    if (!product){
      throw new NotFoundException("Product not found")
    }
    return product;
  }

  async update(id: string, updateAdminProductDto: UpdateAdminProductDto) {
    const product = await this.findOne(id);
    await this.respos.product.update(product.id,updateAdminProductDto)
  }

  async remove(id: string) {
    const product = await this.findOne(id);
    await this.respos.product.remove(product.id)
  }

}
