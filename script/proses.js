function hitung() {
    var inp_year = document.getElementById("inp_year").value;
    var inp_month = document.getElementById("inp_month").value;
    var inp_date = document.getElementById("inp_date").value;
    
    let dateNow = new Date();
    var inp_hours = dateNow.getHours();
    var inp_minutes = dateNow.getMinutes();
    var inp_seconds = dateNow.getSeconds();
    var inp_milliseconds = dateNow.getMilliseconds()

    let waktuTarget = new Date(parseInt(inp_year), parseInt(inp_month), parseInt(inp_date), inp_hours, inp_minutes, inp_seconds, inp_milliseconds).getTime();
    
    let waktuNow = dateNow.getTime();
    let selisih = waktuTarget - waktuNow;

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
    
    if (inp_date == "" || inp_month == "" || inp_year == "") {
        output = `Input Waktu Dengan Benar`
    } else if (kondisi == 0) {
        output = `Now`
    }else{
        output = `${outYear} ${outMonth} ${outDay} ${kondisiAkhir}`
    }

    document.querySelector('.display').innerHTML = output

}
setInterval(hitung, 225)