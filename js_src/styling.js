//Sets the size of the unit square for displaying
function updateSize(){
  const new_size = document.getElementById("c_size").value;
  const r = document.querySelector(':root');

  r.style.setProperty("--cell-size",new_size.toString() +"px");
  r.style.setProperty("--cell-margin",Math.round(0.16*new_size).toString() +"px");
  r.style.setProperty("--cell-font",Math.round(0.45*new_size).toString() +"px");
}

//the switch for the 'switch all checkbox'
function toggle(source) {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  for (var i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i] != source)
          checkboxes[i].checked = source.checked;
  }
}