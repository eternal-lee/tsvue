// Function 用 () => void 定义
function message(text: string): void;
function message(options: object): void;
function message(text: string, onClose?: () => void): void;
function message(text: string, mode: string, duration?: number): void;
function message(text: string, duration: number, onClose?: () => void): void;

function message (
  param1: string | object | any,
  param2?: number | (() => void) | string,
  param3?: (() => void) | number
) {
  if (typeof param1 === 'object') {
    param1.onClose()
  }
  param1 && console.warn(param1)
  param2 && console.warn(param2)
  param3 && console.warn(param3)
}

message({
  text: 'text',
  mode: 'mode',
  onClose: () => {
    console.info(1111)
  },
  duration: 300
})

message('text')
message('text', function () {
  console.info(2222)
})
message('text', 'mode')

interface ArrInter {
  0: number;
  1: string;
}

const arr: ArrInter = [1, 'w', 3]
console.log(arr)

const toString = Object.prototype.toString

export function is (val: unknown, type: string) {
  return toString.call(val) === `[object ${type}]`
}

/**
 * @description:  是否为时间
 */
export function isDate (val: unknown): val is Date {
  return is(val, 'Date')
}

export function isBoolean (val: unknown): val is boolean {
  return is(val, 'Boolean')
}

function apiLogin(a: string, p: string): void;
/**
 * Simulate a login
 */
function apiLogin (a: string, p: string) {
  if (a === 'ed' && p === 'ed') return Promise.resolve({ isAdmin: true })
  if (p === 'ed') return Promise.resolve({ isAdmin: false })
  return Promise.reject(new Error('invalid credentials'))
}

const as = apiLogin('', 'ed')
console.warn(as)
