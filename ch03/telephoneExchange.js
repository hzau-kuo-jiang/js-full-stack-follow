class TelephoneExchange {
  constructor(names) {
    this.mp = new Map();
    this.firstNum = 1001;

    for (let name of names) {
      this.mp.set(this.firstNum++, name);
    }
  }

  add(name) {
    this.firstNum++;
    this.mp.set(this.firstNum, name);
  }

  delete(number) {
    this.mp.delete(number);
  }

  update(number, name) {
    if (this.mp.has(number)) {
      this.mp.set(number, name);
    } else {
      console.log(`No such number: ${number}`);
    }
  }

  call(number) {
    if (this.mp.has(number)) {
      let name = this.mp.get(number);
      console.log(`${number} is calling ${name}`);
    } else {
      console.log(`No such number: ${number}`);
    }
  }

  callAll() {
    for (let number of this.mp.keys()) {
      this.call(number);
    }
  }
}

let names = ["John", "Mary", "Bob"];
let te = new TelephoneExchange(names);
te.callAll();
console.log("------------------");
te.add("Jane");
te.callAll();
console.log("------------------");
te.update(1002, "Mary2");
te.callAll();
console.log("------------------");
te.delete(1003);
te.callAll();
console.log("------------------");
