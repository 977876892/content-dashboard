// app.controller('BlogPageCtrl', ['$scope', 'filterFilter', function ($scope, filterFilter) {
	app.controller('completedBlogs', ['$state','$scope','$http','$rootScope','$mdDialog','commonService','$base64', function ($state,$scope, $http,$rootScope,$mdDialog,commonService,$base64) {
	
	if(sessionStorage.username=="" || sessionStorage.username == undefined){
				$state.go("access.login");
	}
	else{
		$rootScope.login_category=sessionStorage.category;
		//for blog start from first page
				$rootScope.selectedIndexForBlogs=0;
				$rootScope.currentPageForBlogs=1;	
				//for blog start from first page
		//for assign blog start from first page
				$rootScope.assignedBlogIndex=0;
				$rootScope.currentPageForAssignedBlogs=1;
		//for assign blog start from first page
		getCompletedBlogs();
		
	}	
	function getCompletedBlogs(){
			 commonService.completedBlogsService().then(function mySuccess(response){
		if(typeof response.data.description=="undefined")
		{
			$scope.items=[];
            $scope.totalItems=0;
		}
		else{
			$scope.items=response.data.description;
            $scope.totalItems=response.data.description.length;
		}	
            });
	}
	
	

	
   
	
	$scope.spelling=false;
	$scope.content=false;
	$scope.imagesArrange=false;
	$scope.enableSubmit=true;
	$scope.AllAreCorrent=function(spelling,content,imagesArrange){
		
		if(spelling && content && imagesArrange)
		{
			$scope.enableSubmit=false;
		}
		else{
			$scope.enableSubmit=true;
		}
	}
	
	 	$scope.rating = 1;
        $rootScope.finalContentrating=$scope.rating;
        $scope.contentRateFunction = function(rating) {
            $rootScope.finalContentrating=rating;
        };
        $scope.ratinggraphic = 1;
        $scope.graphicRateFunction = function(ratinggraphic) {
            $rootScope.finalGraphicRating=ratinggraphic;
        };
	
		$scope.approveBlogs=function(item){
					 $scope.approveBlogItem=item;

            			$mdDialog.show({
                                controller: ApproveDialogController,
                                templateUrl: 'approveTemplate.html',
                                clickOutsideToClose:true,
                                })
                                .then(function(answer) {
                                $scope.status = 'You said the information was "' + answer + '".';
                                }, function() {
                                $scope.status = 'You cancelled the dialog.';
                            });	
		}		
	 function ApproveApiCall(){
					var item=$scope.approveBlogItem;
					console.log(item);
					 var elem= document.createElement("div");
                    elem.innerHTML =item.content;
                    var images = elem.getElementsByTagName("img");
                    for(var i=0;i<=images.length-1;i++)
                    {
                        var position=elem.innerHTML.lastIndexOf(images[i].currentSrc)+images[i].currentSrc.length;
                        elem.innerHTML =  elem.innerHTML.slice(0, position+1)+ "alt='load image...'" +elem.innerHTML.slice(position+1);
                    }
                    var content=elem.innerHTML;
					var today_date=new Date();
					
					var dataObject={
						'title':item.title,
						'content':content,
						'blog_id':item.blogid,
						'coverimage':item.image,
						'modified':today_date.getFullYear()+"-"+(today_date.getMonth()+1)+"-"+today_date.getDate(),
						'key':sessionStorage.key,
						'created_by':item.user_id
					}
                 console.log(dataObject);
				 commonService.approveTheBlog(dataObject).then(function(success){
                   commonService.rateTheBlog(item.blogid,$rootScope.finalContentrating,$rootScope.finalGraphicRating).then(function(success){
						$mdDialog.show(
                                      $mdDialog.alert()
                                        .parent(angular.element(document.querySelector('#popupContainer')))
                                        .clickOutsideToClose(true)
                                        .textContent('Blog is posted to related doctor is successfully.')
                                        .ok('Ok')
                                        .targetEvent()
                                    ).then(function() {
											getCompletedBlogs();
										
                                }, function() {
                                });
						
                    },function(error){});
				
				},function(fail){
					$mdDialog.show(
                                      $mdDialog.alert()
                                        .parent(angular.element(document.querySelector('#popupContainer')))
                                        .clickOutsideToClose(true)
                                        .textContent('Blog Not Approved Please contact medicodesk.')
                                        .ok('Ok')
                                        .targetEvent()
                                    ).then(function() {
                                }, function() {
                                });
				})

    }
            

	 function ApproveDialogController($scope, $mdDialog) {
            $scope.cancel=function(){
                $mdDialog.hide();
            }
            $scope.answer = function(answer) {
            //console.log(answer);
            $mdDialog.hide(answer);
            
            };
            $scope.ApproveBlog = function() {
            ApproveApiCall();
            $mdDialog.hide();
            };
        }
		
	$scope.search = {};
	$scope.resetFilters = function () {
		// needs to be a function or it won't trigger a $watch
		$scope.search = {};
	};
	// pagination controls
	$scope.currentPage = 1;
	$scope.totalItems =$scope.totalItems;
	$scope.entryLimit = 15; // items per page
	$scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
	// $watch search to update pagination
	$scope.$watch('search', function (newVal, oldVal) {
		//$scope.filtered = filterFilter($scope.items, newVal);
	//	$scope.totalItems = $scope.filtered.length;
		$scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
		$scope.currentPage = 1;
	}, true);


 		$scope.rejectBlog=function(item){
                $scope.rejectBlogItem=item;
            			$mdDialog.show({
							controller: DialogController,
							templateUrl: 'rejectTemplate.html',
							clickOutsideToClose:true
							})
							.then(function(answer) {
							$scope.status = 'You said the information was "' + answer + '".';
							}, function() {
							$scope.status = 'You cancelled the dialog.';
							});
		}	

		function DialogController($scope, $mdDialog) {
			$scope.rewriteToContentWriter=false;
			$scope.rewriteToGraphicDesigner=false;
			$scope.enableSubmit=true;
            $scope.cancel=function(){
                $mdDialog.hide();
            }
            $scope.answer = function(answer) {
            	$mdDialog.hide(answer);
            };
            $scope.postComment = function(comment,content,graphic) {
            rejectApicall(comment,content,graphic);
            $mdDialog.hide();
            };
			$scope.commentChange=function(content,graphic,comment){
	
				if((comment!='' && typeof comment!='undefined')&&(content||graphic))
				{
					$scope.enableSubmit=false;
				}
				else{
					$scope.enableSubmit=true;
				}

			}
			$scope.contentChange=function(rewriteToContentWriter){
				console.log($scope.comment);
				if(($scope.comment!=''&& typeof $scope.comment!='undefined')&&($scope.rewriteToContentWriter||$scope.rewriteToGraphicDesigner))
				{
					$scope.enableSubmit=false;
				}
				else{
					$scope.enableSubmit=true;
				}
				$scope.rewriteToContentWriter=rewriteToContentWriter;
			}
			$scope.graphicChange=function(rewriteToGraphicDesigner){
				if(($scope.comment!='' && typeof $scope.comment!='undefined')&&($scope.rewriteToContentWriter||$scope.rewriteToGraphicDesigner))
				{
					$scope.enableSubmit=false;
				}
				else{
					$scope.enableSubmit=true;
				}
				$scope.rewriteToGraphicDesigner=rewriteToGraphicDesigner;
			}
        }

		function rejectApicall(comment,content,graphic){
					var item=$scope.rejectBlogItem;
					var dataObject={};
					if(content==true&&graphic==true){
						var dataObject={
							//'title':item.title,
							//'content':item.content,
							'blog_id':item.blogid,
							'state':'reject'
							//'group_id':sessionStorage.category
						}
					}
					else if(content==true&&graphic==false){
							var dataObject={
							'blog_id':item.blogid,
							'state':'reject',
							'group_id':4
						}
					}
					else{
						var dataObject={
							'blog_id':item.blogid,
							'state':'reject',
							'group_id':19
						}
					}		
					commonService.rewriteTheBlog(dataObject).then(function(success){
						commonService.postComment(item.blogid,comment).then(function(success){
											getCompletedBlogs();
								},function(error){})
					},function(fail){
						$mdDialog.show(
                                      $mdDialog.alert()
                                        .parent(angular.element(document.querySelector('#popupContainer')))
                                        .clickOutsideToClose(true)
                                        .textContent("Blog Rewrite failed please contact medicodesk")
                                        .ok('Ok')
                                        .targetEvent()
                                    ).then(function() {
                                }, function() {
                                });
						console.log(fail);
					})
		}



}]);