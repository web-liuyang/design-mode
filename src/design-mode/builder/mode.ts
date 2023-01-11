export type Color = string;

abstract class Builder<T> {
  abstract build(): T;
}

interface CarOptions {
  tyres?: number;
  color?: Color;
  seats?: number;
  brand?: string;
}

class Car {
  private _tyres: number;
  private _color: Color;
  private _seats: number;
  private _brand: string;

  constructor(options?: CarOptions) {
    this._tyres = options?.tyres || 4;
    this._color = options?.color || "白色";
    this._seats = options?.seats || 2;
    this._brand = options?.brand || "未知";
  }

  get tyres(): number {
    return this._tyres;
  }

  public setTyres(tyres: number): void {
    this._tyres = tyres;
  }

  get color(): Color {
    return this._color;
  }

  public setColor(color: Color): void {
    this._color = color;
  }

  get seats(): number {
    return this._seats;
  }

  public setSeats(seats: number): void {
    this._seats = seats;
  }

  get brand(): string {
    return this._brand;
  }

  public setBrand(brand: string): void {
    this._brand = brand;
  }

  public toString(): string {
    return `[tyres: ${this._tyres}, color: ${this._color}, seats: ${this._seats}, brand: ${this._brand}]`;
  }
}

export class CarBuilder implements Builder<Car> {
  private _car: Car = new Car();

  public setTyres(tyres: number): void {
    this._car.setTyres(tyres);
  }

  public setColor(color: Color): void {
    this._car.setColor(color);
  }
  public setSeats(seats: number): void {
    this._car.setSeats(seats);
  }

  public setBrand(brand: string): void {
    this._car.setBrand(brand);
  }

  public reset(): void {
    this._car = new Car();
  }

  public build(): Car {
    const result = this._car;
    this.reset();
    return result;
  }
}

export class CarBuilderDirector {
  private readonly _builder = new CarBuilder();

  public readonly directors = [
    { text: "奥迪", builder: this.buildAudi.bind(this) },
    { text: "法拉利", builder: this.buildFerrari.bind(this) },
    { text: "劳斯莱斯", builder: this.buildRollsRoyce.bind(this) },
  ];

  public buildAudi(): Car {
    this._builder.setBrand("奥迪");
    this._builder.setColor("白色");
    this._builder.setSeats(4);
    this._builder.setTyres(4);
    return this._builder.build();
  }

  public buildFerrari(): Car {
    this._builder.setBrand("法拉利");
    this._builder.setColor("橙色");
    this._builder.setSeats(2);
    this._builder.setTyres(4);
    return this._builder.build();
  }

  public buildRollsRoyce(): Car {
    this._builder.setBrand("劳斯莱斯");
    this._builder.setColor("黑色");
    this._builder.setSeats(8);
    this._builder.setTyres(4);
    return this._builder.build();
  }
}
