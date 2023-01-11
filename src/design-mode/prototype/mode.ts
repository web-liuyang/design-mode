interface Prototype {
  deepClone: any;
}

class Back implements Prototype {
  private _ABC: number = 0;
  private _CCB: number = 0;

  public get ABC() {
    return this._ABC;
  }

  public setABC(value: number) {
    this._ABC = value;
  }

  public get CCB() {
    return this._CCB;
  }

  public setCCB(value: number) {
    this._CCB = value;
  }

  public deepClone() {
    const back = new Back();
    back.setABC(this._ABC);
    back.setCCB(this._ABC);

    return back;
  }
}

class Capital implements Prototype {
  private _house: boolean = false;
  private _car: boolean = false;
  private _back: Back = new Back();

  public get house() {
    return this._house;
  }

  public setHouse(house: boolean) {
    this._house = house;
  }

  public get car() {
    return this._car;
  }

  public setCar(car: boolean) {
    this._car = car;
  }

  public get back() {
    return this._back;
  }

  public setBack(back: Back) {
    this._back = back;
  }

  public deepClone() {
    const capital = new Capital();
    capital.setHouse(this.house);
    capital.setCar(this.car);
    capital.setBack(this.back.deepClone());

    return capital;
  }
}

export class Userinfo implements Prototype {
  private _name: string = "";
  private _age: number = 0;
  private _children: Userinfo[] = [];
  private _capital: Capital = new Capital();

  constructor() {}

  public get name() {
    return this._name;
  }

  public setName(name: string) {
    this._name = name;
  }

  public get age() {
    return this._age;
  }

  public setAge(age: number) {
    this._age = age;
  }

  public get children() {
    return this._children;
  }

  public setChildren(children: Userinfo[]) {
    this._children = children;
  }

  public get capital() {
    return this._capital;
  }

  public setCapital(capital: Capital) {
    this._capital = capital;
  }

  public deepClone(): Userinfo {
    const userinfo = new Userinfo();
    userinfo.setName(this.name);
    userinfo.setAge(this.age);
    userinfo.setChildren(this.children.map(child => child.deepClone()));
    userinfo.setCapital(this.capital.deepClone());

    return userinfo;
  }
}
