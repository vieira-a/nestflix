import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AccountService } from '../../../user/account/account.service';
import { RegisterEntity } from '../../../user/account/entities/register.entity';

describe('AccountService', () => {
  let accountService: AccountService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AccountService,
        {
          provide: getRepositoryToken(RegisterEntity),
          useValue: {
            save: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    accountService = module.get<AccountService>(AccountService);
  });

  it('should be defined', () => {
    expect(accountService).toBeDefined();
  });
});
