import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccountService } from '../../../user/account/account.service';
import { RegisterEntity } from '../../../user/account/entities/register.entity';
import { RegisterEntityMock } from '../../../__mocks__/register-entity.mock';
import * as bcrypt from 'bcrypt';

describe('AccountService', () => {
  let accountService: AccountService;
  let accountRepository: Repository<RegisterEntity>;

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
    accountRepository = module.get<Repository<RegisterEntity>>(
      getRepositoryToken(RegisterEntity),
    );
  });

  it('should be defined', () => {
    expect(accountService).toBeDefined();
  });

  describe('dbRegisterUser', () => {
    it('should register a user successfully', async () => {
      jest
        .spyOn(accountService, 'dbLoadUserAccountByEmail')
        .mockResolvedValue(null);
      jest
        .spyOn(bcrypt, 'hash' as any)
        .mockResolvedValue(Promise.resolve('hashedPassword'));
      jest
        .spyOn(accountRepository, 'save')
        .mockResolvedValue(RegisterEntityMock);

      await accountService.dbRegisterUser(RegisterEntityMock);

      expect(accountRepository.save).toHaveBeenCalledWith({
        ...RegisterEntityMock,
        password: 'hashedPassword',
      });
    });
  });
});
