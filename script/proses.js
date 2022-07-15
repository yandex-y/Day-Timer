// Variabel
//from HTML
const inp = [
    document.getElementById('inp_date'),
    document.getElementById('inp_month'),
    document.getElementById('inp_year'),
    document.getElementById('label')
]
const btn_reset_inp_to_now = document.getElementById('reset-inp-to-now');
const btn_reset_inp_all = document.getElementById('reset-inp-all');
const btn_update = document.getElementById('update-data');
const btn_expand = document.getElementById('expand');
const container_expand = document.querySelector('.container-expand');
const container_expand_list = document.querySelector('div.container-expand-list');
const box_search_items = document.getElementById('box-search-items');
const btn_del_all_items = document.getElementById('btn-del-all-items');
const btn_hide_item = document.getElementById('hide-item');
const txt_total_item = document.getElementById('txt-total-item')

//for JS
const str_bulan = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];



// Event Listener
btn_reset_inp_all.addEventListener('click', () => {
    disp_result(false, true)
});
btn_reset_inp_to_now.addEventListener('click', () => {
    disp_result(true)
})
btn_update.addEventListener('click', () => {
    update(hitung(inp[2], inp[1], inp[0], inp[3], true))
})
inp[0].addEventListener('input', () => {
    validasiLengthInp(inp[0], 2)
    disp_result()
})
inp[1].addEventListener('change', () => {
    disp_result()
})
inp[2].addEventListener('input', () => {
    validasiLengthInp(inp[2], 4)
    disp_result()
})
btn_expand.addEventListener('click', expandElement)
inp[3].addEventListener('input', (e) => {
    validasiLengthInp(e.target, 25)
})



// Run Function
disp_result(true)



// Function

function hitung(y, m, d, l, from) {

    let year
    let month
    let date
    let label

    if (from) {
        year = y
        month = m
        date = d
        label = l
    } else {
        year = parseInt(validasiLengthInp(y, 4));
        month = parseInt(m.value);
        date = parseInt(validasiLengthInp(d, 2));
        label = validasiLengthInp(l, 25);
    }

    const waktuTarget = new Date(year,
        month,
        date,
        new Date().getHours(),
        new Date().getMinutes(),
        new Date().getSeconds(),
        new Date().getMilliseconds()).getTime();
    const waktuNow = new Date().getTime()
    const selisih = waktuTarget - waktuNow;
    const selisihHari = () => Math.sign(selisih) == 1 ? [Math.ceil(selisih / 1000 / 60 / 60 / 24),
        " Lagi"]: [Math.ceil(selisih * -1 / 1000 / 60 / 60 / 24),
        " Yang Lalu"]
    let tahun;
    let bulan;
    let hari;
    const dateArr = [
        tahun = Math.floor(selisihHari()[0] / 30 / 12),
        bulan = Math.floor(selisihHari()[0] / 30 - (tahun * 12)),
        hari = selisihHari()[0] - (bulan * 30) - (tahun * 12 * 30)
    ];
    const dateStr = [" Tahun",
        " Bulan",
        " Hari"];
    let str = "";

    dateArr.forEach((x, i) => {
        x != 0 ? str += x + dateStr[i] + " ": undefined
        i+1 == dateArr.length ? str += selisihHari()[1]: undefined
    })

    if (year.toString().includes('NaN') || date.toString().includes('NaN') || month.toString().includes('NaN')) {
        output = `Input Waktu Dengan Benar`;
    } else if (selisih == 0) {
        output = `Today`
    } else {
        output = str
    }

    return [output,
        year,
        month,
        date,
        label]
}

function disp_result(Default, Null) {
    let result;
    const getTime = new Date();

    if (Default) {
        inp[2].value = getTime.getFullYear();
        inp[1].value = getTime.getMonth();
        inp[0].value = getTime.getDate();
        inp[3].value = null
    } else if (Null) {

        inp.forEach(x => {
            x.value = null
        })
    }

    result = hitung(inp[2], inp[1], inp[0], inp[3])[0]
    document.querySelector('.display').innerHTML = result
}

function update(x) {

    const ls = localStorage.getItem('day timer')

    const year = x[1].value;
    const month = x[2].value;
    const date = x[3].value;
    let label = x[4].value

    if (ls == null) {
        localStorage.setItem('day timer', '[]')
    }
    if (label.trim().length == 0) {
        label = 'note'
    }
    const data = getDataFromLS()

    if (inp[0].value.length == 0 || inp[1].value.length == 0 || inp[2].value.length == 0) {
        alert('Update Gagal')
    } else {
        data.push({
            'label': label,
            'year': year,
            'month': month,
            'date': date,
            'id': makeId(data)
        })
        updateDataToLS(data)
        alert('Sukses Di Update')
        showHiddenItem()
        inp[3].value = null

    }

}

function innerHTMLExpand(fullData) {

    if (fullData === null || fullData.length == 0) {
        txt_total_item.innerHTML = ''
        container_expand_list.innerText = 'Tidak Ada Data'

    } else {
        const data = fullData;

        container_expand_list.innerText = ''

        data.sort((b, a) => {
            return new Date(b.year, b.month, b.date).getTime() - new Date(a.year, a.month, a.date).getTime()
        })

        txt_total_item.innerText = data.length + ' item'

        data.forEach((x, i) => {

            const div = document.createElement('div');
            const p = document.createElement('p');
            const p2 = document.createElement('p');
            const span = document.createElement('span');
            const txt = document.createTextNode(x.label);
            const txt2 = document.createTextNode(`${x.date} ${str_bulan[x.month]} ${x.year}`);
            const txt3 = document.createTextNode(`${hitung(x.year, x.month, x.date, x.label, true)[0]}`);

            checkBeforeOrAfter(x) ? div.classList.add('before'): undefined

            container_expand_list.appendChild(div);
            div.appendChild(p)
            p.appendChild(txt)
            p2.appendChild(txt2)
            div.appendChild(p2)
            div.appendChild(span)
            span.appendChild(txt3)

            div.addEventListener('click', () => {
                const confirm = window.confirm(`Apakah Anda Yakin Ingin Menghapus ${x.label}?`)
                confirm ? deleteItem(x.id): undefined
            })
        })
    }
}

function expandElement() {
    container_expand.classList.toggle('show');
    btn_expand_toggle()
}

function validasiLengthInp(x, maxLength) {
    x.value.length >= maxLength ? x.value = x.value.substr(0, maxLength) : undefined

    return x.value
}
function deleteItem(id, all) {

    let data = getDataFromLS()


    if (all) {
        const confirm = window.confirm('Apakah Anda Yakin Ingin Menghapus Semua Item?')

        if (confirm) {
            data = []
            alert('Berhasil Menghapus Semua Item')
        }
    } else {
        let index;
        data.forEach((x, i) => {
            x.id == id ? index = i: undefined
        })
        data.splice(index, 1)
    }

    updateDataToLS(data)
    showHiddenItem()
    runSearch(box_search_items)
}
function updateDataToLS(data) {
    localStorage.setItem('day timer',
        JSON.stringify(data))
}
function getDataFromLS() {
    return JSON.parse(localStorage.getItem('day timer'))
}

function btn_expand_toggle() {
    if (container_expand.className.includes('show')) {
        btn_expand.innerHTML = '&#8593;'
        
        showHiddenItem()
        
        box_search_items.addEventListener('input', () => {
            runSearch(box_search_items)
        })

        btn_del_all_items.addEventListener('click', () => {
            deleteItem(null, true)
        })
        
        btn_hide_item.addEventListener('click', () => {
            btn_hide_item.classList.toggle('hidden')
            showHiddenItem()
        })
    } else {
        btn_expand.innerHTML = '&#8595;'
    }
}

function runSearch(value) {
    const data = showHiddenItem();
    const newData = []


    data.forEach(x => {
        if (x.label.toLowerCase().includes(value.value.toLowerCase())) {
            newData.push(x)
        }
    })
    innerHTMLExpand(newData)
}

function makeId(data) {
    let newId = 0;
    let allid = [];
    
    data.forEach(x => {
        allid.push(x.id)
    })

    allid.sort().forEach(x => {
        x == newId ? newId++: undefined
    })

    return newId
}

function showHiddenItem() {
    
    let data = getDataFromLS();
    
    data === null || data.length == 0 ? data = [] : undefined
    
    if (btn_hide_item.className.includes('hidden')) {
        const newData = [];

        data.forEach(x => {
            !checkBeforeOrAfter(x) ? newData.push(x) : undefined
        })
        btn_hide_item.innerText = 'show'
        innerHTMLExpand(newData)
        return newData
    } else {
        btn_hide_item.innerText = 'hide'
        innerHTMLExpand(data)
        return data
    }
}

function checkBeforeOrAfter(x) {
    return new Date(x.year, x.month, x.date, 23, 59, 59, 999).getTime() - new Date().getTime() < 0 ? true: false
}