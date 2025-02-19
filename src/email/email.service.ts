import * as nodemailer from 'nodemailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
// import { CreateEmailDto } from './dto/create-email.dto';
// import { UpdateEmailDto } from './dto/update-email.dto';

@Injectable()
export class EmailService {
  constructor(private readonly configService: ConfigService) {}

  private transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: this.configService.get<string>('EMAIL_USER'), // configure no .env
      pass: this.configService.get<string>('EMAIL_PASS'),
    },
  });

  async sendEmail(to: string, subject: string, text: string) {
    await this.transporter.sendMail({
      from: this.configService.get<string>('EMAIL_USER'),
      to,
      subject,
      text,
    });
  }
  // create(createEmailDto: CreateEmailDto) {
  //   return 'This action adds a new email';
  // }
  // findAll() {
  //   return `This action returns all email`;
  // }
  // findOne(id: number) {
  //   return `This action returns a #${id} email`;
  // }
  // update(id: number, updateEmailDto: UpdateEmailDto) {
  //   return `This action updates a #${id} email`;
  // }
  // remove(id: number) {
  //   return `This action removes a #${id} email`;
  // }
}
