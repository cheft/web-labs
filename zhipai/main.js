  // 新宁字牌，（方言：打字牌、啊代二、剥皮、划对胡等)（外地叫跑胡子）
  
  var pai =[
    // 一 二 三 四 五 六 七 八 九 十
    1, 1, 1, 1,
    2, 2, 2, 2,
    3, 3, 3, 3,
    4, 4, 4, 4,
    5, 5, 5, 5,
    6, 6, 6, 6,
    7, 7, 7, 7,
    8, 8, 8, 8,
    9, 9, 9, 9,
    10, 10, 10, 10,
    // 壹 贰 叁 肆 伍 陆 柒 捌 玖 拾
    11, 11, 11, 11,
    12, 12, 12, 12,
    13, 13, 13, 13,
    14, 14, 14, 14,
    15, 15, 15, 15,
    16, 16, 16, 16,
    17, 17, 17, 17,
    18, 18, 18, 18,
    19, 19, 19, 19,
    20, 20, 20, 20
  ];
  
  // 洗牌
  function xipai() {
    return pai.sort(() => 0.5 - Math.random());
  }
  
  // 发牌
  function fapai() {
    var tmp = xipai();
    return[
      tmp.slice(0, 20),
      tmp.slice(20, 40),
      tmp.slice(40, 61),
      tmp.slice(61, 80)
    ]
  }
  
  // 三张牌，组成牌型
  function paixing (map, a, b, c) {
    var aa = map.get(a);
    var bb = map.get(b);
    var cc = map.get(c);
  
    if (aa && aa.length > 0 && aa.length < 3 && bb && bb.length > 0
         && bb.length < 3 && cc && cc.length > 0 && cc.length < 3) {
      return [aa.pop(), bb.pop(), cc.pop()]
    }
  }
  
  /**
   * 智能插牌，组牌型，组坎子: 四张、三张、一二三、二七十、二带一、两张、两连、两隔连
   */
  function qipai(arr) {
    // 先排序
    var tmp = arr.sort((a, b) => a - b);
  
    // 按个数放 map 中
    var map = new Map();
    tmp.forEach(function(i) {
      var value = map.get(i) || [];
      value.push(i);
      map.set(i, value);
    });
  
    var arr2 = [], px;
    // 先把 1-2-3, 2-7-10等牌型优先选择出来，因为有胡子
    px = paixing(map, 1, 2, 3);
    if (px) arr2.push(px);
  
    px = paixing(map, 1, 2, 3);
    if (px) arr2.push(px);
  
    px = paixing(map, 2, 7, 10);
    if (px) arr2.push(px);
  
    px = paixing(map, 2, 7, 10);
    if (px) arr2.push(px);
  
    px = paixing(map, 11, 12, 13);
    if (px) arr2.push(px);
  
    px = paixing(map, 11, 12, 13);
    if (px) arr2.push(px);
  
    px = paixing(map, 12, 17, 20);
    if (px) arr2.push(px);
  
    px = paixing(map, 12, 17, 20);
    if (px) arr2.push(px);
  
    // 然后找四张、三张、两张带一张、两张的牌型，单牌留map中
    var others = [];
    for (var [k, v] of map) {
      if (v.length > 2) { // 三张牌以上
        arr2.push(v);
        map.delete(k);
      } else if (v.length) { // 一张或二张牌
        if (k < 11) {
          // 组一个大牌进去
          var dk = k + 10;
          var dv = map.get(dk);
          if (dv && dv.length === 1) {
            v = dv.concat(v);
            map.delete(dk);
          }
        } else {
          // 组一个小牌进去
          var xk = k - 10;
          var xv = map.get(xk);
          if (xv && xv.length === 1) {
            v = xv.concat(v);
            map.delete(xk);
          }
        }
        // 两张以上才放入牌组
        if (v.length > 1) {
          arr2.push(v);
          map.delete(k);
        }
      }
    }
  
    // 将单牌放入 others 数组中
    for (var v of map.values()) {
      if (v.length) {
        others = others.concat(v);
      }
    }
  
    // 遍历单牌，找出三连组，两连组和隔牌两连组牌型
    others.forEach(function(v, i) {
      // 9 以上或者 19 以上不存在三连组，因为小牌不能连大牌
      if ((v < 9 || (v > 10 && v < 19)) && others[i + 1] === v + 1 && others[i + 2] === v + 2) {
        arr2.push([v, others[i + 1], others[i + 2]]);
        others.splice(i, 3);
      } else {
        // 10 以上或者 20 以上不存在两连组, 9 以上或者 19 以上不存在隔牌两连组
        if ((v < 10 || (v > 10 && v < 20)) && others[i + 1] === v + 1 
            || (v < 9 || (v > 10 && v < 19)) && others[i + 1] === v + 2) {
          arr2.push([v, others[i + 1]]);
          others.splice(i, 2);
        }
      }
    });
  
    // 余下的散牌也放进牌组，当超过5个时切割，用两个组存起来，理论上不会超过7个
    if (others.length) {
      if (others.length > 4) {
        arr2.push(others.slice(0, 3));
        arr2.push(others.slice(3, others.length));
      } else {
        arr2.push(others);
      }
    }
  
    return arr2;
  }
  
  // 系统发牌
  var tmp = fapai();
  // 三个玩家智能插好牌组
  console.log(qipai(tmp[0]));
  console.log(qipai(tmp[1]));
  console.log(qipai(tmp[2]));
  
  /**
   * 抓牌时触发规则
   * 1.跩起、清起 2.胡 3.开招 4.碰 5.吃
   * 处理重招不需打牌，过章不能吃，吃牌若手牌有张要摆火，记录自摸胡牌
   */
  function zhuapai() {
    
  }
  
  // 吃牌
  function chipai() {
  
  }
  
  // 胡牌
  function hupai() {
  
  }
  
  // 算胡子
  function suanHuzi() {
  
  }
  