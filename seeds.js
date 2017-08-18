//var mongoose    = require('mongoose');
//var Campground  = require('./models/campground');
//var Comment     = require('./models/comment')
//    moment = require('moment');
//var data = [
//    {
//        name    : "Mount Cook National Park",
//        image   : "https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg",
//        desc    : "You can’t talk about camping without waxing lyrical about New Zealand’s out-of-this-world landscapes. Mount Cook (or Aoraki to the Maori) is the country’s highest mountain and the entire surrounding rugged region is the South Island’s finest outdoor playground. Views from the campgrounds here are simply staggering."
//    },
//        {
//        name    : "Devon, England",
//        image   : "https://farm8.staticflickr.com/7258/7121861565_3f4957acb1.jpg",
//        desc    : "The southwest of England feels a million miles from the rest of the UK. The campsites on Dartmoor and Exmoor are fantastic places to pitch a tent, while you’ll find spots with unbeatable vistas along the craggy cliffs that sweep down to the Atlantic on the north Devon coast. Come in autumn, when you can watch a huge red sun dip slowly over the horizon.\r\nBeryl’s Campsite is famous in Davon, known by locals simply as “the one run by Beryl”, this rustic little site is the perfect sanctuary from which to explore Devon. Low-key charm is apparent, not only in the laissez-faire attitude to self-promotion (the only clue to this campsite’s existence is a small sign nestled in a flowerbed), but also in the lush, unspoilt pitches (29 in total), with some boasting coastal views. The site itself is a kids’ natural playground, with plenty of space to play ball games, while parents love the easy access to the award-winning Beesands beach, only a 10-minute walk away."
//    },
//        {
//        name    : "Hossa National Park",
//        image   : "https://farm2.staticflickr.com/1363/1342367857_2fd12531e7.jpg",
//        desc    : "Finland’s newest national park (set to open in June 2017) is in the wild northeast of the country, a rugged landscape of rivers, lakes and old-growth spruce forests. Finland welcomes wild campers and the park is dotted with remote lean-to shelters and rustic cabins, all with spots for campfires.\r\nThe Julma-Ölky canyon lake and the nearly 5,000 year-old Stone Age rock art at Värikallio are two of the top attractions. Värikallio contains more than 60 rock paintings, depicting hunting and shamanic rituals painted sometime during the Stone Age.\r\nVisitors to the village and park of Hossa can canoe, trek, swim, fish, and snowmobile. In the summer, the clear waters offer a place to cool off.\r\nHossa beat out Porkkala in Kirkkonummi southwest in the competition to achieve national park status."
//    }
//    
//];
//function seedDB(){
//    Campground.remove({},function(err){
//        if(err){
//            console.log(err);
//        }else{
//            console.log("removed all campgrounds");
//            //add campgrounds to Campground
//            data.forEach(function(camp){
//                Campground.create(camp,function(err,createdCamp){
//                    if(err){
//                        console.log(err);
//                    }else{
//                        console.log("campground created.");
//                        Comment.create({
//                            text   : "This place is nice. I love it but wish I could get internet here.",
//                            user    : "MayK",
//                            time   : moment()
//                        },function(err,createdComment){
//                            if(err){
//                                console.log(err);
//                            }else{
//                                createdCamp.comments.push(createdComment);
//                                createdCamp.save();
//                            }
//                        });
//                    }
//                });
//            });
//        }
//    });
//}
//
//
//module.exports  = seedDB;