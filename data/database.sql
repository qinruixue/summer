SET NAMES 'utf8';

USE app_smallkitch;
CREATE TABLE k_dish(
    did INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(64),
    price FLOAT(6,2),
    img_sm VARCHAR(64),
    img_lg VARCHAR(64),
    detail VARCHAR(2048),
    material VARCHAR(2048)
);
INSERT INTO k_dish(did,img_sm,img_lg,name,price,material,detail) VALUES
(   null,
    'p0281.jpg',
    'p0281-l.jpg',
    '【水煮肉片】',
    36,
    '猪里脊肉,绿豆芽唐菜,唐菜,油,盐,料酒,淀粉,味精,五香粉,郫县豆瓣酱,小葱,香菜,干红辣椒,生抽',
    '猪里脊肉具有补肾养血、滋阴润燥。猪里脊肉富含铁，是人体血液中红细胞的生成和功能维持所必须的。………… '
),
(   null,
    'p2679.jpg',
    'p2679-l.jpg',
    '【宫保鸡丁】',
    16.5,
    '鸡胸肉,花生米,淀粉,酱油,白糖,醋,料酒,生姜,葱,蒜辣,椒',
    '鸡胸肉是鸡肉中属于蛋白质含量较多的部位。鸡胸肉是在胸部里侧的肉，形状像斗笠。肉质细嫩，滋味鲜美，营养丰富，能滋补养身。'
),
(   null,
    'p8489.jpg',
    'p8489-l.jpg',
    '【小米椒爆炒小公鸡】',
    32,
    '三黄鸡、杭椒、干红椒、新鲜小米椒、麻椒、八角、香叶、葱、姜、生抽',
    '算起来有一个星期没有更新了，忙着赶紧完成手头的工作，和孩子一起开启度假模式。我总是毫不避讳地称自己为吃货，对于我来说，度假中缺少美食是万万不可的。想要找一个风景与美食兼顾的度假地点可不太容易，工作之余忙着查路线，查攻略，总算是定好了目的地。其实我这个嗜辣族最想去的还是成都重庆一带，考虑到季节的原因，还是留到冬天再前往吧。今天上一道火辣辣的小米椒爆炒小公鸡，虽在家中，也是十足的过了把食辣的瘾，不擅吃辣的伙伴们做这道菜的时候可要记得减少辣椒的用量哦。'
),
(   null,
    'p7818.jpg',
    'p7818-l.jpg',
    '【口袋饼】',
    6.5,
    '面粉、黄瓜、香肠、热水、土豆、盐、醋、生抽、油。',
    '热水和面！面团擀成薄薄的面片之后切成长条，之后中间抹油！折叠之后用手把两边按扁，使其黏到一起！如图！然后用刀背划出花边！平底锅抹油小火煎制口袋饼，两边烙上金黄色即可！土豆切丝！黄瓜和香肠切条状！炒土豆丝，放入盐，醋和生抽炒均匀就可以了，然后放入烙好的口袋饼里，放入黄瓜和香肠即可！'
),
(   null,
    'p9138.jpg',
    'p9138-l.jpg',
    '【酸菜鱼】',
    32,
    '草鱼,四川泡菜,葱,泡姜,大蒜,泡椒,金针菇,料酒,水,鸡精,水淀粉,蛋清,胡椒粉,盐,野山椒,糖',
    '草鱼含有丰富的硒元素，经常食用有抗衰老、养颜的功效，而且对肿瘤也有一定的防治作用；草鱼含有丰富的不饱和脂肪酸，对血液循环有利，是心血管病人的良好食物；。'
),
(   null,
    'p4788.jpg',
    'p4788-l.jpg',
    '【川味粉蒸肉】',
    35,
    '五花肉 红薯 自制蒸肉粉 白糖1勺 盐，生抽1勺，老3勺 蚝油1勺 粽叶4张 郫县豆瓣酱2勺 料酒1勺',
    '嫩嫩的五花肉，搭配上好米粉，精致的调配，让您的味蕾仿佛回到初恋般的感觉'
),
(   null,
    'p7933.jpg',
    'p7933-l.jpg',
    '【放心油条】',
    1.5,
    '面粉、安琪油条膨松剂、温水、植物油。',
    '自己炸的油条不含明矾，也不用担心地沟油，吃的比较放心。准备中筋粉，油条膨松剂和植物油。面粉和膨松剂混合均匀，加入50-60度温水搅拌。揉成光滑的面团，盖上保鲜膜醒30分钟左右。将醒发好的面团切成长形小剂子，两个叠在一起用筷子按压一下。用手捏住两头抻拉一下，放入7成热（约180-200度）的油锅中炸至金黄即可。'
),
(   null,
    'p6611.jpg',
    'p6611-l.jpg',
    '【蒸饺】',
    12,
    '鸡蛋、豆角酱肉馅、西红柿鸡蛋馅、猪生抽、生抽、海鲜酱油、糖、盐',
    '昨天突然好想吃蒸饺，但是貌似没听过北京哪家蒸饺好吃，于是决定自己做啦，重要的事最近爱上做饭，能与大家分享美食乐趣也让我又燃起了烹饪的热情。想必最好吃的东西还是自己家的家常便饭！面粉300克，开水100ml左右（这个量可以在和面的时候自己调节下，蒸饺一定是烫面的）鸡蛋一个，我是用面包机和的面团，准备其他馅时一直在醒面（半小时内）。豆角酱肉馅：做法见我的豆角酱肉卤菜谱'
);
##SELECT * FROM k_dish;
/*用户表*/
CREATE TABLE k_users(
    userid INT PRIMARY KEY AUTO_INCREMENT, /*购物车编号*/
    uname VARCHAR(20),                     /*用户名*/
    pwd VARCHAR(20),                       /*密码*/
    phone VARCHAR(20)                      /*电话*/
);
INSERT INTO k_users VALUES
(NULL,'mary','11111','13111112345'),
(NULL,'jerry','22222','13819196547'),
(NULL,'john','33333','13819196547');
/*订单表*/
CREATE TABLE k_order(
    oid INT PRIMARY KEY AUTO_INCREMENT,     /*订单ID*/
    userid INT,                             /*用户*/
    phone VARCHAR(16),                      /*联系电话*/
    user_name VARCHAR(16),                  /*收货方用户名*/
    order_time LONG,                        /*下单时间*/
    addr VARCHAR(256),                      /*订单地址*/
    totalprice FLOAT(6,2)                   /*订单总价*/
);
INSERT INTO k_order VALUES
(NULL,1,'13501234567','汤姆',1445154859209,'北京',20.5),
(NULL,1,'13501257543','米老鼠',1445154997543,'上海',12.5),
(NULL,2,'13207654321','东哥',1445254997612,'深圳',55),
(NULL,2,'13899999999','孙悟空',1445354959209,'武汉',35),
(NULL,3,'13683675299','唐老鸭',1445355889209,'重庆',45);
/**购物车表**/
CREATE TABLE k_cart(
    ctid INT PRIMARY KEY AUTO_INCREMENT, /*购物车编号*/
    userid INT,                          /*用户编号：假定有用户id为 1 和 3 的两个用户有数据*/
    did INT,                             /*产品编号*/
    dishCount INT                      /*数量*/
);
INSERT INTO k_cart VALUES (1,1,1,1),
(2,1,2,4),
(3,1,5,2),
(4,3,2,10),
(5,3,6,1);
##SELECT * FROM k_order;
/**订单详情表**/
CREATE TABLE k_orderdetails(
    oid INT ,                            /*订单编号*/
    did INT,                             /*产品id*/
    dishCount INT,                     /*购买数量*/
    price FLOAT(8,2)                     /*产品单价：需要记载，因为产品价格可能波动*/
);
INSERT INTO k_orderdetails VALUES (1,1,2,5),
(1,2,1,10.5),
(2,3,1,12.5),
(3,1,3,5),
(3,2,4,10),
(4,4,7,5),
(5,5,5,4),
(5,6,2,12.5);
