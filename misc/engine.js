var time = 2;
var timeInSec = time * 60;
var dis = Math.floor(new Date().getTime() / 1000 + timeInSec);
var d = time - 1;

function run() {
  var countDownDate = Math.floor(new Date().getTime() / 1000 + timeInSec);

  var x = setInterval(function () {
    var now = Math.floor(new Date().getTime() / 1000);
    var distance = countDownDate - now;
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / 60);
    var seconds = Math.abs(Math.floor((distance % (1000 * 60)) - d * 60));

    if (seconds === 0) {
      d--;
    }

    document.getElementById("demo").innerHTML = minutes + "m " + seconds + "s ";

    if (distance === 0) {
      clearInterval(x);
      document.getElementById("demo").innerHTML = "EXPIRED";
    }
  }, 1000);
}
document.getElementById("demo").innerHTML =
  (dis - (dis - timeInSec)) / 60 + "m " + "00" + "s ";
document.getElementById("start").addEventListener("click", run);
