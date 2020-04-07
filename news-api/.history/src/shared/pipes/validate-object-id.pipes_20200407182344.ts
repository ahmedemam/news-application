import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import * as mongoose from 'mongoose';

@Injectable()
export class ValidateObjectId implements PipeTransform<string> {
  async transform(value: string, metadata: ArgumentMetadata) {
    console.log(value, value.toString());
    const isValid = mongoose.Types.ObjectId.isValid(value);
    console.log(mongoose.Types.ObjectId(value))
    if (!isValid) {
        throw new BadRequestException('INVALID_ID');
    }
    return value;
  }
}
