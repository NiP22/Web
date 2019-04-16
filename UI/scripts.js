var photoPosts = [];
var Users = [];
Users[0] = {};

Users[0].name = "Kerigan";
Users[0].password = "12345";
Users[0].avatarLink = "kerigan.png";

Users[1] = {};

Users[1].name = "Obama";
Users[1].password = "54321";
Users[1].avatarLink = "obama.jpg";

var shown = 0;
var lastId = localStorage.getItem('count');
for(i = 1; i <= lastId; i++){
  var tmp = JSON.parse(localStorage.getItem(i + ''));
  if(tmp){
    photoPosts[i] = tmp;
    photoPosts[i].Date = new Date(photoPosts[i].Date);
  }
}
/*
var lastId = 20;
for(i = 0; i < 20; i++){
    photoPosts[i] = {};
    photoPosts[i].id = i + 1 + '';
    if(i % 2 == 0){
        photoPosts[i].description = 'Im a scarry zerg Im a scarry zerg Im a scarry zerg Im a scarry zerg Im a scarry zerg Im a scarry zerg Im a scarry zerg \n Im a scarry zerg Im a scarry zerg Im a scarry zerg Im a scarry zerg Im a scarry zerg Im a scarry zerg Im a scarry zerg';
        photoPosts[i].photoLink = 'zerg-story-thumb.jpg';
        photoPosts[i].author = 'Kerigan';
    }
    else{
        photoPosts[i].description =  "Important news Important news Important news Important news Important news Important news Important news Important news\n Important news Important news Important news Important news Important news Important news Important news Important news";
        photoPosts[i].photoLink = 'trump.png';
        photoPosts[i].author = 'Obama';
    }
    photoPosts[i].Date = new Date('2018-02-22T22:00:00');
    var serialObj = JSON.stringify(photoPosts[i]); //сериализуем его
    localStorage.setItem(photoPosts[i].id, serialObj); 
}
localStorage.setItem('count', 20); 
alert(localStorage.getItem('count'));
*/
class postList{

  constructor(photoPosts){
    this.photoPosts = photoPosts.filter(item => postList.validate(item));
  }

  static validate(photoPost) {
    if (typeof(photoPost.id) != typeof('') || photoPost.id == null){
        alert(0);
        return false;
    }
    if (typeof(photoPost.description) != typeof('') || photoPost.description == null){
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


  removePhotoPost(id) {
    var i = 0;
    for (; i < this.photoPosts.length; ++i) {
      if (this.photoPosts[i].id == id) {
        break;
      }
    }
    if (i < this.photoPosts.length) {
      this.photoPosts.splice(i, 1);
    }
    localStorage.removeItem(id);
  }
  

  length(){
    return this.photoPosts.length;
  }

  add(post){
    if(postList.validate(post)){
      this.photoPosts.push(post);
      var serialObj = JSON.stringify(post); //сериализуем его
      localStorage.setItem(post.id, serialObj); 
      return true;
    }
    return false;
  }

  addAll(postArray){
    postArray.forEach(item => {
      this.add(item);
  });
  }
  
  edit(id, edit){
    let post = this.get(id);
    if(edit.hasOwnProperty('description')){
      post.description = edit.description;
    }
    if(edit.hasOwnProperty('photoLink')){
      post.photoLink = edit.photoLink;
    };
    if(edit.hasOwnProperty('Date')){
      post.Date = edit.Date;
    };
    var serialObj = JSON.stringify(post); //сериализуем его
    localStorage.setItem(id, serialObj); 
}


    static validateEdit(photoPost) {
      if (typeof(photoPost.id) != typeof('') && photoPost.id == null){
        alert(0);
        return false;
    }
    if (typeof(photoPost.description) != typeof('') && photoPost.description == null){
        alert(1);
        return false;
    }
    if (typeof(photoPost.photoLink) != typeof('') && photoPost.photoLink == null){
        alert(2);
        return false;
    }
    if (typeof(photoPost.author) != typeof('') && photoPost.author == null){
        alert(3);
        return false;
    }
    if (typeof(photoPost.Date) != typeof(new Date()) && photoPost.id == null){
        alert(4);
        return false;
    }
    return true;
  }

  getPage(filterConfig, skip = 0, top = 10){
    let result = this.photoPosts.slice(0, this.photoPosts.length);
    if(filterConfig.hasOwnProperty('author')){
        result = result.filter(item=>item.author === filterConfig.author);
    }
    if(filterConfig.hasOwnProperty('dateFrom') && filterConfig.dateFrom instanceof Date){
        result = result.filter(item=>item.createdAt > filterConfig.dateFrom);
    }
    if(filterConfig.hasOwnProperty('dateTo') && filterConfig.dateTo instanceof Date){
        result = result.filter(item=>item.createdAt < filterConfig.dateTo);
    }
    result.sort((item1,item2)=>item2.createdAt-item1.createdAt);
    return result.splice(skip,top);
  }

  
  get(id) {
    for (i = 0; i < this.photoPosts.length; ++i) {
      if (id == this.photoPosts[i].id) {
        return this.photoPosts[i];
      }
    }
    return null;
  }
}

class View{
  constructor(pL, userName){
    this.pL = pL;
    this.userName = userName;
    this.shown = 0;
    this.currnetId = 0;
  }
  loadPage(count){
    var tmp = this.pL.getPage(0, 0, count);
    document.getElementById("page").innerHTML = "";
      for (i = 0; i < count; i++){
          var line = "<section class=\"PictureBlock\"><p class=\"textInBlock\"><img class=\"imageInBlock\" src=\"";
          line += tmp[i].photoLink;
          line += "\"> <h1>";
          line += tmp[i].author;
          line += "</h1> <h3>";
          line += tmp[i].Date;
          line += "</h3>";
          line +=  tmp[i].description;

          if (this.userName === tmp[i].author){
            var updateLine = "\"view.updatePage(";
            updateLine += tmp[i].id;
            updateLine +=  ");\"";
            line += "<br><br><br> <br><button class=\"Delete\" onclick=" + updateLine + ">Delete post</button>";
            var editLine = "\"view.editPage(";
            editLine += tmp[i].id;
            editLine +=  ");\"";
            line += "<br><br><br> <br><button class=\"Delete\" onclick=" + editLine + ">Edit post</button>";
          }
          line += "</p></section>"
          document.getElementById("page").innerHTML += line;
      }
      
      if (count === this.pL.length()) {
          document.getElementsByClassName('More')[0].style.display = 'none';
          return
      }
      
    };

    loadMore() {
      var loadCount = 9
      if (this.shown + 9 >= this.pL.length()){
          loadCount = this.pL.length() - this.shown;
      }
      var tmp = pL.getPage(0, this.shown, this.shown + loadCount);
      this.shown += loadCount;

      this.loadPage(this.shown);
      if (this.shown == this.pL.length()) {
        document.getElementById('loadMore').style.display = 'none';
        return
      }
      
    };

    editPage(id){
      document.getElementById("editPost").style.display = 'block';
      this.currnetId = id;
    };

    saveEdit(){
      var edit = {};
      if (document.getElementById("editDescription").value != ""){
        edit.description = document.getElementById("editDescription").value;
        edit.Date = new Date();
      }
      if (document.getElementById("editLink").value != ""){
        edit.photoLink = document.getElementById("editLink").value;
        edit.Date = new Date();
      }
      pL.edit(this.currnetId, edit);
      this.loadPage(this.shown);
      document.getElementById("editPost").style.display = 'none';
      return false;
    }

    updatePage(id) {
      document.getElementById("page").innerHTML = "";
      this.pL.removePhotoPost(id);
      this.shown--;
      this.loadPage(this.shown);
    };
    showAddForm(){
      document.getElementById("addPost").style.display = 'block';
    }
    addPost(){
      var description = document.getElementById("description").value;
      var link = document.getElementById("link").value;
      lastId += 1;
      var post=  {};
      post.id = lastId + '';
      post.description = description;
      post.photoLink = link;
      post.author = this.userName;
      post.Date = new Date();
      this.pL.add(post);
      document.getElementById("addPost").style.display = 'none';
      document.getElementById('loadMore').style.display = 'block';
      return false;
    }
    registration(){
      document.getElementById("registration").style.display = 'block';
    }
    submit(){
      var password = document.getElementById("form_password").value;
      var name = document.getElementById("form_fname").value;
      var flagName = true;
      var flagPassword = true;
      for(i = 0; i < Users.length; i++){
          if (Users[i].name == name){
            flagName = false;
            if (Users[i].password == password){
              flagPassword = false;
              createHeader(name, Users[i].avatarLink);
              this.userName = name;
              break;
            }
          }
      }
      if (flagName){
        alert("wrong name");
      }
      else if(flagPassword){
        alert("wrong password");
      }
      document.getElementById("registration").style.display = 'none';
      this.loadPage(this.shown);
      return false;
    }
}


function createHeader(userName, avatarLink){
  document.getElementById("header").innerHTML = "";
  if (userName === ""){
    var line = "<button class=\"loadButton\" onclick = \"view.registration()\">Log in</button>";
    line += "<img class=\"headerLogo\" src=\"logo.webp\" alt=\"icon\">"
    line += "<p class=\"pageName\">SiteName</p>"
    document.getElementById("header").innerHTML += line;
  }
  else{
    var line = "<button class=\"loadButton\" onclick=\"view.showAddForm();\">Load photo</button>";
    line += "<img class=\"headerLogo\" src=\"logo.webp\" alt=\"icon\">"
    line += "<p class=\"pageName\">SiteName</p>"
    line += "<p class=\"userName\">" + userName + "</p>"
    line += "<img class=\"userAvatar\" src=\"" + avatarLink + "\" alt=\"icon\">";
    document.getElementById("header").innerHTML += line;
  }
}



//document.getElementById("page").innerHTML = "<section class=\"PictureBlock\"><p class=\"textInBlock\"><img class=\"imageInBlock\" src=\"zerg-story-thumb.jpg\"> <h1>Author Name</h1> <h3>Date</h3> Im a scarry zerg Im a scarry zerg Im a scarry zerg Im a scarry zerg Im a scarry zerg Im a scarry zerg Im a scarry zerg Im a scarry zerg Im a scarry zerg Im a scarry zerg Im a scarry zerg Im a scarry zerg Im a scarry zerg Im a scarry zerg<br><br><br> <br><button class=\"Like\">Like!</button></p></section>";

let pL = new postList(photoPosts);
let view = new View(pL, "");
createHeader("", "");
view.loadMore();

