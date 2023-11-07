import { RegisterEntity } from '../user/account/entities/register.entity';

export const registerEntityMock: RegisterEntity = {
  id: '1',
  name: 'John Doe',
  email: 'john@contoso.com',
  createdAt: new Date(),
  updateAt: new Date(),
  role: 'user',
  password: 'P@ssword10',
};
