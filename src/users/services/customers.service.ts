import { Injectable, NotFoundException } from '@nestjs/common';
import { Customer } from '../../users/entities/customer.entity';
import { CreateCustomerDto, UpdateCustomerDto } from '../dtos/customers.dto';

@Injectable()
export class CustomersService {
  private counterId = 1;
  private customers: Customer[] = [
    {
      id: 1,
      name: 'General Motors',
    },
  ];

  create(payload: CreateCustomerDto) {
    this.counterId++;
    const newCustomer = {
      id: this.counterId,
      ...payload,
    };
    this.customers.push(newCustomer);
    return newCustomer;
  }

  findAll() {
    return this.customers;
  }

  findOne(id: number) {
    const customer = this.customers.find((item) => item.id === id);
    if (!customer) {
      throw new NotFoundException(`customer with id ${id} not exist`);
    }
    return customer;
  }

  update(id: number, payload: UpdateCustomerDto) {
    const customer = this.findOne(id);
    if (customer) {
      const index = this.customers.findIndex((item) => item.id === id);
      this.customers[index] = {
        ...customer,
        ...payload,
      };

      return this.customers[index];
    }
  }

  delete(id: number) {
    const customer = this.findOne(id);
    if (customer) {
      const index = this.customers.findIndex((item) => item.id === id);
      this.customers.splice(index, 1);
      return { message: `customer with id ${id} deleted` };
    }
  }
}
