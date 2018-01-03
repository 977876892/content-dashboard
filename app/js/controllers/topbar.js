app.controller('MessagesDropDownCtrl', ['$scope', '$http',
  function ($scope, $http) {
    $http.get('data/messages.json').success(function(data) {
      $scope.messages = data;
    });
  }]);



app.controller('NotificationsDropDownCtrl', ['$scope', '$http',
  function ($scope, $http) {
    $http.get('data/notifications.json').success(function(data) {
      $scope.notifications = data;
    });

  }]);
  app.controller('logoutCtrl', ['$scope', '$http','$state','$rootScope','$window','$timeout',
  function ($scope, $http,$state,$rootScope,$window,$timeout) {
    $rootScope.login_user_name=sessionStorage.username;
    $rootScope.profile_img=sessionStorage.profile_img;
    $rootScope.defaultCoverImage=sessionStorage.defaultCoverImage; 
    // console.log(sessionStorage.username);
    // console.log(sessionStorage.password);
   
    $scope.logout=function(){
            $http.get(sessionStorage.IonServer+"/index.php/request?action=get&module=user&resource=logout").then(function(success) {
                $timeout(function(){
                      sessionStorage.username="";
                      sessionStorage.password="";
                      sessionStorage.profile_img="";
                      sessionStorage.key="";
                      sessionStorage.USER_ID="";
                      sessionStorage.category="";
                      $state.go("access.login");
                },1000);
            });
         
          
    }
  }]);