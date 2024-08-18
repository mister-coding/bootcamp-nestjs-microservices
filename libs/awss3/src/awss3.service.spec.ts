import { Test, TestingModule } from '@nestjs/testing';
import { Awss3Service } from './awss3.service';

describe('Awss3Service', () => {
  let service: Awss3Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Awss3Service],
    }).compile();

    service = module.get<Awss3Service>(Awss3Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
