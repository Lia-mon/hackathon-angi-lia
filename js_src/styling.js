function updateSize(){
  const new_size = document.getElementById("c_size").value;
  const r = document.querySelector(':root');

  r.style.setProperty("--cell-size",new_size.toString() +"px");
  r.style.setProperty("--cell-margin",Math.round(0.16*new_size).toString() +"px");
  r.style.setProperty("--cell-font",Math.round(0.45*new_size).toString() +"px");
}
