import { Injectable } from "@nestjs/common";
import { lowers, numbers, symbols, uppers } from "src/const";
import { ConfigInvalids, GetPasswordInput, PasswordConfig, PasswordTypes } from "./dto/GetPasswordInput";
import * as bcrypt from 'bcrypt'
import * as crypto from 'crypto'
import { toDec } from "src/utils";

@Injectable()
export class PasswordsService{
  constructor(){}

  getPassword(input: GetPasswordInput): string{
    let password = ""
    let choices = []
    let passwordConfig: PasswordConfig;
    if(input.type == PasswordTypes.strong)
      passwordConfig = new PasswordConfig(12, true, true, true, true)
    if(input.type == PasswordTypes.normal)
      passwordConfig = new PasswordConfig(12, false, true, true, true)
    if(input.type == PasswordTypes.weak)
      passwordConfig = new PasswordConfig(6, false, true, false, false)

    
    if(passwordConfig.withNumbers) choices = choices.concat(numbers)
    if(passwordConfig.withSymbols) choices = choices.concat(symbols)
    if(passwordConfig.withLower) choices = choices.concat(lowers)
    if(passwordConfig.withUpper) choices = choices.concat(uppers)
    
    const hash = toDec(crypto.createHash('md5').update(input.username+input.text+input.service+input.last).digest("hex"))

    for(let i = 1; i<=passwordConfig.length*2; i+=2){      
      let choiceIndex = Number.parseInt(hash[i-1] + hash[i])
      while(choiceIndex >= choices.length)choiceIndex = Math.floor(choiceIndex/2)
      password += choices[choiceIndex]
    }
    const invalid = passwordConfig.validate(password)
    if(invalid == ConfigInvalids.symbols) password = password.replace(/.$/, symbols[0])
    if(invalid == ConfigInvalids.numbers) password = password.replace(/.$/, numbers[0])
    if(invalid == ConfigInvalids.lower) password = password.replace(/.$/, lowers[0])
    if(invalid == ConfigInvalids.upper) password = password.replace(/.$/, uppers[0])
    return password
  }
}