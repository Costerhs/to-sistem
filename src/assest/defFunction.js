const setCookie = (name, value, days = 3) => {
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (JSON.stringify(value) || "") + expires + "; path=/";
}

const getCookie = (name) => {
    let value = "; " + document.cookie;
    let parts = value.split("; " + name + "=");
    if (parts.length == 2) return JSON.parse(parts.pop().split(";").shift());
}

const deleteCookie = (name) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
}

const getData = () => {
    let today = new Date();
    let formattedDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`
    return formattedDate
}

const getFilled = (obj) => {
    Object.entries(obj).map(el => {
        if (!el[1]) delete obj[el[0]]
    })
    return obj
}

export { setCookie, getCookie, deleteCookie, getData, getFilled }