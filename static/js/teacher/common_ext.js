/**
 * 全局通用js文件
 * common.info:存放全局通用属性
 * 目录的对应js交互， 请写在对应的cvresume.main.xxx_event方法里去，如要新增,命名规则：cvresume.main.目录名_event
 */
var common = common || {};
common.main = common.main || {};
//全局参数绑定
common.info={
	//异步加载
	isReload:true,//是有已加载，默认是已加载
	isMaxPage:false,//是否是最大页码
	reloadWallfulPage:2//页码	
};
common.main = {
		init_:function(){//事件初始化
			common.main.event_();//全局事件初始化
			common.main.dropresume_event();//自由编辑事件
			common.main.cvresume_event();//在线简历事件
			common.main.editresume_event();//在线简历事件
			common.main.hr_event();//定制商城事件
			common.main.print_event();//打印商城事件
			common.main.member_event();//个人中心事件
			common.main.team_vip_event();//集体会员子会员管理事件
		},
	    event_: function () {//全局事件绑定
	    	//导航选中
	    	var pathName = location.pathname;
	    	if(pathName.indexOf("template") > 0 || pathName.indexOf("ppt") > 0) {
	    		$(".nav-li").removeClass("current").eq(1).addClass("current");
	    	}else if(pathName.indexOf("editresume") > 0) {
	    		$(".nav-li").removeClass("current").eq(0).addClass("current");
	    	}else if(pathName.indexOf("hr") > 0 || pathName.indexOf("customize") > 0 ) {
	    		$(".nav-li").removeClass("current").eq(2).addClass("current");
	    	}else {
	    		$(".nav-li").removeClass("current").eq(4).addClass("current");
	    	}
	    	//鼠标覆盖和离开头像事件
	    	$('.jl-touxiang').hover(function(){
	    		$('.jl-user-info').stop().show();					
	    	},function(){
	    		$('.jl-user-info').stop().hide();					
	    	});	
	    	//获取消息个数
	    	if(getCookie("memberEmail")||getCookie("memberName")){
	    		$.get(wbdcnf.base+"/common/get_message_notification_count/",function(data){
	    			var $message_notification=$("#user_center i");
	    			if(data>0){
	    				$message_notification.show();
	    			}else{
	    				$message_notification.hide();
	    			}
	    		});
	    	}else{
	    		$("#user_center i").hide();
	    	}
	    	//百度打点数据
	    	try{
	    		$(document).on("click",".500dtongji",function(){
	    			var lable=$(this).attr("data_track");
	    			if(lable!=null&&lable!=""&&lable!=undefined){
	    				window._hmt && window._hmt.push(['_trackEvent', lable, 'click']);
	    			}
	    		});
	    	}catch(e){
	    		console.log("统计埋点错误~");
	    	}
	    	//百度推广统计来源记录
	    	try{
	    		var sparam="";
	    		var f = common.main.getUrlParamString("f");
	    		var from =common.main.getUrlParamString("from");
	    		//特殊连接处理--PC推广追踪
	    		if(from && from!=undefined&&(from=="22661"||from=="22662"||from=="22663")){
	    			f=from;
	    			from=undefined;
	    		}
	    		if (f && f!=undefined){
	    			sparam="f="+f;
	    		}
	    		if (from && from!=undefined){
	    			if (f && f!=undefined){
	    				sparam=sparam+"&";
	    			}
	    			sparam=sparam+"code="+from+"&isCover=true";
	    		}
	    		
	    		if (sparam && sparam!=undefined &&sparam!=""){
	    			$.getScript("http://www.500d.me/index/setSource/?"+sparam,function(){});
	    		}
	    	}catch(e){
	    			
	    	}
	    	//图片延迟加载
	    	try{
	    		$("img.lazy").lazyload({
	    		    threshold : 200
	    		});
	    	}catch(e){
	    		console.log("图片延迟加载错误~");
	    	}
	    	//商桥客服处理，如果没有没有在线人工客服标记，则隐藏客服
	    	try{
	    		var $onlineFlag=$("#onlineFlag");
	    		if($onlineFlag==null||$onlineFlag==undefined||$onlineFlag.length<=0){
	    			var style_css='<style>#newBridge{display:none !important}</style>'
	    			$("body").after($(style_css));
	    		}
	    	}catch(e){
	    		console.log("商桥客服处理错误~");
	    	}
	    	//全局复制事件
	    	$(".copy_url_btn").click(function(){
	    		var str = $(".ym-input").val();
	    		common.main.copyToClipBoard(str);
	    	})
	    	//全局登录信息绑定
	    	common.main.loginMsg();
	    	//全局二维码扫码事件
	    	$(document).on("click",".jl-header .jl-ej-nav .sj-btn",function(){
				common.main.resume_confirm({
					title:"",
					content_html:"<span></span><p>微信扫一扫，开始制作你的简历</p>",	
                    tips_modal_class:"mobile_ewm_modal",
					modal_class:"index-mobile-content",
					ok:"",
					cancel:"",
					onOk:function(){
					
					}
			   });		    		
			});			
	    },
	    index_event:function(){
			var baseNum = 2484369;//用户基数
			var incrementNum = 8888;//用户增长数
			var baseDate = '2017-10-09';//日期基数
			var currentDate = common.main.GetDateStr(0)//当前日期
			//天数计算
            var day = common.main.DateDiff(baseDate,currentDate);
			if(day > 0){
			    baseNum += incrementNum * day;
			}
			//秒数计算
            var today = new Date();
            today.setHours(0);
            today.setMinutes(0);
            today.setSeconds(0);
            today.setMilliseconds(0);
            var second =  parseInt((new Date().getTime() - today.getTime())/8000);
            if(second > 0){
                baseNum += 2 * second;
			}
			var clock1 = $('.jl-index-num').FlipClock(baseNum, {
				clockFace: 'Counter',
				autoStart: false
			});
			setTimeout(function() {
		        setInterval(function() {
                    //baseNum+=parseInt(5+Math.random()*10);
                    baseNum+=1;
		            clock1.setValue(baseNum);
		        }, 2000);
			});	    	
	    	$(".index_left_adv1 span.close").click(function(){
	    		$(this).parent(".index_left_adv1").animate({"bottom":"-160px"},500);
	    		return false;
	    	});
	    	$(".jl-index-search .search-keyword").focusin(function(){
		        setTimeout(function() {
		    		$(".search-img").animate({"top":"-10px","opacity":"1"},300);
		        }, 200);
		    	$(this).siblings("button").css("background-position","-238px 8px");
	    	});
	    	$(".jl-index-search .search-keyword").focusout(function(){
		        setTimeout(function() {
		        	$(".search-img").animate({"top":"13px"},300);
		        }, 100);	    		

	    		$(this).siblings("button").css("background-position","-205px 8px")
	    	});	    	
		    $(window).scroll(function(){
		        var s = $(window).scrollTop();
		        if(s > 918){
		            $(".jl-header").parent("div").removeClass("index_header").addClass("index_header_fixed");
		        }else{
		            $(".jl-header").parent("div").addClass("index_header").removeClass("index_header_fixed");;
		        };
		    });	    	
			var owl = $("#owl-demo");
			owl.owlCarousel({
			      items :4, //10 items above 1000px browser width
			      itemsDesktop : [1000,5], //5 items between 1000px and 901px
			      itemsDesktopSmall : [900,3], // betweem 900px and 601px
			      itemsTablet: [600,2], //2 items between 600 and 0
			      itemsMobile : false // itemsMobile disabled - inherit from itemsTablet option
			});
			$(".jl-index-box .next").click(function(){
	    		owl.trigger('owl.next');
	  		});
		    $(".jl-index-box .prev").click(function(){
		        owl.trigger('owl.prev');
		    });
		    owl.trigger('owl.play',3000);
			$(".jl_temp_nav a").click(function(){
				var num = $(this).index();
				$("ul.dl_index_Template").eq(num).css('display','block').siblings().css('display','none');
				$(this).addClass("current").siblings().removeClass("current");
				//4-18 修改
				if($(this).attr("rel") == "nofollow"){
					$(window).scrollTop(911);
				}
			});	 
		  	var opt	=	{
				"speed":"fast",	//变换速度,三速度可选 slow,normal,fast;
				"by":"mouseover",
				"auto":false,
				"sec":3000,
				"maxWidth":571,
				"minWidth":82
		  	};
		    $(".roundabout_box_ul").IMGDEMO(opt);   

			$(document).on("mouseleave",".jl_temp_slider",function(){
				$(this).find(".roundabout-moveable-item").eq(1).addClass("active").siblings().removeClass("active");			
				$(this).find(".roundabout-moveable-item").eq(1).css({
					"opacity":"1"

				}).siblings().css({
					"opacity":"0.5"
				})		
						
			});
	      			
	    },
		hr_page_init_event:function(){
		},
	    dropresume_event:function(){
	    	$(document).on("click","#dropdownloadPdfBtn:not(.wbd-vip-lock)",function(){
	       		var id=$("#hidden_data_resume_id").val();
	       		if(common.main.is_empty(id)){
	       			layer.msg("请先保存简历~");
	       			return false;
	       		}
	       		var downloadUrl="";
		    	$.ajax({type : "get",
				   	cache: false,
				   	async : false,
				   	url : "/cvresume/get_download_url/"+id+"/",
				   	success : function(message) {
				   		if(message.type=="success"){
				   			downloadUrl=message.content;
						}else{
							layer.msg(message.content);
						}
				   	}
				});
	    		if(!common.main.is_empty(downloadUrl)){
	    			var timestr=new Date().getTime();
	    			var reg=/_\d*\.pdf/;
	    			downloadUrl=downloadUrl.replace(reg,"_"+timestr+".pdf");
	    			window.open(downloadUrl);
	    		}
	    	});
	    },
	    cvresume_event:function(){	    	
	    	//发布页面的下载按钮
	        $(document).on("click","#releaseDownloadPDFBtn:not(.wbd-vip-lock)",function(){
	       		var visitid=$(this).attr("data_visitid");
	       		var id=$(this).attr("data_id");
	       		var downloadFlag=false;
	       		var downloadUrl="";
	    		if(!downloadFlag){
	    			$.ajax({type : "get",
			    		cache: false,
			    		async : false,
			    		url : "/cvresume/get_download_url/"+id+"/",
			    		success : function(message) {
			    			if(message.type=="success"){
								downloadUrl=message.content;
								downloadFlag=true
							}else{
								layer.msg(message.content);
							}
			    		}
			    	});
	    		}
	    		if(downloadFlag){
	    			var timestr=new Date().getTime();
	    			var reg=/_\d*\.pdf/;
	    			downloadUrl=downloadUrl.replace(reg,"_"+timestr+".pdf");
	    			window.open(downloadUrl);
	    			//下载提示
	    			var param=location.search;
	    			if(param!=""&&visitid!=""&&visitid!=undefined){
	    			   $.get("/resumeCoverLetter/resume_email_track/"+visitid+"/"+location.search+"&replyType=hrDownload");
	    			}
	    		}
	    	});
	    },
	    editresume_event:function(){
			//简历同步导入
	    	common.main.resume_import();
	    	//简历导入
	    	$(document).on("click",".import_resume_btn:not(.wbd-vip-lock),.show_import_btn:not(.wbd-vip-lock)",function(){
	    		if($.checkLogin()){
	    			$("#importRModal").modal("show");
	    		}else{
	    			show_login_modal();
	    			return;
	    		}
	    	});
	    	//登录
	    	$(".unlogin a").click(function(){
	    		show_login_modal();
	    	});
	    	//简历分享
	    	common.main.resume_share()
    	
	    },
        resume_cases_event:function(){
        	var _isPreview = false;//是否预览案例
            var nav=$(".zx-mblist-nav"); //得到导航对象
            var win=$(window); //得到窗口对象
            var sc=$(document);//得到document文档对象。
            win.scroll(function(){
            	if(_isPreview){
            		return;
            	}
              	if(sc.scrollTop()>=1000){
                	nav.addClass("fixednav"); 
              	}else{
               		nav.removeClass("fixednav");
              	}
              	win_scroll();
            });            
            //左侧导航二级显示隐藏事件
            $(".zx-mblist-nav .nav-box").mouseover(function(){
                $(this).addClass("current");
            });
            $(".zx-mblist-nav .nav-box").mouseleave(function(){
                $(this).removeClass("current");
            });
            //左侧导航点击事件
            $(".zx-mblist-nav a").click(function(){
				$(".bd a").removeClass("hot");
				$(this).addClass("hot");
				var $selected=$(".zx-mblist-nav a.hot");
				var url_tag="";
				$selected.each(function(index,ele){
					if(index==$selected.length-1){
						url_tag=url_tag+$(ele).attr("data_url");
					}else{
						url_tag=url_tag+$(ele).attr("data_url")+"-";
					}
					location.href="/cvresume/cases/"+url_tag+"/";
				});
			});
			//右侧搜索按钮点击事件
			$("#seachBtn").click(function(){
				var _keyword = $("#keyword").val();
				var _dataUrl = $('.zx_caselist').find('.zx_case_box').attr("data-url");
				var _requetUrl = _dataUrl + "?keyword=" + _keyword;
				location.href = _requetUrl;
			});
			//右侧搜索输入框回车事件
			$("#keyword").keypress(function(){
				if(event.keyCode == 13){
					var _keyword = $("#keyword").val();
					var _dataUrl = $('.zx_caselist').find('.zx_case_box').attr("data-url");
					var _requetUrl = _dataUrl + "?keyword=" + _keyword;
					location.href = _requetUrl;
				}
			});
			//滚动加载
			function win_scroll(){
				//计算所有瀑布流块中距离顶部最大，进而在滚动条滚动时，来进行ajax请求，
				var _itemNum=$('.zx_caselist').find('.zx_case_box .list').length;
				if(_itemNum>=15){
					var _itemArr=[];
					_itemArr[0]=$('.zx_caselist').find('.zx_case_box .list').eq(_itemNum-1).offset().top+$('.zx_caselist').find('.zx_case_box .list').eq(_itemNum-1)[0].offsetHeight;
					_itemArr[1]=$('.zx_caselist').find('.zx_case_box .list').eq(_itemNum-2).offset().top+$('.zx_caselist').find('.zx_case_box .list').eq(_itemNum-1)[0].offsetHeight;
					_itemArr[2]=$('.zx_caselist').find('.zx_case_box .list').eq(_itemNum-3).offset().top+$('.zx_caselist').find('.zx_case_box .list').eq(_itemNum-1)[0].offsetHeight;
					var _maxTop=Math.max.apply(Math.max,_itemArr);
					if(_maxTop<=$(window).height()+$(document).scrollTop()&&common.info.isReload&&!common.info.isMaxPage){
						common.info.isReload=false;
						reload();
					}
				}
			};
			//加载数据
		   	function reload(){
		   		var _dataUrl = $('.zx_caselist').find('.zx_case_box').attr("data-url");
		   		var _itemid  = $('.zx_case_box').find('.list').eq(0).attr("data_itemid");
		   		var _resumeid  = $('.zx_case_box').find('.list').eq(0).attr("data_resumeid");
		   		var _requetUrl = _dataUrl + "?keyword=" + $("#keyword").val() + "&pageNumber=" + common.info.reloadWallfulPage;
		   		$.get(_requetUrl, function(result){
		   			if(result.indexOf("li") != -1){
		   				$('.zx_caselist').find('.zx_case_box').append(result);
		   				common.info.isReload = true;
		   				common.info.reloadWallfulPage++;
		   				$('.zx_case_box').find('.list').attr("data_itemid",_itemid);
		   				$('.zx_case_box').find('.list').attr("data_resumeid",_resumeid);
		   			}else{
		   				common.info.isMaxPage = true;
		   			}
		   		});
			}
            //案例详情显示隐藏
            $(document).on("click", ".zx_case_detail .return", function(){
                var scrollTo =  $(".zx_case_box .list.checked");
            	$(this).parent().css("display","none");
                $(".zx_caselist").css("display","block");
                var scrollH = scrollTo.offset().top;
                $(".zx_case_detail div").html("");
               $('html , body').animate({scrollTop: scrollH-100},500);
                _isPreview = false;
            });
            $(document).on("click", ".zx_case_box .list .preview", function(){
				var $list = $(this).closest(".list");
                var _dataUrl = $list.attr("data-url");
                var _dataStyle=$list.attr("data-style");
                var _contentId=$list.attr("data_resume_contentid");
                var _resumeId=$list.attr("data_resumeid");
                var _itemid=$list.attr("data_itemid");
                var _href;
                if(_itemid!=null&&_itemid==535){
                	_href="/dropcvresume/edit/?resumeContentId="+_contentId+"&resumeId="+_resumeId+"&itemid="+_itemid;
                }else{
                	_href="/cvresume/edit/?resumeContentId="+_contentId+"&resumeId="+_resumeId+"&itemid="+_itemid;
                }
                $list.addClass("checked").siblings().removeClass("checked");
                $('html , body').animate({scrollTop: 0},500);
                $("#dongtaicss").attr("href", _dataStyle);
                $.get(_dataUrl, function(dataHtml){
                	$(".zx_case_detail div").html($(dataHtml).find(".resetEditStyle"));
                	$(".select_case").attr("data_href",_href);
                	preview_resume_module_sort();
                	$(".zx_case_detail").css("display","block");
                	$(".zx_caselist").css("display","none");
                	_isPreview = true;
                	common.main.repairResumeLeftHeight();//高度修复
                });
                $(".zx-mblist-nav").removeClass("fixednav");
                
            });
            // 应用案例详情
			$(document).on("click",".zx_case_detail .select_case",function(){
				var _href=$(this).attr("data_href");
                if(common.main.is_empty(getCookie("change_resume_content"))){
                    common.main.resume_confirm({
                        title:"",
                        content_html:"<span class='tips_title'>确定应用此内容案例吗？</span><span class='tips-content'>应用该案例后已编辑的简历内容将会被覆盖</span><label class='neverNotfy'><input type='checkbox' id='checkedNotfy' class='checkedNotfy'><span>不再提醒</span></label>",
                        tips_modal_class:"confirm_modal",
                        modal_class:"tips-modal-content change_content_confirm",
                        onOk:function(){
                            $("#change_parts_style").modal("hide");
                            if($(".change_content_confirm .neverNotfy>input:checked").length > 0){
                                addCookie("change_resume_content",true);
                            }
                            // 同步案例详情内容的方法
	                        // 保存成功后执行 关闭当前窗口放回上一页并刷新
                            window.opener.location.href = _href;
                            window.close();
                        }
                    });
                }else{
                    // 保存成功后执行 关闭当前窗口放回上一页并刷新
                    window.opener.location.href = _href;
                    window.close();
                }
            });
            function preview_resume_module_sort(){
			    var _sortPosition = new Array("Left","Top","Right","Bottom")
			    var _resume_sort=$("#resume_base").attr("resume_sort");
			    var _template_set=$("#resume_base").attr("template_set");
			    if(!common.main.is_empty(_resume_sort)){
			        var _sort = JSON.parse(_resume_sort);
			        if(_sort){
			            var _classStr="#resume_base .wbdCv-base";
			            $(_sortPosition).each(function(i,item){//遍历方位
			                var _pos = _sort[item.toLocaleLowerCase()];
			                var $preModuleId;
			                $(_pos).each(function(j,jtem){//遍历各方位的id
			                    if(common.main.is_empty($preModuleId)){
			                        $(_classStr+item).prepend($("#"+jtem));//在所在方位的div开头添加节点
			                    }else{
			                        $($preModuleId).after($("#"+jtem));//在前一个节点后添加节点
			                    }
			                    $preModuleId=$("#"+jtem);//把当前节点作为下次循环的子节点
			                });
			            });
			        }
			    }else if(!common.main.is_empty(_template_set)){
			        var _settings = JSON.parse(_template_set);
			        if(_settings){
			            var _classStr="#resume_base .wbdCv-base";
			            $(_sortPosition).each(function(i,item){//遍历方位
			                var _pos_set = _settings[item.toLocaleLowerCase()];
			                var $preModuleId;
			                $(_pos_set).each(function(j,jtem){
			                    //隐藏
			                    if(!jtem.isShow){
			                        $("#"+jtem.key).addClass("hidden");
			                    }
			                    //移位
			                    if(common.main.is_empty($preModuleId)){
			                        $(_classStr+item).prepend($("#"+jtem.key));
			                    }else{
			                        $($preModuleId).after($("#"+jtem.key));
			                    }
			                    $preModuleId=$("#"+jtem.key);
			                });
			            });
			        }
			    }
			}           
        },
        agreement_event:function(){
            //设置标杆
			var _line=parseInt($(window).height()/3);
			$(window).scroll(function(){
				$('.agreement_nav li').eq(0).addClass('active');
				//滚动到标杆位置,左侧导航加active
				$('.agreement_content li').each(function(){
					var _target=parseInt($(this).offset().top-$(window).scrollTop()-_line);
					var _i=$(this).index();
					if (_target<=0) {
						$('.agreement_nav li').removeClass('active');
						$('.agreement_nav li').eq(_i).addClass('active');
					}
					//如果到达页面底部，给左侧导航最后一个加active
					else if($(document).height()==$(window).scrollTop()+$(window).height()){
						$('.agreement_nav li').removeClass('active');
						$('.agreement_nav li').eq($('.agreement_content li').length-1).addClass('active');
					}
				});
			});
			$('.agreement_nav li').click(function(){
				$(this).addClass('active').siblings().removeClass('active');
				var _i=$(this).index();
				 $('body, html').animate({scrollTop:$('.agreement_content li').eq(_i).offset().top-_line},500);
			});
        },
        resume_import:function(){//简历导入
	    	//导入简历tab切换
			$(".importRnav ul li").find("input").click(function(){
				$(this).parent().siblings("li").find("input").attr("checked");
				$(this).parent().find("input").attr("checked","checked");
				var num = $(this).parent().index();
				var $this = $(".importRcon ul li").eq(num)
				$this.addClass("current");
				$this.siblings("li").removeClass("current");
				$(this).parent().addClass("chose").siblings().removeClass("chose");
				if($(this).attr("id")=="fz"){
					$("#copy_resume_id option").remove();
					$.get("/cvresume/resume_list/",{},function(result){
						if(result!=null){
							$("#copy_resume_id").append(result);
						}
					})
					
				}
			});			
			//点击"选择HTML文件按钮"进行导入本地已经下载了的html格式简历文件
			$(".importRcon .a-input").click(function(){
				$(this).siblings("input").trigger("click");
			});
			//导入简历提示,显示文件名
			$("input[name='filename']").on('change', function(){
				var name = $(this).val();
				$(this).siblings("span.addr").text(name);
			});
			//51导入
			$("#51job_import").click(function(){
				var $this=$(this);
				var name = $this.closest("li").find("input").val();
				if(name==""||name==null){
					layer.msg("请选择文件上传");
					return;
				}
				if(typeof cvresume != "undefined"&&cvresume.main.is_empty(cvresume.info.memberid)){
	        		layer.msg("亲，登录后才可以导入简历哦~");
	        		return false;
	        	}
				var fileName = name.substring(name.lastIndexOf("\\") + 1);
				var fileType = name.substring(name.lastIndexOf(".") + 1);
				//校验文件格式是否正确
				if(fileType.toLocaleLowerCase() != "html" && fileType.toLocaleLowerCase() != "htm") {
					$("#importResetModal").modal("show");
					$("#importResetModal").find(".tips_show").text("只支持HTML，HTM格式，请重新选择导入");
					$("#importRModal").modal("hide");
					return;
				}
				$this.prop("disabled",true);
    			show_pro($this.closest("li").find("div.progressbar"),1);
    			read_local_file($this.closest("li").find("input")[0],"206","");
    			setTimeout(function(){
    				$this.prop("disabled",false);
    			},2000);
			});
			
			//智联简历导入
			$("#zhilian_import").click(function(){
				var $this=$(this);
				var name = $this.closest("li").find("input").val();
				if(name==""||name==null){
					layer.msg("请选择文件上传");
					return;
				}
				if(typeof cvresume != "undefined"&&cvresume.main.is_empty(cvresume.info.memberid)){
	        		layer.msg("亲，登录后才可以导入简历哦~");
	        		return false;
	        	}
				var fileName = name.substring(name.lastIndexOf("\\") + 1);
				var fileType = name.substring(name.lastIndexOf(".") + 1);
				//校验文件格式是否正确
				if(fileType.toLocaleLowerCase() != "html" && fileType.toLocaleLowerCase() != "htm") {
					$("#importResetModal").modal("show");
					$("#importResetModal").find(".tips_show").text("只支持HTML，HTM格式，请重新选择导入");
					$("#importRModal").modal("hide");
					return;
				}
				//判断用户权限
				$this.prop("disabled",true);
				show_pro($this.closest("li").find("div.progressbar"),1);
				read_local_file($this.closest("li").find("input")[0],"206",""); 
				setTimeout(function(){
					$this.prop("disabled",false);
				},2000);
			});
			//拉勾简历导入
			$("#laggou_import").click(function(){
				var $this=$(this);
				var name = $this.closest("li").find("input").val();
				if(name==""||name==null){
					layer.msg("请选择文件上传");
					return;
				}
				if(typeof cvresume != "undefined"&&cvresume.main.is_empty(cvresume.info.memberid)){
	        		layer.msg("亲，登录后才可以导入简历哦~");
	        		return false;
	        	}
				var fileName = name.substring(name.lastIndexOf("\\") + 1);
				var fileType = name.substring(name.lastIndexOf(".") + 1);
				//校验文件格式是否正确
				if(fileType.toLocaleLowerCase() != "html" && fileType.toLocaleLowerCase() != "htm") {
					$("#importResetModal").modal("show");
					$("#importResetModal").find(".tips_show").text("只支持HTML，HTM格式，请重新选择导入");
					$("#importRModal").modal("hide");
					return;
				}
				$this.prop("disabled",true);
				show_pro($this.closest("li").find("div.progressbar"),1);
				read_local_file($this.closest("li").find("input")[0],"206","");
				setTimeout(function(){
					$this.prop("disabled",false);
				},2000);
			});
			//本地简历复制
			$("#copyt_import").click(function(){
				var $this=$(this);
				var resumeid=$("#copy_resume_id").val();
				if(resumeid==null||resumeid==undefined||resumeid==""){
					layer.msg("请选择你需要复制的简历");
					return;
				}
				show_pro($this.closest("li").find("div.progressbar"),1);
				if(typeof cvresume != "undefined"){
					common.main.resumeOperationLogUpload(resumeid,"copyresume","","复制至简历（ID："+cvresume.info.resumeid+"）");
					if (window.localStorage && cvresume.localStorage) {
						sessionStorage.removeItem("historyid");
	                }else{
	                	cvresume.main.resume_save_history();
	                }
					location.href="/cvresume/clone/"+resumeid+"/?clone2ResumeId="+cvresume.info.resumeid;
				}else{
					common.main.resumeOperationLogUpload(resumeid,"copyresume","","创建简历");
					location.href="/cvresume/clone/"+resumeid+"/";
				}
			});
			//简历导入的进度条显示
			function show_pro(tag,time){
				if(time==null||time==undefined){
					time=1;
				}
				tag.show();
				var ss_pro=100/(time*10);
				var sum_width=0;
				intervalid=setInterval(function(){
					sum_width=sum_width+ss_pro;
					console.log(Math.round(sum_width));
					update_pro(Math.round(sum_width)+"%",tag);
					if(sum_width>=95){
						sum_width=0;
						clearInterval(intervalid);
						//hide_pro();
					}
				},100);
				
			}	
			function update_pro(width,tag){
				tag.find("i").css("width",width);
				tag.find("span").text(width);
			}
			function hide_pro(){
				update_pro("100%",$("div.progressbar").find("div.progressbar"));
				clearInterval(intervalid);
				setTimeout(function(){
					$("div.progressbar").fadeOut("slow");
				},1000);
				setTimeout(function(){
					$("div.progressbar").find("i").css("width","0%");
					$("div.progressbar").find("span").text("0%");
				},2000);
			}
			$(".zx-dr-tips .span-close").click(function(){			
	    		$(".zx-dr-tips").css('display','none');
	    		return false;
	    	});
		},
	    hr_event:function(){
	    	//离线提示框
	    	$('.hr-detail-fwnr .hr-lx a').click(function(){
	    		var $this=$(this);
				var caseid=$(this).attr("data_casesid");
				common.main.resume_confirm({
					title:"",
					content_html:"<span class='delete-title'>提示</span><span class='delete-tips'>这位HR老师好像暂时没有时间接单，你可以先去了解一下其他HR老师哟~</span>",					
					modal_class:"delete-content",
					ok:"确定",
					cancel:"取消",
					onOk:function(){
					$.get("/member/hr/deleteCases/?caseid="+caseid,function(message){
							if(message.type=="success"){
								window.location.reload();
							}else{
								$.message("warn",message.content);
							}
						});
					
					}
			    });	    		
	    	});	
	    	$('.hr-detail-fwnr .hr-ml #pay_btn').click(function(){
	    		var $this=$(this);
				var caseid=$(this).attr("data_casesid");
				common.main.resume_confirm({
					title:"",
					content_html:"<span class='delete-title'>提示</span><span class='delete-tips'>这位HR老师手上正在处理的订单太多啦，暂时不接受下单，亲可以去看看其他HR老师哦~</span>",					
					modal_class:"delete-content",
					ok:"确定",
					cancel:"取消",
					onOk:function(){
					$.get("/member/hr/deleteCases/?caseid="+caseid,function(message){
							if(message.type=="success"){
								window.location.reload();
							}else{
								$.message("warn",message.content);
							}
						});
					
					}
			    });	    		
	    	});		    	
	    },
	    print_event:function(){
	    	
	    },
	    member_event:function(){
	    	//个人在线会员升级操作
	    	$(".member-hy .huiyuan-upload").click(function(){
				common.main.vip_opt_tips("super");
	    	});
	    	//个人中心设置弹框隐藏
	    	$("#setResumeModal .wbd-vip-lock").click(function(){
	    		$("#setResumeModal").modal("hide");
	    	});
	    	//我的主页select	    	
			$(".myhome-select-cv .select-btn").on('click',function(event){
			    event.stopPropagation();
			    event.preventDefault();
			    if($(this).siblings(".select-box").hasClass('hidden')){
			         $(this).siblings(".select-box").removeClass("show");
			    }else{
			        $(this).siblings(".select-box").addClass("show");
			    }
			});
			$(".myhome-select-cv .select-box li").on('click',function(){
				//设置主页
				var _dataId = $(this).attr("data-id");
				$.ajax({
		    		type: "POST",
		            url: "/member/set_home_page_resume/",
		            data:{
		            	resumeId:_dataId
		            },
		           	success:function(message){
		           		if(message.type != "success"){
		           			layer.msg(message.content);
		           		}else{
		           			window.location.reload();
		           		}
		           	}
		    	});
			});
	    	//我的简历
	    	$(document).on("click",".zxjl-ul .set-btn",function(event){
	    		event.stopPropagation();
			    event.preventDefault();
			    $(this).parents(".item").siblings().find(".set-box").removeClass("show");
			    $(this).find(".set-box").addClass("show");
			});
			$(".zxjl-ul .item").each(function(){
	    		if ($(this).hasClass("doc_resume")) {
	    			$(this).find(".set-btn .set-box-list.qh b").text("切换手机简历");
	    			$(this).find(".set-btn .set-box-list.qh s").removeClass("web").addClass("wap");			
	    		}else if($(this).hasClass("wap_resume")) {
	    			$(this).find(".set-btn .set-box-list.qh b").text("切换文档简历");
	    			$(this).find(".set-btn .set-box-list.qh s").removeClass("wap").addClass("web");	
	    		}
			});
	    	$(document).on("click",".set-box-list.qh s",function(event){
	    		if ($(this).hasClass("wap")) {
	    			$(this).removeClass("wap").addClass("web");
	    			$(this).siblings("a").find("b").text("切换文档简历");
	    			
	    		}else{
	    			$(this).addClass("wap").removeClass("web");
	    			$(this).siblings("a").find("b").text("切换手机简历");
	    		}
			});					
	    	//旧版删除简历提示（winna）
			$('.del_resume').click(function() {
				var $this=$(this);
				var data_id=$(this).attr("data_id");				
				common.main.resume_confirm({
					title:"",
					content_html:"<span class='delete-title'>确定删除当前简历吗？</span><span class='delete-tips'>简历删除后将无法恢复。</span>",
					modal_class:"delete-content",
					ok:"确定",
					cancel:"取消",
					onOk:function(){
						var url="/editresume/delete/?resumeId="+data_id;
						$.get(url, function(message) {
							if(message.type == "success"){
								$this.closest("div.item").remove();
								$("#web_size").html($('#web_size').eq(0).text()-1);
							}else{
								layer.msg(message.content);
							}
						});
					}
				});
			});	 
			$('.del_cvresume').click(function() {
				var $this=$(this);
				var data_id=$(this).attr("data_id");	
				common.main.resume_confirm({
					title:"",
					content_html:"<span class='delete-title'>确定删除当前简历吗？</span><span class='delete-tips'>简历删除后将无法恢复。</span>",					
					modal_class:"delete-content",
					ok:"确定",
					cancel:"取消",
					onOk:function(){
						common.main.resumeOperationLogUpload(data_id,"delete","","");//日志上报      
			            var url="/cvresume/delete/"+data_id + "/";
			            $.get(url, function(message) {
			                if(message.type == "success"){
			                    $this.closest("div.item").remove();
			                    $("#web_size").html($('#web_size').eq(0).text()-1);			
			                }else{
			                    layer.msg(message.content);
			                }
			            });
					}
				});
			});				
	    	//我是hr回复评论
	    	$('.hr_eval .eval_list .eval_btn').click(function(){
	    		var $this=$(this);
				var data_id=$(this).attr("data_id");
				var reply=$(this).attr("data");
				common.main.resume_confirm({
					title:"回复评论",
					content_html:"<div contenteditable='true'></div>",					
					modal_class:"hr_eval_content",
					ok:"确定",
					cancel:"取消",
					onOk:function(){
						var content = $(".hr_eval_content div[contenteditable]").text();
						//console.log(content);
						$.post("/member/hr/reply/?id="+data_id+"&content="+content,function(message){
							if(message.type=="success"){
								layer.msg("回复成功");
								window.location.reload();
							}else{
								$.message("warn",message.content);
							}
						});
						
					}
				});	 
				$(".hr_eval_content div[contenteditable]").text(reply)
	    	});
	    	//删除案例提示框
	    	$('.hr_case .span_btn .del').click(function(){
	    		var $this=$(this);
				var caseid=$(this).attr("data_casesid");
				common.main.resume_confirm({
					title:"",
					content_html:"<span class='delete-title'>确定删除当前案例吗？</span><span class='delete-tips'>案例删除后将无法恢复。</span>",					
					modal_class:"delete-content",
					ok:"确定",
					cancel:"取消",
					onOk:function(){
					$.get("/member/hr/deleteCases/?caseid="+caseid,function(message){
							if(message.type=="success"){
								window.location.reload();
							}else{
								$.message("warn",message.content);
							}
						});
					
					}
			    });	    		
	    	});	
	    	//警告弹框
	    	$(document).on("click",".ts",function(){
	    	  common.main.resume_confirm({
					title:"",
					content_html:"<span class='delete-title'>提醒</span><span class='delete-tips'>您选择的HR尚未上传已完成简历，无法确认订单。</span>",					
					modal_class:"delete-content",
					ok:"确定",
					cancel:"取消",
					onOk:null
			    });	    		
	    	});
	    	//专家服务完成案例提示框
	    	$(document).on("click",".hr_li .complete:not(.yituikuan),.task_hr_li .complete:not(.yituikuan)",function(){
	    		var $this=$(this);
	    		var sn=$(this).attr("data_sn");
				common.main.resume_confirm({
					title:"",
					content_html:"<span class='delete-title'>确认完成订单？</span><span class='delete-tips'>确认完成后可以结束订单并进行评价，此操作无法恢复。</span>",					
					modal_class:"delete-content",
					ok:"确定",
					cancel:"取消",
					onOk:function(){					
						$.post("/member/order/confrim_receive_order/",{"token":getCookie("token"),"sn":sn},function(message){
							layer.msg(message.content);
							if(message.type=="success"){
							   	   var id=$this.attr("date_id");
							   	   var orderName=$this.parents("li").find(".orderName").text();
							   	   if(!common.main.is_empty(orderName)){
								   	    var reg=new RegExp("/$");    
								   	    if(reg.test(orderName)){
								   	     	orderName=orderName.substring(0,orderName.length-1)
								   	    } 
							   	   }
							  	   $.get("/member/review/hrReview/",{"id":id,"orderName":orderName},function(result){
									     $("#hr-eval-modal div").remove();
								         if(result.div!=-1){
								            $("#hr-eval-modal").append(result);
								         }
						  		   });
							   	  $("#hr-eval-modal").modal("show")
							}
						});					
					}
				});	    		
	        });
	        //订单下拉框
            $(".wdddDiv .orderHead .info").click(function()  
		    {  
		        $(this).css({backgroundImage:"url(down.png)"}).next("ul.select-box").slideToggle(300).siblings("ul.select-box").slideUp("slow");  
		        $(this).siblings().css({backgroundImage:"url(left.png)"});  
		    });

	    	//工单列表状态
	    	$(document).on("click",".workorder_head .span_select s",function(){
	    		if($(this).find(".select_box").css("display") == "none"){
	    			$(this).find(".select_box").css("display","block");
	    			$(this).find("i").css({
	    				"transform":"rotate(180deg)",
	    				"top":"-1px"
	    			});
	    		}else{
	    			$(this).find(".select_box").css("display","none");
	    			$(this).find("i").css({
	    				"transform":"rotate(0deg)",
	    				"top":"5px"
	    			});
	    		}
	    		return false
	    	});	   

	    	$(document).on("click",".workorder_head .select_box s",function(){
	    		var s_text = $(this).text();
	    		$(this).addClass("current").siblings().removeClass("current");
	    		$(this).parent("s").find("b").text(s_text);
	    		$(".workorder_head .span_select i").css({
	    			"transform":"rotate(0deg)",
	    			"top":"5px"
	    		});	    		
	    		$(this).parents(".select_box").css("display","none");
	    	});    	
	    	//工单创建
	    	$(document).on("click",".create_step .create_item a",function(){
	    		var data_create = $(this).attr("data_create");
	    		$(".member_workorder_create .create_tab span").eq(1).addClass("current").siblings().removeClass("current");
	    		$(".create_content .create_step").eq(1).addClass("current").siblings().removeClass("current");
	    	});
			$(document).on('click',function(){
				$(".myhome-select-cv .select-box").removeClass("show");
				$(".zxjl-ul .set-box").removeClass("show");
			    $(".workorder_head .select_box").css("display","none");
	    		$(".workorder_head .span_select i").css({
	    			"transform":"rotate(0deg)",
	    			"top":"5px"
	    		});	
			});
			
	    	$(document).on("click",".reply_form_div",function(){
	    		$(this).hide();
	    		$(".reply_form .textarea_editor").css("display","block");
	    	});	
	    	//工单类型选择点击事件
	    	$(document).on("click", ".create_item a", function(){
	    		$(this).closest("div.create_item").addClass("type_selected");
	    	});
	    	//创建工单操作
	    	$(document).on('click', '.create_btn button', function(){
	    		//获取工单类型
	    		var type = $(".type_selected a").attr("data_create");
	    		//获取工单标题
	    		var title = $(".create_form [name=title]").val();
	    		//获取工单描述
	    		var description = $(".create_form [name=description]").val();
	    		//获取微信号
	    		var weixin = $(".create_form [name=weixin]").val();
	    		//获取工单附件
	    		var attachment = $(".create_form [name=attachment]").val();
	    		if(title == "" || description == "" || weixin == ""){
	    			layer.msg("标题   | 问题描述 | 微信号都不能为空喔！");
	    			return;
	    		}
	    		$.ajax({
	    			type:"post",
	    			dataType:"json",
	    			url:"/member/workOrder/create_submit/",
	    			data:{
	    				type:type,
	    				title:title,
	    				description:description,
	    				weixin:weixin,
	    				attachment:attachment
	    			},
	    			success:function(data){
	    				if(data.type == "success"){
	    					location.href = "/member/workOrder/";
	    				}else{
	    					layer.msg(data.content);
	    				}
	    			}
	    		})
	    	});
	    	//工单回复操作
	    	$(document).on('click', '#work_order_reply_btn', function(){
	    		//获取SN号
	    		var sn = $(this).closest("div.reply_btn").attr("data-value");
	    		//获取回复的内容
	    		var content = $("textarea[name=content]").val();
	    		$.ajax({
	    			type:"post",
	    			url:"/member/workOrder/"+sn+"/reply/",
	    			data:{
	    				content: content
	    			},
	    			dataType:"json",
	    			success:function(data){
	    				if(data.type == "success"){
	    					location.reload();  //回复成功刷新页面
	    				}else{
	    					layer.msg(data.content);
	    				}
	    			}
	    		});
	    		
	    	});
	    	//工单状态更新操作
	    	$(document).on('click', '#work_order_solved_btn', function(){
	    		//获取SN号
	    		var sn = $(this).closest("div.reply_btn").attr("data-value");
	    		$.ajax({
	    			type:"post",
	    			url:"/member/workOrder/"+sn+"/solved/",
	    			data:{},
	    			dataType:"json",
	    			success:function(data){
	    				if(data.type == "success"){
	    					location.href = "/member/workOrder/"; //状态更新成功后跳转到工单首页
	    				}else{
	    					layer.msg(data.content);
	    				}
	    			}
	    		});
	    	});
	    },
	    create_editor:function(){//创建工单富文本
	    	// http://www.wangeditor.com/
			var editor = new wangEditor('create_editor');
	        // 上传图片
	        editor.config.uploadImgUrl = '/file/upload/work_order_file/';
	        editor.config.uploadImgFileName = 'file';
	        editor.config.uploadParams = {
                token: getCookie("token")
            };
	        // 自定义上传事件
	        editor.config.uploadImgFns.onload = function (resultText, xhr) {
	            // resultText 服务器端返回的text
	            // xhr 是 xmlHttpRequest 对象，IE8、9中不支持
	            // 上传图片时，已经将图片的名字存在 editor.uploadImgOriginalName
	            var originalName = editor.uploadImgOriginalName || '';  
	            // 如果 resultText 是图片的url地址，可以这样插入图片：
				var html='<img src=' + resultText + ' alt="' + originalName + '"  style="max-width:100%;"/>';
	            editor.command(null, 'insertHtml', html);
	            // 如果不想要 img 的 max-width 样式，也可以这样插入：
	            // editor.command(null, 'InsertImage', resultText);
	        };
	        editor.config.uploadHeaders = {
	            // 'Accept' : 'text/x-json'
	        }
	        editor.config.menus = [
		        'img',
	     	];
	        editor.create();
	        var textArea = $(".wangEditor-txt");
	        var numItem = $(".textarea_counter .word");
	        common.main.words_deal_textarea(textArea,numItem);    	
	    },
		team_vip_event:function(){
            // 引导弹框
	    	var inner, inner_top, inner_left;
            try{
            	if(window.localStorage && localStorage.getItem("has_guide") === null && $('.team_main').length> 0){
    				inner_top = $('.tt_detail + .huiyuan-upload').offset().top +40;
    				inner_left = $('.tt_detail + .huiyuan-upload').offset().left -7;
                    inner = '<div class="team_guide_masking"><div class="team_guide_modal" style="top:'+
    					inner_top+ 'px; left:'+
    					inner_left+'px'+
    					';"><span>点击这里可以查看会员权限哦~</span><a href="javascript:;" class="team_guide_close">我知道了</a></div></div>';
    				$(inner).appendTo($('body'));
                }else if(window.localStorage && localStorage.getItem("has_guide") === null && $('.team_child').length> 0){
                    inner_top = $('.tt_detail').offset().top +30;
                    inner_left = $('.tt_detail').offset().left;
                    inner = '<div class="team_guide_masking"><div class="team_guide_modal" style="top:'+
                        inner_top+ 'px; left:'+
                        inner_left+'px'+
                        ';"><span>点击这里可以查看会员权限哦~</span><a href="javascript:;" class="team_guide_close">我知道了</a></div></div>';
                    $(inner).appendTo($('body'));
                }
                $('.team_guide_masking .team_guide_close').on('click',function(){
                	localStorage.setItem('has_guide','true');
                	$('.team_guide_masking').fadeOut().remove();
    			});
            }catch(e){
        		console.log("显示团体会员蒙层错误~");
        	}
            //	复制邀请链接
            $("#add_team_child #copyUrl").on("click",function(){
                var str = $(".shareContent span").html();
                common.main.set_copyToClipBoard(str);
                $("#copyUrl").html("复制成功");
                setTimeout(function(){
                    $("#copyUrl").html("复制链接")
                },2000);
                layer.msg("复制成功~");
                $("#add_team_child").modal("hide");
            });
            //	放大流程图片
			$('.team_tutorial_list .team_tutorial_amplify').on('click',function(){
				var src = $(this).parent('.team_tutorial_list').find('img').attr('src');
				$('.team_tutorial_amplify_masking img').attr('src',src);
				$('.team_tutorial_amplify_masking').fadeIn();
				$('body').css('overflow-y','hidden')
			});
            $('.team_tutorial_amplify_masking').on('click',function(){
            	$(this).fadeOut();
                $('body').css('overflow-y','auto');
                $(this).find('img').attr('src','');
			});
            //生成团体会员邀请链接的点击事件
        	$("#genInviLinks").click(function(){
        		$.ajax({
        	        type: "post",
        	        dataType: "json",
        	        url: '/member/team/gengerat_code/',
        	        data: {},
        	        success: function (data) {
        	        	if(data.type == "success"){
        	        		$(".shareContent span").text("http://"+window.location.hostname+"/bind/team_vip/?code="+data.content);
        		        	$("#add_team_child").modal("show");
        	        	}else{
        	        		layer.msg(data.content);
        	        	}
        	        }
        	    });
        	});
		},
		page_form_event:function(){
			var $listForm = $("#pf_listForm");
			var $pageNumber = $("#pf_pageNumber");
			var $selectOption = $listForm.find(".pf_selectOption");

			//自定义下拉按钮
			$selectOption.click(function(){
				var $this = $(this);
				var $name = $("[name="+$this.attr("pf-data-name")+"]");
				$name.val($this.attr("pf-data-value"));
				$listForm.submit();
				return false;
			});

			//页码跳转
			$.page_form_pageSkip = function(pageNumber){
				$pageNumber.val(pageNumber);
				$listForm.submit();
				return false;
			}
		},
	    resume_share:function(){//分享简历
	    	$("#shareResume-modal #copyUrl").on("click",function(){
	        	 var str = $(".shareContent span").html() + $(".shareContent input").val()+"/";
	        	 common.main.set_copyToClipBoard(str);
	             $("#copyUrl").html("复制成功");
	             setTimeout(function(){
	                 $("#copyUrl").html("复制链接")
	             },2000);
	        });
	    },
	    set_copyToClipBoard:function (str) {
	        //复制到剪贴板
	    	 var copyInput = $("<input type='text' value='"+ str +"' style='opacity:1;position:absolute;top:20px;z-index:999;' id='copyText'>");
	         $(".in").length >0 ? dom = $(".in")[0] : dom = "body"
	         copyInput.appendTo(dom);
	         document.getElementById("copyText").select();
	         document.execCommand("copy",false,null)
	         $("#copyText").remove();
	    },
	    is_empty:function(str){
	    	if(str==null||str==""||str==undefined){
	    		return true;
	    	}else{
	    		return false;
	    	}
	    },
	    resume_confirm:function(options){//系统确认性弹框
			var settings = {
					title:"操作提示标题",
					content:"操作提示内容",
					content_html:"",
                    tips_modal_class:"confirm_modal",
					modal_class:"tips-modal-content",
					ok: "确定",
					cancel: "取消",
					onOk: null,
					onCancel: null
			};
			$.extend(settings, options);
			var html='<div class="modal smallmodal fade" id="tips-common-modal">'+
			'	<div class="modal-dialog">'+
			'		<div class="modal-content show-swal2">'+
			'			<div class="modal-header">'+
			'				<span class="tips-title"></span>'+
			'				<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>'+
			'			</div>'+
			'			<div class="modal-body">'+
			'				<span class="tips-content"></span>'+
			'			</div>'+
			'			<div class="modal-footer">'+
			'				<button type="button"  class="button submit">确定</button><button type="button"  data-dismiss="modal" aria-hidden="true" class="button cancel">取消</button>'+
			'			</div>'+
			'		</div>'+
			'	</div>'+
			'</div>'
			var $modal=$(html);
			//组装弹框内容
			$modal.find(".tips-title").text(settings.title);
            $modal.addClass(settings.tips_modal_class);
			$modal.find(".modal-content").addClass(settings.modal_class);
			$("#tips-common-modal").remove();
			if(settings.content_html==""){
				$modal.find(".tips-content").text(settings.content);
			}else{
				$modal.find(".tips-content").remove();
				$modal.find(".modal-body").html(settings.content_html);
			}
			$modal.find("button.submit").text(settings.ok);
			$modal.find("button.cancel").text(settings.cancel);
			$modal.appendTo("body");
			
			var $confirm_btn=$("#tips-common-modal").find("button.submit");
			var $cancel_btn=$("#tips-common-modal").find("button.cancel");
			if ($confirm_btn != null) {
				$confirm_btn.click(function() {
					if (settings.onOk && typeof settings.onOk == "function") {
						if (settings.onOk() != false) {
							tips_modal_close();
						}
					} else {
						tips_modal_close();
					}
					return false;
				});
			}
			if ($cancel_btn != null) {
				$cancel_btn.click(function() {
					if (settings.onCancel && typeof settings.onCancel == "function") {
						if (settings.onCancel() != false) {
							tips_modal_close();
						}
					} else {
						tips_modal_close();
					}
					return false;
				});
			}
			$modal.modal("show");
			//弹框关闭通用方法
			function tips_modal_close(){
				$modal.modal("hide");
				$modal.remove();
				$(".modal-backdrop").remove();
				$("body").removeClass("suggestModal");
				$("body").removeClass("modal-open");
			}
		},
		getUrlParamsValue:function(name){//获取url中指定参数的值
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i");
			var r = window.location.search.substr(1).match(reg);
			if (r!=null) return (r[2]); return null;
		},
		repairResumeLeftHeight:function(){//修复简历左侧高度
			var resumeHeight = $(".wbdCv-resume").height();
			$(".wbdCv-resume").css({"height" : resumeHeight + "px"});
		},
		date_format:function(date,format){
			var month=date.getMonth() + 1;
			if(month<10){
				month="0"+month;
			}
			var o = {
				"M+" :month, // month
	
				"d+" : date.getDate(), // day
	
				"H+" : date.getHours(), // hour
	
				"m+" : date.getMinutes(), // minute
	
				"s+" : date.getSeconds(), // second
	
				"q+" : Math.floor((date.getMonth() + 3) / 3), // quarter
	
				"S" : date.getMilliseconds()
			}

			if (/(y+)/.test(format)) {
				format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
			}
			for ( var k in o) {
				if (new RegExp("(" + k + ")").test(format)) {
					format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k]: ("00" + o[k]).substr(("" + o[k]).length));
				}
			}
			return format; 
		},
		isEffect:function(sourcetStr,targetStr){//内容是否有效
			try{
				if(common.main.is_empty(sourcetStr)||$.isEmptyObject(sourcetStr)){
					return false;
				}
				if(common.main.is_empty(targetStr)){
					return true;
				}
				sourcetStr=JSON.stringify(sourcetStr).replace(/\s/g, "");
				targetStr=JSON.stringify(targetStr).replace(/\s/g, "");
				if(sourcetStr==targetStr){
					return false;
				}else{
					return true;
				}
			}catch(e){
				console.log("内容判断异常。。。。"+e);
				return false;
			}
		},
		init_authority_lock:function(){//初始化会员权限锁
			$.get("/cvresume/get_member_authoritys/",function(message){
				if(message.type=="success"){
					var ths=JSON.parse(message.content);
					$.each(ths,function(index,val){
						$('[data_auth="'+val+'"]').removeClass("wbd-vip-lock");
					});
				}
			});
			$(document).on("click",".wbd-vip-lock",function(){
				var data_show_vip_type = $(this).attr("data-show-vip-type");
				var $this=$(this);
				if(common.main.is_empty(data_show_vip_type)){
					data_show_vip_type=="super";
				}
				var opt=$this.attr("data_auth");
				//获取权限消息
				$.ajax({
					async:false,
					type:"GET",
					data:{"opt":opt},
					url:"/cvresume/validate_opt_auth/",
					success:function(message){
						if(message.type=="warn"){
							common.main.vip_opt_tips(data_show_vip_type);
						}else if(message.type=="error"){
							layer.msg(message.content);
							return false;
						}else if(message.type=="success"){
							$this.removeClass("wbd-vip-lock");
							$this.attr("readonly","");
							$this.trigger("click");
							return false;
						}
					}
				});
			});
		},
		select_template:function(){//模板滚动加载
			var loading=true;
	    	var number=2;
	    	$('.setNb').click(function(){
	    		 number=2;
	    		 loading=true;
	    	})
	    	$('.chose_resume_module').on('scroll',function(){
	   		 	var $this =$(this),
	            viewH =$(this).height(),//可见高度
	            contentH =$(this).get(0).scrollHeight,//内容高度
	            scrollTop =$(this).scrollTop();//滚动高度
	   		 	if(loading){
		            if(contentH - viewH - scrollTop <= 0) {
		                var resumeBankType=$(".select_type input[type=radio]:checked").attr("data-lang")
		                $.get("/cvresume/createcv_select_template/",{"resumeBankType":resumeBankType,"pageNumber":number},function(result){
		           			if(result==""||result==null||result.indexOf("li")==-1){
		           				layer.msg("没有更多了");
		   			      	    loading=false;
		   			      	}else{
			   			        $(".chose_resume_module ul").append(result);
			   			        number++;
		   			        }
		           		})
		          	}
	   		    }
	    	});
		},
		//会员登录状态检查
		vip_check_login_event:function(){
    		//检测是否登录
    		if(!$.checkLogin()) {   
    			if(typeof show_login_modal != "undefined" && typeof(show_login_modal)=="function"){
    				show_login_modal();
    			}else{
    				window.open('/login/');
    			}
    			return false;
    		}	
    		return true;
		},
		//会员类型判断（判断显示是普通弹框还是差价弹框）
		vip_opt_tips:function(data_show_type){
			//检测是否登录
    		var pathName = location.pathname;
    		if(pathName.indexOf("order/vip_member/") <= 0){
    			if(!common.main.vip_check_login_event()){
    				return;
    			};
    		}						
			//判断是否存在节点
			var token=getCookie("token");
			if($("#viporderform").length<=0){
				var from_html='<form id="viporderform" action="/member/order/create_vip_order/" method="post" target="_blank" novalidate="novalidate"><input name="token"type="hidden" value="'+token+'"/><input type="hidden"  name="productid" id="vipproductid" value=""><input type="hidden"  name="price" id="vippayprice" value=""><input type="hidden"  name="paytype" id="vippaytype" value=""></form>';								
				$("body").append(from_html);				
			}		
			$.ajax({
				type:"GET",
				url:"/order/up_vip/",
				success:function(data){
					var _data = JSON.parse(data.content);
					console.log(_data);
					if (_data.type =="common"){
						common.main.vip_common_modal(_data,data_show_type);
					} else if(_data.type =="up"){
						if(_data.isSuperVip){							
							layer.msg('你已经是'+ _data.rank_name +'，无需再升级。请刷新页面');
						}else{
							common.main.vip_spread_modal(_data);
						}
					}							
				}
			});									
		},
		//会员差价升级初始化时间选择显示
		vip_diff_time_show_event:function(data){
			if(data.isSuperVip){ //判断购买的是否是超级会员
				layer.msg('你已经是超级VIP了,不需要再购买了。');			
			}else{
				if(data.time_type =='month'){ //判断已经购买的是 月费版
					$(".super_price .three_month").addClass("checked").siblings().removeClass("checked");
					$(".pay_time_name").text('三个月');
				}else if(data.time_type =='year'){ //判断已经购买的是年费版
					$(".super_price .one_year").addClass("checked").siblings().removeClass("checked");
					$(".super_price .three_month").addClass("unchecked");
					$(".pay_time_name").text('一年');
				}else if(data.time_type =='forever'){ //判断已经购买的是终身版
					$(".super_price .long").addClass("checked").siblings().removeClass("checked");
					$(".super_price .three_month,.super_price .one_year").addClass("unchecked");
					$(".pay_time_name").text('终身');
				}
			}		
		},
		//会员弹框价格显示
		vip_price_show_event:function(data,data_show_type){
			var _vip_price;//vip价格
			var _vip_id;//vip,id
			var _type_value = $(".upgrade_type .tab span.checked").attr("type-value");//会员类型
			var _vip_diffPrice = $(".super_price .time_list.checked").attr("diff-price");//会员差价价格
			//普通会员切换会员类型tab数据显示判断
			if(_type_value == "super_vip"){	
				_vip_price = $(".super_price .checked .price i").text();
				_vip_id = $(".super_price .checked").attr("vip-id");
				
			}else if(_type_value == "template_vip"){	
				_vip_price = $(".template_price .checked .price i").text();
				_vip_id = $(".template_price .checked").attr("vip-id");
				
			}else if(_type_value == "cvresume_vip"){	
				_vip_price = $(".cvresume_price .checked .price i").text();
				_vip_id = $(".cvresume_price .checked").attr("vip-id");
			}
			//合计价格显示
			if($(".member_upgrade_modal").hasClass("cj")){
				$(".upgrade_total i").text(_vip_diffPrice);
				$(".upgrade_total i").attr("price-id",_vip_id);
				$(".upgrade_total i").attr("diff-price",_vip_diffPrice);
			}else{				
				$(".upgrade_total i").text(_vip_price);
				$(".upgrade_total i").attr("price-id",_vip_id);
			}
			
		},		 
		//会员弹框事件处理（会员类型切换效果，时间类型切换效果，初始化会员类型）
		vip_model_event:function(data,data_show_type){
			var _vip_price;
			var _vip_id;	
			
			//判断弹框初始化会员类型
			if(data_show_type =='template'){
				$("span[type-value='template_vip']").addClass("checked").siblings().removeClass("checked");
				$(".member_upgrade_modal .modal-body").attr("class","modal-body template_vip");				
			}else if(data_show_type =='resume'){
				$("span[type-value='cvresume_vip']").addClass("checked").siblings().removeClass("checked");
				$(".member_upgrade_modal .modal-body").attr("class","modal-body cvresume_vip");
			}else{
				$("span[type-value='super_vip']").addClass("checked").siblings().removeClass("checked");
				$(".member_upgrade_modal .modal-body").attr("class","modal-body super_vip");
			}	
			//普通升级会员类型点击切换事件
			$(".pt .upgrade_type .tab span").click(function(){
				var type_value = $(this).attr("type-value");
				$(this).addClass("checked").siblings().removeClass("checked");					
				$(".member_upgrade_modal .modal-body").attr("class","modal-body " +type_value);
				common.main.vip_price_show_event(data,data_show_type);
			});	
			//会员升级时间类型点击切换效果
			$(".upgrade_time .time_list").click(function(){				
				if($(this).hasClass("unchecked")){					
				}else{
					$(this).addClass("checked").siblings().removeClass("checked")				
					common.main.vip_price_show_event(data,data_show_type);
				}				
			});
			common.main.vip_price_show_event(data,data_show_type);
			
		},
		//会员普通升级弹框
		vip_common_modal:function(data,data_show_type){
			var pathName = location.pathname;
			var _location;
			if(pathName.indexOf("/template") != -1){
				 _location="模板商品页";
    		}else if(pathName.indexOf("/ppt") != -1){
    			_location="PPT商品页";
    		}
			var upgrade_html = '<div class="upgrade_type"><h3><i></i>选择会员类型</h3><div class="type_con">'
								+'<div class="tab clearfix">'
								+'<span class="checked" type-value="super_vip">超级VIP</span>'
								+'<span class="" type-value="template_vip">模板商城VIP</span>'
								+'<span class="" type-value="cvresume_vip">在线简历VIP</span>'
								+'</div>'
								+'<div class="con clearfix">'
									+'<div class="type_list">'
										+'<div class="text">导出在线简历+其他操作特权'
										+'<div class="tips">'
											+'<div class="tips_con">'
												+'<div class="template_tips"><span><i></i>不支持导出在线简历+其他操作特权</span></div>'
												+'<div><span><i></i>导出在线简历</span><span><i></i>更换模板</span><span><i></i>设置域名</span><span><i></i>导入站外简历</span><span><i></i>设置个性封面</span><span><i></i>设置自荐信</span><span><i></i>自定义图标</span></div>'
											+'</div>'
										+'</div></div><i class="state"></i>'
									+'</div>'
									+'<div class="type_list temp">'
										+'<div class="text">全站模板免费下载'
										+'<div class="tips">'
											+'<div class="tips_con">'
												+'<div class="resume_tips"><span><i></i>不支持免费下载全站所有word模板、PPT模板</span></div>'
												+'<span><i></i>免费下载全站所有word模板、PPT模板</span>'
											+'</div>'
										+'</div></div><i class="state"></i>'
									+'</div>'									
								+'</div>'
							+'</div>'
						+'</div>'
						+'<div class="upgrade_time">'
							+'<h3><i></i>选择会员有效期</h3>'
							+'<div class="time_con clearfix super_price">'
								+'<div class="time_list three_month checked 500dtongji" data_track="PC-MB3.0.1-模板商城-'+_location+'-会员类型弹框-超级VIP-月会员选项" vip-id = "'+data.superVipmonth.id+'"><s></s><p class="price">￥<i>'+ data.superVipmonth.price +'</i></p><p class="time">3个月</p>'
								+'</div>'
								+'<div class="time_list one_year 500dtongji" data_track="PC-MB3.0.1-模板商城-'+_location+'-会员类型弹框-超级VIP-年会员选项" vip-id = "'+data.superVipyear.id+'"><s></s><p class="price">￥<i>'+ data.superVipyear.price +'</i></p><p class="time">1年</p>'
								+'</div>'
								+'<div class="time_list long 500dtongji" data_track="PC-MB3.0.1-模板商城-'+_location+'-会员类型弹框-超级VIP-终身会员选项" vip-id = "'+data.superVipforever.id+'"><s></s><p class="price">￥<i>'+ data.superVipforever.price +'</i></p><p class="time">终身</p>'
								+'</div>'
							+'</div>'
							+'<div class="time_con clearfix template_price">'
								+'<div class="time_list three_month checked 500dtongji" data_track="PC-MB3.0.1-模板商城-'+_location+'-会员类型弹框-模板商城VIP-月会员选项" vip-id = "'+data.templateVipmonth.id+'"><s></s><p class="price">￥<i>'+ data.templateVipmonth.price +'</i></p><p class="time">3个月</p>'
								+'</div>'
								+'<div class="time_list one_year 500dtongji" data_track="PC-MB3.0.1-模板商城-'+_location+'-会员类型弹框-模板商城VIP-年会员选项" vip-id = "'+data.templateVipyear.id+'"><s></s><p class="price">￥<i>'+ data.templateVipyear.price +'</i></p><p class="time">1年</p>'
								+'</div>'
								+'<div class="time_list long 500dtongji" data_track="PC-MB3.0.1-模板商城-'+_location+'-会员类型弹框-模板商城VIP-终身会员选项" vip-id = "'+data.templateVipforever.id+'"><s></s><p class="price">￥<i>'+ data.templateVipforever.price +'</i></p><p class="time">终身</p>'
								+'</div>'
							+'</div>'
							+'<div class="time_con clearfix cvresume_price">'
								+'<div class="time_list three_month checked 500dtongji" data_track="PC-MB3.0.1-模板商城-'+_location+'-会员类型弹框-在线简历VIP-月会员选项" vip-id = "'+data.resumeVipmonth.id+'"><s></s><p class="price">￥<i>'+ data.resumeVipmonth.price +'</i></p><p class="time">3个月</p>'
								+'</div>'
								+'<div class="time_list one_year 500dtongji" data_track="PC-MB3.0.1-模板商城-'+_location+'-会员类型弹框-在线简历VIP-年会员选项" vip-id = "'+data.resumeVipyear.id+'"><s></s><p class="price">￥<i>'+ data.resumeVipyear.price +'</i></p><p class="time">1年</p>'
								+'</div>'
								+'<div class="time_list long 500dtongji" data_track="PC-MB3.0.1-模板商城-'+_location+'-会员类型弹框-在线简历VIP-终身会员选项" vip-id = "'+data.resumeVipforever.id+'"><s></s><p class="price">￥<i>'+ data.resumeVipforever.price +'</i></p><p class="time">终身</p>'
								+'</div>'	
							+'</div>'							
						+'</div>'
						+'<div class="upgrade_total"><div class="total" data_track="PC-MB3.0.1-模板商城-'+_location+'-会员类型弹框-在线简历VIP-终身会员选项">应付：<span>￥<i></i></span></div></div>';

			common.main.resume_confirm({
				tips_modal_class:"member_upgrade_modal pt",
				modal_class:"member_upgrade_content",
				content_html:upgrade_html,
				ok:"立即购买",
				onOk:function(){
					//检测是否登录
					if(!common.main.vip_check_login_event()){
	    				return;
	    			};
	    			$(this).addClass("500dtongji");
	    			var _type;
	    			if($(".member_upgrade_content .modal-body").hasClass("template_vip")){
	    				_type="模板商城VIP";
					}else if($(".member_upgrade_content .modal-body").hasClass("cvresume_vip")){
						_type="在线简历VIP";
					}else if($(".member_upgrade_content .modal-body").hasClass("super_vip")){
						_type="超级VIP";
					}
	    			common.main._500dtongji("PC-MB3.0.1-模板商城-"+_location+"-会员类型弹框-"+_type+"-立即购买");
					var pid= $(".upgrade_total i").attr("price-id");
					console.log(pid);
					if(pid==null||pid==""){
						layer.msg('获取不到对应的购买信息，请刷新后重试');
						return;
					}else{
						$("#vipproductid").val(pid);
						common.main.pay_type_modal();
						$(".payType_modal").stop().show();
						
					}	
				}
			
			});			
			
			common.main.vip_model_event(data,data_show_type);
			
		},
		//差价升级弹框		
		vip_spread_modal:function(data){
			var pathName = location.pathname;
			var _location;
			if(pathName.indexOf("/template") != -1){
				 _location="模板商品页";
    		}else if(pathName.indexOf("/ppt") != -1){
    			_location="PPT商品页";
    		}
			var upgrade_html = '<div class="upgrade_type"><h3><i></i>选择会员类型<span>（当前会员类型：<s class="pay_type_name">'+data.vip_name+'</s>）</span></h3><div class="type_con">'
								+'<div class="tab clearfix">'
								+'<span class="checked" type-value="super_vip">超级VIP</span>'
								+'<span class="" type-value="template_vip">模板商城VIP</span>'
								+'<span class="" type-value="cvresume_vip">在线简历VIP</span>'
								+'</div>'
								+'<div class="con clearfix">'
									+'<div class="type_list">'
										+'<div class="text">导出在线简历+其他操作特权'
										+'<div class="tips">'
											+'<div class="tips_con">'
												+'<span><i></i>导出在线简历</span><span><i></i>更换模板</span><span><i></i>设置域名</span><span><i></i>导入站外简历</span><span><i></i>设置个性封面</span><span><i></i>设置自荐信</span><span><i></i>自定义图标</span>'
											+'</div>'
										+'</div></div><i class="state"></i>'
									+'</div>'
									+'<div class="type_list temp">'
										+'<div class="text">全站模板免费下载'
										+'<div class="tips">'
											+'<div class="tips_con">'
												+'<span><i></i>免费下载全站所有word模板、PPT模板</span>'
											+'</div>'
										+'</div></div><i class="state"></i>'
									+'</div>'									
								+'</div>'
							+'</div>'
						+'</div>'
						+'<div class="upgrade_time">'
							+'<h3><i></i>选择会员有效期<span>（当前会员有效期：<s class="pay_time_name">3个月</s>）</span></h3>'
							+'<div class="time_con clearfix super_price">'
								+'<div class="time_list three_month 500dtongji" data_track="PC-MB3.0.1-模板商城-'+_location+'-会员类型弹框-超级VIP-月会员选项" vip-name="'+data.superVipmonth.name+'" diff-price="'+data.superVipmonth.diffPrice+'" vip-id = "'+data.superVipmonth.id+'"><s></s><p class="price">￥<i>'+ data.superVipmonth.price +'</i></p><p class="time">3个月</p>'
								+'</div>'
								+'<div class="time_list one_year 500dtongji" data_track="PC-MB3.0.1-模板商城-'+_location+'-会员类型弹框-超级VIP-年会员选项" vip-name="'+data.superVipyear.name+'" diff-price="'+data.superVipyear.diffPrice+'" vip-id = "'+data.superVipyear.id+'"><s></s><p class="price">￥<i>'+ data.superVipyear.price +'</i></p><p class="time">1年</p>'
								+'</div>'
								+'<div class="time_list long 500dtongji" data_track="PC-MB3.0.1-模板商城-'+_location+'-会员类型弹框-超级VIP-终身会员选项" vip-name="'+data.superVipforever.name+'" diff-price="'+data.superVipforever.diffPrice+'" vip-id = "'+data.superVipforever.id+'"><s></s><p class="price">￥<i>'+ data.superVipforever.price +'</i></p><p class="time">终身</p>'
								+'</div>'
							+'</div>'
						+'</div>'
						+'<div class="upgrade_total"><div class="total">应付差价：<span>￥<i></i></span></div></div>';
			
			common.main.resume_confirm({
				tips_modal_class:"member_upgrade_modal cj",
				modal_class:"member_upgrade_content",
				content_html:upgrade_html,
				ok:"付差价升级",
				onOk:function(){
					//检测是否登录
					if(!common.main.vip_check_login_event()){
	    				return;
	    			};
	    			$(this).addClass("500dtongji");
					common.main._500dtongji("PC-MB3.0.1-模板商城-"+_location+"-会员类型弹框-超级VIP-立即购买");
					var pid= $(".upgrade_total i").attr("price-id");
					var price= $(".upgrade_total i").attr("diff-price");
					if(pid==null||pid==""){
						layer.msg('获取不到对应的购买信息，请刷新后重试');
						return;
					}else{
						$("#vipproductid").val(pid);
						$("#vippayprice").val(price);
						common.main.pay_type_modal();
						$(".payType_modal").stop().show();
						
					}		
				}
			
			});		
			common.main.vip_diff_time_show_event(data);
			common.main.vip_model_event(data);
		},
	    //会员支付类型选择弹框
	    pay_type_modal:function(){
			common.main.resume_confirm({
				title:"支付类型选择",
				tips_modal_class:"payType_modal",
				content_html:'<div class="title"><h2>请选择支付方式</h2><span></span></div><div class="pbtn"><a class="wx payType" pay_id="weixin" href="javaScript:;">微信支付</a><a class="zfb payType" href="javaScript:;" pay_id="alipay">支付宝</a></div>',
			});
			
			$(document).on("click","a.payType",function(){
				var payid=$(this).attr("pay_id");
				if(payid==null||payid==""){
					layer.msg('获取不到对应的支付信息，请保存简历后刷新重试');
					return;
				}else{
					$("#vippaytype").val(payid);
				}
				$("#viporderform").submit();
				common.main.pay_tips_modal();
				$(".payTips_modal").stop().show();
				$(".payType_modal").modal("hide");
			});				
	    },
	    //支付返回提示弹框
		pay_tips_modal:function(){
			
			common.main.resume_confirm({
				title:"支付提示",
				tips_modal_class:"payTips_modal",
				content:"请在你新打开的页面上完成付款，支付完成后，请根据您支付的情况点击下面按钮。",
				ok:"支付完成",
				cancel:"支付遇到问题",
				onOk:function(){									
		    		var pathName = location.pathname;
		    		if(!common.main.is_empty(common.main.getUrlParamString("redirectUrl"))){
		    			location.href=common.main.getUrlParamString("redirectUrl");
		    		}else if(pathName.indexOf("order/vip_member/") > 0 || pathName.indexOf("member/") > 0){
		    			location.href="/member/order/"; 
		    		}else{
		    			location.reload();
		    		}	    	
				},
				onCancel:function(){
					window.open("http://help.500d.me");
				}
			});		
			$(".modal-backdrop").remove();
			
		},
		//模板下载超出数量提示框
		temp_download_modal:function(){
			common.main.resume_confirm({
				title:"非正常操作提示",
				content:"你的下载频率过高，已暂时禁用你的下载功能，24小时后可继续下载。",	
                tips_modal_class:"template_download_modal",
				ok:"确定",
				cancel:"",
				onOk:function(){
				
				}
		    });
		},
		resumeOperationLogUpload:function(resumeId,opt,headerDesc,optExtDesc){//操作日志上报
	    	$.post('/cvresume/operationLog/upload/',{"resumeId" : resumeId,"opt":opt,"headerDesc": headerDesc, "optExtDesc":optExtDesc},function(result){
	    		if(result.type != "success"){
	    			console.log(result.content);
	    		}
			});
	    },
	    //计算天数
        DateDiff:function(sDate1,  sDate2){//sDate1和sDate2是2006-12-18格式
	        var  aDate,  oDate1,  oDate2,  iDays
	        aDate  =  sDate1.split("-")
	        oDate1  =  new  Date(aDate[1]  +  '-'  +  aDate[2]  +  '-'  +  aDate[0])    //转换为12-18-2006格式
	        aDate  =  sDate2.split("-")
	        oDate2  =  new  Date(aDate[1]  +  '-'  +  aDate[2]  +  '-'  +  aDate[0])
	        iDays  =  parseInt(Math.abs(oDate1  -  oDate2)  /  1000  /  60  /  60  /24)    //把相差的毫秒数转换为天数
	        return  iDays
    	},
    	GetDateStr:function(AddDayCount) { 
			var dd = new Date(); 
			dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期 
			var y = dd.getFullYear(); 
			var m = dd.getMonth()+1;//获取当前月份的日期 
			var d = dd.getDate(); 
			return y+"-"+m+"-"+d; 
		},
		moveBackground:function(classname){
			var lFollowX = 0,
			      lFollowY = 0,
			      x = 0,
			      y = 0,
			      friction = 1 / 30;
			
			function moveBackground() {
			x += (lFollowX - x) * friction;
			y += (lFollowY - y) * friction;
			
			translate = 'translate(' + x + 'px) scale(1.1)';
			
			$(classname).css({
			  '-webit-transform': translate,
			  '-moz-transform': translate,
			  'transform': translate
			});
			
			window.requestAnimationFrame(moveBackground);
			}
			
			$(window).on('mousemove click', function(e) {
			
			var lMouseX = Math.max(-100, Math.min(100, $(window).width() / 2 - e.clientX));
			var lMouseY = Math.max(-100, Math.min(100, $(window).height() / 2 - e.clientY));
			lFollowX = (20 * lMouseX) / 100; // 100 : 12 = lMouxeX : lFollow
			lFollowY = (10 * lMouseY) / 100;
			
			});
			
			moveBackground(); 			
		},
		//百度打点
		_500dtongji:function(lable){
			try{
				if(lable!=null&&lable!=""&&lable!=undefined){
					window._hmt && window._hmt.push(['_trackEvent', lable, 'click']);
				}
			}catch(e){
				console.log("统计埋点错误~");
			}
		},
		//获取设备信息
		get_device_info:function(){
			var _defaultDeviceInfo = {
		        pc:true,
		        ios:false,
		        android:false,
		        winPhone:false,
		        wechat:false
		    };

		    var _deviceInfo;
			try{
				var _ua = navigator.userAgent;
				var _pf = navigator.platform.toLocaleLowerCase();
			    var _isAndroid = (/android/i).test(_ua)||((/iPhone|iPod|iPad/i).test(_ua) && (/linux/i).test(_pf))
			        || (/ucweb.*linux/i.test(_ua));
			    var _isIOS =(/iPhone|iPod|iPad/i).test(_ua) && !_isAndroid;
			    var _isWinPhone = (/Windows Phone|ZuneWP7/i).test(_ua);
			    var _isWechat = (/micromessenger/gi).test(_ua);

			    _deviceInfo = {
			        pc:!_isAndroid && !_isIOS && !_isWinPhone,
			        ios:_isIOS,
			        android:_isAndroid,
			        winPhone:_isWinPhone,
			        wechat:_isWechat
			    };
			}catch(e){
				console.log("获取设备信息失败",e);
			}
			_deviceInfo = $.extend({}, _defaultDeviceInfo, _deviceInfo);
		    return _deviceInfo;
		},
		zx_mblist_event:function(){
			//列表鼠标经过效果
			$(".zx-mblist-box .list-con").each(function(){
				   $(this).on('mouseenter',function(e){
					   var e=e||window.event;
					   var angle=direct(e,this)
					   mouseEvent(angle,this,'in')
				   })
				   $(this).on('mouseleave',function(e){
					   var e=e||window.event;
					   var angle=direct(e,this)
					   mouseEvent(angle,this,'off')
				   })
			});
			function direct(e,o){
				 var w=o.offsetWidth;
				 var h=o.offsetHeight;
				 var top= o.offsetTop;                    //包含滚动条滚动的部分
				 var left= o.offsetLeft;
				 var scrollTOP=document.body.scrollTop||document.documentElement.scrollTop;
				 var scrollLeft=document.body.scrollLeft||document.documentElement.scrollLeft;
				 var offTop=top-  scrollTOP;
				 var offLeft= left- scrollLeft;
				 var ex= (e.pageX-scrollLeft)|| e.clientX;
				 var ey=(e.pageY-scrollTOP)|| e.clientY;
				 var x=(ex-offLeft-w/2)*(w>h?(h/w):1);
				 var y=(ey-offTop-h/2)*(h>w?(w/h):1);
			
				 var angle=(Math.round((Math.atan2(y,x)*(180/Math.PI)+180)/90)+3)%4 //atan2返回的是弧度 atan2(y,x)
				 var directName=["上","右","下","左"];
				 return directName[angle];  //返回方向  0 1 2 3对应 上 右 下 左
			}
			function mouseEvent(angle,o,d){ //方向  元素  鼠标进入/离开
				   var w=o.offsetWidth;
				   var h=o.offsetHeight;
			
				   if(d=='in'){
					   switch(angle){
						   case '上':
							   $(o).find(".hover-btn").css({left:0,top:-h+"px"}).stop(true).animate({left:0,top:0},300)
							   break;
						   case '右':
							   $(o).find(".hover-btn").css({left:w+"px",top:0}).stop(true).animate({left:0,top:0},300)
							   break;
						   case '下':
							   $(o).find(".hover-btn").css({left:0,top:h+"px"}).stop(true).animate({left:0,top:0},300)
							   break;
						   case '左':
							   $(o).find(".hover-btn").css({left:-w+"px",top:0}).stop(true).animate({left:0,top:0},300)
							   break;
					   }
				   }else if(d=='off'){
					   switch(angle){
						   case '上':
							   setTimeout(function(){
								   $(o).find(".hover-btn").stop(true).animate({left:0,top:-h+"px"},300)
							   },200)
							   break;
						   case '右':
							   setTimeout(function(){
								   $(o).find(".hover-btn").stop(true).animate({left:w+"px",top:0},300)
							   },200)
							   break;
						   case '下':
							   setTimeout(function(){
								   $(o).find(".hover-btn").stop(true).animate({left:0,top:h+"px"},300)
							   },200)
							   break;
						   case '左':
							   setTimeout(function(){
								   $(o).find(".hover-btn").stop(true).animate({left:-w+"px",top:0},300)
							   },200)
							   break;
					   }
				   }
			}
			
		},
		ppt_imgmove_event:function(){
	        // PPT缩略图 上 & 下 移动

	        //已修改
	        var ImgDown , ImgUp;
	        $("body").on('mouseenter','.imgUp',function(){
	            var $this = $(this).parent().find("img"), ImgTop = $this.css("top").substring(0,$this.css("top").indexOf("px"));
	            clearInterval(ImgUp);
	            ImgUp = setInterval(function(){
	                if(ImgTop < 0){
	                    ImgTop++;
	                    $this.css("top",ImgTop+"px");
	                }else{
	                    clearInterval(ImgUp);
	                }
	            },5)
	        });
	        $("body").on("mouseleave ",".imgUp",function(){
	            clearInterval(ImgUp)
	        });
	        $("body").on('mouseenter','.imgDown',function(){
	            var $this = $(this).parent().find("img"), ImgTop = $this.css("top").substring(0,$this.css("top").indexOf("px")), ImgH = $this.height();
	            clearInterval(ImgDown);
	            ImgDown = setInterval(function(){
	                if($this.height() > $this.parent().height()){
	                    if(-ImgTop == (ImgH - $this.parent().height())){
	                        clearInterval(ImgDown);
	                    }else{
	                        ImgTop--;
	                        $this.css("top",ImgTop+"px");
	                    }
	                }
	            },5)
	        });
	        $("body").on("mouseleave ",".imgDown",function(){
	            clearInterval(ImgDown)
	        });
	        // end			
		},
		getCheck:function(){
			var documentH = document.documentElement.clientHeight;
			var scrollH = document.documentElement.scrollTop || document.body.scrollTop;
			return documentH+scrollH>=common.main.getLastH() ?true:false;

		},
		getLastH:function(){//ppt-listItem为ul的id，listItem为li的class
			var wrap = document.getElementById('ul_listItem');
			var boxs = common.main.getClass(wrap,'li_item');
			return boxs[boxs.length-1].offsetTop+boxs[boxs.length-1].offsetHeight;
		},
		getClass:function(wrap,className){
			var obj = wrap.getElementsByTagName('*');
			var arr = [];
			for(var i=0;i<obj.length;i++){
				if(obj[i].className == className){
					arr.push(obj[i]);
				}
			}
			return arr;
		},		
		lazyLoadData:function(url){
			if(!common.main.is_empty(url)){
				var keyword = $("#search_btn").val();
				var type = $("#search_btn").attr('data_type');
				var sortType = $("#search_btn").attr('sort_type');
				$.get(
					url,
					{
						keyword:keyword,
						type:type,
						sortType:sortType,
						pageNumber:common.info.reloadWallfulPage
					},
					function(data){
		            	common.info.isReload=true;
			            if(data == ""){
			            	common.info.isMaxPage=true;
			            }else{
			            	$("#ul_listItem .li_item:last").before(data);
			            }
			            common.info.reloadWallfulPage++;
		 			}
		 		);
			}
		},
		lazyLoadInit:function(url){//异步加载列表动作初始化
			window.onscroll = function(){
				if(common.main.getCheck()&&common.info.isReload&&!common.info.isMaxPage){
					common.info.isReload=false;
					common.main.lazyLoadData(url);
				}
			}
		},	
        text_maxlength:function(className,maxwidth){
            function Trim(str){return str.replace(/(^\s*)|(\s*$)/g, "");}            
            className.each(function(){
            var max_width=maxwidth;
                if($(this).text().length>maxwidth){ 
                    $text = Trim($(this).text().substring(0,max_width))
                    $(this).text($text); 
                    $(this).html($(this).html()+'…');
                }
            });            
        },
        search_event:function(){
			//限制字符个数
//            common.main.text_maxlength($("#search_btn"),200); 
			//搜索框回车按钮事件
			$("#search_btn").keydown(function(event){
				if(event.keyCode ==13){
					var keyword = $(this).val();
					if(keyword == ""){
						layer.msg("搜索内容不能为空喔~");
						return;
					}
					var type = $(this).attr('data_type');
					var sortType = $(this).attr('sort_type');
				    location.href = "/search/?type=" + type + "&keyword=" + keyword + "&sortType=" + sortType;
				 }
			});
			$("#search_mg_btn").on("click", function(){
				var keyword = $("#search_btn").val();
				if(keyword == ""){
					layer.msg("搜索内容不能为空喔~");
					return;
				}
				var type = $("#search_btn").attr('data_type');
				var sortType = $("#search_btn").attr('sort_type');
				location.href = "/search/?type=" + type + "&keyword=" + keyword + "&sortType=" + sortType;
			});
			//加载更多
			common.main.lazyLoadInit('/search/');
		},
		//判断是否开启团体会员管理的入口
		is_open_team_vip_manager_enter: function(){
			$.ajax({
				type:"get",
				url:"/member/team/get_rest_size/",
				success:function(data){
					if(data > 0){  //显示团体会员子账号管理入口
						$('#team_vip_manager_identifer').removeClass("team_child");
						$('#team_vip_manager_identifer').addClass("team_main");
						$('#team_vip_manager_enter').css("display","block");
					}
				}
			});
		},
		//获取社区消息或系统消息或求职消息的未读消息数量
		set_message_notification_count: function(type,id){
			$.get("/member/message_notification/count/",{"type":type},function(data){
				if(data>0){
					$("#"+id).text(data);
					$("#"+id).closest(".mess-num").show();
				}else{
					$("#"+id).closest(".mess-num").hide();
				}
			})
		},
		//设置右侧导航栏我的工单显示的未读消息的总数量
		set_work_order_total_not_read_count:function(){
			//获取我的工单的未读信息数量（包括我的工单、社区消息、系统消息和求职消息）
			$.get("/common/get_message_notification_count/",function(data){
				if(data>0){
					$('div.member-nav li.xx').find('s').text(data);
					$('div.member-nav li.xx').find('s').css('display','block');
				}else{
					$('div.member-nav li.xx').find('s').remove();
				}
			});
		},
		words_deal_textarea:function(textArea,numItem){
			var max = numItem.siblings("span").text(),curLength;
	        curLength = textArea.text().length;
	        numItem.text(curLength);
	        textArea.on('input propertychange', function () {
		        var _value = $(this).text().replace(/\n/gi,"");
		        if(_value.length>max){
		        	numItem.addClass("over");
		        }else{
		        	numItem.removeClass("over");
		        }
		        numItem.text( _value.length);
		        console.log(_value);
	        });
		},
		// 在线编辑6.2.0 发布页新增 - 分页和图片放大镜
		pagination_and_magnifier:function(){
	        if($(".wbdCv-container").length > 0 && $(".wbdCv-container").hasClass("resume") && !$(".wbdCv-container").hasClass("mobile")){
	            // 分页
	            var nowPageSize = 0; // 当前页数
	            var resumePageHeight = 1160;// 每页高度
	            var resumePageHtml = '<div class="resumePageBreak"><span>内容超过一页请用回车键避开空白处</span></div>';
	            var resumeHeight = $(".wbdCv-resume").css({"height" : "auto","min-height":1160*2/3}).outerHeight();
	            var pageSize = Math.ceil(resumeHeight / resumePageHeight);
	            if(pageSize != nowPageSize) {
	                var nowResumeHeight = pageSize * resumePageHeight;
	                $(".wbdCv-resume").css({"height" : nowResumeHeight + "px"});
	                nowPageSize = pageSize;
	                // 清楚resumePageBreak
	                $("div.resumePageBreak").remove();
	                for(var index = 1; index < pageSize; index++) {
	                    if(index!=pageSize){
	                        var pageBreakObj = $(resumePageHtml);
	                        pageBreakObj.css({"top" : ((index * resumePageHeight)-20) + "px"});
	                        $(".wbdCv-resume").append(pageBreakObj);
	                    }
	                }
	            }
	            //	图片作品放大镜
	            if($(".cv-preview .work-img").length > 0){
	                $(".cv-preview .work-img").each(function(){
	                    var $open_magnifier = $('<div class="open_magnifier"></div>').html('<span>查看大图</span>');
	                    $open_magnifier.appendTo($(this))
	                });
	            }
	            $(".work-list .work-img .open_magnifier span").on('click',function(){
	            	var src = $(this).parents(".work-img").find(".work-img-inner").find("img").attr("src"),
						$magnifier_masker = $('<div class="magnifier_masker"></div>').html('<div></div><span class="magnifier" style="background:url('+src+') center no-repeat; background-size:100%;"></span>');
					$magnifier_masker.appendTo($('body'));
	            	$('body').css('overflow','hidden');
				});
	            $(document).on('click','.magnifier_masker>div',function(){
					$(".magnifier_masker").remove();
					$('body').removeAttr('style')
				})
	        }
		},
		/**购物车数量*/
		cartSize:function() {
			var size = getCookie("cartSize");
			if(!size)
				$.ajax({async : false, url : wbdcnf.base + "/cart/size/", cache : false, type : "GET", success : function(data) {
					size = data;
				}});
			if(size && size > 0){
				$("#cart").addClass("cur");
			}else{
				$("#cart").removeClass("cur");
			}
		},
		/** 回到顶部 **/
		gotop:function(){
		    var gotop = '<div class="gotop 500dtongji" data_track="PC-通用-通用-全屏右侧-帮助浮标-返回顶部"></div>';
		    $("body").append(gotop);
		    $(".gotop").click(function(){$('html, body').animate({scrollTop:0}, 700);});
		    var min_height = 200;
		    $(window).scroll(function(){
		        var s = $(window).scrollTop();
		        if(s > min_height){
		            $(".gotop").fadeIn(100);
		        }else{
		            $(".gotop").fadeOut(100);
		        };
		    });
		},
		/**
		 * 登录信息
		 */
		loginMsg:function(userName, userHead) {
			if(!userName) {
				userHead = getCookie("memberHead");
				userName = getCookie("memberName");
				userEmail = getCookie("memberEmail");
				userIsVerifyEmail = getCookie("memberIsVerifyEmail");
				memberIsVerifyMobile = getCookie("memberIsVerifyMobile");
				isVIP = getCookie("memberIsVIP");
			}
			if (userName != null || userEmail != null) {
				if(userName == null || userName == "")
					userName = "我的五百丁";
				$("#login").hide(); // 登录按钮
				$("#register").hide(); // 注册按钮
				$("#login-register").hide(); // 登录和注册间隔符
				$("#userName").text(userName).show(); // 显示名称
				$("#myResume").show();	//显示“我的简历”
				$("#userHead").show().find("img").attr("src", userHead); // 显示头像
				//判断是否是会员
				if(isVIP=="true") {
					$("#userName").next().addClass("vip");	//高亮vip图标
					$("#isVIP").show();
					$("#isNotVIP").hide();
				}else {
					$("#userName").next().removeClass("vip");	//高亮vip图标
					$("#isVIP").hide();
					$("#isNotVIP").show();
				}
				$("#window_dialog").remove(); // 移除登录窗口
				$("#user_logout").show().click(function(){ // 登出按钮事件
					common.main.loginOut();
				});
				//是否验证
				if(!common.main.is_empty(userEmail)&&userEmail.indexOf("@")!=-1&&userIsVerifyEmail=="false"){//邮箱注册
					$(".tips_div").find(".email_tips").show();
					$(".tips_div").find(".mobile_tips").hide();
				}else{
					if(memberIsVerifyMobile=="false"){
						$(".tips_div").find(".email_tips").hide();
						$(".tips_div").find(".mobile_tips").show();
					}
				}
				if(userIsVerifyEmail=="false"&&memberIsVerifyMobile=="false"){
					$(".tips_div").show();
					$(".message_notification").show();
				}else{
					$(".tips_div").hide();
				}
			} else {
				$("#login").show(); // 登录按钮显示
				$("#userHead").hide();	//隐藏头像
			}
		},
		/**
		 * 注销登录
		 */
		loginOut:function() {
			$.get(wbdcnf.base + "/logout/", function(data){
				if(data.type == "success") {
					$("#userHead").hide(); // 头像隐藏
					$("#userName").hide(); // 用户名隐藏
					$("#myResume").hide();	//隐藏“我的简历”
					$(".ul_top_user").hide(); // 用户操作菜单隐藏
					$(".m-top_user").hide(); // 用户操作菜单隐藏
					
					$("#login").show(); // 显示登录按钮
					$("#register").show(); // 显示注册按钮
					$("#login-register").show(); // 显示注册和登录间隔符
					common.main.cartSize(); // 计算购物车
					var synarr = $(data.content); // 同步登出论坛
					synarr.each(function(index, ele) {
					    $.getScript(ele.src, function(){});
					});
					location.reload();
				} else {
					var loaded = 0;
					var synarr = $(data.content);
					if(data.content != "" && synarr.length > 0) {
						synarr.each(function(index, ele) {
							$.getScript(ele.src, function(){
								if (++loaded == synarr.length) {
									location.href = wbdcnf.base + "/";
								}
							}).fail(function() {
								location.href = wbdcnf.base + "/";
						    });
						});
					} else {
						location.href = wbdcnf.base + "/";
					}
				}
			});
		},
		//发送邮件
		sendEmail:function(email,send_url,send_method){
			var flag=false;
			//发送邮件
			$.ajax({
				url: send_url,
				type: send_method,
				data: {"email":email},
				dataType: "json",
				async:false,
				cache: false,
				success: function(message) {
					if(message.type=="success"){
						flag=true;
					}else{
						layer.msg(message.content);
					}
				}
			});
			return flag;
		},
		checkSize:function(file, showAlert, max_size) {
			if(!max_size)
				max_size = 3;
			var max_file_size = max_size * 1024 * 1024;
			if(file && file.files && file.files[0] && file.files[0].size) {
				var size = file.files[0].size;
				if(size > max_file_size) {
					if(showAlert)
						alert("上传图片文件过大，请上传小于" + max_size + "M的文件！");
					return false;
				}
			}
			return true;
		},
		/**百度连接主动推送*/
		baiduPoster:function() {
		    var bp = document.createElement('script');
		    bp.src = '//push.zhanzhang.baidu.com/push.js';
		    var s = document.getElementsByTagName("script")[0];
		    s.parentNode.insertBefore(bp, s);
		},
		/** xss 过滤*/
		xssFilter:function(str){
			//1校验JavaScript运行环境
			if(str==null||str==""){
				return;
			}
			str=str.trim();//去空格
			str=str.toLowerCase();
			str=str.replace(new RegExp("javascript:;","gm"),"");//移除全局的javascript:;标记
			str=str.replace(new RegExp("javascript：;","gm"),"");
			if(str.indexOf("<script")!=-1){
				return "<script>";
			}
			if(str.indexOf("javascript:")!=-1){
				return "javascript:";
			}
			if(str.indexOf("javascript：")!=-1){
				return "javascript：";
			}
			if(str.indexOf("vbscript:")!=-1){
				return "vbscript:";
			}
			if(str.indexOf("vbscript：")!=-1){
				return "vbscript：";
			}
			if(str.indexOf("eval(")!=-1){
				return "eval(";
			}
			if(str.indexOf("<body")!=-1){
				return "<body>";
			}
			if(str.indexOf("document.write(")!=-1){
				return "document.write";
			}
			if(str.indexOf("innerhtml(")!=-1){
				return "innerHTML()";
			}
			if(str.indexOf("document.cookie")!=-1){
				return "document.cookie";
			}
			if(str.indexOf("<iframe")!=-1){
				return "<iframe>";
			}
			if(str.indexOf("<link")!=-1){
				return "<link>";
			}
			if(str.indexOf("document.location")!=-1){
				return "document.location";
			}
			if(str.indexOf("location.href")!=-1){
				return "location.href";
			}
		},
		/** 浏览器版本支持检查*/
		brower_check:function(){
			 try{
			  // 用于帮助 GA 检测各种奇奇怪怪的浏览器
			  // 参考：http://jeffshow.com/get-more-precise-browser-info-in-google-analytics.html
			  var browserName = "Other";
			  var ua = window.navigator.userAgent;
			  browserRegExp = {
			    Sogou : /SE\s2\.X|SogouMobileBrowser/,
			    Explorer2345 : /2345Explorer|2345chrome|Mb2345Browser/,
			    Liebao : /LBBROWSER/,
			    QQBrowser : /QQBrowser/,
			    Baidu : /BIDUBrowser|baidubrowser|BaiduHD/,
			    UC : /UBrowser|UCBrowser|UCWEB/,
			    MiuiBrowser : /MiuiBrowser/,
			    Wechat : /MicroMessenger/,
			    MobileQQ : /Mobile\/\w{5,}\sQQ\/(\d+[\.\d]+)/,
			    Shoujibaidu : /baiduboxapp/,
			    Firefox : /Firefox/,
			    Maxthon : /Maxthon/,
			    Se360 : /360SE/,
			    Ee360 : /360EE/,
			    TheWorld : /TheWorld/,
			    Weibo : /__weibo__/,
			    NokiaBrowser : /NokiaBrowser/,
			    Opera : /Opera|OPR\/(\d+[\.\d]+)/,
			    Edge : /Edge/,
			    AndroidBrowser : /Android.*Mobile\sSafari|Android\/(\d[\.\d]+)\sRelease\/(\d[\.\d]+)\sBrowser\/AppleWebKit(\d[\.\d]+)/i,
			    IE : /Trident|MSIE/,
			    Chrome : /Chrome|CriOS/,
			    Safari : /Version[|\/]([\w.]+)(\s\w.+)?\s?Safari|like\sGecko\)\sMobile\/\w{3,}$/,
			  };
			  for (var i in browserRegExp) {
			    if (browserRegExp[i].exec(ua)) {
			      browserName = i;
			      break;
			    }
			  }
			  //判断是否是国产双核浏览器，是的话，则判断是否是兼容模式
			  var browserAgent   = (navigator.userAgent).toLocaleLowerCase();
			    var two_kit=false;//是否是国产双核浏览器
			    if(browserName.indexOf("Se360") != -1 || browserName.indexOf("Ee360") != -1 || browserName.indexOf("QQBrowser") != -1|| browserName.indexOf("Explorer2345") != -1|| browserName.indexOf("Sogou") != -1|| browserName.indexOf("Liebao") != -1) {
			    	two_kit = true; //国产双核浏览器
			    }
			  	user_agent = navigator.userAgent.toLowerCase();
			  	//当前是支持IE10以上的
			  	var title="你的浏览器版本过低不支持在线制作。";
			  	var content="本网站不支持您当前的浏览器版本，如果继续使用会影响编辑效果<br/>请将浏览器升级至最新版本<br/>或使用以下浏览器，以获得最佳使用体验。";
			  	var is_show=false;
			    if (user_agent.indexOf("msie 7.0")>-1&&user_agent.indexOf("trident/5.0")>-1){
			    	is_show=true;
			    }else if (user_agent.indexOf("msie 8.0")>-1&&user_agent.indexOf("trident/5.0")>-1){
			    	is_show=true;
			    }else if(user_agent.indexOf("msie 8.0")>-1) {
			    	is_show=true;
			    }else if(user_agent.indexOf("msie 7.0")>-1&&user_agent.indexOf("trident/4.0")>-1){
			    	is_show=true;
			    }else if(user_agent.indexOf("msie 7.0")>-1){
			    	is_show=true;
			    }else if(user_agent.indexOf("msie 6.0")>-1){
			    	is_show=true;
			    }
			    if(is_show){
			    	if(two_kit){
			    		title="你当前浏览器使用的是兼容模式";
			    	  	content="本网站不支持您当前的浏览器的兼容模式，如果继续使用会影响编辑效果<br/>请你将浏览器模式调为极速模式<br/>或使用以下浏览器，以获得最佳使用体验。";
			    	}
			    	$("#brower_title_tips").html(title);
			    	$("#brower_content_tips").html(content);
			    	$("#browserModal").modal("show");
			    }
			 }catch(e){
			  console.log("浏览器版本检测失败");
			 }
		},
		check_mobile:function(mobile){
			var flag=false;
			//发送邮件
			$.ajax({
				url: '/register/check_mobile/',
				type: "GET",
				data: {"mobile":mobile},
				dataType: "json",
				async:false,
				cache: false,
				success: function(bindFlag) {
					if(bindFlag){
						flag=true;
					}
				}
			});
			return flag;
		},
		check_email:function(email){
			var flag=false;
			//发送邮件
			$.ajax({
				url: '/register/check_email/',
				type: "GET",
				data: {"email":email},
				dataType: "json",
				async:false,
				cache: false,
				success: function(bindFlag) {
					if(bindFlag){
						flag=true;
					}
				}
			});
			return flag;
		},
		getUrlParamString:function(name) { 
			try{
				var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
				var r = window.location.search.substr(1).match(reg); 
				if (r != null) {
					return unescape(r[2]);
				}
				return "";
			}catch(e){
				
			}
			return "";
		},
		copyToClipBoard:function(str){
			var copyInput = $("<input type='text' value='http://www.500d.me/resume/"+ str +"/' style='opacity:0' id='copyText'>");
			copyInput.appendTo("body");
			document.getElementById("copyText").select();
			document.execCommand("copy",false,null)
			$("#copyText").remove();
		},
		form_to_json:function(form){    
		   var o = {};    
		   var a = form.serializeArray();    
		   $.each(a, function() {    
		       if (o[this.name]) {    
		           if (!o[this.name].push) {    
		               o[this.name] = [o[this.name]];    
		           }    
		           o[this.name].push(this.value || '');    
		       } else {    
		           o[this.name] = this.value || '';    
		       }    
		   });    
		   return o;    
		},
		ajax_sync_send:function(url,data,method){
			var _rsp="";
			$.ajax({
				type : method,
			   	cache: false,
			   	async : false,
			   	url : url,
			    data:data,
			   	success : function(rsp) {
			   		_rsp= rsp;
			   	}
			});
			return _rsp;
		},
		trim:function(str){ 
		  return str.replace(/\s+/g, "");
		},
		// 新建简历弹框
        create_resume:function(){
            var _type, _item_id, _map;

            function next() {
                var _index = $(".contain_list .contain_inner_modal.show_modal").parent().index();
                if(_index <= 2){
                    var $this = $(".contain_list .contain_inner_modal.show_modal");
                    $this.parent().next().find(".contain_inner_modal").addClass("show_modal");
                    $this.removeClass("show_modal");
                    // $(".contain_list .contain_inner_modal.show_modal").animate({top:"188px"},800)
                }
            }   //  第一步跳转第二步， 第二步跳转第三步
            function close_panel(){
                $("#create_resume_panel").fadeOut();
                $("body").css("overflow","auto");
                $(".contain_list .contain_inner_modal.show_modal").removeClass("show_modal").removeAttr("style");
                $(".chose_type .doc_resume .doc_resume_option").removeClass("checked");
                $(".chose_type .resume_type_list").removeClass("selected");
                $(".chose_template .resume_template.selected").removeClass("selected");
                $(".field_list .list_body .selected").removeClass("selected");
                $(".chose_type .doc_resume .doc_resume_option[data-type='zh']").addClass("checked");
            }   //  关闭弹框方法
		    $(".open_create_resume_panel").on("click",function(){
                $("#create_resume_panel").fadeIn();
                $("body").css("overflow","hidden");
                $(".chose_type .doc_resume .doc_resume_option").removeClass("checked");
                $(".chose_type .resume_type_list").removeClass("selected");
                $(".chose_type .doc_resume .doc_resume_option[data_type=zh]").addClass("checked")
                $("#create_resume_panel").find(".contain_inner_modal").eq(0).addClass("show_modal").animate({top:"188px;"},800);
                $(".field_list .list_body span").removeClass("selected");
                $(".field_list .list_body span").eq(2).addClass("selected");
                $(".field_list .list_body span").eq(3).addClass("selected");
                $(".field_list .list_body span").eq(4).addClass("selected");

            });		//  打开弹框
            $(".contain_inner_modal .close_panel").on("click",function(){
                close_panel();
            });	// 关闭新建简历弹框按钮
		    $(".chose_type .doc_resume .doc_resume_option").on("click",function(e){
		    	$(this).parents(".resume_type_list").addClass("selected").siblings().removeClass("selected");
		        $(".chose_type .doc_resume .doc_resume_option").removeClass("checked");
		        $(this).addClass("checked");
		        e.stopPropagation()
            });	 // 文档简历选择类型
            $(".resume_type_list.doc_resume").on("click",function(){
                $(this).addClass("selected").siblings().removeClass("selected");
                $(".chose_type .doc_resume .doc_resume_option").removeClass("checked");
                $(".chose_type .doc_resume_option[data_type=zh]").addClass("checked");
            }); // 选择文档简历
		    $(".chose_type .wap_resume, .chose_type .post_resume").on("click",function(){
		    	if($(this).hasClass("wbd-vip-lock")){
		    		close_panel();
		    	}
		    	//打点数据
		    	if($(this).attr("data_type")=="wap"){
		    		var _data=$(".close_type").attr("data_track");
		    		var _track=_data.replace("文档简历","手机简历");
		    		$(".close_type").attr("data_track",_track);
		    		var _wapDate=$(".next_type").attr("data_track");
		    		var _track=_wapDate.replace("文档简历","手机简历");
		    		$(".next_type").attr("data_track",_track);
		    		var _startDate=$(".start_edit").attr("data_track");
		    		var _track=_startDate.replace("文档简历","手机简历");
		    		$(".start_edit").attr("data_track",_track);
		    	}
		    	$(".chose_type .doc_resume .doc_resume_option").removeClass("checked");
		        $(this).addClass("selected").siblings().removeClass("selected");
            });	// 选择手机简历 || 导出简历
            $(".chose_type .modal_footer a").on("click",function(){
                if($(".chose_type .doc_resume .doc_resume_option.checked").length > 0){
                    // 判断选择文档简历
                    _type = $(".chose_type .doc_resume .doc_resume_option.checked").attr("data_type");
					if(_type == "drop"){
						location.href="/dropcvresume/edit/";
					    // 跳转自由编辑页
                    }else{
                        next();
                        if(_type!="wap"){
                        	_type="doc"
                        }
                        $.get("/cvresume/createcv_select_template/",{"resumeBankType":_type},function(result){
    	        			if(result.div!=-1){
    	        			  $(".templateList div").remove()
    	        			  $(".templateList").append(result);
    	        			}
    	        		})
                        //在这里渲染简历模板，需要清空容器内容
                        
                        // 选择器：$(".chose_template .modal_body") => 第二步内容容器
                    }
                }else if($(".chose_type .wap_resume").hasClass("selected")){
                    // 判断选择手机简历
                    next();
                    _type="wap";
                    $.get("/cvresume/createcv_select_template/",{"resumeBankType":_type},function(result){
	        			if(result.div!=-1){
	        			  $(".templateList div").remove()
	        			  $(".templateList").append(result);
	        			}
	        		})
                    
                    //在这里渲染简历模板，需要判断是否清空容器内容
                    // 选择器：$(".chose_template .modal_body") => 第二步内容容器

                }else if($(".chose_type .post_resume").hasClass("selected")){
                    // 判断选择导入简历
                    close_panel();
                    if(!$(".chose_type .post_resume").hasClass("wbd-vip-lock")){
                    	if($.checkLogin()){
        	    			$("#importRModal").modal("show");
        	    		}else{
        	    			show_login_modal();
        	    			return;
        	    		}
                    }
                }
                $(".field_list .list_body span").each(function(){
			        var _data=$(this).html();
			        var _name=$(this).parent().siblings().find("span").html();
			        if(_type=="wap"){
			            _data="PC-CV6.5.0-首页-手机简历-选择常用字段-"+_name+"-"+_data;
                	}else{
                		_data="PC-CV6.5.0-首页-文档简历-选择常用字段-"+_name+"-"+_data;
                	}
			        $(this).attr("data_track",_data);
		        });
            });	// 第一步判断下一步按钮

             //滚动加载模板
            var loading=true;
	    	var number=2;
	    	$('.chose_type .modal_footer a').click(function(){
	    		 number=2;
	    		 loading=true;
                $(".chose_template .modal_footer a").removeClass("had_checked")
	    	});
            $(".templateList").on('scroll',function(){
	   		 	var $this =$(this),
	            viewH =$(this).height(),//可见高度
	            contentH =$(this).get(0).scrollHeight,//内容高度
	            scrollTop =$(this).scrollTop();//滚动高度
	   		 	if(loading){
		            if(contentH - viewH - scrollTop <= 150 ) {
		            	loading=false;
		            	if(_type!="wap"){
			             	_type="doc"
			             }
		                $.get("/cvresume/createcv_select_template/",{"resumeBankType":_type,"pageNumber":number},function(result){
		           			if(result==""||result==null||result.indexOf("div")==-1){
		           				layer.msg("没有更多了");
		   			      	    loading=false;
		   			      	}else{
			   			        $(".templateList").append(result);
			   			        number++;
			   			     loading=true;
		   			        }
		           		})
		          	}
	   		    }
	    	});
            // 选择模板
            $(document).on("click",".chose_template .resume_template",function(){
                $(this).addClass("selected").siblings().removeClass("selected");
                $(".chose_template .contain_inner_modal .modal_footer a").addClass("had_checked");
            });
            // 第二步 => 下一步
            $(".chose_template .modal_footer a").on("click",function(){
                if($(this).hasClass("had_checked")){
                    _item_id = $(".chose_template .resume_template.selected").attr("data-itemid");
                    next();
                }
            });
            // 选择字段
            $(".field_list .list_body span").on("click",function(){
            	if(!$(this).hasClass("wbd-vip-lock")){
            		if($(this).parents(".field_list").index() == 0){
                        return null
                    }else{
                        $(this).toggleClass("selected");
                    }
            	}
            });
            // 开始编辑按钮
            var maps={};
        	var map="";
            $(".chose_field .modal_footer a").on("click",function(){
               // _map = ["",""];     // 录入两个必填信息的字段
                /*$(".field_list .list_body .selected").each(function(){
                    // 遍历所有选中节点，获取字段标记，插入 _map
                })*/
            	_type1 = $(".chose_type .doc_resume .doc_resume_option.checked").attr("data_type");
            	if(_type=="wap"){
            		_type1="zh"
            	 }
            	$(".modal_body .field:not(.wbd-vip-lock)").each(function(){
            		var data_name=$(this).attr("data_name")
            		var key=$(this).attr("data_key");
            		var pd=$(this).hasClass("selected");
            		var title;
            		var	title1;
            		if(_type1=="zh"){
            		   title=$(this).html();
            		}else{
            		   title1=$(this).attr("data_title");
            		   $(this).html(title);
            		   title=$(this).html();
            		}
            		var _isShow = pd ? true : false;//获取上是否选中
            		if(data_name=="head"||data_name=="cover"||data_name=="letter"){//头像、封面、自荐信
            			maps[data_name]=_isShow;
            		}else if(data_name=="job_preference"){//求职意向
            			maps[data_name]={"isShow":true,"isTitleShow":true,"isTimeShow":true,"isContentShow":true,"title":title,"key":key};
            		}else if(data_name=="project"||data_name=="internship"||data_name=="work"){//项目经验、实习经验、工作经验
            			maps[data_name]={"isShow":_isShow,"isTitleShow":true,"isTimeShow":true,"isContentShow":true,"isCompanyShow":false,"title":title,"key":key};
            		}else{
            			maps[data_name]={"isShow":_isShow,"isTitleShow":true,"isTimeShow":true,"isContentShow":true,"title":title,"key":key};
            		}
            		map=JSON.stringify(maps);
            	});
				var itemId=$("#template_list div.selected").attr("data_itemid");
				url=encodeURI("/cvresume/create/?itemid="+_item_id+"&language="+_type1+"&map="+map);
				location.href=url;
            })
        }
};
$(function(){
	common.main.init_();//初始化对象
});