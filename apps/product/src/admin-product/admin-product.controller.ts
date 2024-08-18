import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AdminProductService } from './admin-product.service';
import { CreateAdminProductDto } from './dto/create-admin-product.dto';
import { UpdateAdminProductDto } from './dto/update-admin-product.dto';
import { ApiOperation, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@app/auth/auth/auth.guard';

@ApiTags('Admin')
@Controller('admin-product')
export class AdminProductController {

  constructor(private readonly adminProductService: AdminProductService) {}

  @ApiOperation({ summary: 'Profile user', description: 'Get profile user' })
  @ApiBearerAuth('accessToken')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Post()
  async create(
    @Body() createAdminProductDto: CreateAdminProductDto,
    @Request() req,
  ) {

    createAdminProductDto.created_by_id = req.user.id;
    const createProduct = await this.adminProductService.create(
      createAdminProductDto,
    );
    return {
      data: createProduct,
      message: 'create product success',
    };
  }

  @ApiBearerAuth('accessToken')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Get()
  async findAll(@Request() req) {
    const products = await this.adminProductService.findAll(req.user.id);
    return {
      data: products,
      message: 'get all product active',
    };
  }

  @ApiBearerAuth('accessToken')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const product = await this.adminProductService.findOne(id);
    return {
      data: product,
      message: 'get product by id',
    };
  }

  @ApiBearerAuth('accessToken')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAdminProductDto: UpdateAdminProductDto,
  ) {
    const update = await this.adminProductService.update(id, updateAdminProductDto);
    return {
      data: update,
      message: 'update product by id',
    };
  }

  @ApiBearerAuth('accessToken')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const remove = await this.adminProductService.remove(id);
    return {
      data: remove,
      message: 'remove product by id',
    };
  }
}
