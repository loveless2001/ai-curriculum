/* Compare relationships; then extend a connection map with explicit travel times. */
(function(){
  'use strict';var B=GM.bridge;
  GM.widgets['structure-compare']=function(container){
    var root=B.shell(container,B.t('Compare two maps','So sánh hai bản đồ'));
    var state=B.load('map-compare',{round:0,answers:[null,null],checked:[false,false]});
    function render(){
      root.replaceChildren();var tabs=B.el('div',{class:'br-toolbar'});
      [B.t('Comparison 1','So sánh 1'),B.t('Comparison 2','So sánh 2')].forEach(function(label,i){var btn=B.btn(label,function(){state.round=i;B.save('map-compare',state);render();},state.round===i?'active':'subtle');btn.setAttribute('aria-pressed',state.round===i?'true':'false');tabs.appendChild(btn);});root.appendChild(tabs);
      var pair=B.el('div',{class:'br-map-pair'}),original=B.el('figure'),changed=B.el('figure');
      original.appendChild(B.el('figcaption',{},[B.t('Original','Bản gốc')]));changed.appendChild(B.el('figcaption',{},[B.t('Map to check','Bản cần kiểm tra')]));
      var a=B.el('div'),b=B.el('div');original.appendChild(a);changed.appendChild(b);pair.appendChild(original);pair.appendChild(changed);root.appendChild(pair);
      B.graph(a,{edges:B.roadEdges,compact:true}); B.graph(b,{coords:B.rearranged,edges:state.round===0?B.roadEdges:B.roadEdges.filter(function(e){return e!=='BE';}),compact:true});
      root.appendChild(B.el('p',{class:'br-hint'},[B.t('The letters still refer to the same places. Lines that cross without a labeled dot do not make a new junction.','Các chữ cái vẫn chỉ cùng những địa điểm như trước. Nếu hai đường cắt nhau nhưng chỗ giao không có điểm và tên, thì đó không phải là một ngã rẽ mới.')]));
      root.appendChild(B.el('p',{},[B.el('strong',{},[B.t('Did the connections change?','Các đường nối có thay đổi không?')])]));
      var choices=B.el('div',{class:'br-choice-list'}),feedback=B.status();
      [B.t('No. Only the drawing changed.','Không. Chỉ cách vẽ thay đổi.'),B.t('Yes. At least one direct connection changed.','Có. Ít nhất một đường nối trực tiếp thay đổi.')].forEach(function(text,i){var lab=B.el('label',{class:'br-choice'}),radio=B.el('input',{type:'radio',name:'structure-choice',value:String(i)});radio.checked=state.answers[state.round]===i;radio.addEventListener('change',function(){state.answers[state.round]=i;state.checked[state.round]=false;B.save('map-compare',state);feedback.hidden=true;});lab.appendChild(radio);lab.appendChild(B.el('span',{},[text]));choices.appendChild(lab);});root.appendChild(choices);
      function check(){if(state.answers[state.round]===null){B.tell(feedback,B.t('Choose an answer first.','Hãy chọn một câu trả lời trước.'),'warn');return;}state.checked[state.round]=true;B.save('map-compare',state);var correct=state.answers[state.round]===state.round;
        var why=state.round===0?B.t('The same five pairs are connected. The page layout changed, but any previously valid journey is still valid.','Vẫn là năm cặp điểm cũ được nối với nhau. Chỉ vị trí trên hình thay đổi, nên mọi đường đi hợp lệ trước đây vẫn dùng được.'):B.t('B–E is no longer a direct road. B can still reach E via C and D; that does not make the set of connections unchanged.','Đường nối trực tiếp B–E đã biến mất. Ta vẫn có thể đi từ B đến E qua C và D, nhưng như vậy không có nghĩa hai bản đồ có cùng các đường nối.');
        B.tell(feedback,(correct?B.t('Correct. ','Đúng. '):B.t('Look at the connections again. ','Hãy nhìn lại các đường nối. '))+why,correct?'good':'warn');
      }
      root.appendChild(B.btn(B.t('Check my comparison','Kiểm tra nhận xét'),check,'primary'));root.appendChild(feedback);if(state.checked[state.round])check();
    }render();
  };
  GM.widgets['model-limits-lab']=function(container){
    var root=B.shell(container,B.t('Find the fastest journey','Tìm đường nhanh nhất'));
    var state=B.load('travel-time-question',{choice:null,unlocked:false}),times={AB:4,BC:2,CD:3,BE:1,DE:7};
    function render(){
      root.replaceChildren();
      if(state.unlocked){
        root.appendChild(B.el('div',{class:'br-feedback good'},[B.t('New information added: minutes on each road. For this exercise, times are the same in both directions, add together, and include no waiting. All roads are open.','Bây giờ mỗi đoạn đường đã có thời gian di chuyển. Trong bài này, đi hai chiều mất thời gian như nhau, tổng thời gian bằng thời gian của các đoạn cộng lại và không phải chờ. Tất cả các đường đều mở.')]));
        root.appendChild(B.el('p',{},[B.el('strong',{},[B.t('Now find the fastest route from A to D.','Giờ hãy chọn đường nhanh nhất từ A đến D.')])]));
        function cost(route){return route.slice(1).reduce(function(total,x,i){return total+times[B.edge(route[i],x)];},0);}
        B.pathPicker(root,{key:'fastest-journey',start:'A',end:'D',times:times,accept:function(route){return cost(route)===9;},success:function(route){var c=cost(route);return c===9?B.t('4 + 2 + 3 = 9 minutes. A → B → C → D is faster than A → B → E → D (12 minutes). You extended the model with travel times; you did not infer time from the drawing.','4 + 2 + 3 = 9 phút. A → B → C → D nhanh hơn A → B → E → D, mất 12 phút. Chỉ sau khi có thời gian của từng đoạn, bản đồ mới giúp bạn trả lời câu hỏi “đường nào nhanh nhất”.'):c+B.t(' minutes. This route works, but another route takes less time. Compare the sums through C and through E.',' phút. Đường này đi được nhưng chưa phải nhanh nhất. Hãy cộng lại thời gian của đường qua C và đường qua E để so sánh.');}});
        root.appendChild(B.btn(B.t('Revisit the missing-information question','Xem lại câu hỏi về thông tin còn thiếu'),function(){state.unlocked=false;B.save('travel-time-question',state);render();},'subtle'));return;
      }
      var map=B.el('div');root.appendChild(map);B.graph(map,{edges:B.roadEdges});
      root.appendChild(B.el('p',{},[B.el('strong',{},[B.t('Can this map alone tell you which route is fastest?','Chỉ bản đồ này đã đủ để chọn đường nhanh nhất chưa?')])]));
      var answers=[B.t('Yes: choose the route that looks shortest on the page.','Rồi: chọn đường trông ngắn nhất trên hình.'),B.t('Not yet: I need travel times for the available roads.','Chưa: cần thời gian di chuyển trên các đường đang mở.'),B.t('Yes: choose the familiar route because I have used it before.','Rồi: chọn đường quen vì trước đây đã đi đường ấy.')],feedback=B.status(),choices=B.el('div',{class:'br-choice-list'});
      answers.forEach(function(text,i){var label=B.el('label',{class:'br-choice'}),radio=B.el('input',{type:'radio',name:'missing-info',value:String(i)});radio.checked=state.choice===i;radio.addEventListener('change',function(){state.choice=i;B.save('travel-time-question',state);feedback.hidden=true;});label.appendChild(radio);label.appendChild(B.el('span',{},[text]));choices.appendChild(label);});root.appendChild(choices);
      root.appendChild(B.btn(B.t('Commit my answer','Chốt câu trả lời'),function(){
        if(state.choice===null){B.tell(feedback,B.t('Choose an answer before revealing the travel times.','Chọn câu trả lời trước khi mở thông tin thời gian.'),'warn');return;}
        if(state.choice!==1){B.tell(feedback,B.t('The map shows connections, not travel times. A familiar route may work without being fastest; a shorter line is only a drawing. What information would answer the question?','Bản đồ chỉ có đường nối, chưa có thời gian. Đường quen có thể đi được nhưng chưa chắc nhanh nhất; nét ngắn hơn chỉ là hình vẽ. Cần thông tin gì để trả lời?'),'warn');return;}
        state.unlocked=true;B.save('travel-time-question',state);render();
      },'primary'));root.appendChild(feedback);
    }render();
  };
})();
