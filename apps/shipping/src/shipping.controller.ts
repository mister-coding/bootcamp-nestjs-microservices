import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ShippingService } from './shipping.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { UpdateShippingDto } from './dto/update-shipping.dto';
import { AuthGuard } from '@app/auth/auth/auth.guard';

@ApiTags('Shipping')
@Controller()
export class ShippingController {
  constructor(private readonly shippingService: ShippingService) {}

  @Get()
  getHello(): string {
    return this.shippingService.getHello();
  }

  @ApiOperation({
    summary: 'Shipping Status',
    description: 'Update sahipping status',
  })
  @ApiParam({ name: 'shipping_id' })
  @ApiBearerAuth('accessToken')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Put('/:shipping_id')
  async updateStatus(
    @Param('shipping_id') shipping_id,
    @Body() data: UpdateShippingDto,
  ) {
    const updateShippingStatus = await this.shippingService.updateStatus(
      shipping_id,
      data,
    );
    return {
      data: updateShippingStatus,
      message: 'Update shipping status success',
    };
  }
}
