angular
    .module('discountAscii')
    .controller('baseController', baseController);

baseController.$inject = ['$scope','$http'];

function baseController($scope,$http){

    var vm = this;
    $scope.asciiData = [];
    getImgSrc(true);
    getAsciiFaces(true);
    $scope.orderProp = 'none';
    $scope.showImg = false;
    function getImgSrc(mainAd) {
        var newAdId = Math.floor(Math.random()*1000);
        getData('/ad/?r='+newAdId).then(function (data) {
            if(mainAd)
                vm.imgsrc = data;
            else
                vm.gridImgSrc = data;
        });
    }

    function getData(url) {
        return $http.get(url)
            .then(getComplete)
            .catch(getFailed);

        function getComplete(response) {
            return response.data;
        }

        function getFailed(error) {
            console.log('XHR Failed for ' + url + "." + error.data);
        }
    }

    function getAsciiFaces(firstTime) {
        getData('/api').then(function (data) {
            if(firstTime)
                $scope.asciiData = data;
            getImgSrc(false);
            if(!firstTime){
                angular.forEach(data,function (obj) {
                    $scope.asciiData.push(obj)
                });
            }
        });
    }

    $scope.loadMoreData = function () {
        getAsciiFaces(false);
        $scope.disableScroll = true;
        if($scope.asciiData.length<=50){
            $scope.disableScroll = false;
        }
    };

    $scope.timeAgo = function getTimeAgo(date) {
        return moment(date).fromNow();
    };

}
