import {
  IsString,
  IsDefined,
  IsOptional,
  IsNumber,
  IsPositive
} from 'class-validator';
import EnumErrorMessage from '../../../enums/error-messages.enum';

export default class ProductRequest {
  @IsDefined({ message: EnumErrorMessage.IS_DEFINED })
  @IsString({ message: EnumErrorMessage.IS_STRING })
  name: string;

  @IsOptional()
  @IsString({ message: EnumErrorMessage.IS_STRING })
  description: string;

  @IsDefined({ message: EnumErrorMessage.IS_DEFINED })
  @IsNumber({ allowNaN: false }, { message: EnumErrorMessage.IS_NUMBER })
  @IsPositive({ message: EnumErrorMessage.IS_POSITIVE })
  price: number;

  @IsDefined({ message: EnumErrorMessage.IS_DEFINED })
  @IsNumber({ allowNaN: false }, { message: EnumErrorMessage.IS_NUMBER })
  @IsPositive({ message: EnumErrorMessage.IS_POSITIVE })
  taxId: number;
}
