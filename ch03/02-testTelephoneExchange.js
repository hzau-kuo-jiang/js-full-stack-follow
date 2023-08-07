function telephoneExchange(number) {
  switch (number) {
    case 1001:
      return "John";
    case 1002:
      return "Mary";
    case 1003:
      return "Bob";
    default:
      return "Invalid number";
  }
}

function testTelephoneExchange(callback) {
  for (let i = 1000; i < 1005; i++) {
    console.log(callback(i));
  }
}

testTelephoneExchange(telephoneExchange);

testTelephoneExchange((number) => {
  if (number === 1001) return "John";
  if (number === 1002) return "Mary";
  if (number === 1003) return "Bob";
  if (number === 1004) return "Jane";
  return "Invalid number";
});
