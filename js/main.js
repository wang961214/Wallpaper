/**
 * Created by Administrator on 2017/10/17.
 */
$(function () {
    //-----图片阴暗
    $("div.search").on("mouseenter", function () {
        $(this).children("img,p").stop(true, true).animate({
            opacity: "0.3"
        }, 500);
        $(this).find("a>img").stop(true, true).animate({
            opacity: "0.9"
        }, 500);
        $(this).find("a").on("click", function () {
            var imgSrc = $(this).parent().children("img").get(0).src;
            var Arr = [];
            Arr = imgSrc.split("/");
            imgSrc = Arr[4] + "/" + Arr[5];
            $(this).attr("href", "show.html?url=" + imgSrc);
        });
    });
    $("div.search").on("mouseleave", function () {
        $(this).children("img,p").stop(true, true).animate({
            opacity: "1"
        }, 200);
        $(this).find("a>img").stop(true, true).animate({
            opacity: "0"
        }, 200);
    });
    //------百度提示
    $("#search").on("keyup", function () {
        if ($(this).val() != '') {
            var $Script = $('<script><\/script>');
            var Url = 'http://suggestion.baidu.com/su?wd=' + $(this).val() + '&cb=callback';
            $Script.attr('src', Url);
            $(document).append($Script);
        } else {
            $('ul#secbox').hide();
        }
    });
});
//------百度提示
function callback(data) {
    $('ul#secbox').html('');
    var str = '';
    if (data.s.length) {
        for (var i = 0; i < data.s.length; i++) {
            str += '<li><a href="http://www.baidu.com/s?wd=' + data.s[i] + '">' + data.s[i] + '</a></li>';
        }
        $('ul#secbox').html(str).slideDown();
    } else {
        $('ul#secbox').hide();
    }
}
//----禁止右击事件
$(document).on('contextmenu', "img", function (e) {
    if($("#login2").html()==="Login"){
        e.preventDefault();
        alert('保存图片请先登录！');
    }
});
//------登录
$(function () {
   $("#login2").on("click",function () {
       $("#login3").slideDown(500);
       $("#dl").on("click",function () {
           var obj={
               username:$("#name2").val(),
               password:$("#pwd3").val()
           };
           var Data=$.param(obj);
           $.ajax({
               url:"password.php",
               dataType:"text",
               type:"get",
               data:Data,
               success:function (dat) {
                    if(dat==0){
                        alert("登录失败！");
                    }else{
                        $("#login2").html($("#name2").val());
                        $("#login3").html(" ");
                    }
               }
           });
           $("#login3").slideUp(500);
       });

   }) ;
});
//--------注册模态框部分----正则表达式
$(function () {
    $("#login").on("click",function () {
        $(".model").css({
            display:"block"
        });
        $(".mb").css({
            display:"block"
        })
    });
    $(".model>.md-head>i").on("click",function () {
        $(".model").css({
            display:"none"
        });
        $(".mb").css({
            display:"none"
        });
    });
    var regs = {
        //---用户名--字母、数字、中文，-_ ,{4,20}
        userNameReg: /^(([\u4e00-\u9fa5])|[a-zA-Z0-9]){4,20}$/,
        //---密码--{6,20}字符
        pwdReg: /^.{6,20}$/,
        //---邮箱
        emailReg: /^[a-zA-Z\d]+([-_.][A-Za-z\d]+)*@([a-zA-Z\d]+[-.])+[a-zA-Z\d]{2,5}$/,
        //---密码等级
        numReg: /\d/,
        strReg: /[a-zA-Z]/,
        tsReg: /[^\u4e00-\u9fa5a-zA-Z0-9]/
    };
    var userName = $('#userName');
    var pwd = $('#pwd');
    var pwd2 = $('#pwd2');
    var email = $('#email');
    var ck = $('#ck');
    var btn = $('#btn');
    userName.on("keyup focus blur", function (ev) {
        var Event = ev || window.event;
        checkUserName(Event);
    });
    function checkUserName(Event) {
        var type;
        if (Event) {
            type = Event.type;
        }
        var value = userName.val();
        var box = userName.parent();
        var tip = box.next();
        var span = tip.find("span");
        if (type === "focus") {
            if(value===''){
                box.attr("class",'box-one');
                tip.attr("class",'box-two default');
                span.html('格式为：字母、数字、中文，-_ 的组合,4-20位');
                return false;
            }
        }
        if(type==='blur'){
            if(value===''){
                box.attr("class",'box-one');
                tip.attr("class",'box-two hide');
                return false;
            }
        }
        //---出错情况
        if(value===''){
            box.attr("class",'box-one error');
            tip.attr("class",'box-two error');
            span.html('用户名不能为空');
            return false;
        }else if(regs.userNameReg.test(value)){
            box.attr("class",'box-one right');
            tip.attr("class",'box-two hide');
            return true;
        }else{
            box.attr("class",'box-one error');
            tip.attr("class",'box-two error');
            span.html('格式错误，格式为：字母、数字、中文，-_ 的组合,4-20位');
            return false;
        }

    }
    pwd.on("keyup focus blur", function (ev) {
        var Event = ev || window.event;
        checkPwd(Event);
    });
    function checkPwd(Event) {
        var type;
        if (Event) {
            type = Event.type;
        }
        var value = pwd.val();
        var box = pwd.parent();
        var tip = box.next();
        var span = tip.find("span");
        if (type === "focus") {
            if(value===''){
                box.attr("class",'box-one');
                tip.attr("class",'box-two default');
                span.html('建议使用字母、数字和符号的组合，6-20位');
                return false;
            }
        }
        if(type==='blur'){
            if(value===''){
                box.attr("class",'box-one');
                tip.attr("class",'box-two hide');
                return false;
            }
        }
        //---出错情况
        if(value===''){
            box.attr("class",'box-one error');
            tip.attr("class",'box-two error');
            span.html('密码不能为空');
            return false;
        }else if(regs.pwdReg.test(value)){
            box.attr("class",'box-one right');
            // tip.attr("class",'box-two hide');
            var level = getPwdLevel(value);
            switch(level){
                case 1:
                    tip.attr("class",'box-two ruo');
                    span.html('建议修改密码');
                    break;
                case 2:
                    tip.attr("class",'box-two zhong');
                    span.html('可以使用');
                    break;
                case 3:
                    tip.attr("class",'box-two qiang');
                    span.html('非常完美');
                    break;
            }
            return true;
        }else{
            box.attr("class",'box-one error');
            tip.attr("class",'box-two error');
            span.html('密码应在6-20之间的字符');
            return false;
        }

    }
    function getPwdLevel(pwd){
        var level = 0;
        var numReg=true;
        var strReg=true;
        var tsReg=true;
        for(var i=0;i<pwd.length;i++){
            if(numReg&&regs.numReg.test(pwd[i])){
                level++;
                numReg=false;
                continue;
            }
            if(strReg&&regs.strReg.test(pwd[i])){
                level++;
                strReg=false;
                continue;
            }
            if(tsReg&&regs.tsReg.test(pwd[i])){
                level++;
                tsReg=false;
            }
        }
        return level;
    }
    pwd2.on("keyup focus blur", function (ev) {
        var Event = ev || window.event;
        checkPwd2(Event);
    });
    function checkPwd2(Event) {
        var type;
        if (Event) {
            type = Event.type;
        }
        var value1=pwd.val();
        var value = pwd2.val();
        var box = pwd2.parent();
        var tip = box.next();
        var span = tip.find("span");
        if (type === "focus") {
            if(value===''){
                box.attr("class",'box-one');
                tip.attr("class",'box-two default');
                span.html('请再次输入密码');
                return false;
            }
        }
        if(type==='blur'){
            if(value===''){
                box.attr("class",'box-one');
                tip.attr("class",'box-two hide');
                return false;
            }
        }
        //---出错情况
        if(value===''){
            box.attr("class",'box-one error');
            tip.attr("class",'box-two error');
            span.html('请再次输入密码');
            return false;
        }else if(value===value1){
            box.attr("class",'box-one right');
            tip.attr("class",'box-two hide');
            return true;
        }else{
            box.attr("class",'box-one error');
            tip.attr("class",'box-two error');
            span.html('两次密码输入不一致');
            return false;
        }

    }
    email.on("keyup focus blur", function (ev) {
        var Event = ev || window.event;
        checkEmail(Event);
    });
    function checkEmail(Event) {
        var type;
        if (Event) {
            type = Event.type;
        }
        var value = email.val();
        var box = email.parent();
        var tip = box.next();
        var span = tip.find("span");
        if (type === "focus") {
            if(value===''){
                box.attr("class",'box-one');
                tip.attr("class",'box-two default');
                span.html('请输入邮箱，格式类似：ajay_yang@163com');
                return false;
            }
        }
        if(type==='blur'){
            if(value===''){
                box.attr("class",'box-one');
                tip.attr("class",'box-two hide');
                return false;
            }
        }
        //---出错情况
        if(value===''){
            box.attr("class",'box-one error');
            tip.attr("class",'box-two error');
            span.html('邮箱不能为空');
            return false;
        }else if(regs.emailReg.test(value)){
            box.attr("class",'box-one right');
            tip.attr("class",'box-two hide');
            return true;
        }else{
            box.attr("class",'box-one error');
            tip.attr("class",'box-two error');
            span.html('格式错误，必须包含‘ @ ’,‘ . ’等符号');
            return false;
        }

    }
    btn.on("click",function(){
        var box = ck.parent();
        var tip = box.next();
        var span = tip.find("span");
        if(ck.is(":checked")){
            if(checkUserName()&&checkPwd()&&checkPwd2()&&checkEmail()){
                var obj={
                    username:userName.val(),
                    password:pwd.val()
                };
                var Data=$.param(obj);
                $.ajax({
                    url:"username.php",
                    dataType:"text",
                    type:"post",
                    data:Data,
                    success:function () {
                        $("#login").html(" ");
                    }
                });
                alert('注册成功！');
                $(".model").css({
                    display:"none"
                });
                $(".mb").css({
                    display:"none"
                });

            }else{
                alert('填写格式有误，请重新输入');
            }
        }else{
            tip.attr("class",'box-two  error');
            span.html('请先同意协议跳款');
        }
    });
    ck.on("click",function(){
        var box = ck.parent();
        var tip = box.next();
        var span = tip.find("span");
        if(ck.is(":checked")){
            tip.attr("class",'box-two hide');
        }
    });
});