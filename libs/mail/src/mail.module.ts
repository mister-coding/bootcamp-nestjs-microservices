import { Global, Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import mail from 'config/mail';

@Global()
@Module({
  imports:[
    MailerModule.forRoot({
      transport: mail().transport,
      defaults: {
        from: mail().from,
      },
      template: {
        dir: process.cwd() + '/mail',
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
