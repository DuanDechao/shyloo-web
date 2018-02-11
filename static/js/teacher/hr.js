/**
 * 简历行家js文件
 * hr.info:存放全局通用属性(常量等)
 *
 * 通用方法和事件结构为 hr.main.xxx();
 * 页面事件结构为 hr.hr_detail_event()

 * 变量命名规范：
 * 1一律使用下横杆 _ 号来分隔英文单词，而不是采用驼峰式写法。
 2常量（声明后不会变化的变量）命名全部字母统一大写，用下横杆 _ 分隔英文
 3函数 / 方法 内 局部变量的命名，添加前缀 _ 号
 4声明变量赋值 jquery 对象或 js 对象时，添加变量名前缀 $ 符号

 * 方法命名规范：按功能命名，命名清晰易懂，规则按统一命名方式
 */

var hr = hr || {};

hr.info = {};
hr.main = {
    check_str:function(type,str){
        var _type_arr = ["phone","tel","number","email"],
            _regEn = /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im,
            _regCn = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im,
            _phone = /^((\+86)|(86))?(13)\d{9}$/,
            _tel = /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/,
            _number = /^[0-9]*$/,
            _email = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        var _type = type, _str = str.replace(/(^\s+)|(\s+$)/g,""), result;
        if(_type_arr.indexOf(_type) < 0){
            console.error("非法检测类型");
            return false;
        }else if(_str == ""){
            console.error("检测字符串不可为空");
            result = {
                type:false,
                info:"输入不可为空"
            };
            return result;
        }else if(_str.indexOf(" ") < 0){
            if(_regCn.test(_str) || _regEn.test(_str)){
                result = {
                    type:false,
                    info:"检测到非法字符"
                };
                return result;
            }else if(_type == "phone"){
                if(_phone.test(_str)){
                    result = {
                        type:true,
                        info: _str
                    };
                    return result;
                }else{
                    result = {
                        type:false,
                        info:"请输入正确的手机号码"
                    };
                    return result;
                }
            }else if(_type == "tel"){
                if(_tel.test(_str)){
                    result = {
                        type:true,
                        info: _str
                    };
                    return result;
                }else{
                    result = {
                        type:false,
                        info:"请输入正确的电话号码"
                    };
                    return result;
                }
            }else if(_type == "number"){
                if(_number.test(_str)){
                    result = {
                        type:true,
                        info: _str
                    };
                    return result;
                }else{
                    result = {
                        type:false,
                        info:"请输入正确的数字"
                    };
                    return result;
                }
            }else if(_type == "email"){
                if(_email.test(_str)){
                    result = {
                        type:true,
                        info: _str
                    };
                    return result;
                }else{
                    result = {
                        type:false,
                        info:"请输入正确的邮箱"
                    };
                    return result;
                }
            }
        }else{
            result = {
                type:false,
                info:"输入内容不可包含空格"
            };
            return result;
        }
    }, //字符串检测，可选类型：phone,tel,number,email
    show_modal:function(obj){
        // var _obj = obj,
        //     _obj.selector = _obj.selector,
        //     _default = {
        //         on_ok:function(dom){
        //             dom.fadeOut();
        //         },
        //         on_cancel:function(dom){
        //             dom.fadeOut();
        //         }
        //     };
        // if(undefined == _obj.selector || _obj.selector == "" || $(_obj.selector).length <= 0){
        //     console.error("非法选择器");
        //     return false
        // }else if(!$(_obj.selector).hasClass("reuse_modal_outer") || $(_obj.selector).find(".modal").length <= 0){
        //     console.error("非法选择器");
        //     return false
        // }else{
        //     _obj.on_ok = _obj.on_ok || _default.on_ok;
        //     _obj.on_cancel = _obj.on_cancel || _default.on_cancel;
        //     var $this = $(_obj.selector);
        //     $this.fadeIn();
        //     $this.find("modal_ok").on("click",_obj.on_ok())
        //
        // }
    }, // 唤起弹框(未完成)
    text_area_count:function(){
        $(".text_area_list textarea").on("input",function(){
            var _length = $(this).val().length, _max_length = Number($(".text_area_list .text_count .max_count").text());
            $(".text_area_list .text_count i").text(_length);
            if(_length >= _max_length){
                $(".text_area_list .text_count i").css("color","red");
            }else{
                $(".text_area_list .text_count i").css("color","#d3d9e0");
            }
        })
    },   // 输入文本域计数器
    hide_pro:function(){//进度条隐藏
		$("#upload-progress").hide();
	},
	show_pro:function(pro){//进度条显示
		$("#upload-progress").show();
		setTimeout(function(){
			if(pro.val<20){
				pro.update(20);
			}
            setTimeout(function(){
            	if(pro.val<40){
                	pro.update(40);
                }
                setTimeout(function(){
                	if(pro.val<60){
                   	 pro.update(60);
                    }
                    setTimeout(function(){
                      if(pro.val<80){
                        	pro.update(80);
                       }
                    },1000);
                },1000);
            },1000);
        },1000);
        
	},
	//支付提示框显示
	pay_tips_show:function(){
		common.main.resume_confirm({
			title:"",
			content_html:"<h2>请在你新打开的页面上完成付款</h2><p>支付完成后，请根据您支付的情况点击下面按钮。</p>",					
			modal_class:"pay_tips_modal_content",
			ok:"支付完成",
			cancel:"支付遇到问题",
			onOk:function(){
				location.href="/member/order/?orderType=hr";
			},
			onCancel:function(){
				location.href="http://help.500d.me";
			}
	    });	
	},
	 //支付框
	hide_pay_modal:function(){
		$("#hr-order-modal").stop().hide();
		$("body").removeAttr("style")
	},
	show_pay_modal:function(){
		$("#hr-order-modal").stop().show();
		$("body").css("overflow","hidden");
	},
	detail_footer_position:function(){
	    var $footer = $(".jl-index_bottom1"), _window_height = $(window).height(), _inner_height = $(".resume_task_detail .jl-header").height() + $(".resume_task_detail .task_text_nav").height() + $(".resume_task_detail .main_contain").height() + $footer.height() + 60;
	    if(_window_height > _inner_height){
	        $footer.css({"position":"absolute", "bottom":0, "left":0, "zIndex":1,"background":"#f6f6f6"})
        }else{
	        $footer.appendTo($(".resume_task_detail"));
            $(".resume_task_detail").css("padding-bottom",0);
        }
    }
};
hr.event = {
    index:function(){
    	//登录检测事件
    	$(".login_href").click(function(){
    		if($.checkLogin()){
    			location.href=$(this).attr("data-href");
    		}else{
    			show_login_modal();
    		}
    	});
    	//我的任务按钮
    	$(".index_my_task").click(function(){
    		if($.checkLogin()){
    			$.get("/hr/my_task_type/",function(data){
    				if(data==0){
    					show_login_modal();
    				}else if(data==1){
    					location.href="/member/hr/hr_task/";
    				}else if(data==2){
    					location.href="/member/order/?orderType=hr";
    				}else{
    					location.href="/hr/select_publish_type/";
    				}
    			})
    		}else{
    			show_login_modal();
    		}
    	});
    	//首页广告替换
    	if($("#index_ad_hr_list").length>0){
    		$("#index_hr_list_li li.reuse_hr_card").eq(4).after($("#index_ad_hr_list"));
    		$("#index_hr_list_li li:last").remove();
    	}
        var time_out_comment = setTimeout(function(){index_comment_carousel()},3000),
            time_out_hr = setTimeout(function(){index_hr_carousel()},3000);
        if($(".index_hr_carousel_bar .index_hr_carousel_list").length <=1){
            $(".index_hr_carousel_bar .index_hr_carousel_pointer").hide();
        }else{
            for(var i=0; i<$(".index_hr_carousel_bar .index_hr_carousel_list").length; i++){
                var $inner = $("<span></span>");
                $inner.appendTo($(".index_hr_carousel_pointer"));
            }
            $(".index_hr_carousel_pointer span").eq(0).addClass("selected")
            var $first = $(".index_hr_carousel_bar .index_hr_carousel_list").eq(0);
            $first.addClass("show_carousel");
            var $hr_carousel = $("<a></a>").addClass("index_hr_carousel_list").attr("href",$first.attr("href")).html('<img src="'+$first.find("img").attr("src")+'" alt="">');
            $hr_carousel.appendTo($(".index_hr_carousel_bar"));
        }   //判断hr广告位广告图个数
        function index_comment_carousel(type){
            var _type = type || false;
            var _list_width = $(".comment_carousel_contain").width(),
                $this = $(".comment_carousel_contain ul"),
                _show_index;
            if(_type && _type === "left" && !$this.hasClass("carousel")){
                clearTimeout(time_out_comment);
                _show_index = $(".index_comment_carousel_list.show_carousel").index();
                if(_show_index === 0){
                    $this.css("left","-"+ 5*_list_width +"px").addClass("carousel").animate({left:"-"+ 4*_list_width + "px"},function(){
                        $this.removeClass("carousel")
                        $(".index_comment_carousel_list").eq(4).addClass("show_carousel").siblings().removeClass("show_carousel");
                    })
                }else{
                    var _left = Number($this.css("left").slice(0,-2));
                    $this.addClass("carousel").animate({left:(_left + _list_width) +"px"},function(){
                        $this.removeClass("carousel");
                        $(".index_comment_carousel_list").eq(--_show_index).addClass("show_carousel").siblings().removeClass("show_carousel");
                    })
                }
            }else if(_type && _type === "right" && !$this.hasClass("carousel")){
                clearTimeout(time_out_comment);
                _show_index = $(".index_comment_carousel_list.show_carousel").index() +1;
                if(_show_index === 5){
                    $this.addClass("carousel").animate({left:"-"+ 5*_list_width + "px"},function(){
                        $this.removeClass("carousel");
                        $this.css("left","0px");
                        $(".index_comment_carousel_list").eq(0).addClass("show_carousel").siblings().removeClass("show_carousel");
                    })
                }else{
                    var _left = Number($this.css("left").slice(0,-2));
                    $this.addClass("carousel").animate({left:(_left - _list_width) +"px"},function(){
                        $this.removeClass("carousel");
                        $(".index_comment_carousel_list").eq(_show_index).addClass("show_carousel").siblings().removeClass("show_carousel");
                    })
                }
            }else{
                _show_index = $(".index_comment_carousel_list.show_carousel").index()+1;
                if(0 <= _show_index && _show_index < 5){
                    $this.addClass("carousel").animate({left: "-"+(_show_index*_list_width) +"px"},function(){
                        $this.removeClass("carousel");
                        $(".index_comment_carousel_list").eq(_show_index).addClass("show_carousel").siblings().removeClass("show_carousel");
                        clearTimeout(time_out_comment);
                        time_out_comment =  setTimeout(function(){index_comment_carousel()},3000);
                    })
                }else{
                    $this.addClass("carousel").animate({left: "-"+(_show_index*_list_width) +"px"},function(){
                        $this.removeClass("carousel")
                        $this.css("left","0px");
                        $(".index_comment_carousel_list").eq(0).addClass("show_carousel").siblings().removeClass("show_carousel");
                        clearTimeout(time_out_comment);
                        time_out_comment =  setTimeout(function(){index_comment_carousel()},3000);
                    })
                }
            }
        }   //好评轮播图方法
        function index_hr_carousel(index){
            clearTimeout(time_out_hr);
            var _index = index || false,
                _list_width = $(".index_hr_carousel_list").width(),
                $this = $(".index_hr_carousel .index_hr_carousel_bar"),
                $pointer = $(".index_hr_carousel_pointer span"),
                _max_index = $(".index_hr_carousel_bar .index_hr_carousel_list").length,
                _show_index;
            if(_max_index > 1 && !$this.hasClass("carousel")){
                if(_index){
                    $this.addClass("carousel").animate({left:"-"+ _index*_list_width +"px"},function(){
                        $this.removeClass("carousel");
                        $(".index_hr_carousel_list").eq(_index).addClass("show_carousel").siblings().removeClass("show_carousel");
                        $pointer.eq(_index).addClass("selected").siblings().removeClass("selected");
                        time_out_hr = setTimeout(function(){index_hr_carousel()},3000);
                    })
                }else{
                    _show_index = $(".index_hr_carousel_list.show_carousel").index();
                    if(_show_index === (_max_index-2)){
                        $this.addClass("carousel").animate({left: "-"+ (_max_index -1)*_list_width +"px"},function(){
                            $this.removeClass("carousel").css("left","0px");
                            $(".index_hr_carousel_list").eq(0).addClass("show_carousel").siblings().removeClass("show_carousel");
                            $pointer.eq(0).addClass("selected").siblings().removeClass("selected");
                            time_out_hr = setTimeout(function(){index_hr_carousel()},3000);
                        })
                    }else{
                        _show_index = ++_show_index;
                        $this.addClass("carousel").animate({left:"-"+ _show_index*_list_width +"px"},function(){
                            $this.removeClass("carousel");
                            $(".index_hr_carousel_list").eq(_show_index).addClass("show_carousel").siblings().removeClass("show_carousel");
                            $pointer.eq(_show_index).addClass("selected").siblings().removeClass("selected");
                            time_out_hr = setTimeout(function(){index_hr_carousel()},3000);
                        })
                    }
                }
            }
        }   //hr 广告位轮播

        index_comment_carousel();   //初始化好评轮播图
        index_hr_carousel();   //初始化hr广告位轮播图
        $(".index_comment_carousel .comment_carousel_left").click(function(){
            index_comment_carousel("left")
        }); //上一张点击事件
        $(".index_comment_carousel .comment_carousel_right").click(function(){
            index_comment_carousel("right")
        });  //下一张点击事件
        $(".index_hr_carousel_pointer span").click(function(){
            var _index = $(this).index();
            index_hr_carousel(_index);
        });  //广告位轮播图小点点击事件
        $(".industry").each(function(){
	   		var _text=$(this).text();
	   		var _value=_text.replace(/,/gm, "/");
	   		$(this).text(_value);
	    });
    }, //首页事件绑定
    select_publish_type:function(){
    	$(".task_type>div").on("click",function(){
    		$(this).toggleClass("selected").siblings().removeClass("selected");
    		// 在任务类型上需要添加标识，获取标识赋值跳转链接
    		$(".next").attr("href","/hr/publish_"+$(this).attr("data-type")+"/");
    	})
    }, // 选择任务类型页事件绑定
    publish_job:function(){
        function city_select_listener(e){
            var $target = $(e.target);
            if(!$target.hasClass("open_city_select") || $target.parents(".open_city_select").length <= 0){
                $(".open_city_select").removeClass("open_city_select");
                $("body").off("click",city_select_listener)
            }
            e.stopPropagation();
        } // 城市选择器事件监听
        $(".job_city_list .job_city_select").click(function(e){
            $(this).toggleClass("open_city_select");
            $("body").on("click",city_select_listener);
            e.stopPropagation();
        }); // 展开城市选择器
        $(".select_city_list li").click(function(e){
            var $this = $(this), $parent = $(this).parents(".job_city_select ");
            $this.addClass("selected").siblings().removeClass("selected");
            $(".job_city_select>span").text($this.text()).css("color","#586877");
            $(".job_city_select>input[type=hidden]").attr("data-value",$this.attr("data-value"));
            $parent.removeClass("open_city_select")
            e.stopPropagation();
        }); //城市选择器子项点击事件绑定
        $(".input_resume_ask_field input").on("keypress blur",function(e){
            if(e.keyCode==13||e.type=="blur"){
            var text = $(this).val(), _test =  /^[a-zA-Z0-9_\u4e00-\u9fa5]+$/;
            if(text.length > 0 && !_test.test(text)){
                    $(this).parents("li").addClass("wrong_input");
                }else{
                    $(this).parents("li").removeClass("wrong_input");
                    if(text.length==0){
                    	return ;
                    }
                    if(text.length > 5){
                        layer.msg("字数限制5个字以内");
                    }else if($(".add_field span").length >= 3){
                        layer.msg("最多3个领域");
                    }else{
                        var $inner = $("<span></span>").text(text +"");
                        $inner.appendTo($(".job_ask_field .add_field"));
                        var _padding = $(".job_ask_field .add_field").width();
                        $(".job_field_list .job_ask_field").css("padding-left",_padding +"px");
                        $(this).val("")
                    }
                }
            }
        }).on("input",function(){
            $(".input_resume_ask_field label").hide();
        }).on("blur",function(){
            if($(".add_field span").length > 0 || $(this).val().length > 0){
                $(".input_resume_ask_field label").hide();
            }else{
                $(".input_resume_ask_field label").show();
            }
        }).on("keydown",function(e){
            var text = $(this).val();
            if(e.keyCode == 8 && text.length <= 0 && $(".add_field span").length > 0){
                $(".add_field span:last").remove();
                var _padding = $(".resume_task_ask_contain .add_field").width();
                $(".resume_task_ask_contain .resume_ask_field").css("padding-left",_padding +"px");
            }
        }); //行业领域输入框相关事件
        $(".job_upload_resume_list .upload_resume").on("click",function(){
            $(".upload_resume_modal").show();
            $("body").css("overflow","hidden")
        }); // 唤起上传简历弹框
        $("body").on("click",".upload_resume_modal .modal_header i, .upload_resume_modal .modal_cancel ",function(){
            $(".upload_resume_modal").hide();
            $("body").removeAttr("style");
            var _is_change= $("input[name='uploaded_resume']").attr("is_change");
            if(!common.main.is_empty(_is_change)&&_is_change=="true"){
            	//初始化
            	$(".upload_resume_modal .local_resume_message a").trigger("click");
            	$("#upload_resume_tips").addClass("hidden");
            	$("input[name='uploaded_resume']").val("");
            }else{
            	
            }
            $("input[name='uploaded_resume']").attr("is_change","false");
        });  //关闭上传简历弹框
        $("body").on("click",".upload_resume_modal .modal_ok",function(){
        	var _uploaded_resume= $("input[name='uploaded_resume']").val();
        	if(!common.main.is_empty(_uploaded_resume)){
        		$("#upload_resume_tips").removeClass("hidden");
        		$(".upload_resume_modal").hide();
            	$("body").removeAttr("style");
        	}else{
        		layer.msg("请上传的简历或选择简历~");
        	}
        	$("input[name='uploaded_resume']").attr("is_change","false");
        });// 职位下单确定按钮点击事件
        //简历上传
        $("#upload_local").live('change', function(){
        	var $this=$(this);
			var _name = $(this).val();
			$(".local_resume_message").find("span").text(_name);
			var _fileName = _name.substring(_name.lastIndexOf("\\") + 1);
			var _fileType = _name.substring(_name.lastIndexOf(".") + 1);
			if(_fileType.toLocaleLowerCase() != "doc" && _fileType.toLocaleLowerCase() != "docx" && _fileType.toLocaleLowerCase() != "zip" && _fileType.toLocaleLowerCase() != "rar") {
				layer.msg("只支持doc，docx，zip，rar文件格式！");
				return;
			}
			$.ajaxFileUpload({
	            type: 'post',
	            secureuri : false,
	            dataType : 'content',
	            fileElementId : 'upload_local',
	            url : '/file/upload/',
	            data : {"token" : getCookie("token")},
	            success : function(data, status) {
	            	if(data == "error"){
	            		layer.msg("上传失败！");
	            	}else {
	            		if($.browser.msie) {
	            			if(data.indexOf('<PRE>') >= 0) {
	            				data = data.substring(5);
	            				data = data.substring(0, data.length - 6);
	            			}
	            		}
	        			$("input[name='uploaded_resume']").val(data);
	        			$("input[name='uploaded_resume']").attr("is_change","true");
	        			$(".upload_resume").removeClass("chose_local_resume").addClass("upload_local_resume");
	        			$("#upload_resume_tips").find("span").text(_name);
	            	}
	            },
	            error: function (data, status, e) {
	                layer.msg("发生错误" + e);
	            }
	        });
		});
        $(".upload_resume_modal .upload_type_chose input").on("click",function(){
            var _this_id = $(this).attr("id"), $this = $(".upload_resume_modal .upload_resume");
            if($(".upload_resume").hasClass("upload_local_resume")&&_this_id === "upload_type_2"){
        		layer.msg("已上传简历，不能选择在线简历~");
        		return false;
        	}
            if(_this_id === "upload_type_1" && !$this.hasClass("upload_local_resume")){
                $this.addClass("chose_local_resume").removeClass("chose_online_resume");
            }else if(_this_id === "upload_type_2"){
                $this.addClass("chose_online_resume").removeClass("chose_local_resume");
            }
        });  //选择上传简历类型
        function resume_select_listener(e){
            var $target = $(e.target);
            if(!$target.hasClass("open_resume_select") || $target.parents(".open_resume_select").length <= 0){
                $(".open_resume_select").removeClass("open_resume_select");
                $("body").off("click",resume_select_listener)
            }
            e.stopPropagation();
        }   //选择在线简历事件监听
        $(document).on("click",".chose_online_resume .chose_resume",function(e){
            $(this).toggleClass("open_resume_select");
            $("body").on("click",resume_select_listener);
            e.stopPropagation()
        }); //展开选择在线简历弹框
        $(".chose_resume .resume_online_select li").click(function(){
            var _text = $(this).text();
            var _id = $(this).attr("data-id");
            $("input[name='uploaded_resume']").val(_id);
            $("input[name='uploaded_resume']").attr("is_change","true");
            $(this).addClass("selected").parents(".chose_resume").removeClass("open_resume_select");
            $(this).parents(".chose_resume").find("span").text(_text);
            $("#upload_resume_tips").find("span").text(_text);
        })
        $("#publish_job_button").on("click",function(){
        	var _disabled=$(this).attr("disabled");
        	if(!common.main.is_empty(_disabled)&&_disabled=="true"){//重复点击
        		return false;
        	}
            var _job_type = $("[name=job_type]:checked").attr("data-value"), //职位类型
                _target_job = $(".job_name_list input").val(),  //目标职位
                _job_price_min = $(".job_price_list input[name=job_price_min]").val(),  //薪资最小值
                _job_price_max = $(".job_price_list input[name=job_price_max]").val(),  //薪资最大值
                _job_city = $(".job_city_select>input[name=job_city]").attr("data-value"),  //工作城市
                _job_field = $(".job_field_list .add_field span"),  // 行业领域(要循环成数组)
                _company_type = $("input[name=company_type]:checked"),  //公司性质(多选 要循环成数组)
                _my_resume = $("input[name=uploaded_resume]").val(),    //以选中的简历
                _job_message_tips = $(".job_area_list textarea").val(), // 补充信息
                _pay_way = $(".job_pay_way_list input[name=pay_way]:checked").val(); // 付款方式
            if($(".job_pay_way_list input[name=pay_way]:checked").length <= 0){
                layer.msg("请选择付款方式");
            }else if(_target_job.length <= 0){
                layer.msg("请填写目标岗位");
            }else if(_job_price_min.length <= 0){
                layer.msg("请填写期望薪资下限")
            }else if(_job_price_max.length <= 0){
                layer.msg("请填写期望薪资上限")
            }else if(parseInt(_job_price_min) >= parseInt(_job_price_max)){
                layer.msg("期望薪资填写错误")
            }else if(undefined == _job_city || _job_city == ""){
                layer.msg("请选择工作地点")
            }else if(_job_field.length <= 0){
                layer.msg("至少填写一个行业领域")
            }else if($("input[name=company_type]:checked").length <= 0){
                layer.msg("之少选择一项公司性质")
            }else if(undefined == _my_resume || _my_resume == ""){
                layer.msg("请选择您的简历")
            }else{
            	var _job_field_array=new Array();
            	_job_field.each(function(index,ele){
            		_job_field_array.push($(ele).text());
            	})
            	var _job_targets=_job_field_array.join(",");
            	
            	var _company_type_array=new Array();
            	_company_type.each(function(index,ele){
            		_company_type_array.push($(ele).val());
            	})
            	var _company_types=_company_type_array.join(",");
            	 // 提交职位任务订单事件
            	$(this).attr("disabled","true");
            	$.ajax({
    				url: "/hr/publish_submit/",
    				type: "POST",
    				data: {"jobType":_job_type,"jobTarget":_target_job,"minSalary":_job_price_min,"maxSalary":_job_price_max,"targetProfession":_job_targets,"companyTypes":_company_types,"payType":_pay_way,"resume":_my_resume,"memo":_job_message_tips,"areaId":_job_city,"demandType":"job"},
    				dataType: "json",
    				cache: false,
    				success: function(message) {
    					if(message.type=="success"){
                            common.main.resume_confirm({
                                title:"",
                                content_html:"<h2>您已成功发布任务</h2><p>待HR响应后方可选择您喜欢的HR下单，任务进度可以在PC端或WAP端的个人中心-订单列表中随时查看（关注五百丁服务号可登陆WAP端）。</p>",
                                modal_class:"reuse_publish_success_modal",
                                ok:"好的",
                                cancel:"支付遇到问题",
                                onOk:function(){
                                    location.href="/member/order/?orderType=hr";
                                }
                            });
    					}else{
    						layer.msg(message.content);
    					}
    					$(this).attr("disabled","false");
    				}
    			});
            }
        });  // 提交按钮点击事件
        //金额计算
        $(".caculate_amount").change(function(){
        	caculate_amount();
        });
        function caculate_amount(){//计算金额
        	 var _job_price_min = $(".job_price_list input[name=job_price_min]").val(),  //薪资最小值
             _job_price_max = $(".job_price_list input[name=job_price_max]").val(),  //薪资最大值
             _pay_way = $(".job_pay_way_list input[name=pay_way]:checked").val(); // 付款方式
        	 if(_pay_way.length<=0||_job_price_min.length<=0||_job_price_max<=0){
        		 $("#cacalate_amount").text(0);
        		 return false;
        	 }
        	 $.post("/hr/publish/caculate_amount/",{"minSalary":_job_price_min,"maxSalary":_job_price_max,"payType":_pay_way,"demandType":"job"},function(data){
        		 $("#cacalate_amount").text(data.content);
        	 })
        }
        $(".job_upload_resume_list .delete_resume").on("click",function(){
            var $this = $(this).parent("p");
            $this.addClass("hidden");
            $this.find("span").text("");
            $(".upload_resume_modal .local_resume_message a").trigger("click");
        }); //我的简历删除按钮点击事件
        $(document).on("click",".upload_resume_modal .local_resume_message a",function(){
            var $this = $(this);
            $(".upload_resume").removeClass("upload_local_resume").removeClass("chose_online_resume").addClass("chose_local_resume");
            $this.prev("span").text("")
            $("input[name='uploaded_resume']").val("");
            $("#upload_resume_tips").addClass("hidden");
        }); //上传简历弹框删除按钮点击事件
        $(".job_name_list input").on("blur",function(){
            var _val = $(this).val(), _test =  /^[a-zA-Z0-9_\u4e00-\u9fa5]+$/;
            if(_val.length > 0 && !_test.test(_val)){
                $(this).parents("li").addClass("wrong_input");
            }else{
                $(this).parents("li").removeClass("wrong_input");
            }
        }); //目标岗位字符校验
        $(".job_field_list input").on("blur",function(){
            var _val = $(this).val(), _test =  /^[a-zA-Z0-9_\u4e00-\u9fa5]+$/;
            if(_val.length > 0 && !_test.test(_val)){
                $(this).parents("li").addClass("wrong_input");
            }else{
                $(this).parents("li").removeClass("wrong_input");
            }
        }); //行业领域字符校验
        
        hr.main.text_area_count();
    }, //职位任务发布页事件绑定
    job_demand_detail:function(){
    	//HR申请列表
    	var $payed=$("#task_order_li li.payed");
        if($payed.length>0){ 
            $('#task_order_li').prepend($payed);
        }
    	$(".observer_hr .isApply:not(.executing)").on("click",function(){
            $(".hr_competitive_modal").fadeIn();
            $("body").css("overflow","hidden")
        });
    	 $(".hr_competitive_modal .modal_cancel,.hr_competitive_modal .modal_header i").on("click",function(){
    		 $(".hr_competitive_modal").fadeOut();
             $("body").removeAttr("style")
    	 });
        $(".hr_competitive_modal .modal_ok").on("click",function(){
        	var _text=$(".hr_competitive_modal .manifesto").val();
        	if(common.main.is_empty(_text)){
        		layer.msg("请输入竞标宣言~");
        		return false;
        	}
        	var _id=$(this).attr("data_id");
        	$.post("/member/hr/apply_task_Order/",{"id":_id,"manifesto":_text},function(message){
        		layer.msg(message.content);
        		if(message.type=="success"){
        			window.location.reload();
        		}
        	})
        
        });
        hr.main.text_area_count();//计数
        hr.main.detail_footer_position();//底部位置
    }, //职位任务发详情事件绑定
    publish_resume:function(){
    	//常规下单，不能加急
    	var _hrId=$("input[name=hrId]").val();
    	if(!common.main.is_empty(_hrId)){
    		$("#resume_ask_time_2").attr("disabled","disabled");
    		$("label[for=resume_ask_time_2]").attr("disabled","disabled");
    	}
    	$(document).on("click","label[disabled=disabled]",function(){
    		layer.msg("只有发布求职任务时才能选择加急",{time:3000});
    	});
    	
        function change_resume_ask(){
            var _inner = "<span>你已选择</span>";
            if($(".resume_service_table .selected_roll").length > 0){
                $(".resume_service_table .selected_roll").each(function(){
                    _inner += "<span>【"+$(this).find(".resume_service_title").text()+"】</span>";
                });
                $(".resume_task_ask input[type=radio]:checked").each(function(){
                    _inner += "<span>【"+$(this).next("span").text()+"】</span>";
                });
            }
            $(".resume_task_selected_service").html(_inner);
        }   // 简历服务任务内容变更方法 （获取价格的方法也写在这里）
        $(".resume_service_chose_button a").click(function(){
            var $this = $(this).parents(".resume_service_table_roll");
            $this.toggleClass("selected_roll");
            change_resume_ask();
            caculate_amount();
        }); // 服务内容选择按钮点击事件
        $(".resume_task_ask input[type=radio]").click(function(){
            change_resume_ask();
        });  // 单选项点击事件
        $(".input_resume_ask_field input").on("keypress blur",function(e){
            if(e.keyCode==13||e.type=="blur"){
                var text = $(this).val(), _test =  /^[a-zA-Z0-9_\u4e00-\u9fa5]+$/;
            if(text.length > 0 && !_test.test(text)){
                    $(this).parents("li").addClass("wrong_input");
                }else{
                    $(this).parents("li").removeClass("wrong_input");
                    if(text.length==0){
                        return ;
                    }
                    if(text.length > 5){
                        layer.msg("字数限制5个字以内");
                    }else if($(".add_field span").length >= 3){
                        layer.msg("最多3个领域");
                    }else{
                        var $inner = $("<span></span>").text(text);
                        $inner.appendTo($(".resume_task_ask_contain .add_field"));
                        var _padding = $(".resume_task_ask_contain .add_field").width();
                        $(".resume_task_ask_contain .resume_ask_field").css("padding-left",_padding +"px");
                        $(this).val("")
                    }
                }
            }
        }).on("input",function(){
            $(".input_resume_ask_field label").hide();
        }).on("blur",function(){
            if($(".add_field span").length > 0 || $(this).val().length > 0){
                $(".input_resume_ask_field label").hide();
            }else{
                $(".input_resume_ask_field label").show();
            }
        }).on("keydown",function(e){
            var text = $(this).val();
            if(e.keyCode == 8 && text.length <= 0 && $(".add_field span").length > 0){
                $(".add_field span:last").remove();
                var _padding = $(".resume_task_ask_contain .add_field").width();
                $(".resume_task_ask_contain .resume_ask_field").css("padding-left",_padding +"px");
            }
        }); //行业领域输入框相关事件
        $(".resume_task_price .release_resume_task").on("click",function(){
        	//检车是否登录
			if(!$.checkLogin()) {
				show_login_modal();
				return;
			}
            //判断 是否选择服务； 判断 是否填写行业领域
            if($(".resume_service_table .selected_roll").length <= 0){
                layer.msg("请选择服务");
            }else if($(".add_field span").length <= 0){
                layer.msg("请填写行业领域");
            }else{
            	//检验服务
            	if(!check_service()){
            		return false;
            	}
                //  提交任务事件写在这里
            	var $selected_rolls=$(".selected_roll");
            	var _pcids=new Array();
            	$selected_rolls.each(function(index,ele){
            		_pcids.push($(ele).attr("data-id"));
            	});
            	var _resume_ask_time=$("input[name=resume_ask_time]:checked").val();
            	var _resume_ask_experience=$("input[name=resume_ask_experience]:checked").val();
            	var _resume_ask_count=$("input[name=resume_ask_count]:checked").val();
            	var _resume_ask_type=$("input[name=resume_ask_type]:checked").val();
            	var $add_fields=$(".add_field span");
            	var _resume_ask_targets=new Array();
            	$add_fields.each(function(index,ele){
            		_resume_ask_targets.push($(ele).text());
            	})
            	var _memo=$("#memo").val();
            	var _hrid=common.main.getUrlParamString("hrid");
            	if(!common.main.is_empty(_hrid)){//非需求下单，需要弹出支付框
            		var $selected_li=$(".selected_roll .resume_service_title");
            		$("#product_list").find("tr.ygx").remove();
            		$selected_li.each(function(index,ele){
            			var _html='<tr class="ygx"><th class="sp"><i class="xz"></i>'+$(ele).text()+'</th><th class="sl">1</th></tr>';
            			$("#product_list").append(_html);
            		});
            		//支付框信息渲染
            		$("#hr-order-modal").show();
            		$("body").css("overflow","hidden");
            		return false;
            	}
            	var _data={"pcids":_pcids.join(","),"completeTimeType":_resume_ask_time,"workExperienceType":_resume_ask_experience,"resumeLanguage":_resume_ask_type,"resumeFontNum":_resume_ask_count,"demandType":"resume","memo":_memo,"targetProfession":_resume_ask_targets.join(",")};
				var _publish_submit_return_message=common.main.ajax_sync_send("/hr/publish_submit/",_data,"POST");
				
				if(_publish_submit_return_message.type=="success"){
                    common.main.resume_confirm({
                        title:"",
                        content_html:"<h2>您已成功发布任务</h2><p>待HR响应后方可选择您喜欢的HR下单，任务进度可以在PC端或WAP端的个人中心-订单列表中随时查看（关注五百丁服务号可登陆WAP端）。</p>",
                        modal_class:"reuse_publish_success_modal",
                        ok:"好的",
                        cancel:"支付遇到问题",
                        onOk:function(){
                            location.href="/member/order/?orderType=hr";
                        }
                    });
                }else{
					layer.msg(_publish_submit_return_message.content);
				}
				$("body").removeAttr("style");
            }
        });
        $(".caculate_amount").change(function(){
        	caculate_amount();
        });
        function caculate_amount(){
        	var $selected_rolls=$(".selected_roll");
        	var _pcids=new Array();
        	$selected_rolls.each(function(index,ele){
        		_pcids.push($(ele).attr("data-id"));
        	})
        	if(_pcids.length<=0){
        		$("#caculate_amount").text(0);
        	}
        	var _resume_ask_time=$("input[name=resume_ask_time]:checked").val();
        	var _resume_ask_experience=$("input[name=resume_ask_experience]:checked").val();
        	var _resume_ask_count=$("input[name=resume_ask_count]:checked").val();
        	var _resume_ask_type=$("input[name=resume_ask_type]:checked").val();
        	
        	$.post("/hr/publish/caculate_amount/",{"pcids":_pcids.join(","),"completeTimeType":_resume_ask_time,"workExperienceType":_resume_ask_experience,"resumeLanguage":_resume_ask_type,"resumeFontNum":_resume_ask_count,"demandType":"resume"},function(message){
        		$("#caculate_amount").text(message.content);
        		$("#totalPrice").text("￥"+message.content);
        	})
        }
        function check_service(){
        	var _pids=new Array();
        	var _resume_ask_type=$("input[name=resume_ask_type]:checked").val();
        	var $selected_rolls=$(".selected_roll");
        	$selected_rolls.each(function(index,ele){
        		if(_resume_ask_type=="en"&&!common.main.is_empty($(ele).attr("data-en-pid"))){
        			_pids.push($(ele).attr("data-en-pid"));
        		}else{
        			_pids.push($(ele).attr("data-zh-pid"));
        		}
        	})
        	var _hrId=$('input[name=hrId]').val();
        	var check_flag=common.main.ajax_sync_send("/hr/check_service/",{"pids":_pids.join(","),"hrId":_hrId},"GET");
        	if(!check_flag){
        		common.main.resume_confirm({
					title:"",
					content_html:"<span class='delete-title'>提示</span><span class='delete-tips'>非常抱歉，未匹配到符合要求的HR，请您将涉及英文的服务拆分为另一个任务重新填写表单或联系我们的专属客服为您安排。（客服QQ：3237026865）</span>",					
					modal_class:"delete-content",
					ok:"确定",
					cancel:"取消"
			    });
        		return false;
        	}else{
        		return true;
        	}
        }
        //支付弹框处理
        $("#hr-order-modal .close").click(function(){//关闭支付弹框
        	hr.main.hide_pay_modal();
        });
        $(".hr-pay-radio label").click(function(){
    		$(this).siblings("input").attr("checked","checked");
     	});	
		//进度条的显示
        var pro = new progress({
            width : 510,//进度条宽度
            height: 20,//进度条高度
            bgColor : "#3E4E5E",//背景颜色
            proColor : "#1dc092",//前景颜色
            fontColor : "#FFFFFF",//显示字体颜色
            val : 10,//默认值
            text:"当前进度为#*val*#%",//显示文字信息
            showPresent : true,
            completeCallback:function(val){
                console.log('已完成');
            },
            changeCallback:function(val){
                console.log('当前进度为'+val+'%');
            }
        });
        document.getElementsByClassName('pro')[0].appendChild(pro.getBody());
		// 上传文件
		$("#selectfile").click(function(){
			$("#templatefile").trigger("click");
		});
		$("#templatefile").live('change', function(){
			var name = $(this).val();
			$(".div_Orders_upload").find("p").text(name);
			var fileName = name.substring(name.lastIndexOf("\\") + 1);
			var fileType = name.substring(name.lastIndexOf(".") + 1);
			$("#fileName").val(fileName);
			$("#f_file").val(fileName);
			if(fileType.toLocaleLowerCase() != "doc" && fileType.toLocaleLowerCase() != "docx") {
				layer.msg("只支持doc，docx文件格式！");
				return;
			}
			hr.main.show_pro(pro);
			$.ajaxFileUpload({
	            type: 'post',
	            secureuri : false,
	            dataType : 'content',
	            fileElementId : 'templatefile',
	            url : '/file/upload/',
	            data : {"token" : getCookie("token")},
	            success : function(data, status) {
	            	if(data == "error"){
	            		layer.msg("上传失败！");
	            	}else {
	            		if($.browser.msie) {
	            			if(data.indexOf('<PRE>') >= 0) {
	            				data = data.substring(5);
	            				data = data.substring(0, data.length - 6);
	            			}
	            		}
	        			$("input[name='filepath']").val(data);
	        			pro.update(100);
	            	}
	            },
	            error: function (data, status, e) {
	                layer.msg("发生错误" + e);
	            }
	        });
		});
		//表单提交
		$("#lj_pay_btn").click(function(){
			//检车是否登录
			if(!$.checkLogin()) {
				show_login_modal();
				return;
			}
			var phone=$('.phone').val();
			var wx=$('.weixin').val();
			if($(".resume_service_table .selected_roll").length <= 0){
	                layer.msg("请选择服务");
	        }else if($(".add_field span").length <= 0){
	                layer.msg("请填写行业领域");
	        }else if(phone==null||phone==""||phone==undefined||wx==null||wx==""||wx==undefined){
				layer.msg("请填写联系方式");
				return;
			}else{
				//检验服务
            	if(!check_service()){
            		return false;
            	}
				var $selected_rolls=$(".selected_roll");
            	var _pcids=new Array();
            	$selected_rolls.each(function(index,ele){
            		_pcids.push($(ele).attr("data-id"));
            	})
            	var _resume_ask_time=$("input[name=resume_ask_time]:checked").val();
            	var _resume_ask_experience=$("input[name=resume_ask_experience]:checked").val();
            	var _resume_ask_count=$("input[name=resume_ask_count]:checked").val();
            	var _resume_ask_type=$("input[name=resume_ask_type]:checked").val();
            	var $add_fields=$(".add_field span");
            	var _resume_ask_targets=new Array();
            	$add_fields.each(function(index,ele){
            		_resume_ask_targets.push($(ele).text());
            	})
            	var _memo=$("#memo").val();
            	
				var phone=$(".phone").val();
	            var weixin=$(".weixin").val();
	            var qq=$(".qq2").val();
	            var j = {};
	            j.phone = phone;
	            j.weixin = weixin;
	            j.qq =qq;
	            var phone = JSON.stringify(j);
	            $(".cont").val(phone);
				$('input[name="consignee"]').val($("#consignee").val());
				var _hrId=$("input[name=hrId]").val();
				var _data={"hrId":_hrId,"pcids":_pcids.join(","),"completeTimeType":_resume_ask_time,"workExperienceType":_resume_ask_experience,"resumeLanguage":_resume_ask_type,"resumeFontNum":_resume_ask_count,"demandType":"resume","memo":_memo,"targetProfession":_resume_ask_targets.join(",")};
				var _publish_submit_return_message=common.main.ajax_sync_send("/hr/publish_submit/",_data,"POST");
				if(_publish_submit_return_message.type=="success"){
					$("input[name=demandOrderId]").val(_publish_submit_return_message.content);
					var _form_data=common.main.form_to_json($("#suborderform"));
					var _create_hr_order_return_message=common.main.ajax_sync_send("/member/order/create_hr_order/",_form_data,"POST");
					if(_create_hr_order_return_message.type=="success"){
						hr.main.hide_pay_modal();
						hr.main.pay_tips_show();
						window.open("/payment/"+_create_hr_order_return_message.content+"/");
					}else{
						 layer.msg(_create_hr_order_return_message.content);
					}
				}else{
					layer.msg(_publish_submit_return_message.content);
				}
			}
		});
		 hr.main.hide_pro();//隐藏上传进度条
		 hr.main.text_area_count();//计数
    }, //简历任务发布页事件绑定
    resume_demand_detail:function(){
    	//HR申请列表
    	var $payed=$("#task_order_li li.payed");
    	if($payed.length>0){ 
    		$('#task_order_li').prepend($payed);
    	}
    	$(".observer_hr .isApply:not(.executing)").on("click",function(){
            $(".hr_competitive_modal").fadeIn();
            $("body").css("overflow","hidden")
        });
    	 $(".hr_competitive_modal .modal_cancel,.hr_competitive_modal .modal_header i").on("click",function(){
    		 $(".hr_competitive_modal").fadeOut();
             $("body").removeAttr("style")
    	 });
        $(".hr_competitive_modal .modal_ok").on("click",function(){
        	var _text=$(".hr_competitive_modal .manifesto").val();
        	if(common.main.is_empty(_text)){
        		layer.msg("请输入竞标宣言~");
        		return false;
        	}
        	var _id=$(this).attr("data_id");
        	$.post("/member/hr/apply_task_Order/",{"id":_id,"manifesto":_text},function(message){
        		layer.msg(message.content);
        		if(message.type=="success"){
        			window.location.reload();
        		}
        		
        	})
        
        });
        $(".text_area_list").on("input",function(){
            var _length = $(this).val().length;
            $(".text_count press_count").text(_length);
            if(_length >= 40){
                $(".text_count press_count").css("color","red")
            }else{
                $(".text_count press_count").removeAttr("style");
            }
        });
        //hr滚动加载
        var $loading=true;
        var $page=2;
        var $pagesize=10;
    	var _demandOrderID=$(".modal_ok").attr("data_id");
    	$(".resume_task_detail").on("scroll",function() {
					var $this = $(this), viewH = $(this).height(), // 可见高度
					contentH = $(this).get(0).scrollHeight, // 内容高度
					scrollTop = $(this).scrollTop();// 滚动高度
					if ($loading) {
						if (contentH - viewH - scrollTop <= 0) {
							$.get("/hr/demand_hr_more/", {"page" : $page,"pagesize" : $pagesize,"demandOrderId" : _demandOrderID}, function(result) {
								if (result == "" || result == null|| result.indexOf("li") == -1) {
									layer.msg("没有更多了");
									$loading = false;
								} else {
									$page++;
									$pagesize = $pagesize + 10;
									$(".more_hr_List").append(result);
								}
							})
						}
					}
				});
        hr.main.text_area_count();//计数
        hr.main.detail_footer_position();//底部位置
    }, //简历任务详情页事件绑定
    publish_other:function(){
        $(".other_task_main_contain .other_input_list>input").on("input",function(){
            var _amount = $(this).val();
            $(".other_task_main_contain .other_price_bar p span i").text(_amount);
            if(_amount.length > 3){
                if(Number(_amount) <50){
                    layer.msg("赏金不能低于50");
                    return false;
                }else if(Number(_amount) > 1000){
                    layer.msg("赏金不能大于1000");
                    return false;
                }
            }else if(_amount.length <= 0){
                $(".other_task_main_contain .other_price_bar p span i").text(0);
            }
        }).on("blur",function(){
            var _amount = $(this).val();
            if(!common.main.is_empty(_amount) && _amount.length > 0){
                if(Number(_amount) <50){
                    layer.msg("赏金不能低于50");
                    return false;
                }else if(Number(_amount) > 1000){
                    layer.msg("赏金不能大于1000");
                    return false;
                }
            }
        });
        $("#publish_other_btn").on("click",function(){
        	var _disabled=$(this).attr("disabled");
        	if(!common.main.is_empty(_disabled)&&_disabled=="true"){//重复点击
        		return false;
        	}
            var _memo = $("#publish_other_memo").val();
            var _amount = $("#publish_other_amount").val();
            if(common.main.is_empty(_memo)){
            	layer.msg("请输入正确的需求描述");
            	return false;
            }
            if(_amount.length > 0){
                if(Number(_amount) <50){
                    layer.msg("赏金不能低于50");
                    return false;
                }else if(Number(_amount) > 1000){
                    layer.msg("赏金不能大于1000");
                    return false;
                }
            }else{
                layer.msg("请输入正确的赏金额度");
                return false;
            }
            $(".other_price_bar p span i").text(_amount);
            $(this).attr("disabled","true");
            $.post("/hr/publish_submit/",{"amount":_amount,"memo":_memo,"demandType":'other'},function(message){
            	if(message.type=="success"){
                    common.main.resume_confirm({
                        title:"",
                        content_html:"<h2>您已成功发布任务</h2><p>待HR响应后方可选择您喜欢的HR下单，任务进度可以在PC端或WAP端的个人中心-订单列表中随时查看（关注五百丁服务号可登陆WAP端）。</p>",
                        modal_class:"reuse_publish_success_modal",
                        ok:"好的",
                        cancel:"支付遇到问题",
                        onOk:function(){
                            location.href="/member/order/?orderType=hr";
                        }
                    });
            	}else{
            		layer.msg(message.content);
            	}
            	$(this).attr("disabled","false");
            })
        });  //赏金输入框事件绑定
        hr.main.text_area_count();
    }, //其他任务发布页事件绑定
    other_demand_detail:function(){
    	//HR申请列表
    	var $payed=$("#task_order_li li.payed");
        if($payed.length>0){ 
            $('#task_order_li').prepend($payed);
        }
    	$(".observer_hr .isApply:not(.executing)").on("click",function(){
            $(".hr_competitive_modal").fadeIn();
            $("body").css("overflow","hidden")
        });
    	 $(".hr_competitive_modal .modal_cancel,.hr_competitive_modal .modal_header i").on("click",function(){
    		 $(".hr_competitive_modal").fadeOut();
             $("body").removeAttr("style")
    	 });
        $(".hr_competitive_modal .modal_ok").on("click",function(){
        	var _text=$(".hr_competitive_modal .manifesto").val();
        	if(common.main.is_empty(_text)){
        		layer.msg("请输入竞标宣言~");
        		return false;
        	}
        	var _id=$(this).attr("data_id");
        	$.post("/member/hr/apply_task_Order/",{"id":_id,"manifesto":_text},function(message){
        		layer.msg(message.content);
        		if(message.type=="success"){
        			window.location.reload();
        		}
        		
        	})
        
        });
        hr.main.text_area_count();//计数
        hr.main.detail_footer_position();//底部位置
    }, //其他任务详情页事件绑定
    hr_list:function(){
        if($(".hr_list_select .field .selected").index() > 0){
            var show_height=$(".classify").height();
            $(".field").css("height",show_height);
            $(".selection i").css("transform","rotate(180deg)");
        }
        // 行业领域展开
        $(".selection i").on("click",function(){
            if($(".field").css("height")=="22px"){
                var show_height=$(".classify").height();
                $(".field").animate({height:show_height});
                $(".selection i").css("transform","rotate(180deg)");
            }else{
                $(".field").animate({height:"22px"});
                $(".selection i").css("transform","rotate(0deg)");
            }
        });
        // 服务内容选择
        $(".hr_list_select .server_content a").on("click",function(){
            $(this).toggleClass("selected");
            var _pids = [];
            $(".hr_list_select .server_content a.selected").each(function () {  //获取服务内容
            	_pids.push($(this).attr("data-value"));
	    	 });
            var _sortType=$(".hr_list_select .sort a.selected").attr("data-value")
            var _tagName =$(".classify a.selected").attr('data-value');  //获取领域标签
            if(_tagName==undefined){
            	_tagName="全部";
            }
            if(_sortType==undefined){
            	_sortType=5;
            }
            if($(this).hasClass("selected")){
            	location.href="/hr/hr_list/?pids=" +_pids+ "&sortType=" + _sortType + "&tagName=" + _tagName;
            }
        });
        //排序方式选择
        $(".hr_list_select .sort a").on("click",function(){
            $(this).toggleClass("selected").siblings().removeClass('selected');
            var _pids = [];
            $(".hr_list_select .server_content a.selected").each(function () {  //获取服务内容
            	_pids.push($(this).attr("data-value"));
	    	 });
            var _sortType=$(".hr_list_select .sort a.selected").attr("data-value")
            var _tagName =$(".classify a.selected").attr('data-value');  //获取领域标签
            if(_tagName==undefined){
            	_tagName="全部";
            }
            if(_sortType==undefined){
            	_sortType=5;
            }
            if($(this).hasClass("selected")){
            	location.href="/hr/hr_list/?pids=" + _pids + "&sortType=" + _sortType + "&tagName=" + _tagName;
            }
         });
        // 行业领域选择
        $(".classify").find('a').on("click",function(){
        	$(this).toggleClass("selected").siblings().removeClass('selected');
        	var _pids = [];
            $(".hr_list_select .server_content a.selected").each(function () {  //获取服务内容
            	_pids.push($(this).attr("data-value"));
	    	 });
            var _sortType=$(".hr_list_select .sort a.selected").attr("data-value");
            var _tagName =$(".classify a.selected").attr('data-value');  //获取领域标签
            if(_tagName==undefined){
            	_tagName="全部";
            }
            if(_sortType==undefined){
            	_sortType=5;
            }
            if($(this).hasClass("selected")){
            	location.href="/hr/hr_list/?pids=" + _pids + "&sortType=" + _sortType + "&tagName=" + _tagName;
            }
        });
        // 清空
        $(".delete").on("click",function(){
            $(".field a").removeClass("selected").eq(0).addClass("selected");
            $(".server_content a").removeClass("selected");
            $(".sort a").removeClass("selected").eq(1).addClass("selected");
            location.href="/hr/hr_list/"
        });
        // 滚动加载
        var _index=2;
        var _loading=true;
        $(window).scroll(function () {
            var _height= $(".hr_list_main_contain").height();
            var scroll_top = $(this).scrollTop();
            var scroll_height = $(document).height();
            var window_height = $(this).height();
            var _maxheight = parseInt($(".hr_list_main_contain").css("max-height"));
            if(_loading){
                function _scolldown(){
                    if (scroll_top + window_height+50 >= scroll_height){
                      _loading = false;
                        _maxheight += _height;
                        $(".loading").addClass('active');
                        $(".hr_list_main_contain").css("max-height",_maxheight);
                        var _pids = [];
                        $(".hr_list_select .server_content a.selected").each(function () {  //获取服务内容
                          _pids.push($(this).attr("data-value"));
                         });
                        var _sortType=$(".hr_list_select .sort a.selected").attr("data-value")
                        var _tagName =$(".classify a.selected").attr('data-value');  //获取领域标签
                        $.ajax({
                            url:'/hr/hr_list/',
                            data:{
                                tagName:_tagName,
                                sortType:_sortType,
                                pids:_pids.toString(),
                                index:_index
                            },
                            success:function(result){
                                if(result == "" || result == null|| result.indexOf("li") == -1){
                                    $(".loading").removeClass('active');
                                    layer.msg("没有更多HR了哦");
                                }else{
                              $(".loading").removeClass('active');
                                    $("#hr_more_list").append(result);
                                    _index++;                                    
                                    _loading = true;
                                }
                            }
                        });
                    }
                }
        		_scolldown()
            }
        });
    }, //hr列表事件绑定
    hr_detail:function(){
        $(".hr_certificate_bar .hr_certificate_list").on("click",function(){
           var _src = $(this).attr("data-src"), _index = $(this).index();
           $(".hr_masker img").attr({"src":_src,"data-index": _index});
           $(".hr_masker").fadeIn();
           $("body").css("overflow","hidden");
        }); //显示证书展示蒙层
        $(".hr_masker .masker_left").on("click",function(){
            var _index = $(".hr_masker img").attr("data-index");
            if(_index <= 1){
                layer.msg("没有上一张了！")
            }else{
                var $this = $(".hr_certificate_bar .hr_certificate_list").eq(_index-2);
                $(".hr_masker img").attr({"src":$this.attr("data-src"),"data-index": $this.index()});
            }
        }); // 点击上一张按钮
        $(".hr_masker .masker_right").on("click",function(){
            var _index = $(".hr_masker img").attr("data-index"), _length = $(".hr_certificate_bar .hr_certificate_list").length;
            if(_index >= _length){
                layer.msg("没有下一张了！");
            }else{
                var $this = $(".hr_certificate_bar .hr_certificate_list").eq(_index);
                $(".hr_masker img").attr({"src":$this.attr("data-src"),"data-index": $this.index()});
            }
        });
        $(".hr_masker .close_masker").on("click",function(){
            $(this).parent(".hr_masker").fadeOut();
            $("body").removeAttr("style")
        }); // 关闭证书展示蒙层

        $(".top_comment_title a").on("click",function(){
            $("body").animate({scrollTop:$('#hr_comment').offset().top}, 800);
        }); //全部评论锚点事件
        //弹出职位下单弹框
        $(".place_order_modal .modal_ok").on("click",function(){
            var phone = hr.main.check_str("phone",$(".place_order_modal .place_order_list").eq(0).find("input").val()),
                wx = $(".place_order_modal .place_order_list").eq(1).find("input").val().replace(/(^\s+)|(\s+$)/g,"");
            if(phone.type){
                phone = phone.info; // 校验后的手机号码
                $(".place_order_modal .input_list").eq(0).removeClass("wrong_input");
                $(".place_order_modal .input_list").eq(0).find("span").remove();
            }else{
                var inner = $("<span></span>").text(phone.info);
                inner.appendTo($(".place_order_modal .input_list").eq(0));
                $(".place_order_modal .input_list").eq(0).addClass("wrong_input")
            }
            if(wx.length > 0 && wx.indexOf(" ") < 0){
                $(".place_order_modal .input_list").eq(1).removeClass("wrong_input");
                $(".place_order_modal .input_list").eq(1).find("span").remove();
            }else{
                var inner = $("<span></span>").text("请输入正确的微信号");
                inner.appendTo($(".place_order_modal .input_list").eq(1));
                $(".place_order_modal .input_list").eq(1).addClass("wrong_input");
            }
            if($(".place_order_modal .wrong_input").length > 0){
                return false
            }else{
            //    在此处添加职位下单确定按钮点击事件
            }
        }); // 职位下单确认按钮点击事件
        $("body").on("click",".place_order_modal .modal_cancel, .place_order_modal .modal_header i",function(){
            $(this).parents(".place_order_modal").fadeOut();
        }); // 职位下单取消按钮点击事件
        $(".hr-order-modal .close").on("click",function(){
            $(".hr-order-modal").fadeOut();
        });
        $(".main_contain .hr_service .service_list").on("click",function(){
            if(!$(this).hasClass("had_serviceable")){
                layer.msg("该HR不提供此服务")
            }
        });
        //更多评论
        var _page=1;
        $(".review_moreding a").click(function(){
        	var $this=$(this);
        	_page++;
        	var _data=$(this).attr("url");
			$.get("/hr/review/list/",{"url":_data,"pageNumber":_page},function(data){
				if(data.indexOf("div")==-1){
					$this.unbind("click");
					$this.text("没有更多了~")
				}else{
					$(".comment_bar").append(data);
				}
			});
        });
        //选ta服务按钮
        $("#chose_ta_service_btn").click(function(){
    		var $this=$(this);
    		//1根据状态提示是否可以下单
    		if($this.closest("div").hasClass("hr_orange_state")||$this.closest("div").hasClass("hr_garry_state")){
    			common.main.resume_confirm({
					title:"",
					content_html:"<span class='delete-title'>提示</span><span class='delete-tips'>这位HR老师好像暂时没有时间接单，你可以先去了解一下其他HR老师哟~</span>",					
					modal_class:"delete-content",
					ok:"确定",
					cancel:"取消"
			    });	    	
    			return false;
    		}
    		//2是否已登录
    		if(!$.checkLogin()){
    			show_login_modal();
    			return false;
    		}
    		//3判断是否是主动需求下单
    		var _data_hrf=$this.attr("data-href");
    		if(!common.main.is_empty(_data_hrf)&&_data_hrf!=undefined){
    			location.href=_data_hrf;
    			return;
    		}
    		//4判断需求单是否是用户的
    		var _data_id=$this.attr("data-id");
    		var _status_message=common.main.ajax_sync_send("/hr/get_demand_status/"+_data_id+"/",{},"GET");
    		if(_status_message.type!="success"){
    			layer.msg(_status_message.content);
    			return false;
    		}
    		if(_status_message.content=="wattingAudit"||_status_message.content=="refuse"||_status_message.content=="close"){
    			layer.msg("需求已关闭，不能下单");
    			return false;
    		}
    		if(_status_message.content!="auditPass"){
    			common.main.resume_confirm({
					title:"",
					content_html:"<span class='delete-title'>提示</span><span class='delete-tips'>你已选择了HR下单，请前往个人中心我的订单完成支付~</span>",					
					modal_class:"delete-content",
					ok:"确定",
					cancel:"取消",
					onOk:function(){
						location.href="/member/order/?orderType=hr";
					}
			    });	  
    			return false;
    		}
    		//5根据需求单类型，弹出支付框
        	var $this=$(this);
        	var _type=$this.attr("data-type");
        	if(_type=="job"){
        		$(".place_order_modal").fadeIn();
        	}else{
        		$(".hr-order-modal").fadeIn();
        	}
        });
        //弹框支付事件
        //支付弹框处理
        $("#hr-order-modal .close").click(function(){//关闭支付弹框
        	hr.main.hide_pay_modal();
        });
        $(".hr-pay-radio label").click(function(){
    		$(this).siblings("input").attr("checked","checked");
     	});	
		//进度条的显示
        var pro = new progress({
            width : 510,//进度条宽度
            height: 20,//进度条高度
            bgColor : "#3E4E5E",//背景颜色
            proColor : "#1dc092",//前景颜色
            fontColor : "#FFFFFF",//显示字体颜色
            val : 10,//默认值
            text:"当前进度为#*val*#%",//显示文字信息
            showPresent : true,
            completeCallback:function(val){
                console.log('已完成');
            },
            changeCallback:function(val){
                console.log('当前进度为'+val+'%');
            }
        });
        document.getElementsByClassName('pro')[0].appendChild(pro.getBody());
		// 上传文件
		$("#selectfile").click(function(){
			$("#templatefile").trigger("click");
		});
		$("#templatefile").live('change', function(){
			var name = $(this).val();
			$(".div_Orders_upload").find("p").text(name);
			var fileName = name.substring(name.lastIndexOf("\\") + 1);
			var fileType = name.substring(name.lastIndexOf(".") + 1);
			$("#fileName").val(fileName);
			$("#f_file").val(fileName);
			if(fileType.toLocaleLowerCase() != "doc" && fileType.toLocaleLowerCase() != "docx") {
				layer.msg("只支持doc，docx文件格式！");
				return;
			}
			hr.main.show_pro(pro);
			$.ajaxFileUpload({
	            type: 'post',
	            secureuri : false,
	            dataType : 'content',
	            fileElementId : 'templatefile',
	            url : '/file/upload/',
	            data : {"token" : getCookie("token")},
	            success : function(data, status) {
	            	if(data == "error"){
	            		layer.msg("上传失败！");
	            	}else {
	            		if($.browser.msie) {
	            			if(data.indexOf('<PRE>') >= 0) {
	            				data = data.substring(5);
	            				data = data.substring(0, data.length - 6);
	            			}
	            		}
	        			$("input[name='filepath']").val(data);
	        			pro.update(100);
	            	}
	            },
	            error: function (data, status, e) {
	                layer.msg("发生错误" + e);
	            }
	        });
		});
		//职位推荐需求提交
		$("#job_pay_btn").click(function(){
			//检车是否登录
			if(!$.checkLogin()) {
				show_login_modal();
				return false;
			}
			var phone=$('#suborderform1 .jobPhone').val();
			var _reg = /^(((13[0-9]{1})|(14[0-9]{1})|(17[0]{1})|(15[0-3]{1})|(15[5-9]{1})|(18[0-9]{1}))+\d{8})$/;
			if(phone.length !=11){
				layer.msg( "请输入有效的手机号码");
				return false;
	        }else if(!_reg.test(phone)){
	        	layer.msg( "请输入有效的手机号码");
	        	return false;
	        }
			var weixin=$('#suborderform1 .jobWeixin').val();
			if(common.main.is_empty(phone)||common.main.is_empty(weixin)){
				layer.msg("请填写联系方式");
				return false;
			}else{
	            var qq=$("#suborderform1 .jobQQ").val();
	            var j = {};
	            j.phone = phone;
	            j.weixin = weixin;
	            j.qq =qq;
	            var phone = JSON.stringify(j);
	            $('#suborderform1 input[name="phone"]').val(phone);
				$('#suborderform1 input[name="consignee"]').val($('#suborderform1 .jobConsignee').val());
				var _form_data=common.main.form_to_json($("#suborderform1"));
				var _create_hr_order_return_message=common.main.ajax_sync_send("/member/order/create_hr_order/",_form_data,"POST");
				if(_create_hr_order_return_message.type=="success"){
					//hr.main.hide_pay_modal();
					//hr.main.pay_tips_show();
					//window.open("/payment/"+_create_hr_order_return_message.content+"/");
					//$("#job_order_modal").fadeOut();
					location.href="/member/order/?orderType=hr";
				}else{
					 layer.msg(_create_hr_order_return_message.content);
				}
			}
		});
		//简历服务或其它需求提交
		$("#lj_pay_btn").click(function(){
			//检车是否登录
			if(!$.checkLogin()) {
				show_login_modal();
				return;
			}
			var phone=$('#suborderform2 .phone').val();
			var weixin=$('#suborderform2 .weixin').val();
			if(common.main.is_empty(phone)||common.main.is_empty(weixin)){
				layer.msg("请填写联系方式");
				return;
			}else{
	            var qq=$("#suborderform2 .qq2").val();
	            var j = {};
	            j.phone = phone;
	            j.weixin = weixin;
	            j.qq =qq;
	            var phone = JSON.stringify(j);
	            $('#suborderform2 input[name="phone"]').val(phone);
				$('#suborderform2 input[name="consignee"]').val($('#suborderform2 .consignee').val());
				var _form_data=common.main.form_to_json($("#suborderform2"));
				var _create_hr_order_return_message=common.main.ajax_sync_send("/member/order/create_hr_order/",_form_data,"POST");
				if(_create_hr_order_return_message.type=="success"){
					$("#resume_or_other_order_modal").fadeOut();
					hr.main.pay_tips_show();
					window.open("/payment/"+_create_hr_order_return_message.content+"/");
				}else{
					 layer.msg(_create_hr_order_return_message.content);
				}
			}
		});
		 hr.main.hide_pro();//隐藏上传进度条

		$("#drop_code_cavans").qrcode({
		    width: 89, //宽度
		    height:89, //高度
            foreground: "#00c091",
            background: "#FFF",
		    text:"http://"+window.location.hostname+$("#drop_code_cavans").attr("data-href")//任意内容
		});//生成简历二维码
		$(".hr_message_middle .drop_code").hover(function(){
		    // 打点写在这里
			common.main._500dtongji("PC-简历代写-HR详情页-基本信息-个人详情-二维码显示");
        },function(){return null})
    }, //hr详情事件绑定
    demand_list:function(){
        var _href = location.href;
        if(_href.indexOf("?") >= 0){
            _href = _href.substr(_href.indexOf("?"));
            if(_href.indexOf("resume") >= 0){
            	$(".task_list_content .task_option a").eq(1).addClass("current").siblings().removeClass("current");
            }else if(_href.indexOf("job") >= 0){
                $(".task_list_content .task_option a").eq(2).addClass("current").siblings().removeClass("current");
            }else if(_href.indexOf("other") >= 0){
                $(".task_list_content .task_option a").eq(3).addClass("current").siblings().removeClass("current");
            }else{
            	$(".task_list_content .task_option a").eq(0).addClass("current").siblings().removeClass("current");
            }
        }else{
            $(".task_list_content .task_option a").eq(0).addClass("current").siblings().removeClass("current");
        }
        
        $(".industry").each(function(){
	   		var _text=$(this).text();
	   		var _value=_text.replace(/,/gm, "/");
	   		$(this).text(_value);
	    });
		//是否显示分页
        if($(".task_list_card>a").length < 90){
            $(".task_pages").css("display","block");
        }else{
        	$(".task_pages").css("display","block");

        }
        //加载5次，每次加载18,5行
		var page = 1;
		var max_page = $(".task_list_card>a").length/18;        
        $(window).scroll(function () {
            var scroll_top = $(this).scrollTop();
            var scroll_height = $(document).height();
            var window_height = $(this).height();	
            var $list_height = $('.task_list_content .task_list');
            var $page_height = ($('.task_list_content .task_list a').height()+80)*5;          
        	if(1 >= max_page){
        		$list_height.css({'height':"auto"});
        	}else{
        		if((($(window).scrollTop()+$(window).height())+150)>=$(document).height()){
	        		if(page < max_page){
	        			page++;
	        			$list_height.css({'height':$page_height*page});		        			
	        		}else if(page = Math.ceil(max_page)){
	        			$list_height.css({'height':'auto'});
	        		}

        		}
    		}
		});       	

    }, //任务列表事件绑定
    task_list:function(){},
    hr_case_list:function(){
        var _height = $(window).height() - 143;
        $(".hr_case_list_contain").css("min-height",_height);
    } //hr案例列表事件绑定
};
