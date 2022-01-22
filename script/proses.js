// Variabel
let x = () => new Date(),
inp_date = document.getElementById('inp_date'),
inp_month = document.getElementById('inp_month'),
inp_year = document.getElementById('inp_year'),
ResetToNow = document.querySelector('.ResetToNow'),
resetAll = document.querySelector('.ResetAll');

// Event Listener
ResetToNow.addEventListener('click', defaultInp);

resetAll.addEventListener('click', nullInp)

// Run Function 
defaultInp()

// Function
function defaultInp(){
    inp_date.value = x().getDate();
    inp_month.value = x().getMonth();
    inp_year.value = x().getFullYear();
}
function nullInp(){
    inp_date.value = null;
    inp_month.value = null;
    inp_year.value = null;
}
function hitung() {
    let waktuTarget = new Date(parseInt(inp_year.value), parseInt(inp_month.value), parseInt(inp_date.value),  x().getHours(), x().getMinutes(), x().getSeconds(), x().getMilliseconds()).getTime(),
    waktuNow = x().getTime(),
    selisih = waktuTarget - waktuNow;

    let toDay = selisih / 1000 / 60 / 60 / 24;
    let toMonth, toYear;
    let kondisi = Math.sign(selisih)

    let output, kondisiAkhir;

    if (kondisi == 1) {
        toMonth = Math.floor(toDay / 30);
        toYear = Math.floor(toMonth / 12)

        if (toMonth != 0) {
            toDay -= toMonth * 30
        }
        if (toYear != 0) {
            toMonth -= toYear * 12
        }
        kondisiAkhir = "Lagi"
    } else if (kondisi == -1) {
        toDay *= -1

        toMonth = Math.floor(toDay / 30);
        toYear = Math.floor(toMonth / 12)

        if (toMonth != 0) {
            toDay -= toMonth * 30
        }
        if (toYear != 0) {
            toMonth -= toYear * 12
        }
        kondisiAkhir = "Yang Lalu"

    }
    
    let outYear = toYear + " Tahun";
    let outMonth = toMonth + " Bulan";
    let outDay = toDay + " Hari";
    
    if(toYear==0){
        outYear = ""
    }
    if(toMonth==0){
        outMonth = ""
    }
    if(toDay==0){
        outDay = 0
    }
    
    if (inp_date.value == "" || inp_month.value == "" || inp_year.value == "") {
        output = `Input Waktu Dengan Benar`
    } else if (kondisi == 0) {
        output = `Now`
    }else{
        output = `${outYear} ${outMonth} ${outDay} ${kondisiAkhir}`
    }

    document.querySelector('.display').innerHTML = output

}
setInterval(hitung, 225)