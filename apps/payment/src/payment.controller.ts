import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Put,
  UseGuards,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PaymentConfirmationDto } from './dto/payment-confirmation.dto';
import { AuthGuard } from '@app/auth/auth/auth.guard';
import { UpdatePaymentStatusDto } from './dto/update-payment-status.dto';

@ApiTags('Payments')
@Controller()
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Get()
  getHello(): string {
    return this.paymentService.getHello();
  }

  @ApiOperation({
    summary: 'Payment Confirmation',
    description: 'Payment Confirmation(Image upload)',
  })
  @ApiBearerAuth('accessToken')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Put('confirmation')
  async paymentConfirmation(@Body() data: PaymentConfirmationDto) {
    const confirmation = await this.paymentService.paymentConfirmation(data);
    return {
      data: confirmation,
      message: 'confirmation payment success',
    };
  }

  @ApiOperation({
    summary: 'Payment Status',
    description: 'Update payment status',
  })
  @ApiBearerAuth('accessToken')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Put('update-status')
  async updatePaymentStatus(@Body() data: UpdatePaymentStatusDto) {
    const updateStatus = await this.paymentService.updatePaymentStatus(data);
    return {
      data: updateStatus,
      message: 'update status payment success',
    };
  }
}
