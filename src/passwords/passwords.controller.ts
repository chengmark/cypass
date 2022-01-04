import { Body, Controller, Post } from '@nestjs/common';
import { urlToName } from 'src/utils';
import { GetPasswordBulkInput } from './dto/GetPasswordBulkInput';
import { GetPasswordInput } from './dto/GetPasswordInput';
import { PasswordsService } from './passwords.service';


@Controller('passwords')
export class PasswordsController {
  constructor(private readonly passwordService: PasswordsService) {}

  @Post()
  getPassword(@Body() getPasswordInput: GetPasswordInput): string {
    console.log(getPasswordInput)
    let csv = `name,url,username,password\n`
    const {url, username} = getPasswordInput
    const password = this.passwordService.getPassword(getPasswordInput);
    csv += `${urlToName(url)},${url},${username},${password}\n`
    return csv
  }

  @Post('bulk')
  getPasswordCSV(@Body() getPasswordBulkInput: GetPasswordBulkInput): string {
    console.log({getPasswordBulkInput})
    let csv = `name,url,username,password\n`
    getPasswordBulkInput.inputs.forEach(input => {
      const {url, username} = input
      const password = this.passwordService.getPassword(input)
      csv += `${urlToName(url)},${url},${username},${password}\n`
    })
    return csv
  }
}