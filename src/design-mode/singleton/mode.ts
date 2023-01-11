export class Random {
  private static instance: Random;

  private readonly _id: number;
  public get id() {
    return this._id;
  }

  public static create(id: number): Random {
    if (Random.instance) return Random.instance;
    const instance = new Random(id);
    Random.instance = instance;
    return instance;
  }

  constructor(id: number) {
    this._id = id;
  }
}
