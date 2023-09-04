document.querySelector("#tone").play();
var p1 = 40, p2 = 40;
document.addEventListener("keydown", function (event) {
    // alert(event.key);
    if (event.key === "ArrowRight") {
        if (p1 < 80) {
            p1 += 10;
            document.querySelector(".slider-1").style.left = p1 + "%";
        }
    }
    else if (event.key === "ArrowLeft") {
        if (p1 > 0) {
            p1 -= 10;
            document.querySelector(".slider-1").style.left = p1 + "%";
        }
    }
    else if (event.key === "d") {
        if (p2 < 80) {
            p2 += 10;
            document.querySelector(".slider-2").style.left = p2 + "%";
        }
    }
    else if (event.key === "a") {
        if (p2 > 0) {
            p2 -= 10;
            document.querySelector(".slider-2").style.left = p2 + "%";
        }
    }
});

// document.querySelector("#ball").style.transform = "rotate(45deg)";


// finding points
function X2(x1, y1, y2, d) {
    return x1 + ((y2 - y1) / Math.tan(d * (Math.PI / 180)))
}

function Y2(x1, y1, x2, d) {
    return y1 + (Math.tan(d * (Math.PI / 180)) * (x2 - x1))
}
// finding valid point
function valid(x1, y1, x2, y2) {
    if (x2 >= 0 && x2 <= 364 && y2 <= -15 && y2 >= -550 && (x1 != x2 || y1 != y2)) {
        return 1;
    }
    else return false;
}


var x1, y1, x2, y2;
// var Q = Math.random() * 180 + 1;
var Q = 150, t = 2;
// x1, y1
var points = [0, -1, 364, -1, -1, -15, -1, -550];
x1 = 180;
y1 = -15;

var inc = 0.005;
setInterval(() => { inc -= 0.001 }, 15 * 1000);

async function q() {
    while (t > 0) {
        points[1] = Y2(x1, y1, points[0], Q);
        points[3] = Y2(x1, y1, points[2], Q);
        points[4] = X2(x1, y1, points[5], Q);
        points[6] = X2(x1, y1, points[7], Q);

        var fp_idx;

        for (var i = 0; i < 8; i += 2) {
            if (valid(x1, y1, points[i], points[i + 1]) == 1) {
                fp_idx = i;
            }
        }
        x2 = points[fp_idx];
        y2 = points[fp_idx + 1];

        // distace between two points
        function calculateDistance(x1, y1, x2, y2) {
            const deltaX = x2 - x1;
            const deltaY = y2 - y1;
            const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);
            return distance;
        }

        var dis = calculateDistance(x1, y1, x2, y2) * inc;
        document.querySelector("#ball").style.setProperty("--d", dis + "s");



        document.querySelector("#ball").style.transform = "translate(" + x2 + "px, " + -1 * y2 + "px)";
        await new Promise(r => setTimeout(r, dis * 999));
        // Game Conditions Verification ---------------------------------------------------------------
        if (y2 == -15) {
            var l = document.querySelector(".slider-1").offsetLeft - 30;
            var r = document.querySelector(".slider-1").offsetLeft + 80 + 30;
            if (x2 < l || x2 > r) {
                var x2_ = X2(x1, y1, 100, Q);

                var dis = calculateDistance(x1, y1, x2_, 100) * inc;
                document.querySelector("#ball").style.setProperty("--d", dis + "s");

                document.querySelector("#ball").style.transform = "translate(" + x2_ + "px, " + -1 * 100 + "px)";
                await new Promise(r => setTimeout(r, dis * 999));
                document.querySelector("#over").style.visibility = "visible";
                console.log("Game Over Player 1 ");
                break;
            }
        }

        else if (y2 == -550) {
            var l = document.querySelector(".slider-2").offsetLeft - 30;
            var r = document.querySelector(".slider-2").offsetLeft + 80 + 30;
            if (x2 < l || x2 > r) {
                var x2_ = X2(x1, y1, -650, Q);

                var dis = calculateDistance(x1, y1, x2_, -650) * inc;
                document.querySelector("#ball").style.setProperty("--d", dis + "s");

                document.querySelector("#ball").style.transform = "translate(" + x2_ + "px, " + -1 * -650 + "px)";
                await new Promise(r => setTimeout(r, dis * 999));
                document.querySelector("#over").style.visibility = "visible";
                console.log("Game Over Player 2");
                break;
            }
        }


        // ----------------------------------------------------------------------
        x1 = x2;
        y1 = y2;
        Q = 180 - Q;

    }
}
// }
// var txt = 0;
q();
// document.querySelector("#play").onclick = fun;



// q();

// var p=Math.floor(Math.random()*2);
// var y1=Math.floor(Math.random()*526);              // 0-525

// x1 = Math.floor(Math.random() * 366);              // 0-365
// if (x1 == 0 || x1 == 365) {
//     y1 = Math.floor(Math.random() * 526);
// }
// else {
//     var temp = Math.floor(Math.random() * 2);
//     y1 = temp ? 525 : 0;
// }


// var arr = [0, 364, 0, 525];
// var idx = Math.floor(Math.random() * 4);             // 0 1 2 3
// if (idx < 2) {
//     x1 = arr[idx];
//     y1 = Math.floor(Math.random() * 11) * 52.5;         // 0-10 *52.5
// }
// else {
//     y1 = arr[idx];
//     x1 = Math.floor(Math.random() * 11) * 36.4;         // 0-10 *36.5
// }

// document.querySelector("#ball").style.transform = "translate(" + x1 + "px" + "," + y1 + "px)";
