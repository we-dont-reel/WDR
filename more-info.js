function moreInfo(postid){
  var container=document.querySelector('.outid-'+postid);
  if(!container)return;
  var bottomBar=container.nextElementSibling;
  if(!bottomBar||!bottomBar.classList.contains('post-bottom-bar'))return;
  var moreSpan=bottomBar.querySelector('.post-bottom-content .more-text');
  if(!moreSpan)return;
  var txt=moreSpan.textContent.trim();
  if(txt==='Show'){
    alert(postid);
  }else{
      console.log("djhf");
  }
}