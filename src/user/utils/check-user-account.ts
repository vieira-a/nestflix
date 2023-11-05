import { Repository } from 'typeorm';
import { RegisterEntity } from '../account/entities/register.entity';

export async function dbCheckUserAccount(
  registerRepository: Repository<RegisterEntity>,
  field: string,
  value: string,
) {
  const userAccount = await registerRepository.findOne({
    where: { [field]: value },
  });
  return !!userAccount;
}
