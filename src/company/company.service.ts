import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CompanyService {
  constructor(private readonly prismaService: PrismaService) {}

  createCompany(body: any) {
    console.log(body);
    return 'Company created';
  }

  createJob({ body, user }: any) {
    const [year, month, day] = body.expires_at.split('-');
    const expiresDate = new Date(year, month - 1, day, 23, 59, 59, 999);

    return this.prismaService.job.create({
      data: {
        ...body,
        initial_salary: parseFloat(body.initial_salary),
        final_salary: parseFloat(body.final_salary),
        job_cost_value: parseFloat(body.job_cost_value),
        expires_at: expiresDate,
        creator_id: user.id,
        company_id: user.employee_company_id,
      },
    });
  }

  getJobsCreatedByCompany(req: any) {
    console.log(req.user);
    return this.prismaService.job.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        initial_salary: true,
        final_salary: true,
        job_cost_value: true,
        expires_at: true,
        created_at: false,
      },
      where: {
        company_id: req.user.employee_company_id,
      },
    });
  }

  updateCompany(id: string) {
    return `Company updated ${id}`;
  }
}
