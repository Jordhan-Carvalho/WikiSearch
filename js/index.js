
// API da erro no modo convencional .getJson, solucao retirada da net  
  // Inicio precisou adicionar mustache.js
  var API_url="https://en.wikipedia.org/w/api.php?";
var link_url="https://en.wikipedia.org/wiki/";
//parameters for the wikimedia API
var parameters={
  action: "query",
  format: "json",
  prop : "extracts",
  exsentences: "3",
  exintro: "1",
  explaintext :"1",
  generator: "search",
  exlimit: "10",
  exintro: "1",
  explaintext: "1",
  gsrnamespace: "0",
  gsrlimit: "10"
};

//template for the results 
var div_template =
    "<div id='entry'>"+
    "<a href='{{link_url}}'><p> {{title}} </p></a>"+
    "<p> {{extract}} </p>"+
    "</div>"+
    "<hr>";


//grab text from text box
function test(){
  var user_query= $('#inpt_search').val();
  //console.log(user_query);
  parameters.titles=user_query;
  parameters.gsrsearch=user_query;
  build_URL();
  retrieve_data();
 
}

//build the query
function build_URL() {
  API_url+= $.param(parameters);
}

function retrieve_data(){
  console.log(API_url);
   
    $.ajax({
      type: "GET",
      url: API_url,
       dataType: 'jsonp',
      success: function (data){
        //console.log(data);
        display(data);
    },
      error: function(){
        console.log("Second request fail");
      }
   });
}

function display(data){
  var prop_list= Object.getOwnPropertyNames(data.query.pages);
  
  //display each page entry 
  prop_list.forEach(function (pages){
    data.query.pages[pages].link_url=link_url + data.query.pages[pages].title;
    $('#results').append(Mustache.render(div_template, data.query.pages[pages]));
    //console.log(data.query.pages[pages]);
  });
  
}
  // fim
  
  $( document ).ready(function(){
  
// search
  $("#inpt_search").on('focus', function () {
	$(this).parent('label').addClass('active');
});

$("#inpt_search").on('blur', function () {
	if($(this).val().length == 0)
		$(this).parent('label').removeClass('active');
});
  // fianl


  
 //start execution when user press enter or clicks enter
  $('#submit').on('click', function(){
      test();
  })
  $(document).keypress(function(e) {
    //13 is enter on the keyboard.
    if(e.which == 13) {
        test();
    }
  });
  

 
  
  
});