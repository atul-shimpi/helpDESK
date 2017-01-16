function ListTicketsController(
  TicketsService,
  TicketsStatusMstService,
  $scope,
  $state,
  $http,
  $window,
  $sce,
  API,
  $log) {
  'ngInject';  
  initialize(); 
  
  function initialize() {
    $scope.filter = {};
    
    loadDurationValues();
    loadDurationUnits();
    loadStatusMst();    
    loadTickets();
  }
  
  // delete ticket
  $scope.onClickDelete = function(id) {
    if (confirm("Do you want to delete this ticket " + id + "?")) {
    TicketsService.delete({id: id},
      function(data) {
        $scope.tickets.forEach(function(item, index, object) {
          if (item.id === id) {
            object.splice(index, 1);
          }
        });
      },
      function(err) {
        alert(err);
    });  
    }
  };
  
  // click download button
  $scope.onClickExportBtn = function() {
    $http.get(API.TICKETS_URL + ".pdf?" +  filterParamsInStr())
      .then(function(data) {   
        var file = new Blob([data.data], {type: 'application/pdf'});
        $window.open(URL.createObjectURL(file), "_blank");
      },
      function(err){
        alert(err);
      });   
  };
  
  function filterParams() {  
    var query_params = {};
    
    query_params.duration = $scope.filter.duration_value + $scope.filter.duration_unit;
    query_params.status = $scope.filter.status; 
    
    return query_params;
  }
  
  function filterParamsInStr() {
    if ($scope.filter.status == undefined) return;
      
    var query_params;
    
    query_params = "duration=" + $scope.filter.duration_value + $scope.filter.duration_unit;
    query_params += "&status=" + $scope.filter.status; 
    
    return query_params;
  }
  
  // apply filter button
  $scope.onClickApplyFilterBtn = function() {
    // check filters
    if ($scope.filter.status == undefined) {
      alert('Please select status');
      return;
    }
    
    if ($scope.filter.duration_value == undefined) {
      alert('Please duration value');
      return;
    }
    
    if ($scope.filter.duration_unit == undefined) {
      alert('Please duration unit');
      return;
    }
    
    // get data for above filters
    $scope.loading = true;       
    
    TicketsService.query(filterParams(),
      function (data) { //got tickets
        data.sort(function(a,b) { // order by creation date in descending    
          return new Date(a.created_at) < new Date(b.created_at) ? 1 : -1;
        });       
        
        $scope.tickets = data;  
        $scope.loading = false;
      }, 
      function(error){ // some error while getting tickets
        $scope.loading = false;
        alert(error);            
      }
    );  
  };
  
  // reset button
  $scope.onClickResetBtn = function() {
    $scope.filter.status = undefined;
    $scope.filter.duration_value = undefined;
    $scope.filter.duration_unit = undefined;
    loadTickets();
  };
  
  // duration values
  function loadDurationValues() {
    $scope.duration_values = [1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 12];
  }
  
  // duration units
  function loadDurationUnits() {
    $scope.duration_units = [];
    
    $scope.duration_units.push({id: "days", unit: "Days"});
    $scope.duration_units.push({id: "weeks", unit: "Week"});
    $scope.duration_units.push({id: "months", unit: "Month"});
    $scope.duration_units.push({id: "years", unit: "Year"});    
  }
  
  function loadStatusMst() {
    // load status master
    TicketsStatusMstService.query(
      function(data) {
        $scope.status_mst = data;  
      },
      function(err) {
        //$scope.saveFailed = true;
        //$scope.savingInProgress = false;
        //$scope.err = err.data;
    })   
  }
  
  // load all tickets
  function loadTickets() {
    $scope.resetInProgress = true;
    
    TicketsService.query(  
      function (data) { //got tickets
        data.sort(function(a,b) { // order by creation date in descending    
          return new Date(a.created_at) < new Date(b.created_at) ? 1 : -1;
        });       
        
        $scope.tickets = data; 
        $scope.resetInProgress = false;        
      }, 
      function(error){ // some error while getting tickets
        $scope.resetInProgress = false;
        alert(error);            
      }
    );  
  }
};

export {ListTicketsController};