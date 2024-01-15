/**
 * 获取变量的类型
 * @param {*} input
 * @returns
 */
function getType(input) {
  // 先使用typeof
  let type = typeof input;
  if (type === "object") {
    // 然后，Object.prototype.toString
    type = Object.prototype.toString.call(input);
    const reg = /\[object (.*)\]/;
    if (reg.test(type)) {
      type = reg.exec(type)[1].toLowerCase();
    }
  }
  return type;
}
