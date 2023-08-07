class TelephoneExchange {
  constructor(names) {
    this.mp = new Map();
    this.firstNum = 1001;

    for (let name of names) {
      this.firstNum++;
      this.mp.set(this.firstNum, name);
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
    const me = this;
    return new Promise(function (resolve, reject) {
      const time = Math.random() * 5000;
      setTimeout(function () {
        let message = "";
        if (!me.mp.has(number)) {
          message = `No such number: ${number}`;
        } else {
          let name = me.mp.get(number);
          if (time > 3000) {
            message = `${number} is calling ${name} but not answered`;
          } else {
            message = `${number} is calling ${name}`;
          }
        }
        resolve(message);
      }, time);
    }).then(function (result) {
      console.log(result);
    });
  }

  async callAll() {
    console.log("\nCalling all numbers...");
    const promises = [];
    for (let number of this.mp.keys()) {
      promises.push(this.call(number));
    }
    return await Promise.all(promises).then(function () {
      console.log("All numbers called.");
    });
  }
}

async function testTelephoneExchange(phoneExchange) {
  await phoneExchange.callAll();
  phoneExchange.add("Peter");
  await phoneExchange.callAll();
  phoneExchange.delete(1002);
  await phoneExchange.callAll();
  phoneExchange.update(1003, "Mary");
  await phoneExchange.callAll();
}

const names = ["John", "Jane", "Tom"];
const phoneExchange = new TelephoneExchange(names);
testTelephoneExchange(phoneExchange);
