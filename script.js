function naiveSearch(text, pattern){

let matches=[];
let comparisons=0;

for(let i=0;i<=text.length-pattern.length;i++){

let j=0;

while(j<pattern.length){

comparisons++;

if(text[i+j]!=pattern[j])
break;

j++;

}

if(j==pattern.length)
matches.push(i);

}

return {matches,comparisons};

}


function computeLPS(pattern){

let lps=new Array(pattern.length).fill(0);

let len=0;

let i=1;

while(i<pattern.length){

if(pattern[i]==pattern[len]){

len++;

lps[i]=len;

i++;

}

else{

if(len!=0){

len=lps[len-1];

}

else{

lps[i]=0;

i++;

}

}

}

return lps;

}


function kmpSearch(text,pattern){

let matches=[];

let comparisons=0;

let lps=computeLPS(pattern);

let i=0;

let j=0;

while(i<text.length){

comparisons++;

if(text[i]==pattern[j]){

i++;

j++;

}

if(j==pattern.length){

matches.push(i-j);

j=lps[j-1];

}

else if(i<text.length && text[i]!=pattern[j]){

if(j!=0)

j=lps[j-1];

else

i++;

}

}

return {matches,comparisons};

}



function rabinKarp(text,pattern){

const q=101;

const d=256;

let m=pattern.length;

let n=text.length;

let h=1;

for(let i=0;i<m-1;i++)

h=(h*d)%q;

let p=0;

let t=0;

let comparisons=0;

let matches=[];

for(let i=0;i<m;i++){

p=(d*p+pattern.charCodeAt(i))%q;

t=(d*t+text.charCodeAt(i))%q;

}

for(let s=0;s<=n-m;s++){

if(p==t){

let k=0;

for(k=0;k<m;k++){

comparisons++;

if(text[s+k]!=pattern[k])

break;

}

if(k==m)

matches.push(s);

}

if(s<n-m){

t=(d*(t-text.charCodeAt(s)*h)+text.charCodeAt(s+m))%q;

if(t<0)

t+=q;

}

}

return {matches,comparisons};

}



function runAlgorithms(){

let text=document.getElementById("text").value;

let pattern=document.getElementById("pattern").value;

let n=naiveSearch(text,pattern);

let k=kmpSearch(text,pattern);

let r=rabinKarp(text,pattern);

document.getElementById("naiveMatch").innerHTML=n.matches;

document.getElementById("naiveComp").innerHTML=n.comparisons;

document.getElementById("kmpMatch").innerHTML=k.matches;

document.getElementById("kmpComp").innerHTML=k.comparisons;

document.getElementById("rkMatch").innerHTML=r.matches;

document.getElementById("rkComp").innerHTML=r.comparisons;

}