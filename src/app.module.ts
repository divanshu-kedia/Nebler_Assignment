import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { PrescriptionModule } from './Prescription/Prescription.module';
import { HttpModule } from '@nestjs/axios';
import { AuthMiddleware } from './Middlewares/Auth.middleware';
import { FhirService } from './Integerations/fhirService';
@Module({
  imports: [HttpModule, PrescriptionModule],
  controllers: [],
  providers: [FhirService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('prescription');
  }
}
