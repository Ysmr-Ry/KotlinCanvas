package canvas

import org.w3c.dom.*
import org.w3c.dom.events.*
import kotlin.browser.document
import kotlin.browser.window
import kotlin.js.Math

val cvs = initCanvas()

fun initCanvas(): HTMLCanvasElement
{
    val cvs = document.createElement("canvas") as HTMLCanvasElement
    val ctx = cvs.getContext("2d") as CanvasRenderingContext2D
    ctx.canvas.width = window.innerWidth
    ctx.canvas.height = window.innerHeight
    document.body!!.appendChild(cvs)

    return cvs
}

val ctx : CanvasRenderingContext2D
    get() {
        return cvs.getContext("2d") as CanvasRenderingContext2D
    }

val width: Int
    get() {
        return cvs.width
    }

val height: Int
    get() {
        return cvs.height
    }

data class Point( var x: Double, var y: Double ) {}

data class Vector( var x: Double, var y: Double, var z: Double ) {}

data class Line( var p1: Vector, var p2: Vector ) {}

fun persp( v: Vector ): Point {
    return Point( v.x*5/(v.z+5), v.y*5/(v.z+5) )
}

// theta -> a, phi -> b, psi -> c
fun rot( v: Vector, a: Double, b: Double, c: Double ): Vector
{
    val x = v.x
    val y = v.y
    val z = v.z;
    fun cs(theta: Double) = Math.cos(theta)
    fun si(theta: Double) = Math.sin(theta)

    return Vector(cs(b)*cs(a)*x+(cs(b)*si(a)*si(c)-si(b)*cs(c))*y+(cs(b)*si(a)*cs(c)+si(b)*si(c))*z,
    si(b)*cs(a)*x+(si(b)*si(a)*si(c)+cs(b)*cs(c))*y+(si(b)*si(a)*cs(c)-cs(b)*si(c))*z,
    -si(a)*x+cs(a)*si(c)*y+cs(a)*cs(c)*z)
}

fun dist( u: Vector, v: Vector ): Double = Math.sqrt( (u.x-v.x)*(u.x-v.x)+(u.y-v.y)*(u.y-v.y)+(u.z-v.z)*(u.z-v.z) )

var lines = arrayListOf<Line>()

var sel = 0.0
var tosel = 0.0
val num = 5.0

val pName = arrayListOf( "Hexahedron", "Dodecahedron", "Octahedron", "Icosahedron", "Tetrahedron" )

fun initLines( tim: Double ): ArrayList<Line>
{
    var ret = arrayListOf<Line>()

    for( i in 0..100 )
    {
        fun mkV( j: Int ): Vector {
            return Vector( 1.0*Math.cos(j/100.0*2*Math.PI), 0.3, 1.0*Math.sin(j/100.0*2*Math.PI) )
        }

        ret.add( Line( mkV(i), mkV((i+1)%100) ) )
    }

    // Cube
    val cube = arrayListOf<Line>()
    val b = 0.1
    val cy = 0.1
    cube.add( Line( Vector( -b, -b, -b ), Vector( -b, -b, +b ) ) )
    cube.add( Line( Vector( -b, -b, -b ), Vector( -b, +b, -b ) ) )
    cube.add( Line( Vector( -b, -b, -b ), Vector( +b, -b, -b ) ) )
    cube.add( Line( Vector( -b, -b, +b ), Vector( +b, -b, +b ) ) )
    cube.add( Line( Vector( -b, -b, +b ), Vector( -b, +b, +b ) ) )
    cube.add( Line( Vector( -b, +b, -b ), Vector( +b, +b, -b ) ) )
    cube.add( Line( Vector( -b, +b, -b ), Vector( -b, +b, +b ) ) )
    cube.add( Line( Vector( +b, -b, -b ), Vector( +b, +b, -b ) ) )
    cube.add( Line( Vector( +b, -b, -b ), Vector( +b, -b, +b ) ) )
    cube.add( Line( Vector( +b, +b, +b ), Vector( -b, +b, +b ) ) )
    cube.add( Line( Vector( +b, +b, +b ), Vector( +b, -b, +b ) ) )
    cube.add( Line( Vector( +b, +b, +b ), Vector( +b, +b, -b ) ) )

    for( c in cube )
    {
        c.p1 = rot( c.p1, 0.0, tim, tim )
        c.p2 = rot( c.p2, 0.0, tim, tim )

        c.p1.x += 1.0*Math.sin( sel/num*2*Math.PI )
        c.p1.y += cy
        c.p1.z += -1.0*Math.cos( sel/num*2*Math.PI )
        c.p2.x += 1.0*Math.sin( sel/num*2*Math.PI )
        c.p2.y += cy
        c.p2.z += -1.0*Math.cos( sel/num*2*Math.PI )
    }

    ret.addAll( cube )

    val tetra = arrayListOf<Line>()
    val tb = 0.1
    tetra.add( Line( Vector( tb, tb, tb ), Vector( tb, -tb, -tb ) ) )
    tetra.add( Line( Vector( tb, tb, tb ), Vector( -tb, tb, -tb ) ) )
    tetra.add( Line( Vector( tb, tb, tb ), Vector( -tb, -tb, tb ) ) )
    tetra.add( Line( Vector( tb, -tb, -tb ), Vector( -tb, tb, -tb ) ) )
    tetra.add( Line( Vector( -tb, tb, -tb ), Vector( -tb, -tb, tb ) ) )
    tetra.add( Line( Vector( -tb, -tb, tb ), Vector( tb, -tb, -tb ) ) )

    for( c in tetra )
    {
        c.p1 = rot( c.p1, 0.0, tim, tim )
        c.p2 = rot( c.p2, 0.0, tim, tim )

        c.p1.x += 1.0*Math.sin( (sel+1)/num*2*Math.PI )
        c.p1.y += cy
        c.p1.z += -1.0*Math.cos( (sel+1)/num*2*Math.PI )
        c.p2.x += 1.0*Math.sin( (sel+1)/num*2*Math.PI )
        c.p2.y += cy
        c.p2.z += -1.0*Math.cos( (sel+1)/num*2*Math.PI )
    }

    ret.addAll( tetra )

    val icb = 0.1
    val icosa = arrayListOf<Line>()
    val vtx = arrayListOf<Vector>()
    val phi = (1+Math.sqrt(5.0))/2.0

    for( i in 0..1 ) for( j in 0..1 )
    {
        val s1 = if( i == 0 ) -1 else 1
        val s2 = if( j == 0 ) -1 else 1

        vtx.add( Vector( icb*s1, icb*s2*phi, 0.0 ) )
        vtx.add( Vector( 0.0, icb*s1, icb*s2*phi ) )
        vtx.add( Vector( icb*s2*phi, 0.0, icb*s1 ) )
    }

    for( i in 0..11 ) for( j in i+1..11 ) if( Math.abs( dist( vtx[i], vtx[j] ) - icb*2.0 ) <= 0.001 )
        icosa.add( Line( vtx[i], vtx[j] ) )

    for( c in icosa )
    {
        c.p1 = rot( c.p1, 0.0, tim, tim )
        c.p2 = rot( c.p2, 0.0, tim, tim )

        c.p1.x += 1.0*Math.sin( (sel+2)/num*2*Math.PI )
        c.p1.y += cy
        c.p1.z += -1.0*Math.cos( (sel+2)/num*2*Math.PI )
        c.p2.x += 1.0*Math.sin( (sel+2)/num*2*Math.PI )
        c.p2.y += cy
        c.p2.z += -1.0*Math.cos( (sel+2)/num*2*Math.PI )
    }

    ret.addAll( icosa )

    val ocb = 0.15
    val octa = arrayListOf<Line>()
    vtx.clear()
    vtx.add( Vector( -ocb, 0.0, 0.0 ) )
    vtx.add( Vector( ocb, 0.0, 0.0 ) )
    vtx.add( Vector( 0.0, -ocb, 0.0 ) )
    vtx.add( Vector( 0.0, ocb, 0.0 ) )
    vtx.add( Vector( 0.0, 0.0, -ocb ) )
    vtx.add( Vector( 0.0, 0.0, ocb ) )

    for( i in 0..5 ) for( j in i+1..5 )
    {
        if( Math.abs( dist( vtx[i], vtx[j] ) - ocb*Math.sqrt(2.0) ) <= 0.001 )
            octa.add( Line( vtx[i], vtx[j] ) )
    }

    for( c in octa )
    {
        c.p1 = rot( c.p1, 0.0, tim, tim )
        c.p2 = rot( c.p2, 0.0, tim, tim )

        c.p1.x += 1.0*Math.sin( (sel+3)/num*2*Math.PI )
        c.p1.y += cy
        c.p1.z += -1.0*Math.cos( (sel+3)/num*2*Math.PI )
        c.p2.x += 1.0*Math.sin( (sel+3)/num*2*Math.PI )
        c.p2.y += cy
        c.p2.z += -1.0*Math.cos( (sel+3)/num*2*Math.PI )
    }

    ret.addAll( octa )

    val dodb = 0.1
    val Rad = Math.PI/180.0
    val po = 36.0/180.0*Math.PI
    val dodeca = arrayListOf<Line>()
    vtx.clear()
    /*vtx.add( Vector( dodb, 0.0, 0.0 ) )
    vtx.add( Vector( dodb*Math.cos(po*2), dodb*Math.sin(po*2), 0.0 ) )
    vtx.add( Vector( -dodb*Math.cos(po), dodb*Math.sin(po), 0.0 ) )
    vtx.add( Vector( -dodb*Math.cos(po), -dodb*Math.sin(po), 0.0 ) )
    vtx.add( Vector( dodb*Math.cos(po*2), -dodb*Math.sin(po*2), 0.0 ) )
    vtx.add( Vector( dodb*phi, 0.0, dodb ) )
    vtx.add( Vector( dodb*phi*Math.cos(po*2), dodb*phi*Math.sin(po*2), dodb ) )
    vtx.add( Vector( -dodb*phi*Math.cos(po), dodb*phi*Math.sin(po), dodb ) )
    vtx.add( Vector( -dodb*phi*Math.cos(po), -dodb*phi*Math.sin(po), dodb ) )
    vtx.add( Vector( dodb*phi*Math.cos(po*2), -dodb*phi*Math.sin(po*2), dodb ) )
    vtx.add( Vector( dodb*phi*Math.cos(po), dodb*phi*Math.sin(po), dodb*phi ) )
    vtx.add( Vector( -dodb*phi*Math.cos(po*2), dodb*phi*Math.sin(po*2), dodb*phi ) )
    vtx.add( Vector( -dodb*phi, 0.0, dodb*phi ) )
    vtx.add( Vector( -dodb*phi*Math.cos(po*2), -dodb*phi*Math.sin(po*2), dodb*phi ) )
    vtx.add( Vector( dodb*phi*Math.cos(po), -dodb*phi*Math.sin(po), dodb*phi ) )
    vtx.add( Vector( -dodb, 0.0, dodb*(phi+1.0) ) )
    vtx.add( Vector( -dodb*phi*Math.cos(po*2), -dodb*phi*Math.sin(po*2), dodb*(phi+1.0) ) )
    vtx.add( Vector( dodb*phi*Math.cos(po), -dodb*phi*Math.sin(po), dodb*(phi+1.0) ) )
    vtx.add( Vector( dodb*phi*Math.cos(po), dodb*phi*Math.sin(po), dodb*(phi+1.0) ) )
    vtx.add( Vector( -dodb*phi*Math.cos(po*2), dodb*phi*Math.sin(po*2), dodb*(phi+1.0) ) )*/

    for( i in 0..19 )
    {
        if( i <= 4 )
            vtx.add( Vector( dodb*Math.cos( (18+i*72)*Rad ), dodb*Math.sin( (18+i*72)*Rad ), dodb*(Math.sqrt(5.0)+3)/4 ) )
        else if( i <= 9 )
            vtx.add( Vector( dodb*phi*Math.cos( (18+i*72)*Rad ), dodb*phi*Math.sin( (18+i*72)*Rad ), dodb*(Math.sqrt(5.0)-1)/4 ) )
        else if( i <= 14 )
            vtx.add( Vector( dodb*phi*Math.cos( (54+i*72)*Rad ), dodb*phi*Math.sin( (54+i*72)*Rad ), -dodb*(Math.sqrt(5.0)-1)/4 ) )
        else if( i <= 19 )
            vtx.add( Vector( dodb*Math.cos( (54+i*72)*Rad ), dodb*Math.sin( (54+i*72)*Rad ), -dodb*(Math.sqrt(5.0)+3)/4 ) )
    }

    for( i in 0..19 ) for( j in i+1..19 )
    {
        if( Math.abs( dist( vtx[i], vtx[j] ) - dodb*Math.sqrt((5.0-Math.sqrt(5.0))/2.0) ) <= 0.001 )
            dodeca.add( Line( vtx[i], vtx[j] ) )
    }

    for( c in dodeca )
    {
        c.p1 = rot( c.p1, 0.0, tim, tim )
        c.p2 = rot( c.p2, 0.0, tim, tim )

        c.p1.x += 1.0*Math.sin( (sel+4)/num*2*Math.PI )
        c.p1.y += cy
        c.p1.z += -1.0*Math.cos( (sel+4)/num*2*Math.PI )
        c.p2.x += 1.0*Math.sin( (sel+4)/num*2*Math.PI )
        c.p2.y += cy
        c.p2.z += -1.0*Math.cos( (sel+4)/num*2*Math.PI )
    }

    ret.addAll( dodeca )


    return ret
}

fun morph( f: Double, t: Double, d: Double ) = f+(t-f)/d

var tim = 0.0

fun render()
{
    window.requestAnimationFrame { t ->
        ++tim

        ctx.canvas.width = window.innerWidth
        ctx.canvas.height = window.innerHeight

        ctx.fillStyle = "#282828"
        ctx.fillRect( 0.0, 0.0, width.toDouble(), height.toDouble() )

        ctx.lineWidth = 2.0

        lines = initLines( tim/100.0 )
        sel = morph( sel, tosel, 30.0 )

        for( l in lines )
        {
            val fl = l.p1.z > 0.0 || l.p2.z > 0.0
            val p1 = persp( l.p1 )
            val p2 = persp( l.p2 )

            /*if( fl )
                ctx.strokeStyle = "rgba(255,255,255,0.2)"
            else*/
                ctx.strokeStyle = "#ffffff"

            ctx.beginPath()

            ctx.moveTo( width/2+width*3/8*p1.x, height/2+width*3/8*p1.y )
            ctx.lineTo( width/2+width*3/8*p2.x, height/2+width*3/8*p2.y )

            ctx.closePath()
            ctx.stroke()
        }

        ctx.fillStyle = "#ffffff"
        ctx.font = "normal 60px 'Yu Gothic'"

        var toselM = tosel
        while( toselM < 0 )
            toselM += num

        ctx.fillText( pName[(toselM%num).toInt()], 20.0, 70.0 )
        ctx.fillText( "Press ← / → Key!!", 20.0, 140.0 )

        render()
    }

    window.addEventListener( "keyup", { keyUp(it) }, true )
}

fun keyUp( e: Event )
{
    val ek = e as KeyboardEvent
    var k = ek.keyCode

    when(k)
    {
        // Right
        39 -> --tosel
        // Left
        37 -> ++tosel
    }
}