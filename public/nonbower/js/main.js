/**
 * Created by santosh on 10/27/16.
 */
var app = angular.module("app", []);

app.controller("first", ['$scope',  'SERVICE1', function($scope,   SERVICE1){

    console.log("FIRST CONTROLLER");

    var promise = SERVICE1.async1();
    promise.then(function(result){

        console.log("After promise :: " + result);

        return SERVICE1.async2();
    }).then(function(result){

        console.log(result);
    }).catch(function(err){
        console.log(err);
    });


    // Parallel Promise
    var allPromise = SERVICE1.async3();
    allPromise.then(function(result){

        console.log(result);
    }).catch(function(err){
        console.log(err);
    });


    // HTTP SERVICE CALLBACK
    var httpPromise =  SERVICE1.async4();
    httpPromise.then(function(res){

        console.log(res);
    }).catch(function(err){
        console.log(err);
    });
}]);


app.service("SERVICE1", ['$q', '$http', function($q, $http){

    this.async1 = function(){
        return $q(function(resolve, reject){

            console.log("Before timeout")
            setTimeout(function(){
                console.log("After timeout.");
                resolve("Welcome");
            }, 5000)
        });
    };


    this.async2 = function() {
        var deffered = $q.defer();

        setTimeout(function(){
            deffered.resolve("ASYNC2");
        }, 3000);

        return deffered.promise;
    };


    this.async3 = function(){
        var p1 = this.async1();
        var p2 = this.async2();

        return $q.all([p1, p2]);
    };


    this.async4 = function(){
        var url = "/test/1";
        return $http.get(url);
    }
}]);