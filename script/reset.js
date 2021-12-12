let nowDates = new Date();

let dateNow = nowDates.getDate();
let monthNow = nowDates.getMonth();
let yearNow = nowDates.getFullYear();

let inp_date = document.getElementById('inp_date');
let inp_month = document.getElementById('inp_month');
let inp_year = document.getElementById('inp_year');

let factoryReset = document.querySelector('.FactoryReset');
let resetAll = document.querySelector('.ResetAll');

inp_date.value = dateNow;
inp_month.value = monthNow;
inp_year.value = yearNow;

factoryReset.addEventListener('click', () => {
    inp_date.value = dateNow;
    inp_month.value = monthNow;
    inp_year.value = yearNow;
});

resetAll.addEventListener('click', () => {
    inp_date.value = null;
    inp_month.value = null;
    inp_year.value = null;
})