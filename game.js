/*
绘制地面方法
*/ 
function ground(params) {
  this.width = 0  // 宽度
  this.height = 0 // 高度
  this.x = [0, 0] // 右上角的x坐标
  this.y = 0 // 右上角的y坐标
  this.moveX = [] // 需要位移的值
  this.speed = 3
  this.img = new Image()
  this._init(params)
}
ground.prototype.constructor = ground
// 初始化函数
ground.prototype._init = function(arg) {
  if (!window) console.log('you ENV not window or globl.')
  this.x[0] = 2
  this.moveX.push(2)
  if (window.innerWidth < 600) {
      this.width =  600
      this.x[1] = this.x[0] + this.width
      this.moveX.push(this.x[1])
  }
  else if (window.innerWidth >= 600 && window.innerWidth < 1233) {
      this.width =  1200
      this.x[1] = 2
      this.moveX.push(this.x[1] + this.width)
  }
  this.height = 14
  this.y = 54
  this.moveX.push(this.x[0])
  this.img.src = arg.src
}
ground.prototype.draw = function() {
      this.moveX[0] -= speed
      this.moveX[1] -= speed
      ctx.drawImage(
          this.img, 
          this.x[0], this.y,
          this.width, this.height,
          this.moveX[0], canvas.height*0.9 - 8,
          this.width, this.height
      )
      ctx.drawImage(
          this.img, 
          this.x[1], this.y,
          this.width, this.height,
          this.moveX[1], canvas.height*0.9 - 8,
          this.width, this.height
      )
}
ground.prototype.monitor = function() {
  if (window.innerWidth < 600) {
      if (-this.moveX[0] > this.x[1]) {
          this.moveX[0] = this.moveX[1] + this.width
      }
      if (this.moveX[1] + this.width <= 0) {
          this.moveX[1] = this.moveX[0] + this.width
      }
  } else if (window.innerWidth >= 600 && window.innerWidth < 1233) {
      if (this.moveX[0] + this.width <= 0) {
          this.moveX[0] = this.moveX[0] + this.width
      }
      if (-this.moveX[1] > this.x[0]) {
          this.moveX[1] = this.moveX[0] + this.width
      }
  }

}


/*
绘制障碍物方法
*/
// 定义路障对象类 
var barrier = function () {
  this.alive = []            //路障生命状态的布尔bool
  this.orange = new Image()  //橙色路障
  this.blue = new Image()    //蓝色路障
  this.x = []                //路障x坐标
  this.y = []                //路障y坐标
  this.moveX = []
  this.moveY = []
  this.width = []
  this.height = []
  this.aneNO = []
  this.barrierLargen = []     //路障生长大小变化量
  this.spd = []             //路障生长速度、上浮速度的随机处理hi
  this.barrierType = []       //定义路障类型，用于区分橙色路障和蓝色路障。
}
// 预设路障在画布中的数量为3个
barrier.prototype.num = 3
// 路障初始化 
barrier.prototype.init = function () {
  for (var i = 0; i < this.num; i++) { // 遍历并且画出所有的障碍物
    switch (parseInt(Math.random() * 3)) {
      case 0:
        this.x[i] = 432
        this.y[i] = 0
        this.width[i] = 25
        this.height[i] = 50
      break
      case 1:
        this.x[i] = 331
        this.y[i] = 0
        this.width[i] = 26
        this.height[i] = 50
      break
      case 2:
        this.x[i] = 381
        this.y[i] = 0
        this.width[i] = 26
        this.height[i] = 50
      break
    }
    this.alive[i] = false
    this.moveX[i] = Width * 0.9
    this.moveY[i] = Height * 0.9
    this.spd[i] = Math.random() * 3
    this.aneNO[i] = 0
    this.barrierType[i] = ''
  }
  // console.log(this.barrierType)
}
// 画出路障，静态、动态的路障
barrier.prototype.draw = function (ctx) {
  for (var i = 0; i < this.num; i++) {
    if (this.alive[i]) {
      ctx.drawImage(
        img1, 
        this.x[i], 0,
        this.width[i], this.height[i],
        this.moveX[i], this.moveY[i] - this.height[i],
        this.width[i], this.height[i]
      )
      // 碰撞检测系统控制
      if (inCollision(this.moveX[i], this.moveY[i] - this.height[i], this.width[i], this.height[i], jumpman.moveX, jumpman.moveY, jumpman.width, jumpman.height)) {
        // console.log('碰撞了')
        gameOver()
      } else {
        this.moveX[i] -= speed
      }
      if (this.moveX[i] < 10) {
        this.alive[i] = false
        score ++
        // console.log(score)
      } 
      // else if (this.moveX[i] < jumpman.moveX && !flag) {
      //   score ++
      //   console.log(score)
      // }
    }
  }
}
// 路障出生函数，路障随机生长
barrier.prototype.born = function (i) {
  // console.log('born'+i)
  // for (var i = 0; i < barr.num; i++) {
  //   if (barr.alive[i]) {

  //   }
  // }
  switch (i) {
    case 0:
      // if (barr.alive[2]) {
      //   if (Width * 0.6 > barr.moveX[2]) {
      //     this.moveX[i] = Width
      //   }
      // } else {
        this.moveX[i] = Width
      // }
    break
    case 1:
      // if (barr.alive[0]) {
      //   if (Width * 0.6 > barr.moveX[0]) {
      //     this.moveX[i] = Width
      //   }
      // }
      this.moveX[i] = this.moveX[0] + Width * 0.4
    break
    case 2:
      // if (barr.alive[1]) {
      //   if (Width * 0.6 > barr.moveX[1]) {
      //     this.moveX[i] = Width
      //   }
      // }
      this.moveX[i] = this.moveX[1] + Width * 0.6
    break
  }
  // this.moveX[i] = Width // 生第一个的时候
  // console.log(this.x[i])
  this.y[i] = Height * 0.9
  this.alive[i] = true
}
barrier.prototype.dead = function (i) {
  this.alive[i] = false
}
// 路障监视功能，监视屏幕上有多少个活着的路障，如果路障少于15个，发出一个路障。
function barrierMonitor(barr) {
  var activeBarr = 0
  for (var i = 0; i < barr.num; i++) {
    if (barr.alive[i]) activeBarr++
    // console.log(barr.alive)
    if (activeBarr < 3) {
      // console.log(activeBarr)
      sendbarrier(barr)
    }
  }
}
// 发出路障前进行判断，
function sendbarrier(barr) {
  for (var i = 0; i < barr.num; i++) {
    if (!barr.alive[i]) {
      barr.born(i)
      return
    }
  }
}


/*
绘跳男方法
*/
function jumpMan(params) {
  this.width = 0  // 宽度
  this.height = 0 // 高度
  this.x = 0 // 右上角的x坐标
  this.y = 0 // 右上角的y坐标
  this.moveX = 0 // 需要位移的值
  this.moveY = 0 // 需要位移的值
  this.count = 1
  this.manType = 0
  this.speed = 10
  this.img = new Image()
  this.a = 0
  this.vy = 0
  this.s = 0
  this.t = 1 / 0.06 * 0.003
  this.ay = 20
  this.v0 = 30
  this._init(params)
  // return this.draw
}
jumpMan.prototype.constructor = jumpMan
// 初始化函数
jumpMan.prototype._init = function(arg) {
  if (!window) console.log('you ENV not window or globl.')
  this.width = 42
  this.height = 48
  this.moveX = Width * 0.1
  this.moveY = Height * 0.9 - this.height
  this.img.src = arg.src
}
jumpMan.prototype.draw = function() {
      this.count += this.speed
      if (flag) {
        this.x = 850
        if (this.a > 58) {
          this.vy = 0
          this.a = 0
          this.s = 0
          flag = false
          } else {
            if (gameControl) {
              this.moveY -= this.s * 6.5
              this.a += 1
              this.vy = this.v0 + -this.ay * this.t * this.a
              this.s = this.vy * this.t + 0.5 * -this.ay * this.t * this.t
            }
        }
      }else {
          if (this.count < 50) {
              this.x = 937
          }else if (this.count>=50 && this.count < 100) {
              this.x = 981
          }else {
              this.count = 1
              this.x = 937
          }
      }
      ctx.drawImage(
          this.img, 
          this.x, 0,
          this.width, this.height,
          this.moveX, this.moveY,
          this.width, this.height
      )
}

let img1 = new Image()
// let img2 = new Image()
// let long = new Image()
img1.src = 'img/all1.png'
// img2.src = './img/all2.png'
// long.src = './img/long.png'
img1.onload = () => {
  // console.log('img1 is ready')
  game()
}

let Width = window.innerWidth
let Height = window.innerHeight
let canvas = document.getElementById('canvas')
let barr
let groundD
let jumpman
let flag = false
let gameControl = false
let score = 0
let speed = 3
// 游戏控制器
canvas.style.backgroundColor = 'white'
canvas.width = Width
canvas.height = Height
let ctx = canvas.getContext('2d')

/**
 * 
 * @param {*} x1 物体1的左上角x坐标
 * @param {*} y1 物体1的左上角y坐标
 * @param {*} w1 物体1的宽度
 * @param {*} h1 物体1的高度
 * @param {*} x2 物体2的左上角x坐标
 * @param {*} y2 物体2的左上角y坐标
 * @param {*} w2 物体2的宽度
 * @param {*} h2 物体2的高度
 */
function inCollision(x1, y1, w1, h1, x2, y2, w2, h2) {
  return (x2 >= x1 && x2 <= (x1 + w1)) && ((y2 >= y1 && y2 <= (y1 + h1)) || ((y2 + h2) >= y1 && (y2 + h2) <= (y1 + h1))) || (x1 >= x2 && x1 <= (x2 + w2)) && ((y1 >= y2 && y1 <= (y2 + h2)) || ((y1 + h1) >= y2 && (y1 + h1) <= (y2 + h2)))
}

// wx.onTouchStart(function (e) {
//   flag = true
//   if (!gameControl) {
//     game()
//   }
// })
canvas.onclick = () => {
  flag = true
  if (!gameControl) {
    game()
  }
}

function game() {
  init()
  gameControl = true
  score = 0
  speed = 3
  gameLoop()
}

function gameOver() {
  // localStorage.setItem('')
  gameControl = false
}

function init() {
  barr = new barrier()
  groundD = new ground({canvas,src:'img/all1.png'})
  jumpman = new jumpMan({canvas,src:'img/all1.png'})
  barr.init()
}

function gameLoop() {
  if (gameControl) {
    requestAnimationFrame(gameLoop)
    canvas.width = canvas.width
    if (score > 10 && score <= 30 && speed == 3) {
      speed += 0.5
    } else if (score > 30 && score <= 50 && speed == 3.5) {
      speed += 0.5
    } else if (score > 50 && score <= 70 && speed == 4) {
      speed ++
    } else if (score > 70 && speed == 5) {
      speed ++
    }
    // ctx.fillStyle = 'white'
    // ctx.fillRect(0,0,Width,Height)
    groundD.draw()
    groundD.monitor()
    jumpman.draw()
    barrierMonitor(barr)
    barr.draw(ctx)
    // ctx.font = "20px Times New Roman"
    ctx.font = 'bold 35px Arial'
    ctx.textAlign = 'center'
    ctx.fillStyle = 'gray'  
    ctx.fillText(score, Width * 0.5 - 15, 50)
    // console.log(score)
  }
}
