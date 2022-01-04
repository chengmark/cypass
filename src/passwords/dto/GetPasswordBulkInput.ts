import { IsArray } from "class-validator";
import { GetPasswordInput } from "./GetPasswordInput";

export class GetPasswordBulkInput {
  
  @IsArray()
  readonly inputs: GetPasswordInput[];

}