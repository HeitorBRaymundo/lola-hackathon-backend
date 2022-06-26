import * as Alexa from 'ask-sdk-core';

import { getTextFromDB } from '../../infrastructure/intentTextDB.js';
import { insertAnswerToDB } from '../../infrastructure/quizesAnswerDB.js';

export const TrackStartQuizIntentHandler = {
  canHandle(handlerInput) {    
    const canHandle = Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
      && Alexa.getIntentName(handlerInput.requestEnvelope) === 'StartQuizIntent';

    return canHandle;
  },
  async handle(handlerInput) {
    console.log('TrackQuizIntentHandler Triggered');
    
    const speakOutput = await getTextFromDB('Quiz 1');

    const customAttributes = {
      quiz1Asked: true,
      quiz1Answered: false,
      quiz2Asked: false,
      quiz2Answered: false,
      quiz3Asked: false,
      quiz3Answered: false,
      quiz4Asked: false,
      quiz4Answered: false,
      quiz5Asked: false,
      quiz5Answered: false,
    };

    handlerInput.attributesManager.setPersistentAttributes({
      ...customAttributes,
    });

    await handlerInput.attributesManager.savePersistentAttributes();

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(speakOutput)
      .getResponse();
  }
};

export const TrackQuiz1AnswerHandler = {
  async canHandle(handlerInput) {    

    const {
      quiz1Asked,
      quiz1Answered,
    } = await handlerInput.attributesManager.getPersistentAttributes();

    const canHandle = quiz1Asked && !quiz1Answered 
      && Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
      && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'YesIntent'
        || Alexa.getIntentName(handlerInput.requestEnvelope) === 'NoIntent'
      );

    return canHandle;
  },
  async handle(handlerInput) {
    console.log('TrackQuiz1IntentHandler Triggered');
    
    const speakOutput = await getTextFromDB('quiz 2');

    const answer = Alexa.getIntentName(handlerInput.requestEnvelope) === 'YesIntent'
      ? 'Sim'
      : 'Não'

    await insertAnswerToDB({
      userId: 1,
      type: 'depression',
      question: await getTextFromDB('Quiz 1'),
      answer,
    })

    const customAttributes = {
      quiz1Asked: true,
      quiz1Answered: true,
      quiz2Asked: true,
      quiz2Answered: false,
      quiz3Asked: false,
      quiz3Answered: false,
      quiz4Asked: false,
      quiz4Answered: false,
      quiz5Asked: false,
      quiz5Answered: false,
    };

    handlerInput.attributesManager.setPersistentAttributes({
      ...customAttributes,
    });

    await handlerInput.attributesManager.savePersistentAttributes();

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(speakOutput)
      .getResponse();
  }
};

export const TrackQuiz2AnswerHandler = {
  async canHandle(handlerInput) {    

    const {
      quiz2Asked,
      quiz2Answered,
    } = await handlerInput.attributesManager.getPersistentAttributes();

    const canHandle = quiz2Asked && !quiz2Answered 
      && Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
      && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'YesIntent'
        || Alexa.getIntentName(handlerInput.requestEnvelope) === 'NoIntent'
      );

    return canHandle;
  },
  async handle(handlerInput) {
    console.log('TrackQuiz2IntentHandler Triggered');
    
    const speakOutput = await getTextFromDB('quiz 3');

    const answer = Alexa.getIntentName(handlerInput.requestEnvelope) === 'YesIntent'
      ? 'Sim'
      : 'Não'

    await insertAnswerToDB({
      userId: 1,
      type: 'depression',
      question: await getTextFromDB('quiz 2'),
      answer,
    })

    const customAttributes = {
      quiz1Asked: true,
      quiz1Answered: true,
      quiz2Asked: true,
      quiz2Answered: true,
      quiz3Asked: true,
      quiz3Answered: false,
      quiz4Asked: false,
      quiz4Answered: false,
      quiz5Asked: false,
      quiz5Answered: false,
    };

    handlerInput.attributesManager.setPersistentAttributes({
      ...customAttributes,
    });

    await handlerInput.attributesManager.savePersistentAttributes();

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(speakOutput)
      .getResponse();
  }
};

export const TrackQuiz3AnswerHandler = {
  async canHandle(handlerInput) {    

    const {
      quiz3Asked,
      quiz3Answered,
    } = await handlerInput.attributesManager.getPersistentAttributes();

    const canHandle = quiz3Asked && !quiz3Answered 
      && Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
      && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'YesIntent'
        || Alexa.getIntentName(handlerInput.requestEnvelope) === 'NoIntent'
      );

    return canHandle;
  },
  async handle(handlerInput) {
    console.log('TrackQuiz3IntentHandler Triggered');
    
    const speakOutput = await getTextFromDB('quiz 4');

    const answer = Alexa.getIntentName(handlerInput.requestEnvelope) === 'YesIntent'
      ? 'Sim'
      : 'Não'

    await insertAnswerToDB({
      userId: 1,
      type: 'depression',
      question: await getTextFromDB('quiz 3'),
      answer,
    })

    const customAttributes = {
      quiz1Asked: true,
      quiz1Answered: true,
      quiz2Asked: true,
      quiz2Answered: true,
      quiz3Asked: true,
      quiz3Answered: true,
      quiz4Asked: true,
      quiz4Answered: false,
      quiz5Asked: false,
      quiz5Answered: false,
    };

    handlerInput.attributesManager.setPersistentAttributes({
      ...customAttributes,
    });

    await handlerInput.attributesManager.savePersistentAttributes();

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(speakOutput)
      .getResponse();
  }
};

export const TrackQuiz4AnswerHandler = {
  async canHandle(handlerInput) {    

    const {
      quiz4Asked,
      quiz4Answered,
    } = await handlerInput.attributesManager.getPersistentAttributes();

    const canHandle = quiz4Asked && !quiz4Answered 
      && Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
      && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'YesIntent'
        || Alexa.getIntentName(handlerInput.requestEnvelope) === 'NoIntent'
      );

    return canHandle;
  },
  async handle(handlerInput) {
    console.log('TrackQuiz4IntentHandler Triggered');
    
    const speakOutput = await getTextFromDB('quiz 5');

    const answer = Alexa.getIntentName(handlerInput.requestEnvelope) === 'YesIntent'
      ? 'Sim'
      : 'Não'

    await insertAnswerToDB({
      userId: 1,
      type: 'depression',
      question: await getTextFromDB('quiz 4'),
      answer,
    })

    const customAttributes = {
      quiz1Asked: true,
      quiz1Answered: true,
      quiz2Asked: true,
      quiz2Answered: true,
      quiz3Asked: true,
      quiz3Answered: true,
      quiz4Asked: true,
      quiz4Answered: true,
      quiz5Asked: true,
      quiz5Answered: false,
    };

    handlerInput.attributesManager.setPersistentAttributes({
      ...customAttributes,
    });

    await handlerInput.attributesManager.savePersistentAttributes();

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(speakOutput)
      .getResponse();
  }
};

export const TrackQuiz5AnswerHandler = {
  async canHandle(handlerInput) {    

    const {
      quiz5Asked,
      quiz5Answered,
    } = await handlerInput.attributesManager.getPersistentAttributes();

    const canHandle = quiz5Asked && !quiz5Answered 
      && Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
      && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'YesIntent'
        || Alexa.getIntentName(handlerInput.requestEnvelope) === 'NoIntent'
      );

    return canHandle;
  },
  async handle(handlerInput) {
    console.log('TrackQuiz5IntentHandler Triggered');
    
    const speakOutput = await getTextFromDB('FinishedQuestions');

    const answer = Alexa.getIntentName(handlerInput.requestEnvelope) === 'YesIntent'
      ? 'Sim'
      : 'Não'

    await insertAnswerToDB({
      userId: 1,
      type: 'depression',
      question: await getTextFromDB('quiz 5'),
      answer,
    })

    await handlerInput.attributesManager.deletePersistentAttributes();

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(speakOutput)
      .getResponse();
  }
};