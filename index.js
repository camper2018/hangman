$(function(){
  var word = "";
  var correct = 0;
  var incorrect = 0;
  var chars = {};
  var hours = 0;
  var seconds = 0;
  var minutes = 0;

  // changes the text of <p> and restarts the game
  function restart(txt) {
    //stops timer
    clearInterval(interval);
    $('p').text(txt);
    // blocks the input when game is over
    disable();
    // start button is replaced with restart
    $('#start').text('Restart');
    // stops playing background music
    var audio = $("#music")[0];
    audio.pause();
    // enables start button after a dalay to avoid mixing of different musics.
    setTimeout(()=> {
      $("#start").attr('disabled', false);
    },5000);
  }

  // sets a timer
  function stopwatch() {
    seconds++;
    if (seconds / 60 === 1) {
        minutes++;
        seconds = 0;
    }
    if (seconds < 10 && minutes < 10) {
      $('.timer').text(`00: 0${minutes} : 0${seconds}`);
    } else if (seconds < 10) {
      $('.timer').text(`00: ${minutes} : 0${seconds}`);
    } else if (minutes < 10) {
      $('.timer').text(`00: 0${minutes} : ${seconds}`);
    } else {
      $('.timer').text(`00: ${minutes} : ${seconds}`);
    }
    // After 2 minutes, the game is over
    if (minutes === 2) {
      restart('Oops! You ran out of time');
      // plays sound effect for game over
      var audio = $("#sound3")[0];
      audio.play();
      // displays guessing word
      word.split("").forEach(function(char, i) {
        $(`#${i}`).text(char);
      });
      // plays game ending music after a delay when the sound effect is finished running.
      setTimeout(()=> {
        var audio2 = $("#music2")[0];
        // restarts the music from the beginning
        audio2.currentTime = 0;
        audio2.play();
      }, 4000);
    }
  }
  // for randomly pick categories and items

  function Pickrandom(min, max) {
    //The max and min are inclusive
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  var dictionary = {
    fruits: ["Acai","Akee","Apple","Apricot","Avocado","Banana","Bilberry","Blackberry","Blackcurrant","Blacksapote","Blueberry","Boysenberry","Crabapples","Currant","Cherry","CustardApple","Chico","Cloudberry","Coconut","Cranberry","Cucumber","Damson","Date","Dragonfruit","Durian","Elderberry","Fig","Gojiberry","Gooseberry","Grape","Raisin","Grapefruit","Guava","Honeyberry","Huckleberry","Jabuticaba","Jackfruit","Jambul","Japanese plum","Jostaberry","Jujube","Juniper berry","Kiwano ","Kiwifruit","Kumquat","Lemon","Lime","Loganberry","Loquat","Longan", "Lychee","Mango","Mangosteen","Marionberry","Melon","Cantaloupe","Honeydew","Watermelon","Miracle fruit","Mulberry","Nectarine","Nance","Orange","Blood orange","Clementine","Mandarine","Tangerine","Papaya","Passionfruit","Peach","Pear","Persimmon","Plantain","Plum","Prune","Pineapple","Pineberry","Plumcot","Pomegranate","Pomelo","Purplemangosteen","Quince","Raspberry","Salmonberry","Rambutan","Redcurrant","Salalberry","Salak","Satsuma","Soursop","Starapple","Starfruit","Strawberry","Surinamcherry","Tamarillo","Tamarind","Tayberry","Uglifruit","Whitecurrant","Whitesapote","Yuz"],
    animals: ["Aardvark","Abyssinian","AfghanHound","AfricanCivet","Toad","Akbash","Akita","AlaskanMalamute","Albatross","Tortoise","Alligator","AlpineDachsbracke","AmericanBulldog","AmericanCoonhound","AmericanEskimoDog","AmericanFoxhound","AmericanPitBullTerrier","AmericanStaffordshireTerrier","AmericanWaterSpaniel","AnatolianShepherdDog","Angelfish","Ant","Anteater","Antelope","AppenzellerDog","ArcticFox","ArcticHare","ArcticWolf","Armadillo","AsianElephant","AsiaGiantHornet","AsianPalmCivet","AsiaticBlackBear","AustralianCattleDog","AustralianKelpieDog","AustralianMist","AustralianShepherd","AustralianTerrier","Avocet","Axolotl","AyeAye","Baboon","BactrianCamel","Badger","Balinese","BandedPalmCivet","Bandicoot","Barb","BarnOwl","Barnacle","Barracuda","BasenjiDog","BaskingShark","BassetHound","Bat","BavarianMountainHound","Beagle","Bear","BeardedCollie","BeardedDragon","Beaver","BedlingtonTerrier","Beetle","BengalTiger","BerneseMountainDog","BichonFrise","Binturong","Bird","BirdsOfParadise","Birman","Bison","BlackBear","BlackRhinoceros","BlackRussianTerrier","BlackWidowSpider","Bloodhound","BlueLacyDog","BlueWhale","BluetickCoonhound","Bobcat","BologneseDog","Bombay","Bongo","Bonobo","Booby","BorderCollie","BorderTerrier","BorneanOrangutan","BorneoElephant","BostonTerrier","BottleNosedDolphin","BoxerDog","BoykinSpaniel","BrazilianTerrier","BrownBear","Budgerigar","Buffalo","BullMastiff","BullShark","BullTerrier","Bulldog","Bullfrog","BumbleBee","Burmese","BurrowingFrog","Butterfly","ButterflyFish","Caiman","CaimanLizard","CairnTerrier","Camel","CanaanDog","Capybara","Caracal","CarolinaDog","Cassowary","Cat","Caterpillar","Catfish","CavalierKingCharlesSpaniel","Centipede","CeskyFousek","Chameleon","Chamois","Cheetah","ChesapeakeBayRetriever","Chicken","Chihuahua","Chimpanzee","Chinchilla","ChineseCrestedDog","Chinook","ChinstrapPenguin","Chipmunk","ChowChow","Cichlid","CloudedLeopard","ClownFish","ClumberSpaniel","Coati","Cockroach","CollaredPeccary","Collie","CommonBuzzard","CommonFrog","CommonLoon","CommonToad","Coral","CottontopTamarin","Cougar","Cow","Coyote","Crab","CrabEatingMacaque","Crane","CrestedPenguin","Crocodile","CrossRiverGorilla","CurlyCoatedRetriever","Cuscus","Cuttlefish","Dachshund","Dalmatian","Deer","DesertTortoise","DeutscheBracke","Dhole","Dingo","Discus","DobermanPinscher","Dodo","Dog","DogoArgentino","DogueDeBordeaux","Dolphin","Donkey","Dormouse","Dragonfly","Drever","Duck","Dugong","Dunker","DuskyDolphin","DwarfCrocodile","Eagle","Earwig","EasternGorilla","EasternLowlandGorilla","Echidna","EdibleFrog","EgyptianMau","ElectricEel","Elephant","ElephantSeal","ElephantShrew","EmperorPenguin","EmperorTamarin","Emu","EnglishCockerSpaniel","EnglishShepherd","EnglishSpringerSpaniel","EntlebucherMountainDog","EpagneulPontAudemer","EskimoDog","EstrelaMountainDog","Falcon","FennecFox","Ferret","FieldSpaniel","FinWhale","FinnishSpitz","Fire-BelliedToad","Fish","FishingCat","Flamingo","FlatCoatRetriever","Flounder","Fly","FlyingSquirrel","Fossa","Fox","FoxTerrier","FrenchBulldog","Frigatebird","FrilledLizard","Frog","FurSeal","GalapagosPenguin","GalapagosTortoise","Gar","Gecko","GentooPenguin","GeoffroysTamarin","Gerbil","GermanPinscher","GermanShepherd","Gharial","GiantAfricanLandSnail","GiantClam","GiantPandaBear","GiantSchnauzer","Gibbon","GilaMonster","Giraffe","GlassLizard","GlowWorm","Goat","GoldenLionTamarin","GoldenOriole","GoldenRetriever","Goose","Gopher","Gorilla","Grasshopper","GreatDane","GreatWhiteShark","GreaterSwissMountainDog","GreenBeeEater","GreenlandDog","GreyMouseLemur","GreyReefShark","GreySeal","Greyhound","GrizzlyBear","Grouse","GuineaFowl","GuineaPig","Guppy","HammerheadShark","Hamster","Hare","Harrier","Havanese","Hedgehog","HerculesBeetle","HermitCrab","Heron","HighlandCattle","Himalayan","Hippopotamus","HoneyBee","HornShark","HornedFrog","Horse","HorseshoeCrab","HowlerMonkey","Human","HumboldtPenguin","Hummingbird","HumpbackWhale","Hyena","Ibis","IbizanHound","Iguana","Impala","IndianElephant","IndianPalmSquirrel","IndianRhinoceros","IndianStarTortoise","IndochineseTiger","Indri","Insect","IrishSetter","IrishWolfHound","JackRussel","Jackal","Jaguar","JapaneseChin","JapaneseMacaque","JavanRhinoceros","Javanese","Jellyfish","Kakapo","Kangaroo","KeelBilledToucan","KillerWhale","KingCrab","KingPenguin","Kingfisher","Kiwi","Koala","KomodoDragon","Kudu","Labradoodle","LabradorRetriever","Ladybird","LeafTailedGecko","Lemming","Lemur","Leopard","LeopardCat","LeopardSeal","LeopardTortoise","Liger","Lion","Lionfish","LittlePenguin","Lizard","Llama","Lobster","LongEaredOwl","Lynx","MacaroniPenguin","Macaw","MagellanicPenguin","Magpie","MaineCoon","MalayanCivet","MalayanTiger","Maltese","Manatee","Mandrill","MantaRay","MarineToad","Markhor","MarshFrog","MaskedPalmCivet","Mastiff","Mayfly","Meerkat","Millipede","MinkeWhale","Mole","Molly","Mongoose","Mongrel","MonitorLizard","Monkey","MonteIberiaEleuth","Moorhen","Moose","MorayEel","Moth","MountainGorilla","MountainLion","Mouse","Mule","Neanderthal","NeapolitanMastiff","Newfoundland","Newt","Nightingale","NorfolkTerrier","NorwegianForest","Numbat","NurseShark","Ocelot","Octopus","Okapi","OldEnglishSheepdog","Olm","Opossum","Orangutan","Ostrich","Otter","Oyster","Pademelon","Panther","Parrot","PatasMonkey","Peacock","Pekingese","Pelican","Penguin","Persian","Pheasant","PiedTamarin","Pig","Pika","Pike","PinkFairyArmadillo","Piranha","Platypus","Pointer","PoisonDartFrog","PolarBear","PondSkater","Poodle","PoolFrog","Porcupine","Possum","Prawn","ProboscisMonkey","PufferFish","Puffin","Pug","Puma","PurpleEmperor","PussMoth","PygmyHippopotamus","PygmyMarmoset","Quail","Quetzal","Quokka","Quoll","Rabbit","Raccoon","RaccoonDog","RadiatedTortoise","Ragdoll","Rat","Rattlesnake","RedKneeTarantula","RedPanda","RedWolf","RedhandedTamarin","Reindeer","Rhinoceros","RiverDolphin","RiverTurtle","Robin","RockHyrax","RockhopperPenguin","RoseateSpoonbill","Rottweiler","RoyalPenguin","RussianBlue","Sabre-ToothedTiger","SaintBernard","Salamander","SandLizard","Saola","Scorpion","ScorpionFish","SeaDragon","SeaLion","SeaOtter","SeaSlug","SeaSquirt","SeaTurtle","SeaUrchin","Seahorse","Seal","Serval","Sheep","ShihTzu","Shrimp","Siamese","SiameseFightingFish","Siberian","SiberianHusky","SiberianTiger","SilverDollar","Skunk","Sloth","SlowWorm","Snail","Snake","SnappingTurtle","Snowshoe","SnowyOwl","Somali","SouthChinaTiger","SpadefootToad","Sparrow","SpectacledBear","SpermWhale","SpiderMonkey","SpinyDogfish","Sponge","Squid","Squirrel","SquirrelMonkey","SriLankanElephant","StaffordshireBullTerrier","StagBeetle","Starfish","StellersSeaCow","StickInsect","Stingray","Stoat","StripedRocketFrog","SumatranElephant","SumatranOrangutan","SumatranRhinoceros","SumatranTiger","SunBear","Swan","Tang","TapanuliOrangutan","Tapir","Tarsier","TasmanianDevil","TawnyOwl","Termite","Tetra","ThornyDevil","TibetanMastiff","Tiffany","Tiger","TigerSalamander","TigerShark","Tortoise","Toucan","TreeFrog","Tropicbird","Tuatara","Turkey","TurkishAngora","Uakari","Uguisu","Umbrellabird","VampireBat","VervetMonkey","Vulture","Wallaby","Walrus","Warthog","Wasp","WaterBuffalo","WaterDragon","WaterVole","Weasel","WelshCorgi","WestHighlandTerrier","WesternGorilla","WesternLowlandGorilla","WhaleShark","Whippet","WhiteFacedCapuchin","WhiteRhinoceros","WhiteTiger","WildBoar","Wildebeest","Wolf","Wolverine","Wombat","Woodlouse","Woodpecker","WoollyMammoth","WoollyMonkey","Wrasse","XRayTetra","Yak","YellowEyedPenguin","YorkshireTerrier","Zebra","ZebraShark","Zebu","Zonkey","Zorse"],
    vegetables: ["artichoke","eggplant","asparagus","legumes","alfalfasprouts","azukibeans","beansprouts","blackbeans","blackeyedpeas","borlottibean","broadbeans","chickpeas","greenbeans","kidneybeans","lentils","limabeans","mungbeans","navybeans","pintobeans","runnerbeans","splitpeas","soybeans","peas","snappeas","broccoli","brusselsprouts","cabbage","kohlrabi","cauliflower","celery","endive","fiddleheads","frisee","fennel","greens","chard","bokchoy","collardgreens","kale","mustardgreens","spinach","anise","basil","caraway","cilantro","chamomile","dill","fennel","lavender","lemonGrass","marjoram","oregano","parsley","rosemary","sage","thyme","lettuce","arugula","mushrooms","nettles","spinach","okra","onions","Chives","Garlic","Leek","onion","shallot","springonion","parsley","bellpepper","chilipepper","Jalapeño","Habanero","Paprika","Tabascopepper","Cayennepepper","radicchio","rhubarb","beetroot","carrot","celeriac","corn","konjac","taro","waterchestnut","ginger","parsnip","rutabaga","radish","wasabi","horseradish","whiteradish","daikon","jicama","potato","sunchokes","sweetpotato","yam","turnip","salsify","skirret","sweetcorn","topinambur","acornsquash","bittermelon","butternutsquash","bananasquash","Zucchini","cucumber","delicata","gemsquash","hubbardsquash","spaghettisquash","tatsoi","tomato","watercress"],
    transportation: ["car","bus","truck","helicopter","airplane","scooter","bicycle","sailboat","train","van","subway","bart","lighttrain","spaceship","rocket","tricycle","tram","rikshaw"],
    gaming: [ "nintendo","playstation","shulk", "xbox","switch","joycon","controller","combo","mario","cloud","luigi","peach","bayonetta","roy","chrom","ike","marth","corrin","bowser","ds","wii","gamecube","smash","sonic","donkeykong","link","samus","yoshi","kirby","fox","ness","captainfalcon","jigglypuff", "rob", "daisy", "bowser", "pikachu", "squirtle", "ivysaur", "charizard", "pichu", "richu","lucina","atari","pokemontrainer"],
    sports: ["squash", "basketball", "baseball", "soccer", "football", "cricket", "tabletennis", "tennis", "volleyball", "golf", "badminton", "hockey", "swimming", "crosscountry", "wrestling", "boxing", "rugby","kabaddi","malakhra","archery", "curling","skateboarding", "icehockey", "surfing","figureskating", "yoga", "fencing","gymnastic", "karate", "weightlifting", "highjumping", "cycling", "running", "hanggliding", "carracing", "cycling", "horsebackriding", "shooting", "billiards", "horseracing", "judo", "fishing"],
    countries: ["Afghanistan","Albania","Algeria","Andorra","Angola","AntiguaBarbuda","Argentina","Armenia","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bhutan","Bolivia","BosniaHerzegovina","Botswana","Brazil","Brunei","Bulgaria","BurkinaFaso","Burundi","CaboVerde","Cambodia","Cameroon","Canada","CentralAfricanRepublic","Chad","Chile","China","Colombia","Comoros","Congo","CostaRica","Croatia","Cuba","Cyprus","CzechRepublic","Denmark","Djibouti","Dominica","DominicanRepublic","EastTimor","Ecuador","Egypt","ElSalvador","Equatorial Guinea","Eritrea","Estonia","Eswatini","Ethiopia","Fiji","Finland","France","Gabon","Gambia","Georgia","Germany","Ghana","Greece","Grenada","Guatemala","Guinea","GuineaBissau","Guyana","Haiti","Honduras","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Israel","Italy","Jamaica","Japan","Jordan","Kazakhstan","Kenya","Kiribati","NorthKorea","SouthKorea","Kosovo","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","MarshallIslands","Mauritania","Mauritius","Mexico","Micronesia","Moldova","Monaco","Mongolia","Montenegro","Morocco","Mozambique","Myanmar","Namibia","Nauru","Nepal","Netherlands","NewZealand","Nicaragua","Niger","Nigeria","NorthMacedonia","Norway","Oman","Pakistan","Palau","Panama","PapuaNewGuinea","Paraguay","Peru","Philippines","Poland","Portugal","Qatar","Romania","Russia","Rwanda","SaintKittsandNevis","SaintLucia","SaintVincentandtheGrenadines","Samoa","SanMarino","SaoTomeandPrincipe","SaudiArabia","Senegal","Serbia","Seychelles","SierraLeone","Singapore","Slovakia","Slovenia","SolomonIslands","Somalia","SouthAfrica","Spain","SriLanka","Sudan","SouthSudan","Suriname","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Togo","Tonga","TrinidadandTobago","Tunisia","Turkey","Turkmenistan","Tuvalu","Uganda","Ukraine","UnitedArabEmirates","UnitedKingdom","UnitedStates","Uruguay","Uzbekistan","Vanuatu","VaticanCity","Venezuela","Vietnam","Yemen","Zambia","Zimbabwe"]
  };
  var categories = Object.keys(dictionary);
  function chooseCategory() {
    // randomly picks word and creates div (blanks) for each char with unique id
    var categoryIdx = Pickrandom(0,categories.length - 1);
    var category = categories[categoryIdx];
    var categoryList = dictionary[category];
    word = categoryList[Pickrandom(0, categoryList.length-1)];
    // displays blanks according to the word length
    for(var i = 0; i < word.length; i++) {
      var $div = $("<div class='blanks'></div>");
      $div.attr('id', `${i}`);
      $('.blanks-container').append($div);
    }
    // displays category and returns the randomly chosen word
    $('.category-display').html('The category is ' + category);
    return word.toLowerCase();
  };

  function playHangman(input) {
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
        $('.incorrect').append('&nbsp;&nbsp');

        incorrect++;
        $('#input').val('');
      }
    }
  }
  // To disable and enable the input after game over
  function disable() {
    $('#input').prop('disabled', true);
    $('#enter').prop('disabled', true);
   }
  function enable() {
    $('#input').prop('disabled', false);
    $('#enter').prop('disabled', false);
  }

  function checkForWin() {
    // tracks the correct and incorrect responses count and declares winning or loosing.
    if (correct !== 0 && correct === word.length){
      restart('You Guessed it!');
      var audio = $("#sound1")[0];
      audio.play();
      setTimeout(()=> {
        var audio2 = $("#music2")[0];
        audio2.currentTime = 0;
        audio2.play();
      }, 4000);
    } else if (incorrect === 10) {
      word.split("").forEach(function(char, i) {
        $(`#${i}`).text(char);
      });
      restart('Sorry! your tries are over!');
      var audio = $("#sound2")[0];
      audio.play();
      setTimeout(()=> {
        var audio2 = $("#music2")[0];
        audio2.currentTime = 0;
        audio2.play();
      }, 4000);
    }
  }
  // game starts here
  $(document).ready(function() {
    // when start or restart button clicked, resets the variables and display text
    $("#start").click(function(e) {
      correct = 0;
      incorrect = 0;
      chars = {};
      seconds = 0;
      minutes = 0;
      $('.blanks-container').html('');
      $('.incorrect').html('');
      $('p').text('Hurry! you have only two minutes to guess');
      // enables input box and enter buttons
      enable();
      // randomly selects a category and returns a word
      word = chooseCategory();
      // resets and plays background music
      var audio = $("#music")[0];
      audio.currentTime = 0;
      audio.play();
      // runs timer by invoking stopwatch() every 1 second and increments the time in seconds.
      interval = window.setInterval(stopwatch, 1000);
      //stops/ pauses the game over music on restart
      var audio2 = $("#music2")[0];
      audio2.pause();
      // disables start/ restart button
      $("#start").attr('disabled', true);
    });
    $('#enter').click(function(e) {
      var letter = $('#input').val();
      // clears the input
      $('#input').val('');
      // playHangman() checks for correct / incorrect response/letter and displays accordingly
      playHangman(letter);
      // checks for correct word guess after every response entry and declares winning if guessed or displays correct word if failed to guess after 10 tries.
      checkForWin();

    });
  });
});








