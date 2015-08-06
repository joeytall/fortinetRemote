$(document).ready(function(){
  copyLevels();
  copyTime();
  $("#datatable").dynatable();
  paintThreads();
  $('#datetimepicker1').datetimepicker();
});

function paintThreads(){
  $("#datatable td:nth-last-child(2)").each(function(){
    var rating = $(this).text();
    $(this).closest("tr").addClass(rating);
  });
}

function copyLevels(){
  $("#datatable td:last-child").each(function(){
    var rating = $(this).prev().text();
    var level = 0;
    switch(rating)
  {
    case "clean":
      level = 0;
      break;
    case "low-risk":
      level = 1;
      break;
    case "medium-risk":
      level = 2;
      break;
    case "high-risk":
      level = 3;
      break;
    case "malicious":
      level = 4;
      break;
  }
  $(this).text(level);
  });
}

function copyTime(){
  $("#datatable td:first-child").each(function(){
    var time = $(this).next().text(),
        objTime = new Date(time),
        intTime = objTime.getTime();
  $(this).text(intTime);
  });
}
