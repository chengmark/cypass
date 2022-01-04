import { Body, Controller, Post } from '@nestjs/common';
import { GetPasswordCSVInput } from './dto/GetPasswordCSVInput';
import { GetPasswordInput } from './dto/GetPasswordInput';
import { PasswordsService } from './passwords.service';


@Controller('passwords')
export class PasswordsController {
  constructor(private readonly passwordService: PasswordsService) {}

  @Post()
  getPassword(@Body() getPasswordInput: GetPasswordInput): string {
    console.log(getPasswordInput)
    return this.passwordService.getPassword(getPasswordInput);
  }

  // @Post('csv')
  // getPasswordCSV(@Body() getPasswordCSVInput: GetPasswordCSVInput): string {
  //   getPasswordCSVInput.inputs.forEach()

  // }
}