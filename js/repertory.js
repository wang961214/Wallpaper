/**
 * Created by Administrator on 2017/10/18.
 */
$.fn.extend({
    waterfall:function(child){//---父级
        //---定义一个指针
        var $_this = this;
        //---获取父级的宽
        var totalWidth = $_this.width();
        var itemWidth = $_this.children(child).width();
        //---一行中可以放几列--向下取整
        var colCount = Math.floor(totalWidth/itemWidth);
        //---为了美化，左右上下一般有间距---margin--可以自己指定，也可以自动生成
        var margin = Math.floor((totalWidth-itemWidth*colCount)/(colCount+1));
        // console.log(margin);

        //---定义一个高度的数组--top-距离父级的高度---(left/top);
        var heightArr=[];//---一行图片的高度
        for(var i=0;i<colCount;i++){
            heightArr.push(margin);//-------初始高度
        }
        console.log(heightArr);

        //---设置子元素的top和left--定位
        $_this.children(child).each(function(index,element){
            var $_item = $(element);//---代表每个子元素

            //---定义一行子集中高度最小的索引为minindex
            var minIndex = 0;//---假设第一个元素就是最低的
            var minHeight = heightArr[0];

            //---高度数组每个元素跟minHeight对比
            for(var i=0;i<heightArr.length;i++){
                if(minHeight>heightArr[i]){
                    minHeight=heightArr[i];//---此时的minHeight才是最小值
                    minIndex = i;//---记住最小高度的索引
                }
            }
            $_item.css({
                top:minHeight,
                left:margin+(margin+itemWidth)*minIndex
            });
            //---修改高度数组中的值heightArr[]
            heightArr[minIndex]+=$_item.height()+margin;
        });

        //---判断高度数组中的最大值，付给父级--同时，也就知道哪个元素最高
        var maxHeight = heightArr[0];//---假设
        for(var i=0;i<heightArr.length;i++){
            if(maxHeight<heightArr[i]){
                maxHeight=heightArr[i];
            }
        }
        $_this.height(maxHeight);
    }
});