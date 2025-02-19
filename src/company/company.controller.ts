import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { Roles } from 'src/decorators/roles.decorator';
import { UserType } from '@prisma/client';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  createCompany(@Body() body: any) {
    return this.companyService.createCompany(body);
  }

  @Roles(UserType.company)
  @UseGuards(AuthGuard)
  @Post('/job')
  createJob(@Req() req: Request) {
    return this.companyService.createJob(req);
  }

  @Roles(UserType.company)
  @UseGuards(AuthGuard)
  @Get('/jobs')
  getJobsCreatedByCompany(@Req() req: Request) {
    return this.companyService.getJobsCreatedByCompany(req);
  }

  @Roles(UserType.admin)
  @UseGuards(AuthGuard)
  @Get('/jobs/awaiting')
  getAwaitingJobs() {
    return this.companyService.getAwaitingJobs();
  }

  @Roles(UserType.admin)
  @UseGuards(AuthGuard)
  @Put('/jobs/:id')
  updateStatusJob(@Req() req: any) {
    return this.companyService.updateStatusJob(req);
  }
}
