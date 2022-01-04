import { IsNumber, IsString } from 'class-validator';
import { lowers, numbers, symbols, uppers } from 'src/const';
import { indexOfAny } from 'src/utils';


export class GetPasswordInput {
  @IsString()
  readonly text: string;

  @IsString()
  readonly service: string;
  
  @IsString()
  readonly last: string;

  @IsNumber()
  readonly type: PasswordTypes
}

export enum PasswordTypes {
  strong = 1,
  
  normal = 2,

  weak = 3
}

export enum ConfigInvalids {
  length = 0,
  symbols = 1,
  numbers = 2,
  lower = 3,
  upper = 4,
  valid = 5,
}

// strong password: length 12 with Symbols, numbers, lower, upper
// strongPassword = PasswordConfig(12, true, true, true, true)

// normal password: length 12 with numbers, lower, upper
// normalPassword = PasswordConfig(12, false, true, true, true)

// weak password: length 6 with numbers
// weakPassword = PasswordConfig(6, false, true, false, false)
export class PasswordConfig {

  constructor(length: number, withSymbols: boolean, withNumbers: boolean, withLower: boolean, withUpper: boolean){  
    this.length = length
    this.withSymbols = withSymbols
    this.withNumbers = withNumbers
    this.withLower = withLower
    this.withUpper = withUpper
  }

  length: number // length of password

  withSymbols: boolean; // @#$%!

  withNumbers: boolean; // 123456
 
  withLower: boolean; // abcdefg
  
  withUpper: boolean // ABCDEFG

  validate(password: string): ConfigInvalids{
    if(password.length !== this.length) return ConfigInvalids.length
    if(this.withSymbols && !indexOfAny(password, symbols)) return ConfigInvalids.symbols
    if(this.withNumbers && !indexOfAny(password, numbers)) return ConfigInvalids.numbers
    if(this.withLower && !indexOfAny(password, lowers)) return ConfigInvalids.lower
    if(this.withUpper && !indexOfAny(password, uppers)) return ConfigInvalids.upper
    return ConfigInvalids.valid
  }
}
