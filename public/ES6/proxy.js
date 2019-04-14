{
  let handler = {
    get(target, prop) {
      return prop in target ? target[prop] : 37;
    }
  };
  let p = new Proxy({}, handler);
  p.a = 1
  p.b = undefined
  console.log(p.a, p.b) //1 undefined
  console.log('c' in p, p.c) //false 37
}
{
  let target = {};
  let p = new Proxy(target, {});
  p.a = 37;   // 操作转发到目标
  console.log(target.a);    // 37. 操作已经被正确地转发

}
{
  let validator = {
    set(obj, prop, value) {
      if (prop === 'age') {
        if (!Number.isInteger(value)) {
          throw new TypeError('The age is not an integer');
        }
        if (value > 200) {
          throw new RangeError('The age seems invalid');
        }
      }
      obj[prop] = value;
    }
  };

  let person = new Proxy({}, validator);
  person.age = 100;
  console.log(person.age); // 100
  person.age = 'young'; // 抛出异常: Uncaught TypeError: The age is not an integer
  person.age = 300; // 抛出异常: Uncaught RangeError: The age seems invalid
}