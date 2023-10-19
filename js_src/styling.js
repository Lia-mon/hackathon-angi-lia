//Sets the size of the unit square for displaying
function updateSize(){
  const newSize = document.getElementById("c_size").value;

  document.documentElement.style.setProperty("--cell-size",newSize.toString() +"px");
  document.documentElement.style.setProperty("--cell-margin",Math.round(0.16*newSize).toString() +"px");
  document.documentElement.style.setProperty("--cell-font",Math.round(0.45*newSize).toString() +"px");
}

function setSize(newSize){
  //const newSize = document.getElementById("c_size").value;

  document.documentElement.style.setProperty("--cell-size",newSize.toString() +"px");
  document.documentElement.style.setProperty("--cell-margin",Math.round(0.16*newSize).toString() +"px");
  document.documentElement.style.setProperty("--cell-font",Math.round(0.45*newSize).toString() +"px");
}

//the switch for the 'switch all checkbox'

function toggle(target) {
  value = target.checked;
  //if I already know what to target then target that >_<
  const checkboxes = target.parentElement.parentElement.querySelectorAll('input[type="checkbox"]');
  for (const checkbox of checkboxes) {
      checkbox.checked = value;
  }
}

window.addEventListener("DOMContentLoaded",()=>{
  const allChecks = document.querySelectorAll(".allChecks");
  for(const allCheck of allChecks){
    allCheck.addEventListener("click",(e)=>{
      toggle(e.target)
    })
    
  }

  drawShape(shownShape);
  drawGrid();

})