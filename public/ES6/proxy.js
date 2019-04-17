{
  //基础示例
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
  //验证
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
  // person.age = 'young'; // 抛出异常: Uncaught TypeError: The age is not an integer
  // person.age = 300; // 抛出异常: Uncaught RangeError: The age seems invalid
}
{
  //值修正及附加属性

  let products = new Proxy({
    browsers: ['Internet Explorer', 'Netscape']
  }, {
      get(target, prop) {
        // 附加属性
        if (prop === 'lastBrowsers') {
          return target[target.browsers.length - 1]
        }
        // 缺省行为是返回属性值
        return target[prop]
      },
      set(target, prop, value) {
        if (prop === 'lastBrowsers') {
          return target['browsers'].push(value)
        }
        // 如果不是数组则进行转换
        if (prop === 'browsers' && typeof value === 'string') {
          value = [value]
        }
        // 缺省行为是保存属性值
        return target[prop] = value
      }
    })
  console.log(1, products.browsers)
  products.lastBrowsers = 'lyx'
  console.log(2, products.browsers)
  products.browsers = 'yang'
  console.log(2, products.browsers)
}
{
  var obj = {};
  var descriptor = Object.create(null); // 没有继承的属性
  // 默认没有 enumerable，没有 configurable，没有 writable
  descriptor.value = 'static';
  Object.defineProperty(obj, 'key', descriptor);
  console.log('obj,key:', obj)
  // 显式
  Object.defineProperty(obj, "key2", {
    enumerable: false,
    configurable: false,
    writable: false,
    value: "static2"
  });
  console.log('obj,key2:', obj)

}
{
  var pattern = {
    get: function () {
      return 'I alway return this string,whatever you have assigned';
    },
    set: function () {
      this.myname = 'this is my name string';
    }
  };


  function TestDefineSetAndGet() {
    Object.defineProperty(this, 'myproperty', pattern);
  }


  var instance = new TestDefineSetAndGet();
  instance.myproperty = 'test';

  console.log(instance.myproperty); //I alway return this string,whatever you have assigned


  console.log(instance.myname); //this is my name string

}

{
  function Archiver() {
    var temperature = null;
    var archive = [];
  
    Object.defineProperty(this, 'temperature', {
      get: function() {
        console.log('get!');
        return temperature;
      },
      set: function(value) {
        temperature = value;
        archive.push({ val: temperature });
      }
    });
  
    this.getArchive = function() { return archive; };
  }
  
  var arc = new Archiver();
  arc.temperature; // 'get!'
  arc.temperature = 11;
  arc.temperature = 13;
  arc.getArchive(); // [{ val: 11 }, { val: 13 }]
}