'use strict';

angular.module('proferoSite')
    .constant('PROJECTCONSTANT', {
      1: {
        name: 'LIPS',
        descriptionSmall: 'Landelijke Inventarisatie Politie Systemen. A software license management system in use by the Dutch Police.',
        descriptionLarge: 'In assignment of the Dutch Police we are constantly developing and maintaining parts of the LIPS system. The Dutch Police has been using LIPS ever since 2006 in order to consolidate and optimize their wide variety of software packages nation wide.' +
        'The Netherlands has as many as 26 different Police departments that used to select and license sofware packages autonomously from one another. Using LIPS, license management is now centralized and the Police\'s software wheelpark is getting more efficient every year.' ,
        tagline: 'Building durable and scalable software',
        partners: '',
        categories: 'Software, Design',
        image: 'dist/assets/img/politie.jpg',
        link: ''
      },
      2: {
        name: 'SlimFitted',
        descriptionSmall: 'An online dress shirt product configurator, enabling clients to configure their next tailored shirt.',
        descriptionLarge: 'In 2014 we teamed up with the people at SlimFitted to work on a revolutionary product configurator. Instead of using photographs to ' +
        'show their customers the shirt they configured, we used 3d visualisations based on a 3d model. Which enables Slimfitted to present their new models and features without having to rebuild the Configurator completely anew. ',
        tagline: 'Developing the next generation of online apps',
        partners: 'Peppr',
        categories: 'Software, Design',
        image: 'dist/assets/img/slimFitted.jpg',
        link: 'http://slimfitted.com/designer'
      },
      3: {
        name: 'Bachkoor Booking',
        descriptionSmall: 'A realtime booking system showing you the real availability of seats.',
        descriptionLarge: 'In 2015 \'Bachkoor Nijmegen\' asked us to build a new website to support a more youthful image. We not only helped them with their website,' +
        'but also took the opportunity to build them a next generation realtime seat booking app. Contrary to other booking apps, this one works in realtime. If one user clicks a chair, it\'s immediately ' +
        'blocked out in all other users\'s web browsers.',
        tagline: 'Working with cutting edge realtime technology',
        partners: '',
        categories: 'Software, Design',
        image: 'dist/assets/img/bachkoorBooking.jpg',
        link: 'http://rolandpeelen.com/devcenter/bachkoor_booking'
      },
      4: {
        name: 'Gemeente Utrecht',
        descriptionSmall: 'Implementating software for the municipality of Utrecht.',
        descriptionLarge: 'We managed the technical and functional implementation of a publication system meant to be on the public site of the municipality of Utrecht. ' +
        'The system, externally hosted and supplied by Cap Gemini / MSI consists of three modules (Babs, BabsOnline and iBabs). Proper teamwork was necessary between business and technical project managers, supplier (Cap / MSI), key users, technical specialists and functional managers. We made ' +
        'sure things went according to plan.',
        tagline: 'Municipality Management',
        partners: '',
        categories: 'Software, Project Management',
        image: 'dist/assets/img/utrecht.jpg',
        link: ''
      }
    });