/* Learner-written reflection is stored locally, never machine-graded. */
(function(){
  'use strict';var B=GM.bridge, serial=0;
  GM.widgets['bridge-notes']=function(container,opt){
    var root=B.shell(container,B.t('Your notes','Ghi chú của bạn'));
    var state=B.load(opt.id,{notes:[],reviewed:false}),status=B.el('p',{class:'br-hint',role:'status','aria-live':'polite'});
    (opt.prompts||[]).forEach(function(pair,i){
      var id='br-note-'+(++serial),label=B.el('label',{for:id,class:'br-note-label'},[B.t(pair[0],pair[1])]);
      var area=B.el('textarea',{id:id,rows:'3',class:'br-notes',placeholder:B.t('Write in your own words…','Viết bằng lời của bạn…')});area.value=state.notes[i]||'';
      area.addEventListener('input',function(){state.notes[i]=area.value;state.reviewed=false;B.save(opt.id,state);if(review)review.checked=false;status.textContent=B.t('Kept in this browser when local storage is available.','Được giữ trong trình duyệt nếu bộ nhớ cục bộ hoạt động.');});
      root.appendChild(label);root.appendChild(area);
    });
    var review=null;
    if(opt.id.indexOf('checkpoint')>=0){
      var checkbox=B.el('label',{class:'br-review'});review=B.el('input',{type:'checkbox'});review.checked=state.reviewed;
      review.addEventListener('change',function(){state.reviewed=review.checked;B.save(opt.id,state);});checkbox.appendChild(review);checkbox.appendChild(B.el('span',{},[B.t('I have reviewed my explanation. This is self-review, not an automatic score.','Tôi đã tự xem lại lời giải thích. Đây là tự đánh giá, không phải điểm chấm tự động.')]));root.appendChild(checkbox);
    }
    status.textContent=B.t('Your writing stays as written when you switch languages. No notes are sent anywhere.','Nội dung bạn tự viết giữ nguyên khi đổi ngôn ngữ. Không có ghi chú nào được gửi đi.');root.appendChild(status);
  };
})();
