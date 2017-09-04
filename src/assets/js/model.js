




var app = new Vue({
  el:'#app',
  data:{
    message:'Hi Adithya',
    tableData:[],
    cardsData:[],
  },
  ready:{

  },
  computed:{

  },
  methods: {
     fetchData: function(){
     	var vm = this;
       $.get('https://jsonplaceholder.typicode.com/users')
       .then(function(response){
         console.log(response);
			   app._data.tableData = response;


         //alert();
       });
    },
    getData:function(){
      $.get('https://jsonplaceholder.typicode.com/photos')
      .then(function(response){
        console.log(response);
        app._data.cardsData = response;
        //alert();
      });
    }
 }
});
app.fetchData();
app.getData();
