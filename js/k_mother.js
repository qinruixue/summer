var utilModule = angular.module('utilModule', ['ionic']);
//什么时候检查:添加到购物车时，下单时，进入购物车时，查看订单中心
//什么时候设置:登录成功时，设置为1, 退出登录时，设置为-1
utilModule.service('$LoginOperate', [function () {
    //检查是否已经登录
    this.checkLoginFlag = function () {
        var flag = sessionStorage.getItem('LoginFlag');
        //console.log(flag);
        return flag;
    };
    //设置登录的状态
    this.setLoginFlag = function (flag) {
        sessionStorage.setItem('LoginFlag', flag)
    }
}]);
//创建自定义服务
utilModule.service('$httpKfl', ['$http', '$ionicLoading', function ($http, $ionicLoading) {
    this.sendRequest = function (urlWithArgs, succFunc) {
        $ionicLoading.show({
            template: 'loading...'
        });
        $http.get(urlWithArgs).success(function (data) {
            succFunc(data);
            $ionicLoading.hide();
        })
    }
}]);
//
var app = angular.module('k_mother', ['ionic', 'utilModule']);
//配置状态
app.config(
    function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
        //调整tabs固定在底部（any platform）
        $ionicConfigProvider.tabs.position('bottom');

        $stateProvider
            .state('start', {
                url: '/Start',
                templateUrl: 'tpl/start.html',
                controller: 'startCtrl'
            })
            .state('main', {
                url: '/Main',
                templateUrl: 'tpl/main.html',
                controller: 'mainCtrl'
            })
            .state('detail', {
                url: '/Detail/:id',
                templateUrl: 'tpl/detail.html',
                controller: 'detailCtrl'
            })
            .state('order', {
                url: '/Order/:data',
                templateUrl: 'tpl/order.html',
                controller: 'orderCtrl'
            })
            .state('myOrder', {
                url: '/MyOrder',
                templateUrl: 'tpl/myOrder.html',
                controller: 'myOrderCtrl'
            })
            .state('myCart', {
                url: '/MyCart',
                templateUrl: 'tpl/myCart.html',
                controller: 'myCartCtrl'
            })
            .state('login', {
                url: '/Login/:name/:args',
                templateUrl: 'tpl/login.html',
                controller: 'loginCtrl'
            })
            .state('register', {
                url: '/Register',
                templateUrl: 'tpl/register.html'
            })
            .state('info', {
                url: '/Info',
                templateUrl: 'tpl/info.html'
            })
            .state('address', {
                url: '/Address',
                templateUrl: 'tpl/address.html'
            })
            .state('setting', {
                url: '/Setting',
                templateUrl: 'tpl/setting.html',
                controller: 'settingCtrl'
            });

        $urlRouterProvider.otherwise('/Start')

    });

//创建一个父控制器
app.controller('parentCtrl', ['$scope', '$state', '$LoginOperate',
    function ($scope, $state, $LoginOperate) {
        $scope.data = {totalNumInCount: 0};
        var flag = $LoginOperate.checkLoginFlag();
        if (flag != -1 && flag != 1) {
            $LoginOperate.setLoginFlag(-1);
        }
        $scope.jump = function (stateName, arg) {
            $state.go(stateName, arg);
        };
        //
        $scope.logOut = function () {
            sessionStorage.clear();
            $LoginOperate.setLoginFlag(-1);
            $scope.jump('start');
            $scope.data.totalNumInCount = 0;
        };
        //确定底部导航的跳转目标
        $scope.funcSelect = function (index) {

            if (index == 0) {
                $scope.jump('start');
            }
            else if (index == 1) {
                $scope.jump('myOrder');
            }
            else if (index == 2) {
                $scope.jump('myCart');
            }
            else if (index == 3) {
                $scope.jump('address');
            }
        }
    }]);
//创建登录页的控制器
app.controller('loginCtrl', ['$scope', '$stateParams', '$http', '$LoginOperate', '$httpKfl', '$ionicPopup',
    function ($scope, $stateParams, $http, $LoginOperate, $httpKfl, $ionicPopup) {

        $scope.user = {name: '', pwd: ''};

        $scope.submit = function () {
            $httpKfl.sendRequest(
                'data/login.php?uname=' + $scope.user.name + "&pwd=" + $scope.user.pwd, succCallback
            )
        };
        var succCallback = function (data) {

            if (data[0].msg == 'succ') {
                $LoginOperate.setLoginFlag(1);
                sessionStorage.setItem('id', data[0].uid);
                if ($stateParams.args && $stateParams.args != "") {
                    $scope.jump($stateParams.name, angular.fromJson($stateParams.args));
                }
                else {
                    $scope.jump($stateParams.name);
                }

            }
            else {
                $ionicPopup.alert({
                    template: '登录失败'
                })
            }
        };
    }]);
//
app.controller('startCtrl', ['$scope','$interval',
    function ($scope,$interval) {
        $scope.imgList=[
            'banner.jpg',
            'banner1.jpg'
        ];
        $scope.index=0;
        $interval(function(){
            $scope.index++;
            if($scope.index>2){$scope.index=0}
        },1000)
    }]);

app.controller('mainCtrl', ['$scope', '$http', '$httpKfl',
    function ($scope, $http, $httpKfl) {
        $scope.dishList = [];
        $scope.inputData = {kw: ''};
        $scope.hasMore = true;
        //加载首页数据
        $httpKfl.sendRequest('data/dish_getbypage.php', function (data) {
            $scope.dishList = data;
        });
        //给按钮定义一个处理函数：加载更多数据
        $scope.loadMore = function () {
            $httpKfl.sendRequest('data/dish_getbypage.php?start=' + $scope.dishList.length,
                function (data) {
                    if (data.length < 5) {
                        $scope.hasMore = false;
                    }
                    $scope.dishList = $scope.dishList.concat(data);
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                })
        };
        //监听kw关键字的模型数据变化
        $scope.$watch('inputData.kw', function () {
            if ($scope.inputData.kw) {
                $httpKfl.sendRequest('data/dish_getbykw.php?kw=' + $scope.inputData.kw, function (data) {
                    //将数据
                    $scope.dishList = data;
                });
            }

        })

    }]);

app.controller('detailCtrl', ['$scope', '$http', '$stateParams', '$LoginOperate', '$httpKfl',
    function ($scope, $http, $stateParams, $LoginOperate, $httpKfl) {
        $httpKfl.sendRequest('data/dish_getbyid.php?id=' + $stateParams.id, function (data) {
            $scope.dish = data[0];
        });
        //定义方法，更新购物车信息
        $scope.addToCart = function () {
            if ($LoginOperate.checkLoginFlag() == -1) {
                $scope.jump('login', {name: 'detail', args: '{"id":' + $stateParams.id + '}'});
                return;
            }
            //发起网络请求，取指定id的详情信息并显示在视图
            $httpKfl.sendRequest('data/cart_update.php?did=' + $scope.dish.did +
                "&count=-1" + "&uid=" + sessionStorage.getItem('id'), function (data) {
                    if (data.msg == 'succ') {
                        alert('添加成功');
                        $scope.data.totalNumInCount++;
                    }
                    else {
                        alert('添加失败')
                    }
                }
            )
        }
    }


]);

app.controller('orderCtrl',
    ['$scope', '$http', "$stateParams", '$httpParamSerializerJQLike', '$LoginOperate',
        function ($scope, $http, $stateParams, $httpParamSerializerJQLike, $LoginOperate) {
            var cart = angular.fromJson($stateParams.data);
            var allPrice = 0;
            angular.forEach(cart, function (value, key) {
                allPrice += (value.dishCount * value.price);
            });
            $scope.order = {
                cartDetail: $stateParams.data,
                totalprice: allPrice
            };

            $scope.submitOrder = function () {
                //系列化
                //自己拼接 'user_name='+$scope.order.user_name+'&sex='+$scope.order.sex
                //ng内置序列化服务
                //$httpParamSerializerJQLike
                if ($LoginOperate.checkLoginFlag() == -1) {
                    $scope.jump('login', {name: 'order', args: '{"data":' + $stateParams.data + '}'});
                    return;
                }

                var result = $httpParamSerializerJQLike($scope.order);
                $http.defaults.headers.post = {'Content-Type': 'application/x-www-form-urlencoded'};
                $http
                    .post('data/order_add.php?', result)
                    .success(function (data) {
                        if (data[0].msg == 'succ') {
                            // sessionStorage.setItem('phone', $scope.order.phone);
                            $scope.succMsg = "下单成功，订单编号为:" + data[0].oid;
                            $scope.data.totalNumInCount = 0;
                        }
                        else {
                            $scope.errMsg = "下单失败";
                        }
                    })
            }
        }
    ]);

app.controller('myOrderCtrl', ['$scope', '$http', '$LoginOperate', '$httpKfl',
    function ($scope, $http, $LoginOperate, $httpKfl) {
        //console.log('in myOrderCtrl ');
        if ($LoginOperate.checkLoginFlag() == -1) {
            //console.log('未登录');
            $scope.jump('login', {name: 'myOrder'});
            return;
        }
        $httpKfl.sendRequest('data/order_getbyuserid.php?userid=1', function (dataServer) {
            $scope.orderList = dataServer.data;
        })
    }]);

app.controller("myCartCtrl", ["$scope", '$http', '$LoginOperate', '$httpKfl',
    function ($scope, $http, $LoginOperate, $httpKfl) {
        if ($LoginOperate.checkLoginFlag() == -1) {
            //console.log('未登录');
            $scope.jump('login', {name: 'myCart'});
            return;
        }

        $scope.hasDish = true;
        $scope.editEnable = false;
        $scope.editShowMsg = "编辑";
        $scope.hasChange = false;
        $scope.funcToggleEdit = function () {
            $scope.editEnable = !$scope.editEnable;
            if ($scope.editEnable) {
                $scope.hasChange = false;
                $scope.editShowMsg = "完成";
            }
            else {
                $scope.editShowMsg = "编辑";
            }
        };

        $httpKfl.sendRequest('data/cart_select.php?uid=' + sessionStorage.getItem('id'), function (dataServer) {

            $scope.cart = dataServer.data;
            if ($scope.cart.length == 0) {
                $scope.hasDish = false;
            }
            else {
                $scope.data.totalNumInCount = 0;
                angular.forEach($scope.cart, function (value, key) {
                    $scope.data.totalNumInCount += parseInt(value.dishCount);
                })

            }
        });

        $scope.updateToServer = function (did, count) {
            $httpKfl.sendRequest('data/cart_update.php?did=' + did + "&count=" + count + "&uid=" + sessionStorage.getItem('id'), function (data) {
                $scope.data.totalNumInCount = 0;
                angular.forEach($scope.cart, function (value, key) {
                    $scope.data.totalNumInCount += parseInt(value.dishCount);
                })
            })
        };

        $scope.add = function (index) {
            $scope.hasChange = true;
            $scope.cart[index].dishCount++;
            $scope.updateToServer($scope.cart[index].did, $scope.cart[index].dishCount);
        };
        $scope.delete = function (index) {
            $scope.hasChange = true;
            var num = $scope.cart[index].dishCount;
            num--;
            if (num <= 0) {
                num = 1;
            }
            else {
                $scope.cart[index].dishCount = num;
                $scope.updateToServer($scope.cart[index].did, $scope.cart[index].dishCount);
            }
        };
        $scope.sumAll = function () {
            var sum = 0;
            angular.forEach($scope.cart, function (value, index) {
                sum += value.dishCount * value.price;
            });
            return sum;
        };

        $scope.jumpToOrder = function () {
            var str = angular.toJson($scope.cart);
            $scope.jump('order', {data: str});
        }
    }]);

app.controller('settingCtrl', ['$ionicModal', '$scope', function ($ionicModal, $scope) {

    $ionicModal.fromTemplateUrl('tpl/about.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.modal = modal;
    });
    $scope.open = function () {
        $scope.modal.show();
    };
    $scope.hide = function () {
        $scope.modal.hide();
    }
}]);


















