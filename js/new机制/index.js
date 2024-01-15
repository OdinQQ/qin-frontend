/**
 * new操作符
 * @param  {...any} args
 * @returns
 */
Function.prototype.newFun = function (...args) {
  const Fun = this;
  // 1. 创建空对象
  const obj = {};
  // 2. 设置空对象的原型为构造函数的原型
  Object.setPrototypeOf(obj, Fun.prototype);
  // 3. 执行构造函数，this指向空对象
  const res = Fun.apply(obj, args);
  // 4. 返回对象   
  return res instanceof Object ? res : obj;
};

function Qin(name) {
  this.name = name;
}

let q = Qin.newFun("Qin");
console.log(q);
console.log(q instanceof Qin);
