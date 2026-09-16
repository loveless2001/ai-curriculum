/* Shared offline map primitives for Weeks 3–4. No dependencies or remote calls. */
(function () {
  'use strict';
  var B = GM.bridge = {}, memory = {}, NS = 'gm.w34.v2.';
  B.t = function (en, vi) { return GM.language.isVietnamese() ? vi : en; };
  B.el = function (tag, attrs, children) {
    var n = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (key) {
      if (key === 'html') n.innerHTML = attrs[key];
      else if (key === 'class') n.className = attrs[key];
      else if (key === 'value') n.value = attrs[key];
      else n.setAttribute(key, attrs[key]);
    });
    (children || []).forEach(function (c) { n.appendChild(typeof c === 'string' ? document.createTextNode(c) : c); });
    return n;
  };
  B.btn = function (text, click, cls) {
    var n = B.el('button', { type: 'button', class: 'br-btn ' + (cls || '') }, [text]);
    n.addEventListener('click', click); return n;
  };
  B.load = function (key, fallback) {
    if (key in memory) return JSON.parse(JSON.stringify(memory[key]));
    try { var raw = localStorage.getItem(NS + key); if (raw) return JSON.parse(raw); } catch (e) { /* Private/offline storage may be blocked. */ }
    return key in memory ? JSON.parse(JSON.stringify(memory[key])) : JSON.parse(JSON.stringify(fallback));
  };
  B.save = function (key, value) {
    memory[key] = JSON.parse(JSON.stringify(value));
    try { localStorage.setItem(NS + key, JSON.stringify(value)); } catch (e) { /* Keep this session usable. */ }
    document.dispatchEvent(new CustomEvent('bridge-progress'));
  };
  B.edge = function (a, b) { return [a,b].sort().join(''); };
  B.roadEdges = ['AB','BC','CD','BE','DE'];
  B.names = function () { return {A:B.t('Home','Nhà'),B:B.t('Square','Quảng trường'),C:B.t('Library','Thư viện'),D:B.t('Work','Chỗ làm'),E:B.t('Park','Công viên')}; };
  B.deliveryNames = function () { return {K:B.t('Warehouse','Kho'),N:B.t('North','Trạm Bắc'),S:B.t('South','Trạm Nam'),G:B.t('Delivery','Điểm giao')}; };
  B.positions = { A:[48,145], B:[165,145], C:[284,60], D:[424,145], E:[284,234] };
  B.rearranged = { A:[424,60], B:[284,60], C:[424,234], D:[165,234], E:[48,60] };
  B.deliveryPositions = { K:[48,145], N:[235,60], S:[235,234], G:[424,145] };
  B.status = function () { return B.el('div', { class:'br-feedback', role:'status', 'aria-live':'polite', 'aria-atomic':'true', hidden:'' }); };
  B.tell = function (n, text, kind) { n.hidden=false; n.className='br-feedback '+(kind || 'info'); n.textContent=text; };
  B.shell = function (container, label) {
    var root=B.el('div',{class:'br-widget','aria-label':label}); container.appendChild(root); return root;
  };
  B.graph = function (container, opt) {
    container.replaceChildren();
    var coords=opt.coords || B.positions, names=opt.names || B.names(), edges=opt.edges || B.roadEdges;
    var route=opt.route || [], blocked=opt.blocked || [], blockedNodes=opt.blockedNodes || [];
    var routeEdges=route.slice(1).map(function (x,i) { return B.edge(route[i],x); });
    var svgNS='http://www.w3.org/2000/svg';
    function s(tag,attrs,text) { var n=document.createElementNS(svgNS,tag); Object.keys(attrs||{}).forEach(function(k){n.setAttribute(k,attrs[k]);}); if(text)n.textContent=text; return n; }
    var svg=s('svg',{viewBox:'0 0 480 300',class:'br-map',role:opt.onNode ? 'group':'img','aria-label':opt.label || B.t('All direct connections shown below.','Các đường nối trực tiếp được liệt kê bên dưới.')});
    svg.appendChild(s('title',{},opt.label || B.t('Neighborhood connections','Các đường nối trong khu phố')));
    var usable=edges.filter(function(e){return blocked.indexOf(e)<0;});
    svg.appendChild(s('desc',{},B.t('Connections: ','Đường nối: ')+usable.map(function(e){return e[0]+'–'+e[1];}).join(', ')));
    edges.forEach(function(edge) {
      var a=coords[edge[0]],b=coords[edge[1]]; if(!a||!b)return;
      var closed=blocked.indexOf(edge)>=0 || blockedNodes.indexOf(edge[0])>=0 || blockedNodes.indexOf(edge[1])>=0;
      var selected=routeEdges.indexOf(edge)>=0;
      svg.appendChild(s('line',{x1:a[0],y1:a[1],x2:b[0],y2:b[1],class:'br-road'+(selected?' selected':'')+(closed?' closed':'')}));
      var x=(a[0]+b[0])/2,y=(a[1]+b[1])/2;
      if(closed) {
        svg.appendChild(s('circle',{cx:x,cy:y,r:13,class:'br-closure-bg'}));
        svg.appendChild(s('path',{d:'M '+(x-5)+' '+(y-5)+' l 10 10 M '+(x+5)+' '+(y-5)+' l -10 10',class:'br-closure-x'}));
      }
      if(opt.times && opt.times[edge]!==undefined) {
        svg.appendChild(s('rect',{x:x-24,y:y-13,width:48,height:26,rx:7,class:'br-time-bg'}));
        svg.appendChild(s('text',{x:x,y:y+5,'text-anchor':'middle',class:'br-time'},opt.times[edge]+' '+B.t('min','phút')));
      }
    });
    Object.keys(coords).forEach(function (id) {
      var p=coords[id], chosen=route.indexOf(id)>=0, last=route[route.length-1]===id;
      var group=s('g',{class:'br-node'+(chosen?' chosen':'')+(last?' current':'')+(blockedNodes.indexOf(id)>=0?' unavailable':''),'aria-label':B.t('Place ','Điểm ')+id+' · '+names[id]});
      if(opt.onNode) { group.setAttribute('role','button'); group.setAttribute('tabindex','0');
        group.addEventListener('click',function(){opt.onNode(id);});
        group.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();opt.onNode(id);}});
      }
      group.appendChild(s('circle',{cx:p[0],cy:p[1],r:19}));
      group.appendChild(s('text',{x:p[0],y:p[1]+7,'text-anchor':'middle',class:'br-node-letter'},id));
      var below=p[1]>=130 ? p[1]+39 : p[1]-32;
      group.appendChild(s('text',{x:p[0],y:below,'text-anchor':'middle',class:'br-map-name'},names[id]));
      svg.appendChild(group);
    });
    container.appendChild(svg);
    if(!opt.compact) container.appendChild(B.el('p',{class:'br-place-key'},Object.keys(names).map(function(k,i){return (i?'  ·  ':'')+k+' '+names[k];})));
    var details=B.el('details',{class:'br-map-details'});
    details.appendChild(B.el('summary',{},[B.t('Read connections as text','Đọc danh sách đường nối')]));
    details.appendChild(B.el('p',{},edges.map(function(e,i){return (i?', ':'')+e[0]+'–'+e[1]+(blocked.indexOf(e)>=0?' ('+B.t('closed','đóng')+')':'');})));
    container.appendChild(details);
  };
  B.pathOK = function (route, edges, blocked, start, end, blockedNodes) {
    if(route[0]!==start || route[route.length-1]!==end)return false;
    if(new Set(route).size!==route.length)return false;
    if(route.some(function(x){return (blockedNodes||[]).indexOf(x)>=0;}))return false;
    return route.slice(1).every(function(x,i){var e=B.edge(route[i],x);return edges.indexOf(e)>=0 && (blocked||[]).indexOf(e)<0;});
  };
  B.pathPicker = function (root,opt) {
    var state=B.load(opt.key,{route:[opt.start],checked:false}), graph=B.el('div'), controls=B.el('div',{class:'br-toolbar'});
    var output=B.el('p',{class:'br-route','aria-live':'polite'}), feedback=B.status();
    var select=B.el('select',{'aria-label':B.t('Next place','Điểm tiếp theo')});
    var names=opt.names || B.names(), edges=opt.edges || B.roadEdges, blocked=opt.blocked || [];
    Object.keys(names).forEach(function(id){select.appendChild(B.el('option',{value:id},[id+' · '+names[id]]));});
    root.appendChild(B.el('p',{class:'br-hint'},[B.t('Start at ','Bắt đầu ở ')+opt.start+B.t('. Select each next place on the map, or use the menu. Finish at ','. Bấm lần lượt các điểm tiếp theo trên bản đồ, hoặc dùng danh sách chọn. Kết thúc ở ')+opt.end+'.']));
    root.appendChild(graph); root.appendChild(output);
    controls.appendChild(select); controls.appendChild(B.btn(B.t('Add place','Thêm điểm'),function(){add(select.value);}));
    controls.appendChild(B.btn(B.t('Undo','Lùi một điểm'),function(){if(state.route.length>1)state.route.pop();state.checked=false;feedback.hidden=true;render();},'subtle'));
    controls.appendChild(B.btn(B.t('Start over','Chọn lại'),function(){state={route:[opt.start],checked:false};feedback.hidden=true;render();},'subtle'));
    controls.appendChild(B.btn(B.t('Check my journey','Kiểm tra đường đi'),check,'primary'));
    root.appendChild(controls);root.appendChild(feedback);
    function add(id) {
      var last=state.route[state.route.length-1],edge=B.edge(last,id);
      if(state.checked) {B.tell(feedback,B.t('Start over to try a different journey.','Bấm “Chọn lại” để thử đường khác.'));return;}
      if((opt.blockedNodes||[]).indexOf(id)>=0) {B.tell(feedback,opt.nodeBlockedText || B.t('This place cannot handle this shipment.','Điểm này không nhận loại hàng này.'),'warn');return;}
      if(state.route.indexOf(id)>=0){B.tell(feedback,B.t('That place is already in your journey. Use Undo to go back.','Điểm này đã có trong đường đi. Dùng “Lùi một điểm” để quay lại.'),'warn');return;}
      if(edges.indexOf(edge)<0){B.tell(feedback,B.t('There is no direct connection from ','Không có đường nối trực tiếp từ ')+last+B.t(' to ',' đến ')+id+'.','warn');return;}
      if(blocked.indexOf(edge)>=0){B.tell(feedback,edge[0]+'–'+edge[1]+B.t(' is closed. Try another connection.',' đang đóng. Hãy thử mối nối khác.'),'warn');return;}
      state.route.push(id);state.checked=false;feedback.hidden=true;render();
    }
    function check() {
      if(!B.pathOK(state.route,edges,blocked,opt.start,opt.end,opt.blockedNodes)){B.tell(feedback,B.t('Finish at ','Cần kết thúc ở ')+opt.end+B.t(' using the available connections.',' qua các đường đang dùng được.'),'warn');return;}
      var message=typeof opt.success==='function'?opt.success(state.route):opt.success;
      if(opt.accept && !opt.accept(state.route)){B.tell(feedback,message,'warn');return;}
      state.checked=true;B.save(opt.key,state);B.tell(feedback,message,'good');
    }
    function render(){ B.save(opt.key,state); B.graph(graph,{coords:opt.coords,names:names,edges:edges,blocked:blocked,blockedNodes:opt.blockedNodes,route:state.route,times:opt.times,onNode:add});output.textContent=B.t('Your journey: ','Đường bạn chọn: ')+state.route.join(' → '); }
    render(); if(state.checked)check();
    return {getState:function(){return state;}};
  };
})();
