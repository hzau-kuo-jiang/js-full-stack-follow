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
    return this.firstNum;
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
        let code = 0;
        if (!me.mp.has(number)) {
          message = `No such number: ${number}`;
          code = 2;
        } else {
          let name = me.mp.get(number);
          if (time > 3000) {
            message = `${number} is calling ${name} but not answered`;
            code = 1;
          } else {
            message = `${number} is calling ${name}`;
            code = 3;
          }
        }
        console.log(message);
        resolve(code);
      }, time);
    }).then(function (status) {
      return status;
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

export { TelephoneExchange };
