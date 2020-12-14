import { Input } from 'src/database/models/input.model';
export interface IListInputs {
  inputs: Partial<Input[]>;
  total: number;
}