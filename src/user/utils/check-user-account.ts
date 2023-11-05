import { Repository } from 'typeorm';
import { RegisterEntity } from '../account/entities/register.entity';

export async function dbCheckUserAccount(
  accountRepository: Repository<RegisterEntity>,
  field: string,
  value: string,
) {
  const userAccount = await accountRepository.findOne({
    where: { [field]: value },
  });
  return !!userAccount;
}
