var myApp = angular.module("myApp",["ui.router","ngAnimate"]);
myApp.config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
        $stateProvider.state("Cashier",{
            url:"/Cashier",
            templateUrl: "html/CashierContent.html",
            controller:goodsaddController
        }).state("store_type",{
            url:"/store_type",
            templateUrl: "html/store_typeContent.html",
            controller:store_typeController
        }).state("store_add",{
            url:"/store_add",
            templateUrl: "html/store_addContent.html",
            controller:store_addController
        }).state("store_manage",{
            url:"/store_manage",
            templateUrl: "html/store_manageContent.html",
            controller:store_manageController
        }).state("goods_type",{
            url:"/goods_type",
            templateUrl: "html/goods_typeContent.html",
            controller:goods_typeController
        }).state("goods_add",{
            url:"/goods_add",
            templateUrl: "html/goods_addContent.html",
            controller:goods_addController
        }).state("goods_manage",{
            url:"/goods_manage",
            templateUrl: "html/goods_manageContent.html",
            controller:goods_manageController
        }).state("member_add",{
            url:"/member_add",
            templateUrl: "html/member_addContent.html"
        }).state("member_manage",{
            url:"/member_manage",
            templateUrl: "html/member_manageContent.html",
            controller:member_manageController
        }).state("user_manage",{
            url:"/user_manage",
            templateUrl: "html/user_manageContent.html",
            controller:user_manageController
        })
    $urlRouterProvider.otherwise("/Cashier");
}
]);
//控制器
function goodsaddController($scope) {
    $scope.goodsAll=goodsAll;
    $scope.cart = [
    ];
    $scope.totalMoney = 0;
    $scope.addTotalMoney = function () {
        $scope.totalMoney = 0;
        // console.log($scope.cart)
        for(var m=0;m<$scope.cart.length;m++){
            $scope.totalMoney += parseInt($scope.cart[m].goods_price)*$scope.cart[m].count;
            // 把数据库中价格改成数字
            // console.log($scope.cart[m].count)
        }
    }
    $scope.addLeft=function(i){
        //如果点击的当前商品已经存在，数量增加1
        for(var j=0;j<$scope.cart.length;j++){
            if($scope.cart[j].goods_add==$scope.goodsAll[i].goods_add){
                $scope.cart[j].count+=1;
                console.log($scope.cart[j].count)
                $scope.addTotalMoney();
                return;
            }
        }
        $scope.cart.push($scope.goodsAll[i]);
        $scope.goodsAll[i].count=1;
        // console.log($scope.cart)
        $scope.addTotalMoney();
    }
    $scope.del=function (i) {
        // delete $scope.cart[i];
        $scope.cart.splice(i,1);
        $scope.addTotalMoney();
    }

}
function user_manageController( $scope,$http) {
    // console.log(userAll)
    $scope.userAll=JSON.parse(userAll);
    $scope.username = "";
    $scope.password = "";
    $scope.edit = function (_id,username) {
        $scope.username = username;
        $('#update').modal('show')
    }
    $scope.editSubmit = function () {
        // console.log($scope.username,$scope.password)
        var username = $scope.username;
        var password = $scope.password;
        $http({
            url:'/usermanage/edit',
            method:'POST',
            data:{
                username:username,
                password:password
            },
            headers:{'Content-Type': 'application/x-www-form-urlencoded'},
            transformRequest: function(obj) {
                var str = [];
                for (var p in obj) {
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                }
                return str.join("&");
            }
        }).success(function (res) {
            // console.log(res)
            layer.msg(res.msg);
            setTimeout(function () {
                $(".close").trigger("click");
            },1000)
            setTimeout(function () {
                self.location.reload();
            },500)

        })
    }
    // console.log($scope.userAll)
}
function store_typeController( $scope) {
    // console.log(storeAll)
    $scope.storeAll=storeAll;
    // console.log($scope.userAll)
}
function store_addController( $scope) {
    // console.log(storesAll)
    $scope.storeAll=storeAll;
    $scope.storesAll=storesAll;
    // console.log($scope.userAll)
}
function store_manageController( $scope,$http) {
    $scope.storesAll = storesAll;
    $scope.storeType = "";
    $scope.store_add = "";
    $scope._id = "";
    $scope.edit = function (_id,store_add, storeType) {
        $scope.storeType = storeType;
        $scope.store_add = store_add;
        $scope._id = _id;
        $('#update').modal('show')
    }
    $scope.editSubmit = function () {
        var storeType = $scope.storeType;
        var store_add = $scope.store_add;
        var _id = $scope._id;
        $http({
            url: '/front/edit',
            method: 'POST',
            data: {
                storeType: storeType,
                store_add: store_add
            },
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            transformRequest: function (obj) {
                var str = [];
                for (var p in obj) {
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                }
                return str.join("&");
            }
        }).success(function (res) {
            // console.log(res)
            layer.msg(res.msg);
            setTimeout(function () {
                $(".close").trigger("click");
            }, 1000)
            setTimeout(function () {
                self.location.reload();
            }, 500)

        })
    }
}
function goods_typeController( $scope) {
    $scope.goodsType=goodsType;
}
function goods_addController( $scope) {
    $scope.goodsType=goodsType;
    $scope.goodsAll=goodsAll;
    // console.log($scope.goodsAll)
}
function goods_manageController( $scope,$http) {
    $scope.goodsAll=goodsAll;
    $scope.goodsType = "";
    $scope.goods_add = "";
    $scope.goods_price = "";
    $scope._id = "";
    $scope.edit = function (_id,goods_add, goodsType,goods_price) {
        $scope.goodsType = goodsType;
        $scope.goods_add = goods_add;
        $scope.goods_price = goods_price;
        $scope._id = _id;
        $('#update').modal('show')
    }
    $scope.editSubmit = function () {
        var goodsType = $scope.goodsType;
        var goods_add = $scope.goods_add;
        var goods_price = $scope.goods_price;
        var _id = $scope._id;
        $http({
            url: '/goodstype/edit',
            method: 'POST',
            data: {
                goodsType: goodsType,
                goods_add: goods_add,
                goods_price:goods_price
            },
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            transformRequest: function (obj) {
                var str = [];
                for (var p in obj) {
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                }
                return str.join("&");
            }
        }).success(function (res) {
            // console.log(res)
            layer.msg(res.msg);
            setTimeout(function () {
                $(".close").trigger("click");
            }, 1000)
            setTimeout(function () {
                self.location.reload();
            }, 500)

        })
    }
}
function member_manageController( $scope,$http) {
    $scope.membersAll=membersAll;
    $scope.member='';
    $scope._id='';
    // console.log($scope.membersAll)
    $scope.edit=function (_id,member) {
        $scope._id=_id;
        $scope.member=member;
        $("#update").modal('show')
    }
    $scope.editSubmit = function () {
        var member = $scope.member;
        var _id = $scope._id;
        $http({
            url: '/memberAdd/edit',
            method: 'POST',
            data: {
                _id:_id,
                member:member
            },
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            transformRequest: function (obj) {
                var str = [];
                for (var p in obj) {
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                }
                return str.join("&");
            }
        }).success(function (res) {
            // console.log(res)
            layer.msg(res.msg);
            setTimeout(function () {
                $(".close").trigger("click");
            }, 1000)
            setTimeout(function () {
                self.location.reload();
            }, 500)

        })
    }

}