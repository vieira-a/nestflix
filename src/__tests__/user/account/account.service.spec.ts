import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccountService } from '../../../user/account/account.service';
import { RegisterEntity } from '../../../user/account/entities/register.entity';
import { registerEntityMock } from '../../../__mocks__/register-entity.mock';
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
        .mockResolvedValue(registerEntityMock);

      await accountService.dbRegisterUser(registerEntityMock);

      expect(accountRepository.save).toHaveBeenCalledWith({
        ...registerEntityMock,
        password: 'hashedPassword',
      });
    });

    it('should throw BadRequestException if email already exists', async () => {
      jest
        .spyOn(accountService, 'dbLoadUserAccountByEmail')
        .mockResolvedValue(registerEntityMock);

      await expect(
        accountService.dbRegisterUser(registerEntityMock),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('dbLoadUserAccountByEmail', () => {
    it('should load a user account by email', async () => {
      const email = 'test@example.com';

      jest
        .spyOn(accountRepository, 'findOne')
        .mockResolvedValue(registerEntityMock);

      const result = await accountService.dbLoadUserAccountByEmail(email);

      expect(result).toEqual(registerEntityMock);
    });
  });
});
