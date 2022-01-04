import { IsArray } from "class-validator";
import { GetPasswordInput } from "./GetPasswordInput";

export class GetPasswordCSVInput {
  
  @IsArray()
  readonly inputs: GetPasswordInput[];

}