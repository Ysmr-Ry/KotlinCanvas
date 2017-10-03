if (typeof kotlin === 'undefined') {
  throw new Error("Error loading module 'HelloJS'. Its dependency 'kotlin' was not found. Please, check whether 'kotlin' is loaded prior to 'HelloJS'.");
}
var HelloJS = function (_, Kotlin) {
  'use strict';
  var arrayListOf = Kotlin.kotlin.collections.arrayListOf_i5x0yv$;
  var cvs;
  function initCanvas() {
    var tmp$, tmp$_0, tmp$_1;
    var cvs = Kotlin.isType(tmp$ = document.createElement('canvas'), HTMLCanvasElement) ? tmp$ : Kotlin.throwCCE();
    var ctx = Kotlin.isType(tmp$_0 = cvs.getContext('2d'), CanvasRenderingContext2D) ? tmp$_0 : Kotlin.throwCCE();
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    ((tmp$_1 = document.body) != null ? tmp$_1 : Kotlin.throwNPE()).appendChild(cvs);
    return cvs;
  }
  function get_ctx() {
    var tmp$;
    return Kotlin.isType(tmp$ = cvs.getContext('2d'), CanvasRenderingContext2D) ? tmp$ : Kotlin.throwCCE();
  }
  function get_width() {
    return cvs.width;
  }
  function get_height() {
    return cvs.height;
  }
  function Point(x, y) {
    this.x = x;
    this.y = y;
  }
  Point.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'Point',
    interfaces: []
  };
  Point.prototype.component1 = function () {
    return this.x;
  };
  Point.prototype.component2 = function () {
    return this.y;
  };
  Point.prototype.copy_lu1900$ = function (x, y) {
    return new Point(x === void 0 ? this.x : x, y === void 0 ? this.y : y);
  };
  Point.prototype.toString = function () {
    return 'Point(x=' + Kotlin.toString(this.x) + (', y=' + Kotlin.toString(this.y)) + ')';
  };
  Point.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.x) | 0;
    result = result * 31 + Kotlin.hashCode(this.y) | 0;
    return result;
  };
  Point.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.x, other.x) && Kotlin.equals(this.y, other.y)))));
  };
  function Vector(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
  Vector.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'Vector',
    interfaces: []
  };
  Vector.prototype.component1 = function () {
    return this.x;
  };
  Vector.prototype.component2 = function () {
    return this.y;
  };
  Vector.prototype.component3 = function () {
    return this.z;
  };
  Vector.prototype.copy_yvo9jy$ = function (x, y, z) {
    return new Vector(x === void 0 ? this.x : x, y === void 0 ? this.y : y, z === void 0 ? this.z : z);
  };
  Vector.prototype.toString = function () {
    return 'Vector(x=' + Kotlin.toString(this.x) + (', y=' + Kotlin.toString(this.y)) + (', z=' + Kotlin.toString(this.z)) + ')';
  };
  Vector.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.x) | 0;
    result = result * 31 + Kotlin.hashCode(this.y) | 0;
    result = result * 31 + Kotlin.hashCode(this.z) | 0;
    return result;
  };
  Vector.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.x, other.x) && Kotlin.equals(this.y, other.y) && Kotlin.equals(this.z, other.z)))));
  };
  function Line(p1, p2) {
    this.p1 = p1;
    this.p2 = p2;
  }
  Line.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'Line',
    interfaces: []
  };
  Line.prototype.component1 = function () {
    return this.p1;
  };
  Line.prototype.component2 = function () {
    return this.p2;
  };
  Line.prototype.copy_xgtxxi$ = function (p1, p2) {
    return new Line(p1 === void 0 ? this.p1 : p1, p2 === void 0 ? this.p2 : p2);
  };
  Line.prototype.toString = function () {
    return 'Line(p1=' + Kotlin.toString(this.p1) + (', p2=' + Kotlin.toString(this.p2)) + ')';
  };
  Line.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.p1) | 0;
    result = result * 31 + Kotlin.hashCode(this.p2) | 0;
    return result;
  };
  Line.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.p1, other.p1) && Kotlin.equals(this.p2, other.p2)))));
  };
  function persp(v) {
    return new Point(v.x * 5 / (v.z + 5), v.y * 5 / (v.z + 5));
  }
  function rot$cs(theta) {
    return Math.cos(theta);
  }
  function rot$si(theta) {
    return Math.sin(theta);
  }
  function rot(v, a, b, c) {
    var x = v.x;
    var y = v.y;
    var z = v.z;
    var cs = rot$cs;
    var si = rot$si;
    return new Vector(cs(b) * cs(a) * x + (cs(b) * si(a) * si(c) - si(b) * cs(c)) * y + (cs(b) * si(a) * cs(c) + si(b) * si(c)) * z, si(b) * cs(a) * x + (si(b) * si(a) * si(c) + cs(b) * cs(c)) * y + (si(b) * si(a) * cs(c) - cs(b) * si(c)) * z, -si(a) * x + cs(a) * si(c) * y + cs(a) * cs(c) * z);
  }
  function dist(u, v) {
    return Math.sqrt((u.x - v.x) * (u.x - v.x) + (u.y - v.y) * (u.y - v.y) + (u.z - v.z) * (u.z - v.z));
  }
  var lines;
  var sel;
  var tosel;
  var num;
  var pName;
  function initLines$mkV(j) {
    return new Vector(1.0 * Math.cos(j / 100.0 * 2 * Math.PI), 0.3, 1.0 * Math.sin(j / 100.0 * 2 * Math.PI));
  }
  function initLines(tim) {
    var tmp$, tmp$_0, tmp$_1, tmp$_2, tmp$_3;
    var ret = Kotlin.kotlin.collections.ArrayList_init_ww73n8$();
    for (var i = 0; i <= 100; i++) {
      var mkV = initLines$mkV;
      ret.add_11rb$(new Line(mkV(i), mkV((i + 1 | 0) % 100)));
    }
    var cube = Kotlin.kotlin.collections.ArrayList_init_ww73n8$();
    var b = 0.1;
    var cy = 0.1;
    cube.add_11rb$(new Line(new Vector(-b, -b, -b), new Vector(-b, -b, +b)));
    cube.add_11rb$(new Line(new Vector(-b, -b, -b), new Vector(-b, +b, -b)));
    cube.add_11rb$(new Line(new Vector(-b, -b, -b), new Vector(+b, -b, -b)));
    cube.add_11rb$(new Line(new Vector(-b, -b, +b), new Vector(+b, -b, +b)));
    cube.add_11rb$(new Line(new Vector(-b, -b, +b), new Vector(-b, +b, +b)));
    cube.add_11rb$(new Line(new Vector(-b, +b, -b), new Vector(+b, +b, -b)));
    cube.add_11rb$(new Line(new Vector(-b, +b, -b), new Vector(-b, +b, +b)));
    cube.add_11rb$(new Line(new Vector(+b, -b, -b), new Vector(+b, +b, -b)));
    cube.add_11rb$(new Line(new Vector(+b, -b, -b), new Vector(+b, -b, +b)));
    cube.add_11rb$(new Line(new Vector(+b, +b, +b), new Vector(-b, +b, +b)));
    cube.add_11rb$(new Line(new Vector(+b, +b, +b), new Vector(+b, -b, +b)));
    cube.add_11rb$(new Line(new Vector(+b, +b, +b), new Vector(+b, +b, -b)));
    tmp$ = cube.iterator();
    while (tmp$.hasNext()) {
      var c = tmp$.next();
      c.p1 = rot(c.p1, 0.0, tim, tim);
      c.p2 = rot(c.p2, 0.0, tim, tim);
      c.p1.x = c.p1.x + 1.0 * Math.sin(sel / num * 2 * Math.PI);
      c.p1.y = c.p1.y + cy;
      c.p1.z = c.p1.z + -1.0 * Math.cos(sel / num * 2 * Math.PI);
      c.p2.x = c.p2.x + 1.0 * Math.sin(sel / num * 2 * Math.PI);
      c.p2.y = c.p2.y + cy;
      c.p2.z = c.p2.z + -1.0 * Math.cos(sel / num * 2 * Math.PI);
    }
    ret.addAll_brywnq$(cube);
    var tetra = Kotlin.kotlin.collections.ArrayList_init_ww73n8$();
    var tb = 0.1;
    tetra.add_11rb$(new Line(new Vector(tb, tb, tb), new Vector(tb, -tb, -tb)));
    tetra.add_11rb$(new Line(new Vector(tb, tb, tb), new Vector(-tb, tb, -tb)));
    tetra.add_11rb$(new Line(new Vector(tb, tb, tb), new Vector(-tb, -tb, tb)));
    tetra.add_11rb$(new Line(new Vector(tb, -tb, -tb), new Vector(-tb, tb, -tb)));
    tetra.add_11rb$(new Line(new Vector(-tb, tb, -tb), new Vector(-tb, -tb, tb)));
    tetra.add_11rb$(new Line(new Vector(-tb, -tb, tb), new Vector(tb, -tb, -tb)));
    tmp$_0 = tetra.iterator();
    while (tmp$_0.hasNext()) {
      var c_0 = tmp$_0.next();
      c_0.p1 = rot(c_0.p1, 0.0, tim, tim);
      c_0.p2 = rot(c_0.p2, 0.0, tim, tim);
      c_0.p1.x = c_0.p1.x + 1.0 * Math.sin((sel + 1) / num * 2 * Math.PI);
      c_0.p1.y = c_0.p1.y + cy;
      c_0.p1.z = c_0.p1.z + -1.0 * Math.cos((sel + 1) / num * 2 * Math.PI);
      c_0.p2.x = c_0.p2.x + 1.0 * Math.sin((sel + 1) / num * 2 * Math.PI);
      c_0.p2.y = c_0.p2.y + cy;
      c_0.p2.z = c_0.p2.z + -1.0 * Math.cos((sel + 1) / num * 2 * Math.PI);
    }
    ret.addAll_brywnq$(tetra);
    var icb = 0.1;
    var icosa = Kotlin.kotlin.collections.ArrayList_init_ww73n8$();
    var vtx = Kotlin.kotlin.collections.ArrayList_init_ww73n8$();
    var phi = (1 + Math.sqrt(5.0)) / 2.0;
    for (var i_0 = 0; i_0 <= 1; i_0++) {
      for (var j = 0; j <= 1; j++) {
        var s1 = i_0 === 0 ? -1 : 1;
        var s2 = j === 0 ? -1 : 1;
        vtx.add_11rb$(new Vector(icb * s1, icb * s2 * phi, 0.0));
        vtx.add_11rb$(new Vector(0.0, icb * s1, icb * s2 * phi));
        vtx.add_11rb$(new Vector(icb * s2 * phi, 0.0, icb * s1));
      }
    }
    for (var i_1 = 0; i_1 <= 11; i_1++) {
      for (var j_0 = i_1 + 1 | 0; j_0 <= 11; j_0++)
        if (Math.abs(dist(vtx.get_za3lpa$(i_1), vtx.get_za3lpa$(j_0)) - icb * 2.0) <= 0.001)
          icosa.add_11rb$(new Line(vtx.get_za3lpa$(i_1), vtx.get_za3lpa$(j_0)));
    }
    tmp$_1 = icosa.iterator();
    while (tmp$_1.hasNext()) {
      var c_1 = tmp$_1.next();
      c_1.p1 = rot(c_1.p1, 0.0, tim, tim);
      c_1.p2 = rot(c_1.p2, 0.0, tim, tim);
      c_1.p1.x = c_1.p1.x + 1.0 * Math.sin((sel + 2) / num * 2 * Math.PI);
      c_1.p1.y = c_1.p1.y + cy;
      c_1.p1.z = c_1.p1.z + -1.0 * Math.cos((sel + 2) / num * 2 * Math.PI);
      c_1.p2.x = c_1.p2.x + 1.0 * Math.sin((sel + 2) / num * 2 * Math.PI);
      c_1.p2.y = c_1.p2.y + cy;
      c_1.p2.z = c_1.p2.z + -1.0 * Math.cos((sel + 2) / num * 2 * Math.PI);
    }
    ret.addAll_brywnq$(icosa);
    var ocb = 0.15;
    var octa = Kotlin.kotlin.collections.ArrayList_init_ww73n8$();
    vtx.clear();
    vtx.add_11rb$(new Vector(-ocb, 0.0, 0.0));
    vtx.add_11rb$(new Vector(ocb, 0.0, 0.0));
    vtx.add_11rb$(new Vector(0.0, -ocb, 0.0));
    vtx.add_11rb$(new Vector(0.0, ocb, 0.0));
    vtx.add_11rb$(new Vector(0.0, 0.0, -ocb));
    vtx.add_11rb$(new Vector(0.0, 0.0, ocb));
    for (var i_2 = 0; i_2 <= 5; i_2++) {
      for (var j_1 = i_2 + 1 | 0; j_1 <= 5; j_1++) {
        if (Math.abs(dist(vtx.get_za3lpa$(i_2), vtx.get_za3lpa$(j_1)) - ocb * Math.sqrt(2.0)) <= 0.001)
          octa.add_11rb$(new Line(vtx.get_za3lpa$(i_2), vtx.get_za3lpa$(j_1)));
      }
    }
    tmp$_2 = octa.iterator();
    while (tmp$_2.hasNext()) {
      var c_2 = tmp$_2.next();
      c_2.p1 = rot(c_2.p1, 0.0, tim, tim);
      c_2.p2 = rot(c_2.p2, 0.0, tim, tim);
      c_2.p1.x = c_2.p1.x + 1.0 * Math.sin((sel + 3) / num * 2 * Math.PI);
      c_2.p1.y = c_2.p1.y + cy;
      c_2.p1.z = c_2.p1.z + -1.0 * Math.cos((sel + 3) / num * 2 * Math.PI);
      c_2.p2.x = c_2.p2.x + 1.0 * Math.sin((sel + 3) / num * 2 * Math.PI);
      c_2.p2.y = c_2.p2.y + cy;
      c_2.p2.z = c_2.p2.z + -1.0 * Math.cos((sel + 3) / num * 2 * Math.PI);
    }
    ret.addAll_brywnq$(octa);
    var dodb = 0.1;
    var Rad = Math.PI / 180.0;
    var po = 36.0 / 180.0 * Math.PI;
    var dodeca = Kotlin.kotlin.collections.ArrayList_init_ww73n8$();
    vtx.clear();
    for (var i_3 = 0; i_3 <= 19; i_3++) {
      if (i_3 <= 4)
        vtx.add_11rb$(new Vector(dodb * Math.cos((18 + (i_3 * 72 | 0) | 0) * Rad), dodb * Math.sin((18 + (i_3 * 72 | 0) | 0) * Rad), dodb * (Math.sqrt(5.0) + 3) / 4));
      else if (i_3 <= 9)
        vtx.add_11rb$(new Vector(dodb * phi * Math.cos((18 + (i_3 * 72 | 0) | 0) * Rad), dodb * phi * Math.sin((18 + (i_3 * 72 | 0) | 0) * Rad), dodb * (Math.sqrt(5.0) - 1) / 4));
      else if (i_3 <= 14)
        vtx.add_11rb$(new Vector(dodb * phi * Math.cos((54 + (i_3 * 72 | 0) | 0) * Rad), dodb * phi * Math.sin((54 + (i_3 * 72 | 0) | 0) * Rad), -dodb * (Math.sqrt(5.0) - 1) / 4));
      else if (i_3 <= 19)
        vtx.add_11rb$(new Vector(dodb * Math.cos((54 + (i_3 * 72 | 0) | 0) * Rad), dodb * Math.sin((54 + (i_3 * 72 | 0) | 0) * Rad), -dodb * (Math.sqrt(5.0) + 3) / 4));
    }
    for (var i_4 = 0; i_4 <= 19; i_4++) {
      for (var j_2 = i_4 + 1 | 0; j_2 <= 19; j_2++) {
        if (Math.abs(dist(vtx.get_za3lpa$(i_4), vtx.get_za3lpa$(j_2)) - dodb * Math.sqrt((5.0 - Math.sqrt(5.0)) / 2.0)) <= 0.001)
          dodeca.add_11rb$(new Line(vtx.get_za3lpa$(i_4), vtx.get_za3lpa$(j_2)));
      }
    }
    tmp$_3 = dodeca.iterator();
    while (tmp$_3.hasNext()) {
      var c_3 = tmp$_3.next();
      c_3.p1 = rot(c_3.p1, 0.0, tim, tim);
      c_3.p2 = rot(c_3.p2, 0.0, tim, tim);
      c_3.p1.x = c_3.p1.x + 1.0 * Math.sin((sel + 4) / num * 2 * Math.PI);
      c_3.p1.y = c_3.p1.y + cy;
      c_3.p1.z = c_3.p1.z + -1.0 * Math.cos((sel + 4) / num * 2 * Math.PI);
      c_3.p2.x = c_3.p2.x + 1.0 * Math.sin((sel + 4) / num * 2 * Math.PI);
      c_3.p2.y = c_3.p2.y + cy;
      c_3.p2.z = c_3.p2.z + -1.0 * Math.cos((sel + 4) / num * 2 * Math.PI);
    }
    ret.addAll_brywnq$(dodeca);
    return ret;
  }
  function morph(f, t, d) {
    return f + (t - f) / d;
  }
  var tim;
  function render$lambda(t) {
    var tmp$;
    tim = tim + 1;
    get_ctx().canvas.width = window.innerWidth;
    get_ctx().canvas.height = window.innerHeight;
    get_ctx().fillStyle = '#282828';
    get_ctx().fillRect(0.0, 0.0, get_width(), get_height());
    get_ctx().lineWidth = 2.0;
    lines = initLines(tim / 100.0);
    sel = morph(sel, tosel, 30.0);
    tmp$ = lines.iterator();
    while (tmp$.hasNext()) {
      var l = tmp$.next();
      var fl = l.p1.z > 0.0 || l.p2.z > 0.0;
      var p1 = persp(l.p1);
      var p2 = persp(l.p2);
      get_ctx().strokeStyle = '#ffffff';
      get_ctx().beginPath();
      get_ctx().moveTo((get_width() / 2 | 0) + ((get_width() * 3 | 0) / 8 | 0) * p1.x, (get_height() / 2 | 0) + ((get_width() * 3 | 0) / 8 | 0) * p1.y);
      get_ctx().lineTo((get_width() / 2 | 0) + ((get_width() * 3 | 0) / 8 | 0) * p2.x, (get_height() / 2 | 0) + ((get_width() * 3 | 0) / 8 | 0) * p2.y);
      get_ctx().closePath();
      get_ctx().stroke();
    }
    get_ctx().fillStyle = '#ffffff';
    get_ctx().font = "normal 60px 'Yu Gothic'";
    var toselM = tosel;
    while (toselM < 0)
      toselM += num;
    get_ctx().fillText(pName.get_za3lpa$(toselM % num | 0), 20.0, 70.0);
    get_ctx().fillText('Press \u2190 / \u2192 Key!!', 20.0, 140.0);
    render();
  }
  function render$lambda_0(it) {
    keyUp(it);
  }
  function render() {
    window.requestAnimationFrame(render$lambda);
    window.addEventListener('keyup', render$lambda_0, true);
  }
  function keyUp(e) {
    var tmp$;
    var ek = Kotlin.isType(tmp$ = e, KeyboardEvent) ? tmp$ : Kotlin.throwCCE();
    var k = ek.keyCode;
    if (k === 39)
      tosel = tosel - 1;
    else if (k === 37)
      tosel = tosel + 1;
  }
  var package$canvas = _.canvas || (_.canvas = {});
  Object.defineProperty(package$canvas, 'cvs', {
    get: function () {
      return cvs;
    }
  });
  package$canvas.initCanvas = initCanvas;
  Object.defineProperty(package$canvas, 'ctx', {
    get: get_ctx
  });
  Object.defineProperty(package$canvas, 'width', {
    get: get_width
  });
  Object.defineProperty(package$canvas, 'height', {
    get: get_height
  });
  package$canvas.Point = Point;
  package$canvas.Vector = Vector;
  package$canvas.Line = Line;
  package$canvas.persp_n0kbwn$ = persp;
  package$canvas.rot_l91dox$ = rot;
  package$canvas.dist_xgtxxi$ = dist;
  Object.defineProperty(package$canvas, 'lines', {
    get: function () {
      return lines;
    },
    set: function (value) {
      lines = value;
    }
  });
  Object.defineProperty(package$canvas, 'sel', {
    get: function () {
      return sel;
    },
    set: function (value) {
      sel = value;
    }
  });
  Object.defineProperty(package$canvas, 'tosel', {
    get: function () {
      return tosel;
    },
    set: function (value) {
      tosel = value;
    }
  });
  Object.defineProperty(package$canvas, 'num', {
    get: function () {
      return num;
    }
  });
  Object.defineProperty(package$canvas, 'pName', {
    get: function () {
      return pName;
    }
  });
  package$canvas.initLines_14dthe$ = initLines;
  package$canvas.morph_yvo9jy$ = morph;
  Object.defineProperty(package$canvas, 'tim', {
    get: function () {
      return tim;
    },
    set: function (value) {
      tim = value;
    }
  });
  package$canvas.render = render;
  package$canvas.keyUp_9ojx7i$ = keyUp;
  cvs = initCanvas();
  lines = Kotlin.kotlin.collections.ArrayList_init_ww73n8$();
  sel = 0.0;
  tosel = 0.0;
  num = 5.0;
  pName = arrayListOf(['Hexahedron', 'Dodecahedron', 'Octahedron', 'Icosahedron', 'Tetrahedron']);
  tim = 0.0;
  Kotlin.defineModule('HelloJS', _);
  return _;
}(typeof HelloJS === 'undefined' ? {} : HelloJS, kotlin);

//# sourceMappingURL=HelloJS.js.map
