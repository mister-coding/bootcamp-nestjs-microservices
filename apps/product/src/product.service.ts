import { RepositoriesService } from '@app/repositories';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductService {

  constructor(private repos: RepositoriesService){}

  getHello(): string {
    return 'Product Services!';
  }

  async getAll(){
    return await this.repos.product.findAllActive();
  }

}
