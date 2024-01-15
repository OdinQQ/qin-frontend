/**
 * 父类
 */
class Father {
    constructor(name, age){
        this.name = name;
        this.age = age;
    }
    say(str){
        console.log(`[${this.name}]: ${str}`);
    }
}

/**
 * 子类
 */
class Child extends Father {
    constructor(name, age, father){
        super(name, age);
        this.father = father;
    }
}

/*--------------------------------*/
let f = new Father('QQQ', 50)
let c = new Child("qin", 20, f);
console.log(f);
console.log(c);
f.say("hello");
c.say("haha");
