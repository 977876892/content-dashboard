'use strict';

/* Controllers */
  // signin controller
app.controller('LoginFormController', ['$scope','$rootScope', '$http', '$state', function($scope,$rootScope, $http, $state) {
    
     sessionStorage.IonServer="http://staging.getion.in";
      $scope.login=function(username,password){
        if(typeof username!="undefined" &&typeof password!="undefined")
        {
              $http({
                      url: sessionStorage.IonServer+"/?option=com_api&app=users&resource=login&format=raw",
                      method: "POST",
                      headers: {
                      'Content-Type': 'application/x-www-form-urlencoded'
                      },
                      transformRequest: function(obj) {
                      var str = [];
                      for (var p in obj)
                      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                      return str.join("&");
                      },
                      data: {
                        username: username,
                        password: password
                      }
                      }).then(function(success) {
                        console.log(sessionStorage.IonServer);
                          var category=success.data.groups.split(",");
                          $rootScope.login_user_name=username;
                          sessionStorage.username=username;
                          sessionStorage.password=password;
                          sessionStorage.category=success.data.groups.split(",");
                          console.log(sessionStorage.category);
                          sessionStorage.USER_ID=success.data.id;
                          console.log("USER_ID"+sessionStorage.USER_ID);
                          console.log(success.data.auth);
                          sessionStorage.key=success.data.auth;
                          sessionStorage.profile_img=success.data.profile_image;
                          sessionStorage.defaultCoverImage="http://dashboard.getion.in/components/com_easyblog/themes/wireframe/images/placeholder-image.png";
                          $rootScope.defaultCoverImage="http://dashboard.getion.in/components/com_easyblog/themes/wireframe/images/placeholder-image.png";
                          if(category.indexOf("4")!=-1)
                          {
                              $rootScope.login_category=4;
                              sessionStorage.category=4;
                              $state.go('app.ui.blogs');
                          } 
                          else if(category.indexOf("19")!=-1)
                          {
                              $rootScope.login_category=19;
                              sessionStorage.category=19;
                              $state.go('app.ui.blogs'); 
                          } 
                          else if(category.indexOf("20")!=-1){
                              $rootScope.login_category=20;
                              sessionStorage.category=20;
                              $state.go('app.ui.blogs'); 
                            }
                          else if(category.indexOf("22")!=-1)
                          {
                              $rootScope.login_category=22;
                              sessionStorage.category=22;
                              $state.go('app.ui.blogs'); 

                          }
                          else if(category.indexOf("23")!=-1)
                            {
                              $rootScope.login_category=23;
                              sessionStorage.category=23;
                              $state.go('app.tables.process');
                            }
                          else{
                              alert("There is no access using this login credentials.");
                          }
                      },
                      function(failure) {
                              alert("Please check username or password is in correct.");
                      }
            );
        }
        else{
          console.log("error");
        } 
    }  
    
    if(sessionStorage.username !="" && sessionStorage.password !="")
      {
            $scope.login(sessionStorage.username,sessionStorage.password);
      }
  }]);