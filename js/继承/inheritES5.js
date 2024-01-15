/**
 * 父对象构造函数
 * @param {*} name 
 * @param {*} age 
 */
function Father(name, age){
    this.name = name;
    this.age = age;
}
Father.prototype.say = function(str){
    console.log(`[${this.name}]: ${str}`);
}

/**
 * 子对象构造函数
 * @param {*} name 
 * @param {*} age 
 * @param {*} father 
 */
// 构造函数，复用属性
function Child(name, age, father){
    // 调用父级构造函数
    Father.call(this, name, age);
    this.father = father;
}
// 创建一个Father对象作为Child的原型
const fatherObj = Object.create(Father.prototype);
// 原型链，复用方法
Child.prototype = fatherObj;

/*-----------------------------------------*/
let f = new Father('QQQ', 50)
let c = new Child("qin", 20, f);
console.log(f);
console.log(c);
f.say("hello");
c.say("haha");
