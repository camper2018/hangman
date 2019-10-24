$(function(){
  var word = "";
  var correct = 0;
  var incorrect = 0;
  var chars = {};

  // for randomly pick categories and items

  function Pickrandom(min, max) {
    //The max and min are inclusive
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  var dictionary = {
    fruits: ["custardapple","apple","banana","pear","watermelon","mango","persimmon","grapes","grapefruit","pomegranate","pineapple","papaya","lemon","peach","apricot","plum","blueberries","coconut","kiwi","cranberry","orange"],
    animals: ["cow","cat","goat","dog","bird","bear","fish","lion","tiger","wolf","elephant","turtle","frog","monkey","fox","horse","deer","pig","dolphin","giraffe","zebra","rooster","hippopotamus","rhinoceros"],
    vegetables: [ "cucumbers","celery","lettuce","cabbage","garlic","avacado","carrot","spinach","broccoli","onions","radish","potato","pumpkin","pepper","ginger","peas","corn","zucchini","okra","squash"],
    transportation: ["car","bus","truck","helicopter","airplane","scooter","bicycle","sailboat","train","van","subway","bart","lighttrain","spaceship","rocket","tricycle","tram","rikshaw"],
    gaming: [ "nintendo","playstation","shulk", "xbox","switch","joycon","controller","combo","mario","cloud","luigi","peach","bayonetta","roy","chrom","ike","marth","corrin","bowser","ds","wii","gamecube","smash","sonic","donkeykong","link","samus","yoshi","kirby","fox","ness","captainfalcon","jigglypuff", "rob", "daisy", "bowser", "pikachu", "squirtle", "ivysaur", "charizard", "pichu", "richu","lucina","atari","pokemontrainer"]
  };
  var categories = Object.keys(dictionary);
  console.log('categories:', categories);
  function chooseCategory() {
    // randomly picks word and creates div (blanks) for each char with unique id
    var categoryIdx = Pickrandom(0,categories.length - 1);
    var category = categories[categoryIdx];
    var categoryList = dictionary[category];
    word = categoryList[Pickrandom(0, categoryList.length-1)];
    for(var i = 0; i < word.length; i++) {
      var $div = $("<div class='blanks'></div>");
      $div.attr('id', `${i}`);
      $('.container').append($div);
    }
    $('.category').html('The category is ' + category);
    console.log("The category is " + category);
    console.log("There are " + word.length + " letters");
    console.log("The word is " + word)
    return word;
  };
  function hangman(input) {
    // check if input is a letter from A-Z and if it has not already entered before, then add input as a property to chars object
    input = input.toLowerCase();
    if (chars[input]=== undefined && input.charCodeAt() >= 97 && input.charCodeAt()<=122 && input.length === 1) {
      chars[input] = input;
      // if input is a letter in word picked, then show that letter in the blank.
      if (word.includes(input)) {
        for(var j = 0; j < word.length; j++) {
          if(word[j] === input) {
            $(`#${j}`).text(input);
            $('#input').val('');
            correct++;
          }
        }
      // otherwise display input within <span> element.
      } else {
        var $span = $('<span></span>');
        $span.html(`${input}`);
        $('.incorrect').append($span);
        incorrect++;
        $('#input').val('');
      }
    }
  }
  // To disable and enable the <input> after game over
  function disable() {
    $('#input').prop('disabled', true);
   }
  function enable() {
    $('#input').prop('disabled', false);
  }

  function checkForWin() {
    // tracks the correct and incorrect responses count and declares winning or loosing.
    if (correct !== 0 && correct === word.length){
      $('p').text('You Guessed it!');
      $('#start').text('Restart');
      var audio = $("#music")[0];
      audio.pause();
      disable();
    } else if (incorrect === 10) {
      $('p').text('Sorry! your tries are over!');
      word.split("").forEach(function(char, i) {
        $(`#${i}`).text(char);
      });
      $('#start').text('Restart');
      disable();
      var audio = $("#music")[0];
      audio.pause();
    }
  }
  // game starts here
  $(document).ready(function() {
    $("#start").click(function(e) {
      correct = 0;
      incorrect = 0;
      chars = {};
      $('.container').html('');
      $('.incorrect').html('');
      $('p').text('');
      enable();
      word = chooseCategory();
      var audio = $("#music")[0];
      audio.currentTime = 0;
      audio.play();

    });
    $('#enter').click(function(e) {
      var letter = $('#input').val();
      $('#input').val('');
      hangman(letter);
      checkForWin();
    });
  });
});








