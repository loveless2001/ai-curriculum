/* Week 3 builds a model; Week 4 reuses the same accepted connections. */
(function () {
  'use strict';
  var B=GM.bridge;
  GM.widgets['model-map-builder']=function(container){
    var root=B.shell(container,B.t('Build and use a map','Dựng và dùng bản đồ'));
    var state=B.load('map-builder',{edges:[],valid:false}), first=null, feedback=B.status();
    function save(){B.save('map-builder',state);}
    function render(){
      root.replaceChildren();
      var label=B.el('p',{class:'br-eyebrow'},[state.valid?B.t('02 / Use the model','02 / Dùng mô hình'):B.t('01 / Build the model','01 / Dựng mô hình')]); root.appendChild(label);
      if(state.valid){
        root.appendChild(B.el('div',{class:'br-feedback good'},[B.t('All five connections are correct. Your map is saved for Week 4. Now go from A to E—not the familiar A-to-D example.','Cả năm đường nối đều đúng. Bản đồ được giữ lại cho tuần 4. Giờ đi từ A đến E—khác chuyến A đến D đã được chỉ sẵn.')]));
        B.pathPicker(root,{key:'map-new-journey',edges:state.edges,start:'A',end:'E',success:B.t('You reached E by combining known connections into a journey that was not shown as a worked example. You kept relationships, not just a complete answer. Other valid journeys are accepted too.','Bạn đã đến E bằng cách ghép những mối nối đã biết thành một chuyến đi chưa được cho làm mẫu. Bạn giữ các quan hệ, không chỉ một đáp án hoàn chỉnh. Các đường đi hợp lệ khác cũng được chấp nhận.')});
        root.appendChild(B.btn(B.t('Edit my map','Sửa bản đồ'),function(){state.valid=false;first=null;save();render();},'subtle'));
        return;
      }
      root.appendChild(B.el('p',{class:'br-hint'},[B.t('Use the connection cards. Click two places to add a road; click the same pair again to remove it. You can also use the menus.','Dựa vào các thẻ đường nối. Bấm hai điểm để thêm đường; bấm lại cùng cặp để xóa. Bạn cũng có thể dùng hai danh sách chọn.')]));
      var facts=B.el('div',{class:'br-facts'});
      B.roadEdges.forEach(function(e){facts.appendChild(B.el('span',{class:'br-fact'},[e[0]+' ↔ '+e[1]]));});root.appendChild(facts);
      var graph=B.el('div');root.appendChild(graph);
      B.graph(graph,{edges:state.edges,route:first?[first]:[],onNode:function(id){if(first===null){first=id;render();}else{toggle(first,id);first=null;render();}}});
      var controls=B.el('div',{class:'br-toolbar'}),a=B.el('select',{'aria-label':B.t('First place','Điểm thứ nhất')}),b=B.el('select',{'aria-label':B.t('Second place','Điểm thứ hai')});
      Object.keys(B.names()).forEach(function(k){a.appendChild(B.el('option',{value:k},[k]));b.appendChild(B.el('option',{value:k},[k]));});a.value=first||'A';b.value='B';
      controls.appendChild(a);controls.appendChild(B.el('span',{'aria-hidden':'true'},['↔']));controls.appendChild(b);
      controls.appendChild(B.btn(B.t('Add / remove road','Thêm / xóa đường'),function(){toggle(a.value,b.value);first=null;render();}));
      controls.appendChild(B.btn(B.t('Clear map','Vẽ lại'),function(){state={edges:[],valid:false};first=null;feedback.hidden=true;save();render();},'subtle'));
      controls.appendChild(B.btn(B.t('Check my map','Kiểm tra bản đồ'),function(){
        var missing=B.roadEdges.filter(function(e){return state.edges.indexOf(e)<0;}),extra=state.edges.filter(function(e){return B.roadEdges.indexOf(e)<0;});
        if(!missing.length&&!extra.length){state.valid=true;save();render();return;}
        B.tell(feedback,(missing.length?B.t('Missing connections: ','Còn thiếu đường: ')+missing.map(function(e){return e[0]+'–'+e[1];}).join(', ')+'. ':'')+(extra.length?B.t('Not listed in the cards: ','Không có trong thẻ: ')+extra.map(function(e){return e[0]+'–'+e[1];}).join(', ')+'.':''),'warn');
      },'primary'));
      root.appendChild(controls);root.appendChild(B.el('p',{class:'br-hint'},[first?B.t('Selected ','Đã chọn ')+first+B.t('. Choose a second place.','. Chọn điểm thứ hai.'):state.edges.length+B.t(' roads drawn. Check them against the five cards.',' đường đã vẽ. Đối chiếu với năm thẻ phía trên.')]));root.appendChild(feedback);
    }
    function toggle(a,b){if(a===b){B.tell(feedback,B.t('Choose two different places.','Chọn hai điểm khác nhau.'),'warn');return;}var e=B.edge(a,b),i=state.edges.indexOf(e);if(i<0)state.edges.push(e);else state.edges.splice(i,1);state.valid=false;feedback.hidden=true;save();}
    render();
  };
  GM.widgets['route-change-lab']=function(container){
    var root=B.shell(container,B.t('Find a route around a closure','Tìm đường tránh đoạn đóng'));
    var map=B.load('map-builder',{valid:false,edges:[]});
    var valid=map.valid && map.edges.length===5 && B.roadEdges.every(function(e){return map.edges.indexOf(e)>=0;});
    root.appendChild(B.el('div',{class:'br-situation'},[
      B.el('div',{},[B.el('span',{class:'br-eyebrow'},[B.t('Familiar journey','Đường quen thuộc')]),B.el('strong',{},['A → B → C → D'])]),
      B.el('div',{class:'br-alert'},[B.el('span',{class:'br-eyebrow'},[B.t('Today','Hôm nay')]),B.el('strong',{},[B.t('C–D is closed','Đoạn C–D đóng')])])
    ]));
    root.appendChild(B.el('p',{class:'br-hint'},[valid?B.t('Using your checked Week 3 map. Only the C–D connection is unavailable. Every other road remains open in both directions.','Đang dùng bản đồ bạn đã kiểm tra ở tuần 3. Chỉ đoạn C–D bị đóng. Mọi đường khác vẫn đi được hai chiều.'):B.t('Week 3 reference map shown. You can try this without completing Week 3; all roads except C–D work in both directions.','Đây là bản đồ tham chiếu của tuần 3. Bạn vẫn có thể thử nếu chưa làm tuần 3; mọi đường trừ C–D đều đi được hai chiều.')]));
    B.pathPicker(root,{key:'closed-road',edges:valid?map.edges:B.roadEdges,blocked:['CD'],start:'A',end:'D',success:B.t('You reached D without using C–D. You reused the connection model and updated one road’s availability. You did not need someone to teach the entire replacement journey.','Bạn đã đến D mà không qua đoạn C–D. Bạn dùng lại mô hình kết nối, chỉ cập nhật một đường đang bị đóng. Không cần ai dạy lại toàn bộ chuyến đi thay thế.')});
  };
  GM.widgets['transfer-route-lab']=function(container){
    var root=B.shell(container,B.t('Transfer the idea to a shipment','Dùng lại ý tưởng để chuyển hàng'));
    root.appendChild(B.el('div',{class:'br-feedback warn'},[B.t('Constraint: N cannot handle fragile parcels. The other locations can.','Điều kiện: N không nhận hàng dễ vỡ. Các điểm còn lại đều nhận được.')]));
    B.pathPicker(root,{key:'delivery-transfer',edges:['KN','GN','KS','GS'],coords:B.deliveryPositions,names:B.deliveryNames(),blockedNodes:['N'],start:'K',end:'G',nodeBlockedText:B.t('North N cannot handle this fragile parcel. Choose a location that can.','Trạm Bắc N không nhận kiện hàng dễ vỡ này. Hãy chọn trạm phù hợp.'),success:B.t('K → S → G satisfies the stated restriction. The reusable idea is to connect a start to a goal through allowed links and places. Here the constraint belongs to a handling location, not a closed road.','K → S → G đáp ứng điều kiện đã cho. Ý tưởng dùng lại là nối điểm đầu tới điểm đích qua các đường và điểm được phép. Ở đây, hạn chế nằm ở trạm xử lý hàng, không phải một đường bị đóng.')});
  };
})();
