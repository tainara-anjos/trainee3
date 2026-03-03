import { PipeTransform, Injectable } from '@nestjs/common';

@Injectable()
export class SanitizeUserPipe implements PipeTransform {

  transform(value: any) {

    if (value.name) {
      value.name =
        value.name.charAt(0).toUpperCase() +
        value.name.slice(1).toLowerCase();
    }

    if (value.cpf) {
      value.cpf = value.cpf.replace(/\D/g, '');
    }

    return value;
  }
}