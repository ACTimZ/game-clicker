let btn = document.querySelector(".btn-js");
let p1 = document.querySelector(".p1");
let p2 = document.querySelector(".p2");
let points_p = document.querySelector(".points-count");

let points_sum;

let points_from_ls = localStorage.getItem("points")

if(points_from_ls > 0) {
  points_sum = points_from_ls
} else {
  points_sum = 0
  localStorage.setItem("points", points_sum)
}


let dialog_timer_clicker = document.querySelector("#dialog_timer_clicker");

let timer_s = 0;
let timer_ms = 9;

document.addEventListener("DOMContentLoaded", () => {
    p1.innerHTML = timer_s
    dialog_timer_clicker.setAttribute("hidden", "");
  points_p.innerHTML = localStorage.getItem("points");
});

btn.addEventListener("click", () => {
  timerAfterClickAndAddPointsAfterClick(timer_s);
});

function timerAfterClickAndAddPointsAfterClick(seconds) {
  let fix_seconds_in_function = seconds;
  let full_timer = (seconds * 1000) + 900

  let points_in_fn = JSON.parse(localStorage.getItem("points")) + 1
  localStorage.setItem("points", points_in_fn)

  points_p.innerHTML = points_in_fn;
  dialog_timer_clicker.removeAttribute("hidden");
  btn.setAttribute("disabled", true);

  let a = setInterval(() => {
    if (fix_seconds_in_function >= 1) {
      p1.innerHTML = fix_seconds_in_function - 1;
      --fix_seconds_in_function;
    } else {
      fix_seconds_in_function = seconds;
      p1.innerHTML = fix_seconds_in_function;
    }
  }, 1000);

  let b = setInterval(() => {
    if (timer_ms >= 1) {
      p2.innerHTML = timer_ms - 1;
      --timer_ms;
    } else {
      timer_ms = 9;
      p2.innerHTML = timer_ms;
    }
  }, 100);

  setTimeout(() => {
    clearInterval(a);
    clearInterval(b);
    timer_ms = 9;
    fix_seconds_in_function = seconds;
    p1.innerHTML = seconds;
    p2.innerHTML = 9;
    btn.removeAttribute("disabled");
    dialog_timer_clicker.setAttribute("hidden", "");
  }, full_timer);
}
