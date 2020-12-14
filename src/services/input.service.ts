import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { getConnection, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Input } from 'src/database/models/input.model';
import { IListInputs } from 'src/interfaces/list-input.interface';
import { CreateInputDto } from 'src/dtos/create-input.dto';
import { Product } from 'src/database/models/product.model';

@Injectable()
export class InputService {
  constructor(
    @InjectRepository(Input)
    private readonly inputRepository: Repository<Input>,
  ) {}

  async listInputs(): Promise<IListInputs> {
    const [inputs, total] = await this.inputRepository.findAndCount({
      where: { isAvaible: true },
      select: ['id', 'name', 'totalPrice', 'usedPercentage', 'product']
    });

    return {
        inputs,
        total
    };
  }

  async getOneInput(id: string): Promise<Input> {
    const input = await this.inputRepository.findOne({
      where: {
        id, isAvaible: true
      },
      relations: ['product'],
    });

    if (!input) {
      throw new HttpException('Input not found', HttpStatus.NOT_FOUND);
    }
    return input;
  }

  async deleteOrder(id: string) {
    const input = await this.inputRepository.findOne({
      where: { id, isAvaible: true },
    });
    
    if (!input) {
      throw new HttpException('Input not found', HttpStatus.NOT_FOUND);
    }

    await this.inputRepository.update({ id }, { isAvaible: false });

    return;
  }

  async createInput(body: CreateInputDto): Promise<Input> {
    return await getConnection().transaction(
      async (transactionalEntityManager) => {
        const inputRepository = transactionalEntityManager.getRepository(Input);
        console.log("-----------------------------------------------------Cheguei---------------------------------------------------------", body)
        const newInput = await inputRepository.save({
          name: body.name,
          totalPrice: body.totalPrice,
          usedPercentage: body.usedPercentage,
          productId: "1",
          isAvaible: true
        });
        return newInput;
      }
    );
  }
}
