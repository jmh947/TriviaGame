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
    currentSet: 0,
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
        trivia.currentSet = 0;
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
        
        // set timer to 20 seconds each question
        trivia.timer = 10;
         $('#timer').removeClass('last-seconds');
        $('#timer').text(trivia.timer);
        
        // to prevent timer speed up
        if(!trivia.timerOn){
          trivia.timerId = setInterval(trivia.timerRunning, 1000);
        }
        
        // gets all the questions then indexes the current questions
        var questionContent = Object.values(trivia.questions)[trivia.currentSet];
        $('#question').text(questionContent);
        
        // an array of all the user options for the current question
        var questionOptions = Object.values(trivia.options)[trivia.currentSet];
        
        // creates all the trivia guess options in the html
        $.each(questionOptions, function(index, key){
          $('#options').append($('<button class="option btn btn-info btn-lg">'+key+'</button>'));
        })
        
      },
      // method to decrement counter and count unanswered if timer runs out
      timerRunning : function(){
        // if timer still has time left and there are still questions left to ask
        if(trivia.timer > -1 && trivia.currentSet < Object.keys(trivia.questions).length){
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
          $('#results').html('<h3>Out of time! The answer was '+ Object.values(trivia.answers)[trivia.currentSet] +'</h3>');
        }
        // if all the questions have been shown end the game, show results
        else if(trivia.currentSet === Object.keys(trivia.questions).length){
          
          // adds results of game (correct, incorrect, unanswered) to the page
          $('#results')
            .html('<h3>Thank you for playing!</h3>'+
            '<p>Correct: '+ trivia.correct +'</p>'+
            '<p>Incorrect: '+ trivia.incorrect +'</p>'+
            '<p>Unaswered: '+ trivia.unanswered +'</p>'+
            '<p>Please play again!</p>');
          
          // hide game sction
          $('#game').hide();
          
          // show start button to begin a new game
          $('#start').show();
        }
        
      },
      // method to evaluate the option clicked
      guessChecker : function() {
        
        // timer ID for gameResult setTimeout
        var resultId;
        
        // the answer to the current question being asked
        var currentAnswer = Object.values(trivia.answers)[trivia.currentSet];
        
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
        $('#results h3').remove();
        
        // begin next question
        trivia.nextQuestion();
         
      }
    
    }
