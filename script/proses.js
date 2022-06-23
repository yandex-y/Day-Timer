// Variabel
let x = () => new Date(),
inp = [document.getElementById('inp_date'),document.getElementById('inp_month'),document.getElementById('inp_year')],
ResetToNow = document.querySelector('.ResetToNow'),
resetAll = document.querySelector('.ResetAll');

// Event Listener
ResetToNow.addEventListener('click', defaultInp);
resetAll.addEventListener('click', nullInp);

inp[0].addEventListener('keyup',() => {
    hitung(inp[2].value,inp[1].value,inp[0].value)
})
inp[1].addEventListener('change',() => {
    hitung(inp[2].value,inp[1].value,inp[0].value)
})
inp[2].addEventListener('keyup',() => {
    hitung(inp[2].value,inp[1].value,inp[0].value)
})

// Run Function 
defaultInp()
hitung(inp[2].value,inp[1].value,inp[0].value)

// Function
function defaultInp(){
    inp[0].value = x().getDate();
    inp[1].value = x().getMonth();
    inp[2].value = x().getFullYear();
    hitung(inp[2].value,inp[1].value,inp[0].value)
    
}
function nullInp(){
    inp[0].value = null;
    inp[1].value = null;
    inp[2].value = null;
    hitung(inp[2].value,inp[1].value,inp[0].value)
}
function hitung(year,month,date) {
    
    //variabel
    let waktuTarget = new Date(parseInt(year), parseInt(month), parseInt(date),  x().getHours(), x().getMinutes(), x().getSeconds(), x().getMilliseconds()).getTime(),
    waktuNow = x().getTime(),
    selisih = waktuTarget - waktuNow,
    selisihHari = function (){
        if (Math.sign(selisih) == 1) {
            return [Math.ceil(selisih / 1000 / 60 / 60 / 24), " Lagi"]
        }else {
            return [Math.ceil(selisih * -1 / 1000 / 60 / 60 / 24), " Yang Lalu"]
        }
    },
    tahun,bulan,hari,
    dateArr = [
        tahun = Math.floor(selisihHari()[0] / 30 / 12),
        bulan = Math.floor(selisihHari()[0] / 30 - (tahun * 12)),
        hari = selisihHari()[0] - (bulan * 30) - (tahun * 12 * 30)
        ],
        dateStr = [" Tahun"," Bulan"," Hari"],
        num = 0,
        str = "";
        
        
        dateArr.forEach((x) => {
            
            if(x != 0){
                str += x + dateStr[num] + " "
            }
            num++
        })

        str += selisihHari()[1]
        
        
        
        if (year == "" || month == "" || date == "") {
        output = `Input Waktu Dengan Benar`
    } else if (selisih == 0) {
        output = `Now`
    }else{
        output = str
    }

    document.querySelector('.display').innerHTML = output

}