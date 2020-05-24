var globalValue = 0; //can be accessed and changed as window.globalValue
let arr = [];

const form = document.querySelector("form");
const input = document.querySelector("#inp");
const submit = document.querySelector("#submit");
const cont = document.querySelector(".cont");
const custom2 = document.querySelector(".custom2");
const home = document.querySelector("#home");

arr.push(document.querySelector("#mult"));
arr.push(document.querySelector("#Single"));
arr.push(document.querySelector("#Prime"));
arr.push(document.querySelector("#Arm"));
arr.push(document.querySelector("#Sum"));
arr.push(document.querySelector("#Pal"));
arr.push(document.querySelector("#Rev"));

//utility function to delete all children of a particular element
function deleteChild() {
  var child = cont.lastElementChild;
  while (child) {
    cont.removeChild(child);
    child = cont.lastElementChild;
  }
}

for (let i = 0; i < arr.length; i++) {
  arr[i].addEventListener("click", (event) => {
    window.globalValue = arr.indexOf(arr[i]);
    custom2.classList.remove("hidden");
    form.classList.remove("hidden");
    deleteChild();
  });
}

/*********************************************************************************************************/

const multiplicationTable = () => {
  let mulval;
  var multab = [];
  mulval = input.value;
  mulval = parseInt(mulval);

  if (isNaN(mulval)) {
    alert("Please enter a valid number !");
    form.classList.remove("hidden");
    return;
  }

  for (let i = 1; i <= 10; i++) {
    multab.push(`${mulval} X ${i} = ${mulval * i}`);
  }

  for (m of multab) {
    var div = document.createElement("h1");
    div.classList.add("bg-warning");
    div.style.textAlign = "center";
    div.classList.add("text-black");
    div.classList.add("container");
    div.innerText = m;

    cont.appendChild(div);
  }

  multab = [];
};

/*********************************************************************************************************/
SingleDigitSum = () => {
  let n = input.value;
  n = parseInt(n);

  if (isNaN(n) || n < 1) {
    alert("Please enter a valid number grater than 0 ");
    form.classList.remove("hidden");
    return;
  }
  var arr = n.toString(10).replace(/\D/g, "0").split("").map(Number);
  const sum = arr.reduce((accum, currval) => {
    return accum + currval;
  }, 0);

  var div = document.createElement("h1");
  div.classList.add("bg-primary");
  div.classList.add("text-white");
  div.classList.add("jumbotron");
  div.style.marginTop = "13%";
  div.innerText = `The sum of digits of ${n} is ${sum}`;
  cont.appendChild(div);
};

/********************************************************************************************************/
const AllFactors = () => {
  let n = input.value;
  n = parseInt(n);

  if (isNaN(n) || n < 1) {
    alert("Please enter a valid number greater than 0");
    form.classList.remove("hidden");
    return;
  }
  var num_factors = [],
    i;

  for (i = 1; i <= Math.floor(Math.sqrt(n)); i += 1)
    if (n % i === 0) {
      num_factors.push(i);
      if (n / i !== i) num_factors.push(n / i);
    }
  num_factors.sort(function (x, y) {
    return x - y;
  }); // numeric sort

  var div = document.createElement("h1");
  div.classList.add("bg-dark");
  div.classList.add("text-white");
  div.classList.add("jumbotron");
  div.style.marginTop = "13%";

  div.innerText = `The factors of  ${n} are : ${num_factors}`;

  cont.appendChild(div);
};

/********************************************************************************************************/
const PrimeFactors = () => {
  let num = input.value;
  num = parseInt(num);
  let fin = num;

  if (isNaN(num) || num < 1) {
    alert("Please enter a valid number greater than 0");
    form.classList.remove("hidden");
    return;
  }
  function is_prime(num) {
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) return false;
    }
    return true;
  }
  const result = [];
  for (let i = 2; i <= num; i++) {
    while (is_prime(i) && num % i === 0) {
      if (!result.includes(i)) result.push(i);
      num /= i;
    }
  }
  var div = document.createElement("h1");
  div.classList.add("bg-secondary");
  div.classList.add("text-white");
  div.classList.add("jumbotron");
  div.style.marginTop = "13%";

  if (result.length > 1)
    div.innerText = `The prime factors of  ${fin} are : ${result}`;
  else div.innerText = `The prime factor of  ${fin} is : ${result}`;

  cont.appendChild(div);
};

/**********************************************************************************************************/
const Armstrong = () => {
  let n = input.value;
  n = parseInt(n);

  if (isNaN(n) || n < 1) {
    alert("Please enter a valid number greater than 0");
    form.classList.remove("hidden");
    return;
  }
  var arr = n.toString(10).replace(/\D/g, "0").split("").map(Number);

  const sum = arr.reduce((accum, currval) => {
    return accum + Math.pow(currval, 3);
  },0);

  var div = document.createElement("h1");
  div.classList.add("bg-danger");
  div.classList.add("text-white");
  div.classList.add("jumbotron");
  div.style.marginTop = "13%";
  div.innerText = `The Armstrong value of  ${n} is ${sum}`;
  cont.appendChild(div);
};

/**********************************************************************************************************/
const Pallindrome = () => {
  let str = input.value;
  var len = str.length;
  var mid = Math.floor(len / 2);

  for (var i = 0; i < mid; i++) {
    if (str[i] !== str[len - 1 - i]) {
      var div = document.createElement("h1");
      div.innerText = `No, the given string ${str} is not a pallindrome`;
      div.classList.add("bg-danger");
      div.classList.add("text-white");
      div.classList.add("jumbotron");

      div.style.marginTop = "13%";
      cont.appendChild(div);
      return;
    }
  }

  var div = document.createElement("h1");
  div.innerText = `Yes, the given string ${str} is a pallindrome`;
  div.classList.add("bg-success");
  div.classList.add("text-white");
  div.classList.add("jumbotron");
  div.style.marginTop = "13%";
  cont.appendChild(div);
};

/***********************************************************************************************************/
const ReverseIt = () => {
  let n = input.value;
  n = n + "";
  let rev = n.split("").reverse().join("");
  var div = document.createElement("h1");
  div.innerText = `The reverse of ${n} is ${rev}`;
  div.classList.add("bg-primary");
  div.classList.add("text-white");
  div.classList.add("jumbotron");
  div.style.marginTop = "13%";
  cont.appendChild(div);
};

/***********************************************************************************************************/

// array of operation functions
funcarr = [
  multiplicationTable,
  SingleDigitSum,
  PrimeFactors,
  Armstrong,
  AllFactors,
  Pallindrome,
  ReverseIt,
];

//submit buton event listener
submit.addEventListener("click", () => {
  event.preventDefault();
  form.classList.add("hidden");
  console.log(window.globalValue);
  funcarr[window.globalValue]();
});

home.addEventListener("click", () => {
  custom2.classList.add("hidden");
});
