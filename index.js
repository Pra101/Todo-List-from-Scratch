function rand(){
    let r = (Math.random() + 1).toString(36).substring(7);
    return r;
}
document.getElementById("myBtn").addEventListener("click", adder);
document.getElementById("clear_").addEventListener("click",clear__);
function Delete_local(button, i) {
    localStorage.removeItem(button.className);
    sessionStorage.setItem('i_reload',true);
    reload_reload();
}
function clear__(){
    localStorage.clear();
    sessionStorage.setItem('i_reload',true);
    reload_reload();
}
function dtt(dt){
    var da=dt.toLocaleDateString('en-US');
    return da;
}
function add_ele(Title,disp,dt,key){
    var ele=document.getElementById("new_items");
    var stpar=document.createElement("div");
    stpar.id="_block";
    var par=document.createElement("h4");
    var node=document.createTextNode(Title+": "+dt);
    par.appendChild(node);
    stpar.appendChild(par);
    par=document.createElement("p");
    node=document.createTextNode(disp);
    stpar.appendChild(node);
    let btn = document.createElement("button");
    btn.innerHTML = "Delete";
    btn.id = "delete_";
    btn.className = key;
    document.body.appendChild(btn);
    stpar.appendChild(btn);
    ele.appendChild(stpar);
}
function adder(){
    var tit= document.getElementById('titl').value;
    if(tit==""){
	alert("Title cannot be Empty!!");
	sessionStorage.setItem('i_reload',true);
	reload_reload();
	return;
    }
    var da=dtt(new Date());
    var dis= document.getElementById('disp').value;
    var obj={title:tit,discription:dis,dt:da};
    localStorage.setItem(rand(),JSON.stringify(obj));
    //abhove forget to write .json
    sessionStorage.setItem('i_reload',true);
    reload_reload();
}
function allStorage() {
    var values = [],
        keys = Object.keys(localStorage),
        i = keys.length;
    while ( i-- ) {
        values.push( localStorage.getItem(keys[i]) );
    }
    return values;
}
// study more about location.reload etc
function parse_values(){
    var values = allStorage(),keys = Object.keys(localStorage),i = keys.length;
    values.reverse();
    while ( i-- ) {
	var e=JSON.parse(values[i]);
	localStorage.setItem(keys[i],values[i]);
	add_ele(e['title'],e['discription'],e['dt'],keys[i]);
    }
}
function reload_reload(){
    var ss= sessionStorage.getItem('i_reload');
    if(ss=='true'){
	sessionStorage.setItem('i_reload',false);
	location.reload();
    }
    if(ss==null||ss==='false'){
	parse_values();
    }
}
reload_reload();
// because i was able to save key as className in button tags
var buttons = document.getElementsByTagName("button"); //gets nodelist
for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", function() {
    Delete_local(this, i);
  }, false);
}
