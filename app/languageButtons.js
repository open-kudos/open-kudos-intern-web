function ltButton () {
    document.getElementById('ltButton').className = 'btn btn-sm hidden';
    document.getElementById('enButton').className = 'btn btn-sm';
}
function enButton () {
    document.getElementById('enButton').className = 'btn btn-sm hidden';
    document.getElementById('ltButton').className = 'btn btn-sm';
}
function getCookie(name)
{
    var re = new RegExp(name + "=([^;]+)");
    var value = re.exec(document.cookie);
    return (value != null) ? unescape(value[1]) : null;
}
