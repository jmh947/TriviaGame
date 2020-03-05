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


