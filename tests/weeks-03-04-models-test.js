/* Run from the repository root: node tests/weeks-03-04-models-test.js */
'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const root=path.resolve(__dirname,'..');
for(const lang of ['en','vi']){
  const weeks=Array.from({length:12},(_,i)=>({num:i+1,title:'Original '+(i+1),beats:[{kind:'puzzle',html:'<p>Original bridge.</p><p>Keep this content.</p>'}]}));
  const before=JSON.parse(JSON.stringify(weeks));
  const sandbox={GM:{weeks,arcs:[{id:1},{id:2}],widgets:{},language:{isVietnamese:()=>lang==='vi'}}};
  vm.createContext(sandbox);
  for(const file of ['js/widgets/model-network-core.js','js/widgets/model-map-builder-and-route-tasks.js','js/widgets/model-structure-and-limits-labs.js','js/widgets/model-reflection-notes.js','js/data/weeks-03-04-models-and-transfer-revision.js']){
    vm.runInContext(fs.readFileSync(path.join(root,file),'utf8'),sandbox,{filename:file});
  }
  const G=sandbox.GM,B=G.bridge;
  assert.equal(G.weeks.length,12);
  assert.equal(G.weeks[2].beats[1].widget,'model-map-builder');
  assert.equal(G.weeks[3].beats[0].widget,'route-change-lab');
  assert(!G.weeks[3].beats.some(b=>b.widget==='rule-induction'));
  for(const n of [1,2,6,7,8,9,10,11,12]) assert.deepEqual(G.weeks[n-1],before[n-1]);
  assert(G.weeks[4].beats[0].html.endsWith('<p>Keep this content.</p>'));
  G.weeks.slice(2,4).forEach(w=>w.beats.forEach(b=>{if(b.widget)assert.equal(typeof G.widgets[b.widget],'function');}));
  const edges=['AB','BC','CD','BE','DE'];
  assert(B.pathOK(['A','B','E','D'],edges,['CD'],'A','D'));
  assert(!B.pathOK(['A','B','C','D'],edges,['CD'],'A','D'));
  assert(!B.pathOK(['A','D'],edges,[],'A','D'));
  assert(!B.pathOK(['A','B','E','B','C','D'],edges,[],'A','D'));
  assert(B.pathOK(['A','B','C','D','E'],edges,[],'A','E'));
  const deliveries=['KN','GN','KS','GS'];
  assert(B.pathOK(['K','S','G'],deliveries,[],'K','G',['N']));
  assert(!B.pathOK(['K','N','G'],deliveries,[],'K','G',['N']));
  const times={AB:4,BC:2,CD:3,BE:1,DE:7};
  function routes(prefix){const last=prefix.at(-1);if(last==='D')return [prefix];return 'ABCDE'.split('').filter(n=>!prefix.includes(n)&&edges.includes(B.edge(last,n))).flatMap(n=>routes([...prefix,n]));}
  const sums=routes(['A']).map(r=>r.slice(1).reduce((s,n,i)=>s+times[B.edge(r[i],n)],0)).sort((a,b)=>a-b);
  assert.deepEqual(sums,[9,12]);
  const title=G.weeks[3].title;G.bridgeApplyLessons();assert.equal(G.weeks[3].title,title);assert.equal(G.weeks.length,12);
  console.log(lang+': lesson replacement, untouched weeks, widget bindings, route constraints, travel times, idempotence — PASS');
}
