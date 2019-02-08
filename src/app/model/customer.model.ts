// Model for Customer
export class Customer {
  public id: number;
  public name: string;
  public age: number;
  public active: boolean;

  constructor(id: number, name: string, age: number, active: boolean) {
    this.id = id;
    this.name = name;
    this.age = age;
    this.active = active;
  }
}
