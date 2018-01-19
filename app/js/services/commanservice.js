app.factory('commonService', ['$http','$base64', function ($http,$base64) {
    return{ 
        getBlogs:function(){
            console.log(sessionStorage.IonServer+"/index.php/request?action=ionize&module=ionize&resource=posts&group_id="+sessionStorage.category);
           return $http({method:"get",url:sessionStorage.IonServer+"/index.php/request?action=ionize&module=ionize&resource=posts&group_id="+sessionStorage.category});
        },
         getOpenBlogs:function(){ 
            console.log(sessionStorage.IonServer+"/index.php/request?action=ionize&module=ionize&resource=posts&group_id=4&ionize=1");
           return $http({method:"get",url:sessionStorage.IonServer+"/index.php/request?action=ionize&module=ionize&resource=posts&group_id=4&ionize=1"});
        },
        getBlogsForRM:function(){
            console.log(sessionStorage.IonServer+"/index.php/request?action=ionize&module=ionize&resource=posts&group_id=22&userid="+sessionStorage.USER_ID);
            return $http.get(sessionStorage.IonServer+"/index.php/request?action=ionize&module=ionize&resource=posts&group_id=22&userid="+sessionStorage.USER_ID);
        },
        // originalBlogFullView:function(blogId){
        //         return $http.get(sessionStorage.IonServer+"/index.php/request?action=detailview&module=ionize&resource=posts&id="+blogId);
        // },
        blogFullView:function(blogId){
              console.log(sessionStorage.IonServer+"/index.php/request?action=detailview&module=ionize&resource=posts&id="+blogId);
              return $http.get(sessionStorage.IonServer+"/index.php/request?action=detailview&module=ionize&resource=posts&id="+blogId);
        },
       
        assignTheBlog:function(dataObject){
            console.log(sessionStorage.IonServer+"/index.php/request?action=assignpost&module=ionize&resource=posts");
            console.log(dataObject);
           return $http({
								url:sessionStorage.IonServer+"/index.php/request?action=assignpost&module=ionize&resource=posts",
								method:'get',
								params:dataObject
							})
        },
        getAllContentWriters:function(){
            console.log(sessionStorage.IonServer+"/index.php/request?action=listprofile&module=ionize&resource=posts&group_id=4");
            return $http.get(sessionStorage.IonServer+"/index.php/request?action=listprofile&module=ionize&resource=posts&group_id=4")
        },
        //my blogs api's
        myblogs:function(){
            console.log(sessionStorage.IonServer+"/index.php/request?action=myposts&module=ionize&resource=posts&user_id="+sessionStorage.USER_ID+"&group_id="+sessionStorage.category);
            return $http({method:"get",url:sessionStorage.IonServer+"/index.php/request?action=myposts&module=ionize&resource=posts&user_id="+sessionStorage.USER_ID+"&group_id="+sessionStorage.category});					
        },
        releaseTheBlog:function(userId,blogId,category){
            console.log("releaseTheBlog "+sessionStorage.IonServer+"/index.php/request?action=releasepost&module=ionize&resource=posts&user_id="+userId+"&blog_id="+blogId+"&group_id="+category);
             return $http.post(sessionStorage.IonServer+"/index.php/request?action=releasepost&module=ionize&resource=posts&user_id="+userId+"&blog_id="+blogId+"&group_id="+category);
        },
        // graphicBlogFullView:function(blogId){
        //     console.log(sessionStorage.IonServer+"/index.php/request?action=detailview&module=ionize&resource=posts&id="+blogId);
        //     return $http.get(sessionStorage.IonServer+"/index.php/request?action=detailview&module=ionize&resource=posts&id="+blogId);
        // },
        uploadCoverImage:function(fd){
            return $http.post(sessionStorage.IonServer+"/index.php/request?action=image&module=ionize&resource=posts&type=cover", fd, {
                    transformRequest: angular.identity,
                    headers: {'Content-Type': undefined}
                })
        },
        uploadImages:function(fd){
             return $http.post(sessionStorage.IonServer+"/index.php/request?action=image&module=ionize&resource=posts", fd, {
                                    transformRequest: angular.identity,
                                    headers: {'Content-Type': undefined}
                    });
        },
        getImages:function(blogId){
             return $http.get(sessionStorage.IonServer+"/index.php/request?action=retrive&module=ionize&resource=posts&blog_id="+blogId);
        },
        deleteImage:function(blogId,image){
            return $http.get(sessionStorage.IonServer+"/index.php/request?action=deleteimg&module=ionize&resource=posts&blog_id="+blogId+"&img="+image);         
        },
        deleteCoverImage:function(blogId){
            return $http.get(sessionStorage.IonServer+"/index.php/request?action=deleteimg&module=ionize&resource=posts&blog_id="+blogId+"&type=coverimg");
        },
        imagesCompleted:function(blogId){
            console.log(blogId);
            return $http({
                    url:sessionStorage.IonServer+"/index.php/request?action=updateblog&module=ionize&resource=posts",
                    method:'GET',
                    params:{
                    'blog_id':blogId,
                    'state':'graphicdone'
                    }
			})
        },
        //my blogs api's
         completedBlogsService:function(){
            console.log(sessionStorage.IonServer+"/index.php/request?action=reviewposts&module=ionize&resource=posts&group_id="+sessionStorage.category);
           return $http({method:"get",url:sessionStorage.IonServer+"/index.php/request?action=reviewposts&module=ionize&resource=posts&group_id="+sessionStorage.category});
        },
        //ionize blogs api's
        ionizeBlogsService:function(){
            console.log(sessionStorage.IonServer+"/index.php/request?action=ionize&module=ionize&resource=posts&group_id=20&ionize=1");
           return $http({method:"get",url:sessionStorage.IonServer+"/index.php/request?action=ionize&module=ionize&resource=posts&group_id=20&ionize=1"});
        },

        getBlogComments:function(blogId){
            console.log(sessionStorage.IonServer+"/index.php/request?action=fullview&module=ionplanner&resource=planner&type=blog&id="+blogId);
            //sessionStorage.IonServer+"index.php/request?action=fullview&module=ionplanner&resource=planner&userid="+sessionStorage.USER_ID+"&blog_id="+blogId
            return $http.get(sessionStorage.IonServer+"/index.php/request?action=fullview&module=ionplanner&resource=planner&type=blog&id="+blogId);
        },
        postComment:function(blogid,comment,privatecomm){
            console.log(privatecomm);
          //  console.log("hello");
         
                return $http({
                     url:sessionStorage.IonServer+"/index.php/request?action=reply&module=ionplanner&resource=planner&type=blog",
                     method: "GET",
                        params:{
                            id:blogid,
                            comment:comment,
                            public:privatecomm,
                            usr:sessionStorage.username,
                            pwd:$base64.encode(sessionStorage.password),
                            encode:true
                        }
                    }) 
         
                console.log(sessionStorage.IonServer+"/index.php/request?action=reply&module=ionplanner&resource=planner&type=blog");
            // return $http({
            //      url:sessionStorage.IonServer+"/index.php/request?action=reply&module=ionplanner&resource=planner&type=blog",
            //      method: "GET",
            //         params:{
            //             id:blogid,
            //             comment:comment,
            //             public:privatecomm,
            //             usr:sessionStorage.username,
            //             pwd:$base64.encode(sessionStorage.password),
            //             encode:true
            //         }
            //     })
            // console.log(blogid);
            // console.log(comment);
            // console.log($base64.encode(sessionStorage.password));
            // console.log(sessionStorage.username);
            // console.log(sessionStorage.IonServer+"/index.php/request?action=reply&module=ionplanner&resource=planner&type=blog");
    //         return $http({
				// 	url:sessionStorage.IonServer+"/index.php/request?action=reply&module=ionplanner&resource=planner&type=blog",
				// 	method: "GET",
    //                 params:{
    //                     id:blogid,
    //                     comment:comment,
    //                     usr:sessionStorage.username,
    //                     pwd:$base64.encode(sessionStorage.password),
    //                     encode:true
    //                 }
				// })
        },
        
        ionizetheBlog:function(dataObject){
            return $http({
                              url:sessionStorage.IonServer+"/index.php/request?action=updateblog&module=ionize&resource=posts",
                              method:'POST',
                              headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                              },
                              transformRequest: function(obj) {
                                var str = [];
                                for (var p in obj)
                                  str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                                return str.join("&");
                              },
                                data:dataObject
                            })
        },
        approveTheBlog:function(dataObject){
            //dataObject.content=dataObject.content.replace(/<br\s*\/?>/gi,'&nbsp;');
            dataObject.content=dataObject.content.replace(/&/g, "%26");
            //dataObject.content=dataObject.content.replace(/"/g, "'")
            console.log(dataObject);
            //  return $http({
			// 		url:sessionStorage.IonServer+"/index.php/request?action=approvepost&module=ionize&resource=posts",
			// 		method:'PUT',
			// 		params:dataObject
			// 	})
           return $http({
					url:sessionStorage.IonServer+"/index.php/request?action=approvepost&module=ionize&resource=posts",
					method:'POST',
					headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
					},
					transformRequest: function(obj) {
					var str = [];
					for (var p in obj)
						str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
					return str.join("&");
					},
					data:dataObject
				})
        },
        rewriteTheBlog:function(dataObject){
            console.log(dataObject);
            return $http({
						url:sessionStorage.IonServer+"/index.php/request?action=updateblog&module=ionize&resource=posts",
						method:'POST',
						headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
						},
						transformRequest: function(obj) {
						var str = [];
						for (var p in obj)
							str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
						return str.join("&");
						},
						data:dataObject
					})
        },
        rateTheBlog:function(blogId,contentRating,graphicRating){
           return $http.get(sessionStorage.IonServer+"/index.php/request?action=updateblog&module=ionize&resource=posts&blog_id="+blogId+"&state=rate&content_rate="+contentRating+"&graphic_rate="+graphicRating);
					
        },
        //ionize blogs api's
        //review blogs
        getReviewBlogs:function(category,userId){
            return $http({method:"get",url:sessionStorage.IonServer+"/index.php/request?action=rejectposts&module=ionize&resource=posts&group_id="+category+"&user_id="+userId})

        },
        //review blogs

        //assigned blogs
        getAssignedBlogs:function(){
            console.log(sessionStorage.IonServer+"/index.php/request?action=AssignedBlogsStatus&module=ionize&resource=posts&group_id="+sessionStorage.category);
           return $http({method:"get",url:sessionStorage.IonServer+"/index.php/request?action=AssignedBlogsStatus&module=ionize&resource=posts&group_id="+sessionStorage.category});
        },
        resetToDefault:function(id,user_id,category){
                return $http({
                            url:sessionStorage.IonServer+"/index.php/request?action=releasepost&module=ionize&resource=posts",
                            method:'GET',
                            params:{
                            'blog_id':id,
                            'user_id':user_id,
                            'group_id':category,
                            'type':'default'
                        }
                    })
        },
        resetToExistingContent:function(id,category,title,content){
               return $http({
                            url:sessionStorage.IonServer+"/index.php/request?action=releasepost&module=ionize&resource=posts",
                            method:'GET',
                            params:{
                            'blog_id':id,
                            //'user_id':sessionStorage.USER_ID,
                            'group_id':category,
                            //'title':title,
                           // 'content':content,
                            'type':'exist'
                        }
                    }) 
        },

        getAllgraphicDesigners:function(){
            return $http.get(sessionStorage.IonServer+"/index.php/request?action=listprofile&module=ionize&resource=posts&group_id=19");
        },
                     
        //assigned blogs

        //transactions and settelments
        getSettlements:function(){
           // console.log(sessionStorage.IonServer+'/index.php/request?action=settlement&module=ionize&resource=posts&userid='+sessionStorage.USER_ID);
            return $http.get(sessionStorage.IonServer+'/index.php/request?action=clientsettlement&module=ionize&resource=posts&userid='+sessionStorage.USER_ID);
                 
        },
        getTansactions:function(category,userId){
             return $http.get(sessionStorage.IonServer+'/index.php/request?action=transaction&module=ionize&resource=posts&group_id='+category+"&user_id="+userId);
        },
        //transactions and settlements

        //ion topics
        getwithoutkeywordsTopics:function(){
            console.log(sessionStorage.IonServer+"/index.php/request?action=iontopics&module=ionize&resource=posts&group_id="+sessionStorage.category);
           return  $http.get(sessionStorage.IonServer+"/index.php/request?action=iontopics&module=ionize&resource=posts&group_id="+sessionStorage.category);
        },
         getClientTopics:function(){
           return  $http.get(sessionStorage.IonServer+"/index.php/request?action=iontopics&module=ionize&resource=posts&topics=1&group_id="+sessionStorage.category);
        },
        uploadTopics:function(fd){
            return $http.post(sessionStorage.IonServer+"/index.php/request?action=importevents&module=ionize&resource=posts", fd, {
                    transformRequest: angular.identity,
                    headers: {'Content-Type': undefined}
                });
        },
        //ion topics

        //in editor used api's
        saveAsDraft:function(dataObject){
           return $http({
                      url:sessionStorage.IonServer+"/index.php/request?action=updateblog&module=ionize&resource=posts",
                      method:'POST',
                      headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                      },
                      transformRequest: function(obj) {
                        var str = [];
                        for (var p in obj)
                          str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                        return str.join("&");
                      },
                        data:dataObject
                    })
        },
         sendBlogToGraphicDesigner:function(dataObject){
                return  $http({
                        url:sessionStorage.IonServer+"/index.php/request?action=updateblog&module=ionize&resource=posts",
                        method:'POST',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                        transformRequest: function(obj) {
                            var str = [];
                            for (var p in obj)
                            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                            return str.join("&");
                        },
                        data:dataObject
                    })
         },
                            
        //in editor used api's

        //relation manager api calls
        getAssignedBlogsForRM:function(){
           return $http.get(sessionStorage.IonServer+"/index.php/request?action=AssignedBlogsStatus&module=ionize&resource=posts&group_id=22&userid="+sessionStorage.USER_ID);
        },
        getIonizeBlogsForRM:function(){
            console.log(sessionStorage.IonServer+"/index.php/request?action=ionize&module=ionize&resource=posts&group_id=4&ionize=0");
           return $http.get(sessionStorage.IonServer+"/index.php/request?action=ionize&module=ionize&resource=posts&group_id=4&ionize=0");
        },
        getWithOutKeywordsForRM:function(){
            //console.log(sessionStorage.USER_ID);
            //console.log(sessionStorage.IonServer+"/index.php/request?action=iontopics&module=ionize&resource=posts&group_id=22&userid="+sessionStorage.USER_ID);
            return $http.get(sessionStorage.IonServer+"/index.php/request?action=iontopics&module=ionize&resource=posts&group_id=22&userid="+sessionStorage.USER_ID);
        },
         getClientTopicsForRM:function(){
            return $http.get(sessionStorage.IonServer+"/index.php/request?action=iontopics&module=ionize&resource=posts&topics=1&group_id="+sessionStorage.category);
        },
        //relation manager api calls

        //reports
        reportes_blogs:function(){
            console.log(sessionStorage.IonServer+'/index.php/request?action=publishreport&module=ionize&resource=posts');
          return $http.get(sessionStorage.IonServer+'/index.php/request?action=publishreport&module=ionize&resource=posts');
        },
         reportes_credits:function(){
            console.log(sessionStorage.IonServer+'/index.php/request?action=getcredits&module=ionize&resource=posts&groupid=22');
          return $http.get(sessionStorage.IonServer+'/index.php/request?action=getcredits&module=ionize&resource=posts&groupid=22');
        },
        getNewsLetterCount:function(teamId){
            return $http.get(sessionStorage.IonServer+"/index.php/request?action=blogchart&module=ionize&resource=posts&userid="+teamId+"&type=newsletters");
        },
        reportes_query:function(){
          return $http.get(sessionStorage.IonServer+'/index.php/request?action=queryreport&module=ionize&resource=posts');
        },
        getLastOneYearQueries:function(teamId){
             return $http.get(sessionStorage.IonServer+"/index.php/request?module=easydiscuss&action=get&resource=monthlyquerylist&userid="+teamId+"&type=yearly");
        },
        getQueriesByCategoryByMonth:function(teamId,year,month){
            return $http.get(sessionStorage.IonServer+"/index.php/request?module=easydiscuss&action=get&resource=monthlyquerylist&userid="+teamId+"&from="+year+"-"+month+"&type=yearly");
        },
        getQuriesByCategory:function(teamId){
            return  $http.get(sessionStorage.IonServer+"/index.php/request?module=easydiscuss&action=get&resource=monthlyquerylist&userid="+teamId)
        },
        downloadQuries:function(teamId){
            return $http.get(sessionStorage.IonServer+'/request?module=easydiscuss&action=get&resource=posts&csv=1&user_id='+teamId);
        },
        reportes_leeds:function(){
          return $http.get(sessionStorage.IonServer+'/index.php/request?action=leadreport&module=ionize&resource=posts');
        },
        leadsBetweenDates:function(teamId,from,to){
            return $http.get(sessionStorage.IonServer+"/index.php/request/get/contacts/contacts?userid="+teamId+"&from="+from+"&to="+to+"&username="+sessionStorage.username+"&pwd="+$base64.encode(sessionStorage.password)+"&encode=true")
        },
        downloadLeads:function(teamId,from,to){
             return $http.get(sessionStorage.IonServer+"/index.php/request/get/contacts/contacts?userid="+teamId+"&from="+from+"&to="+to+"&username="+sessionStorage.username+"&pwd="+$base64.encode(sessionStorage.password)+"&encode=true&csv=1")
        },
        //reports
        getLeadsReportForRM:function(){   
           return $http.get(sessionStorage.IonServer+"/index.php/request?action=clientwiseleadreport&module=ionize&resource=posts&userid="+sessionStorage.USER_ID+"&groupid=22");       
        },
        getBlogsReportForRM:function(){
           // console.log(sessionStorage.IonServer+"/index.php/request?action=clientpublishreport&module=ionize&resource=posts&userid="+sessionStorage.USER_ID+"&groupid=22");
           return $http.get(sessionStorage.IonServer+"/index.php/request?action=clientpublishreport&module=ionize&resource=posts&userid="+sessionStorage.USER_ID+"&groupid=22");            
        },
        getQueriesReportForRM:function(){
            console.log(sessionStorage.IonServer+"/index.php/request?action=clientwisequeryreport&module=ionize&resource=posts&groupid=22&userid="+sessionStorage.USER_ID);
                return $http.get(sessionStorage.IonServer+"/index.php/request?action=clientwisequeryreport&module=ionize&resource=posts&groupid=22&userid="+sessionStorage.USER_ID);
        },
        getTotalAmount:function(teamId){
            return $http.get(sessionStorage.IonServer+'/index.php?option=com_rsappt_pro3&controller=json_x&fileout=yes&format=json&task=get_doctors_total_amount&user_id='+teamId);
        },
        getTotalVisits:function(teamId){
            return $http.get(sessionStorage.IonServer+"/index.php?option=com_rsappt_pro3&controller=json_x&fileout=yes&format=json&task=get_doctors_visit_count&user_id="+teamId);
        },
        getTotalVisitsByMonth:function(teamId){
            return $http.get(sessionStorage.IonServer+"/index.php?option=com_rsappt_pro3&controller=json_x&fileout=yes&format=json&task=get_doctors_visit_count&user_id="+teamId+"&type=yearly");
        },
        //settlements tab for ion manager
         getProcessForIM:function(){
            return $http.get(sessionStorage.IonServer+"/index.php/request?action=paynow&module=ionize&resource=posts");
        },
         getAllTransationsForIM:function(){
             console.log(sessionStorage.IonServer+"/index.php/request?action=settlement&module=ionize&resource=posts");
            return $http.get(sessionStorage.IonServer+"/index.php/request?action=settlement&module=ionize&resource=posts");
        },
         markAsPaid:function(ids){
            // console.log(sessionStorage.IonServer+"/index.php/request?action=markpaid&module=ionize&resource=posts&ids="+ids);
            return $http.get(sessionStorage.IonServer+"/index.php/request?action=markpaid&module=ionize&resource=posts&ids="+ids);
        },
        //settlements tab for ion manager

        //forgot password
          forgotpass:function(email){
            return $http.get(sessionStorage.IonServer+"/index.php/request?module=user&action=get&resource=reset&email="+email);
          },
        //forgot password

        //my_approve_blogs
        MyApproveBlogs:function(){
            console.log(sessionStorage.IonServer+"/index.php/request?action=publishedblogs&module=ionize&resource=posts&groupid="+sessionStorage.category+"&userid="+sessionStorage.USER_ID);
           return $http({method:"get",url:sessionStorage.IonServer+"/index.php/request?action=publishedblogs&module=ionize&resource=posts&groupid="+sessionStorage.category+"&userid="+sessionStorage.USER_ID});
        }
        //my_approve_blogs
    }
}]);