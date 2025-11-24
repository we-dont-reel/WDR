function assetRouter(postid){
  var h = window.location.hostname;
  if(h==='we-dont-reel.github.io')
    return 'https://' + h + '/WDR/' + postid + '/';
  else
    return 'https://' + h + '/' + postid + '/';
}