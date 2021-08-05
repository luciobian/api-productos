import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tax } from '../models/entities/tax.entity';

@Injectable()
export default class TaxDao {
  constructor(
    @InjectRepository(Tax)
    private _taxRepository: Repository<Tax>
  ) {}

  async getTaxById(idTax: number): Promise<Tax> {
    return await this._taxRepository
      .createQueryBuilder('t')
      .where('t.id = :id', { id: idTax })
      .getOne();
  }
}
