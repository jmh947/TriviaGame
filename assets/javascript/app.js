//Document Ready
$(document).ready(function() {
    
    $("#remaining-time").hide();
    $("#start").on('click', trivia.startGame);
    $(document).on('click', '.option', trivia.guessChecker);
    
    })

var trivia = {
    correct: 0,
    incorrect: 0,
    unanswered: 0,
    currentSet: 1,
    timer: 20,
    timerOn: false,
    timerId: '',

    questions: {
        q1: 'What is Joeys catch phrase?',
        q2: 'Which FRIENDs are siblings?',
        q3: 'What instrument does Phoebe play?',
        q4: 'What is the name of the coffee house the FRIENDs hangout at?',
        q5: 'Who is the paleontologist?',
        q6: 'What does Joey do for work?',
        q7: 'Which FRIEND used to be fat?',
        q8: 'Which FRIEND was once homeless',
        q9: 'Which of the songs Phoebe writes gets made into a music video?',
        q10: 'What is Joeys favorite food?',
    },

    options: {
        q1: ['Wazzzz upppp!', 'How you doin?', 'How are ya?', 'Girl, you fine'],
        q2: ['Ross and Chandler', 'Ross and Monica', 'Ross and Phoebe', 'Ross and Joey'],
        q3: ['Guitar', 'Ukulele', 'Piano', 'Harmonica'],
        q4: ['NYC Perks', 'Starbucks', 'Central Coffee', 'Central Perk'],
        q5: ['Ross', 'Joey', 'Chandler', 'Phoebe'],
        q6: ['Singer', 'Model', 'Actor', 'Soccer Player'],
        q7: ['Monica', 'Rachel', 'Joey', 'Phoebe'],
        q8: ['Phoebe', 'Joey', 'Rachel', 'Chandler'],
        q9: ['Your Love', 'Smelly Cat', 'Shower Song', 'Heart Attacks'],
        q10: ['Pizza', 'Sandwiches', 'Mac and Cheese', 'Hamburgers'],
    },

    answers: {
        q1: 'How you doin?',
        q2: 'Ross and Monica',
        q3: 'Guitar',
        q4: 'Central Perk',
        q5: 'Ross',
        q6: 'Actor',
        q7: 'Monica',
        q8: 'Phoebe',
        q9: 'Smelly Cat',
        q10: 'Sandwiches',
    },

    startGame: function(){
        // restarting game results
        trivia.currentSet = 1;
        trivia.correct = 0;
        trivia.incorrect = 0;
        trivia.unanswered = 0;
        clearInterval(trivia.timerId);
        
        // show game section
        $('#game').show();
        
        //  empty last results
        $('#results').html('');
        
        // show timer
        $('#timer').text(trivia.timer);
        
        // remove start button
        $('#start').hide();
    
        $('#remaining-time').show();
        
        // ask first question
        trivia.nextQuestion();
        
      },
      // method to loop through and display questions and options 
      nextQuestion : function(){
        
        // set timer to 10 seconds each question
        trivia.timer = 10;
        console.log(trivia.timer);
         $('#timer').removeClass('last-seconds');
        $('#timer').text(trivia.timer);
        
        // to prevent timer speed up
        if(!trivia.timerOn){
          trivia.timerId = setInterval(trivia.timerRunning, 1000);
        }
        
        // gets all the questions then indexes the current questions
        var index = "q" + trivia.currentSet
        console.log("index:", index)
        var questionContent = trivia.questions[index];
        console.log(questionContent)
        $('#quest').text(questionContent);

        //Append instructions for for question content
        //$.each(questionOptions, function(index, key){
          //$('#questions').append($('#instructions'));
      
        
        // an array of all the user options for the current question
        var questionOptions = trivia.options[index];  // reading the array of options
        
        // creates all the trivia guess options in the html
        $.each(questionOptions, function(index, key){
          $('#options').append($('<button class="option btn btn-info btn-lg">'+key+'</button>'));
        })
        
      },
      // method to decrement counter and count unanswered if timer runs out
      timerRunning : function(){
      
        // if timer still has time left and there are still questions left to ask
        if(trivia.timer > -1 && trivia.currentSet <= Object.keys(trivia.questions).length){
          $('#timer').text(trivia.timer);
          trivia.timer--;
            if(trivia.timer === 4){
              $('#timer').addClass('last-seconds');
            }
        }
        // the time has run out and increment unanswered, run result
        else if(trivia.timer === -1){
          trivia.unanswered++;
          trivia.result = false;
          clearInterval(trivia.timerId);
          resultId = setTimeout(trivia.guessResult, 1000);
          $('#results').html('<h3>Out of time! The answer was '+ (trivia.answers)[trivia.currentSet] +'</h3>');
        }
        // if all the questions have been shown end the game, show results
        else if(trivia.currentSet > Object.keys(trivia.questions).length) {
        
          // adds results of game (correct, incorrect, unanswered) to the page
          $('#results')
            .html('<h3>Thank you for playing!</h3>'+
            '<p>Correct: '+ trivia.correct +'</p>'+
            '<p>Incorrect: '+ trivia.incorrect +'</p>'+
            '<p>Unanswered: '+ trivia.unanswered +'</p>'+
            '<p>Please play again!</p>');
          
          // hide game sction
          $('#quest').hide();

          $('#game').hide();

          $('#options').hide();
          
          // show start button to begin a new game
          $('#start').show();
        }
        
      },
      // method to evaluate the option clicked
      guessChecker : function() {
        console.log(this)
        // timer ID for gameResult setTimeout
        var resultId;
        
        // the answer to the current question being asked
        var currentAnswer = trivia.answers["q"+trivia.currentSet];
        
        // if the text of the option picked matches the answer of the current question, increment correct
        if($(this).text() === currentAnswer){
          // turn button green for correct
        
          $(this).addClass('btn-success').removeClass('btn-info');
          
          trivia.correct++;
          clearInterval(trivia.timerId);
          resultId = setTimeout(trivia.guessResult, 1000);
          $('#results').html('<h3>Correct Answer!</h3>');
        }
        // else the user picked the wrong option, increment incorrect
        else{
          // turn button clicked red for incorrect
          $(this).addClass('btn-danger').removeClass('btn-info');
          
          trivia.incorrect++;
          clearInterval(trivia.timerId);
          resultId = setTimeout(trivia.guessResult, 1000);
          $('#results').html('<h3>Better luck next time! '+ currentAnswer +'</h3>');
        }
        
      },

      
      // method to remove previous question results and options
      guessResult : function(){
        
        // increment to next question set
        trivia.currentSet++;
        
        // remove the options and results
        $('.option').remove();
        $('#question').remove();  //added in hopes that the last question doesn't get skipped and disappears when results show
        $('#results h3').remove();
        
        // begin next question
       trivia.nextQuestion();
         
      }
    
    };




    // var global variables

    // questionIndex=1



    // create questions / responses / valid

    // both inside of a div - html (id for question )   (id for the resposes)


    

  // function showquestion  
 // timer  when go out go to go to the next  (// when respond (user click any button == verify and go next step)
        // questionIndex++
        // verify if we have more questions or not
        // if questionIndex > 10 go to results
        // if not showquestion
    //)

        // show the question the one that indicate the questionIndex


  // onclick
      // when respond (user click any button == verify and go next step)
        // questionIndex++
        // verify if we have more questions or not
        // if questionIndex > 10 go to results
        // if not showquestion

  // function 



