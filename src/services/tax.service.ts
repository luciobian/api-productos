import { Injectable } from '@nestjs/common';
import TaxDao from '../daos/tax.dao';
import { Tax } from '../models/entities/tax.entity';

@Injectable()
export default class TaxService {
  constructor(private _taxDao: TaxDao) {}

  async getTaxById(idTax: number): Promise<Tax> {
    return await this._taxDao.getTaxById(idTax);
  }
}
