import "reflect-metadata";
import { injectable, inject, Container } from "inversify";
import uid from "./domain/contract/uid";
import ITimestamps from "./domain/contract/ITimestamps";
import E_User from "./domain/entities/user";

export interface Warrior {
  fight(): string;
  sneak(): string;
}

export interface Weapon  {
  hit(): string;
}

export interface ThrowableWeapon {
  throw(): string;
}

const TYPES = {
  Warrior: Symbol.for("Warrior"),
  Weapon: Symbol.for("Weapon"),
  ThrowableWeapon: Symbol.for("ThrowableWeapon")
};

@injectable()
class Katana implements Weapon {
  public hit() {
    return "cut!";
  }
}

@injectable()
class Shuriken implements ThrowableWeapon {
  public throw() {
    return "hit!";
  }
}

@injectable()
class Ninja implements Warrior {
  private _katana: Weapon;
  private _shuriken: ThrowableWeapon;

  public constructor(
    @inject(TYPES.Weapon) katana: Weapon,
    @inject(TYPES.ThrowableWeapon) shuriken: ThrowableWeapon
  ) {
    this._katana = katana;
    this._shuriken = shuriken;
  }
  ttrr!: number;

  public fight() {
    return this._katana.hit();
  }
  public sneak() {
    return this._shuriken.throw();
  }
}

const myContainer = new Container();
myContainer.bind<Warrior>(TYPES.Warrior).to(Ninja);
myContainer.bind<Weapon>(TYPES.Weapon).to(Katana);
myContainer.bind<ThrowableWeapon>(TYPES.ThrowableWeapon).to(Shuriken);

const ninja = myContainer.get<Weapon>(TYPES.Weapon);

// console.log(ninja.updates);
type T = keyof E_User;

const tab: (keyof E_User)[] = ['uid'];

function generate<T extends object>() {
  const tab: (keyof T)[] = [];
  const a: Partial<T> = {};
  console.log( Object.getPrototypeOf(a));
  
  Object.getPrototypeOf(a)
  return Array.from(new Set(Object.keys(a)));
}

console.log({...["etry", 1]});
