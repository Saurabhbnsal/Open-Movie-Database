$(document).ready(function() {

	$("#request").click(function(e) 
	{
				$("#panel-container").empty();
				e.preventDefault();

				var Movie_name = $("#movie_title").val();
				var Movie_year = $("#movie_year").val();

				movie_list(Movie_name,Movie_year);
	});

function movie_list(Movie_name,Movie_year)
 {
 		 // $("#mv_details").empty();
	     var query_url = "http://www.omdbapi.com/?s="+ Movie_name + "&y= "+ Movie_year +" &plot=full&r=json";  
		  $.ajax({
					    url: query_url,
					    dataType: 'json',
					    success:function(obj)
					   	 {
						   	  var obj=obj['Search'];
						   	  var new_obj=[];
								for(i=0 ;i < obj.length; i++)
								{
									new_obj.push({

										"Movie_Title":obj[i]["Title"],
										"Movie_Year":obj[i]["Year"],
										"Movie_Poster":obj[i]["Poster"],
									})
								}
						   	 	      append_data(obj);
			     		      		  console.log(JSON.stringify(obj,null,4));
				     		      	

				     		      	$("#sort_title").click(function()
				     		      	{
				     		      		sort_title(obj);
				     		      	})
				     		      	$("#sort_year").click(function()
				     		      	{
				     		      		sort_year(obj);
				     		      	})
					     },
				              error: function (error) {
				                  console.log(error);
				              }
		 		});

  }
 

    function append_data(obj)
    {

		for(var i=0;i<obj.length;i++)
	 		{
				if (obj[i]['Poster']!="N/A")
				{
					poster=obj[i]['Poster']
				}
				else
				{
					poster="http://www.novelupdates.com/img/noimagefound.jpg"
				}
	     		$("#panel-container").append(
	     			'<div class="col-lg-4 col-md-4 coml-sm-6 col-xs-6 xyz" >'+
	     			
	     			'<div class = "col-lg-12">'+
     				
     				'<center>'+ 
	     				'<img class="img-responsive new_img"  src="'+poster+'">'+
	     			'</center>'+
	     			
	     			'</div>'+
	     			'<center>'+
	     				'<div class = "col-lg-12 my-text">'+ obj[i]['Title']+' ' + obj[i]["Year"] + '</div>'+
	     			'</center>'+
	     			'</div>');
	 		}

    } 

	function sort_title(local_data)
	{
		$("#panel-container").empty();

		 local_data.sort(function(a,b) {
				    if ( a.Title < b.Title )
				        return 0;
				    if ( a.Title > b.Title )
				        return 1;
				    return 0;
				} );

		 append_data(local_data);

	}

		function sort_year(local_data)
	{
		$("#panel-container").empty();

		 local_data.sort(function(a,b) {
				    if ( a.Year < b.Year )
				        return 0;
				    if ( a.Year > b.Year )
				        return 1;
				    return 0;
				} );

		 append_data(local_data);

	}

});
