function laNamNhuan(nYear) {
    if ((nYear % 4 == 0 && nYear % 100 != 0) || nYear % 400 == 0) {
        return true;
    }
    return false;
}

function tinhSoNgayTrongThang(nMonth, nYear) {
    let nNumOfDays = 30;

    switch (nMonth) {
        case 1:
        case 3:
        case 5:
        case 7:
        case 8:
        case 10:
        case 12:
            nNumOfDays = 31;
            break;
        case 4:
        case 6:
        case 9:
        case 11:
            nNumOfDays = 30;
            break;
        case 2:
            if (laNamNhuan(nYear)) {
                nNumOfDays = 29;
            }
            else {
                nNumOfDays = 28;
            }
            break;
    }

    return nNumOfDays;
}

function laNgayHopLe(nDay, nMonth, nYear) {
    let bResult = true; // Giả sử ngày hợp lệ

    // Kiểm tra năm
    if (!(nYear > 0 && nMonth)) {
        bResult = false; // Ngày không còn hợp lệ nữa!
    }

    // Kiểm tra tháng
    if (!(nMonth >= 1 && nMonth <= 12)) {
        bResult = false; // Ngày không còn hợp lệ nữa!
    }

    // Kiểm tra ngày
    if (!(nDay >= 1 && nDay <= tinhSoNgayTrongThang(nMonth, nYear))) {
        bResult = false; // Ngày không còn hợp lệ nữa!
    }

    return bResult; // Trả về trạng thái cuối cùng...
}

function timNgayHomTruoc(nDay, nMonth, nYear) {
    nDay--;
    if (nDay < 1) { 
        nMonth--;
        nDay = tinhSoNgayTrongThang(nMonth, nYear); 
        if (nMonth < 1) {
            nMonth = 12;
            nYear--;
        }
    }
    return [nDay, nMonth, nYear];
}

function getDateTime() {
    let time = new Date();
    let month0x = '';
    let day0x = '';

    if (time.getMonth() < 9) {
        month0x = '0';
    }

    if (time.getDay() < 10) {
        day0x = '0';
    }
    let time_get = time.getFullYear() + '-'  + (time.getMonth() + 1) + '-'  + time.getDate() + '-' + time.getDay();
    console.log(time_get)
    return time_get;
}
function parserDateTime(datetimearr)
{
    let datetimestring = '';
    let yeartemp, monthtemp, datetemp;
    let resultparse = [];
    for (let i =0; i< datetimearr.length; i++)
    {
        datetemp = datetimearr[i][0];
        monthtemp = datetimearr[i][1];
        yeartemp = datetimearr[i][2];
        if(datetemp<10)
        {
            datetemp = '0' + datetemp;
        }
        if(monthtemp < 10)
        {
            monthtemp = '0' + monthtemp;
        }
        datetimestring = yeartemp + '-' + monthtemp + '-' + datetemp;
        resultparse.push(datetimestring);
    }

    return resultparse;
}
module.exports.getSevenDay = function() {
    let time = getDateTime();

    time = time.split('-');
    let year = time[0];
    let month = time[1];
    let date = time[2];
    let day = time[3];

    let ngayhomtruoc = timNgayHomTruoc(date, month, year);
    let result = [];
    result.push(ngayhomtruoc);
    let yeartemp, monthtemp, datetemp;
    let length = 0;
    let i = 0;
    while (i < day - 1) {

        length = result.length - 1;

        yeartemp = result[length][2];
        monthtemp = result[length][1];
        datetemp = result[length][0];

        ngayhomtruoc = timNgayHomTruoc(datetemp, monthtemp, yeartemp);
        result.push(ngayhomtruoc)
        i++;
    }

    let resultfinal  = parserDateTime(result);
    return resultfinal;

}