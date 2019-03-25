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

class postList{

  constructor(photoPosts){
    this.photoPosts = photoPosts.filter(item => postList.validate(item));

  }

  static validate(photoPost) {
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
  }
  

  add(post){
    if(postList.validate(post)){
      this.photoPosts.push(post);
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
    if(post && postList.validateEdit(edit)){
        if(edit.hasOwnProperty('description')){
            post.description = edit.description;
        };
        if(edit.hasOwnProperty('photoLink')){
            post.photoLink = edit.photoLink;
        };
        if(edit.hasOwnProperty('tags')){
            post.tags = edit.tags; 
        };
        return true;
    }
    return false;
}


    static validateEdit(photoPost) {
      if (typeof(photoPost.id) != typeof('') && photoPost.id == null){
        alert(0);
        return false;
    }
    if (typeof(photoPost.descriprion) != typeof('') && photoPost.descriprion == null){
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
  
  let main = new postList(photoPosts);
  console.log('main.getPhotoPosts({},0,100)');
  console.log(main.getPage({},0,100));
  console.log('main.getPhotoPost(\'2\')');
  console.log(postList.validate(main.get('2')));
  console.log('main.editPhotoPost(\'2\',{tags:[\'nature\',],})');
  console.log(main.edit('2',{tags:['nature',],}));
  console.log('main.getPhotoPost(\'2\')');
  console.log(main.get('2'));
  console.log('main.getPhotoPosts({tags: \'natuRe\',})');
  console.log(main.getPage({tags: 'natuRe',}));
  console.log('main.getPhotoPosts({tags: [\'natuRe\'],})');
  console.log(main.getPage({tags: ['natuRe'],}));
  console.log('main.getPhotoPost(\'4\')');
  console.log(main.get('4'));
  console.log('main.editPhotoPost(\'4\',{tags: [\'nice\',], description: \'like this moment\',})');
  console.log(main.edit('4',{tags: ['nice',], description: 'like this moment',}));
  console.log('main.getPhotoPost(\'4\')');
  console.log(main.get('4'));
  console.log(main.addAll([{
    id: '11',
    description: '',
    createdAt: new Date('2019-01-01T14:00:00'),
    author: 'Name',
    photoLink: 'zerg-story-thumb.jpg',
  },]));
  console.log(main.getPage({},0,100));
  console.log(main.removePhotoPost('2'));
  console.log(main.get('2'));
  console.log(main.getPage({},0,20));