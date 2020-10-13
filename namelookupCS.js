// JavaScript for Name Data Lookup Demo
// Jim Skon, Kenyon College, 2017
var searchType;  // Save serach type here

$(document).ready(function () {
    searchType="Last";
    $("#search-btn").click(getMatches);

    $("#clear").click(clearResults);

    $(".dropdown-menu a").click(function(){
	console.log("pick!"+$(this).text());
	$(this).parents(".dropdown").find('.selection').text($(this).text());
	searchType=$(this).text();
    });
});

// Build output table from comma delimited list
function nameTable(list) {
    var result = '<table class="w3-table-all w3-hoverable" border="2"><tr><th>Name</th><th>%</th><th>Rank</th><tr>';
    var a = list.split(",");
    var aLen = a.length;
    for (var i = 0; i < aLen; i+=3) {
	result += "<tr><td>"+a[i]+"</td><td>"+a[i+1]+"</td><td>"+a[i+2]+"</td><tr>";
    }
    result += "</table>";

    return result;
}


function processResults(results) {
    $('#searchresults').empty();
    $('#searchresults').append(nameTable(results));
}

function clearResults() {
    $('#searchresults').empty();
}

function getMatches() {
    if ($('#search').val().length < 2) return;
    $('#searchresults').empty();
    name = $("#search").val();
    params = "name=" + name + "&type_select=" + searchType;
      $.ajax(
      {
      type: "get",
      url: "/cgi-bin/lu1_nameclientCS.py?name=" + name + "&type_select=" + searchType,
      dataType: "text",
      success:  processResults,
      error: function(request, ajaxOptions, thrownError)
	  {
	      $("#debug").text("error with get:"+request+thrownError);
	  }
      });
}
