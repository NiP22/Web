var photoPosts = [];


for(i = 0; i < 20; i++){
    photoPosts[i] = {};
    photoPosts[i].id = i + 1 + '';
    if(i % 2 == 0){
        photoPosts[i].descriprion = 'Im a scarry zerg Im a scarry zerg Im a scarry zerg Im a scarry zerg Im a scarry zerg Im a scarry zerg Im a scarry zerg \n Im a scarry zerg Im a scarry zerg Im a scarry zerg Im a scarry zerg Im a scarry zerg Im a scarry zerg Im a scarry zerg';
        photoPosts[i].photoLink = 'zerg-story-thumb.jpg';
    }
    else{
        photoPosts[i].descriprion =  "Important news Important news Important news Important news Important news Important news Important news Important news\n Important news Important news Important news Important news Important news Important news Important news Important news";
        photoPosts[i].photoLink = 'trump.png';
    }

    photoPosts[i].Date = new Date('2018-02-22T22:00:00');
    photoPosts[i].author = 'Name';
}


function validatePhotoPost(photoPost) {
    if (typeof(photoPost.id) != typeof('') || photoPost.id == null){
        alert(0);
        return false;
    }
    if (typeof(photoPost.descriprion) != typeof('') || photoPost.descriprion == null){
        alert(1);
        return false;
    }
    if (typeof(photoPost.photoLink) != typeof('') || photoPost.photoLink == null){
        alert(2);
        return false;
    }
    if (typeof(photoPost.author) != typeof('') || photoPost.author == null){
        alert(3);
        return false;
    }
    if (typeof(photoPost.Date) != typeof(new Date()) || photoPost.id == null){
        alert(4);
        return false;
    }
    return true;
  }




  function getPhotoPosts(gallery, skip, top) {
    if (skip === undefined) {
      skip = 0;
    }
    if (top === undefined) {
      top = 10;
    }
    result = [];
    for (i = skip; i < skip + top && i < gallery.length; ++i) {
        if(validatePhotoPost(gallery[i])){
            result[result.length] = gallery[i]
        }
    }
    return result;
  }


  function getPhotoPost(gallery, id) {
    for (i = 0; i < gallery.length; ++i) {
      if (id == gallery[i].id) {
        return gallery[i];
      }
    }
    return null;
  }
  

  
  function removePhotoPost(gallery, id) {
    var i = 0;
    for (; i < gallery.length; ++i) {
      if (gallery[i].id == id) {
        break;
      }
    }
    if (i < gallery.length) {
      gallery.splice(i, 1);
    }
  }

//document.getElementById("page").innerHTML = "<section class=\"PictureBlock\"><p class=\"textInBlock\"><img class=\"imageInBlock\" src=\"zerg-story-thumb.jpg\"> <h1>Author Name</h1> <h3>Date</h3> Im a scarry zerg Im a scarry zerg Im a scarry zerg Im a scarry zerg Im a scarry zerg Im a scarry zerg Im a scarry zerg Im a scarry zerg Im a scarry zerg Im a scarry zerg Im a scarry zerg Im a scarry zerg Im a scarry zerg Im a scarry zerg<br><br><br> <br><button class=\"Like\">Like!</button></p></section>";


var tmp = getPhotoPosts(photoPosts, 0, 6);

for (i = 0; i < 6; i++){
    var line = "<section class=\"PictureBlock\"><p class=\"textInBlock\"><img class=\"imageInBlock\" src=\"";
    line += tmp[i].photoLink;
    line += "\"> <h1>";
    line += tmp[i].author;
    line += "</h1> <h3>";
    line += tmp[i].Date;
    line += "</h3>";
    line +=  tmp[i].descriprion;
    line += "<br><br><br> <br><button class=\"Like\">Like!</button></p></section>";
    document.getElementById("page").innerHTML += line;
};


  var shown = 6;
  if (shown >= photoPosts.length) {
    document.getElementsByClassName('More')[0].style.display = 'none';
  }
  
  function loadMore() {

    var loadCount = 9
    if (shown + 9 >= photoPosts.length){
        loadCount = photoPosts.length - shown;
    }
    var tmp = getPhotoPosts(photoPosts, shown, shown + loadCount);
    shown += loadCount;

    for (i = 0; i < loadCount; i++){
        var line = "<section class=\"PictureBlock\"><p class=\"textInBlock\"><img class=\"imageInBlock\" src=\"";
        line += tmp[i].photoLink;
        line += "\"> <h1>";
        line += tmp[i].author;
        line += "</h1> <h3>";
        line += tmp[i].Date;
        line += "</h3>";
        line +=  tmp[i].descriprion;
        line += "<br><br><br> <br><button class=\"Like\">Like!</button></p></section>";
        document.getElementById("page").innerHTML += line;
    }
    if (shown === photoPosts.length) {
        document.getElementsByClassName('More')[0].style.display = 'none';
        return
    }
  };
  
  