/**
 * 深度拷贝
 *
 * 需要：
 * - 对 Object、Function、Date、RegExp、Map、Set 单独处理
 * - 处理循环引用
 * - 处理对象的原型链上的属性
 * - 处理Symbol属性
 * - 处理不可枚举属性
 *
 * @param {*} origin
 * @returns
 */
function deepClone(origin) {
  // 记录已经存在的对象，防止循环引用
  const cache = new WeakMap();
  function clone(data) {
    if (isObject(data)) {
      // 处理Function
      if (typeof data === "function") {
        return cloneFunction(data);
      }
      // 处理Date、RegExp
      if ([Date, RegExp].includes(data.constructor)) {
        return new data.constructor(data);
      }
      // 处理数组
      if (Array.isArray(data)) {
        return cloneArray(data);
      }
      // 缓存
      const exist = cache.get(data);
      if (exist) {
        return exist;
      }
      // 处理Map
      if (data instanceof Map) {
        return cloneMap(data);
      }
      // 处理Set
      if (data instanceof Set) {
        return cloneSet(data);
      }
      // 处理Object
      return cloneObj(data);
    } else {
      // 原始类型数据直接返回
      return data;
    }
  }
  // 克隆函数
  function cloneFunction(functionStr) {
    const fun = new Function(`return ${functionStr}`);
    return fun();
  }
  // 克隆Map
  function cloneMap(map) {
    const res = new Map();
    cache.set(map, res);
    // 遍历
    map.forEach((val, key) => {
      if (isObject(val)) {
        res.set(key, clone(val));
      } else {
        res.set(key, val);
      }
    });
    return res;
  }
  // 克隆Set
  function cloneSet(set) {
    const res = new Set();
    cache.set(set, res);
    set.forEach((item) => {
      if (isObject(item)) {
        res.add(clone(item));
      } else {
        res.add(item);
      }
    });
    return res;
  }
  // 克隆对象
  function cloneObj(obj) {
    const keyDescriptors = Object.getOwnPropertyDescriptors(obj);
    const res = Object.create(Object.getPrototypeOf(obj), keyDescriptors);
    cache.set(obj, res);
    const keys = Reflect.ownKeys(obj);
    keys.forEach((key) => {
      const val = obj[key];
      if (isObject(val)) {
        res[key] = clone(val);
      } else {
        res[key] = val;
      }
    });
    return res;
  }
  // 克隆数组   
  function cloneArray(arr) {
    const res = [];
    arr.forEach((item) => {
      if (isObject(item)) {
        res.push(clone(item));
      } else {
        res.push(item);
      }
    });
    return res;
  }
  return clone(origin);
}

function isObject(obj) {
  return ["object", "function"].includes(typeof obj);
}

console.log(isObject({}));
console.log(isObject(1));
console.log(isObject(() => {}));

let obj = {
  name: "123",
  a: function () {
    console.log("a");
  },
  b: () => {
    console.log("b");
  },
  arr: new Array(3),
};
console.log(obj);
let obj2 = deepClone(obj);
console.log(obj2);
obj2.name = "obj2";
obj2.arr = [2, 4];
console.log(obj2);
