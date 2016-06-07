Memories = new Mongo.Collection("memories");
var memories = [
  ["lol tiny aayush",1,"You cute kid, next to Ian you already look handsome. You were one of the first people I met in high school, and my friend through all of Spanish 3."],
  ["criminal in the making",14,"I forget why I have this mugshot of you, but look at the transformations you're undergoing. Sophomore year was tough for more than one reason, apparently."],
  ["bam, puberty",3,"That hair, those glasses, the coy smile that subtly whispers \"I'm having a party in my pants, and you're invited.\""],
  ["sensitive",15,"And yet, still single."],
  ["now watch me whip",5,"You've got plenty of FON photos with girls, but having had to dig up only one I think this is the most fitting. Thanks for pushing me to join. You should've been in front."],
  ["maroon 5 sucks",6,"At least when you're trying to play their songs, they do. Just kidding. A+ brass skills."],
  ["a developing thug",7,"If brown gangsters didn't exist in New York City before, they now do. You introduced an entirely new form of crime to the neighborhood, and it's called your chest hair."],
  ["overwhelming",8,"Thankfully those shades cover up your eyes, which, without glasses, make you conspicuously look like a pedophile."],
  ["all the time",9,"You just don't stop, do you? After a solid year of whipping to every song you hear, even Guido Van Rossum has to suffer through your Silento addiction."],
  ["thanks for the help",10,"You established an image all your own in my own promposal. Next to Chris, the Indian tech support guy was third in line on my prom date list."],
  ["congratulations",13,"On going to Cornell. You helped make college applications humorous when they're anything but."],
  ["4:20 24/7",12,"Half a year of this, and you show no signs of stopping. You've got a sixth sense for detecting when the time is 4:20, which is almost admirable."],
  ["four years",2,"Thanks for being a friend after all the shit I give you. You're a chill guy with a great sense of humor."],
  ["keep smiling",11,"Keep it up through college. I'm glad I met you, had Argentinian food with you, \'danced\' with you, and spent so many hours late at night talking to you."],
  ["happy birthday.",4,"But still, back off."]
]

if (Meteor.isServer) {
  Meteor.startup(function(){
    console.log("REMOVAL");
    Memories.remove({});
    memories.forEach(function(memory){
      Memories.insert({
        title: memory[0],
        image: memory[1].toString() + ".jpg",
        about: memory[2]
      });
    });
  });
}

if (Meteor.isClient) {
  var app;
  var Router = Backbone.Router.extend({
    navigate: function(url){
      window.location = url;
    }
  });
  Meteor.startup(function(){
    app = new Router;
  });

  Template.memories.helpers({
    memories: function(){
      return Memories.find({});
    },
    enlargedImage: function(){
      console.log(Session.get("enlargedImage"));
      return Session.get("enlargedImage");
    }
  });
  Template.memories.events({
    'click img': function(event, template){
      console.log("IMGCLICK");
      Session.set("enlargedImage", this.image);
      $('.modal').modal('show');
    }
  });

  Template.address.events({
    'click .tickleme': function(){
      console.log("IM BEING TICKLED");
      app.navigate('http://www.pornhub.com/');
    }
  });
}