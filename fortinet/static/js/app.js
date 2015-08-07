var TimeFilter = (function(){
  var pub = {},
    pvt = {};

pvt.init = (function(){
  $('.datetimepicker').datetimepicker()
  .change(function(){
    $(this).attr("intTime", pub.convertTimeToInt($(this).val()));
    pub.filterTime();
  });
$('#btnReset').click(function(){
  $(".datetimepicker").datetimepicker('reset')
  .each(function(){
    $(this).attr("intTime", pub.convertTimeToInt($(this).val()));
  });
pub.filterTime();
});
})();

pub.convertTimeToInt = function(time){
  var objTime = new Date(time),
      intTime = objTime.getTime();
  return intTime;
};

pub.filterTime = function(){
  var start = $("#starttime").attr("intTime"),
      end = $("#endtime").attr("intTime"),
      threadTime;
  $("#datatable td:first-child").each(function(){
    threadTime = $(this).text();
    if (threadTime > end || threadTime < start)
    $(this).parent().hide();
    else
    $(this).parent().show();
  });
};

return pub;
})();

var DataTable = (function(){
  var pub = {},
    pvt = {};
pub.records = {};
pub.initTable = (function(){
  var ajax = new XMLHttpRequest();
  ajax.onreadystatechange = function() {
    if (ajax.readyState == 4) {
      pub.records = JSON.parse(ajax.responseText);
      pvt.enhanceData();
      pub.dynatable = $("#datatable").dynatable({
        dataset: { records: pub.records }
      }).data('dynatable');
      pub.paintThreads();
    }
  };
  ajax.open("POST", "/static/metafiles/sampleMetaFile.json", true);
  ajax.send();
})();

pub.updateTable = function(records){
  pub.records = records;
  pvt.enhanceData();
  pub.dynatable.settings.dataset.originalRecords = pub.records;
  pub.dynatable.process();
};

pub.paintThreads = function(){
  $("#datatable td:nth-last-child(2)").each(function(){
    var rating = $(this).text();
    $(this).closest("tr").addClass(rating);
  });
  $("#submittype a").text("Submit-Type");
};

pvt.enhanceData = function(){
  for (var i = 0, totalLength = pub.records.length; i < totalLength; i++)
  {
    var thread = pub.records[i],
        level = 0;
    switch(thread.rating)
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
    thread.level = level;
    thread.time = TimeFilter.convertTimeToInt(thread.date);
    thread.submittype = thread["submit-type"];
    delete thread["submit-type"];
  }
};

pvt.listener = (function(){
var previous = "";

setInterval(function() {
  var ajax = new XMLHttpRequest();
  ajax.onreadystatechange = function() {
    if (ajax.readyState == 4) {
      if (ajax.responseText != previous ) {
        if (previous !== "")
        {
          if (!ajax.responseText)
            clearInterval(listener);
          else
          {
            alert("New threads detected, the page is being reloaded.");
            DataTable.updateTable(JSON.parse(ajax.responseText));
          }
        }
        previous = ajax.responseText;
      }
    }
  };
  ajax.open("POST", "/static/metafiles/sampleMetaFile.json", true); //Use POST to avoid caching
  ajax.send();
}, 1000);
})();

return pub;

})();


