import{j as s,S as o,r as t,_ as c,t as n,l as x,L as d}from"./index-3tEaDeYD.js";const m=()=>s.jsx(o,{className:"aspect-square rounded-3xl"}),j=t.lazy(()=>c(()=>import("./index-PRJvQxiZ.js"),__vite__mapDeps([0,1,2]))),u=({sectionType:e,objectList:l,sectionId:i})=>s.jsxs("section",{children:[s.jsx("h3",{className:"text-3xl",id:i,children:n(e)}),s.jsx("div",{className:"py-8",children:s.jsx(x,{className:"h-0.5"})}),s.jsx("div",{className:"grid grid-cols-3 gap-4 2xl:grid-cols-5",children:Object.entries(l).map(([a,r])=>s.jsx(t.Suspense,{fallback:s.jsx(m,{}),children:s.jsx(j,{text:r.name,Image:r.Image??d,uri:`${e}/${a}`})},a))})]});export{u as default};
function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/index-PRJvQxiZ.js","assets/index-3tEaDeYD.js","assets/index-oQOWz8jY.css"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
//# sourceMappingURL=index-htApgi7A.js.map
