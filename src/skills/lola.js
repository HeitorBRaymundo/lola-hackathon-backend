/* *
 * This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
 * Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
 * session persistence, api calls, and more.
 * */
import * as Alexa from 'ask-sdk-core';
import { DynamoDbPersistenceAdapter } from 'ask-sdk-dynamodb-persistence-adapter';

import {
  HelpIntentHandler,
  CancelAndStopIntentHandler,
  ErrorHandler,
  FallbackIntentHandler,
  // IntentReflectorHandler,
  SessionEndedRequestHandler,
  TrackBadFeelingHandler,
  TrackGoodFeelingHandler,
  TrackYesAnswerToExerciseHandler,
  TrackExerciseIntentHandler,
  TrackScheduleIntent,
  TrackListMedicineIntent,
  TrackListSchedulingIntent,
  TrackRegisterExerciseIntentHandler,
  TrackScheduleWithSpecialistHandler,
  TrackChooseDateIntentHandler,
  TrackStartQuizIntentHandler,
  TrackQuiz1AnswerHandler,
  TrackQuiz2AnswerHandler,
  TrackQuiz3AnswerHandler,
  TrackQuiz4AnswerHandler,
  TrackQuiz5AnswerHandler,
} from './intentHandlers/index.js';
import { getTextFromDB } from '../infrastructure/intentTextDB.js';

const LaunchRequestHandler = {
    canHandle(handlerInput) {
      return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    async handle(handlerInput) {
      const speakOutput = await getTextFromDB('Saudacao');

      return new Promise((resolve, reject) => {
        handlerInput.attributesManager.getPersistentAttributes()
          .then(() => {
            handlerInput.attributesManager.setPersistentAttributes({
              firstIteraction: true,
            });
  
            return handlerInput.attributesManager.savePersistentAttributes();
          })
          .then(() => {
            resolve(
              handlerInput.responseBuilder
                .speak(speakOutput)
                .reprompt(speakOutput)
                .getResponse()
            );
          })
          .catch((error) => {
            reject(error);
          });
      });
    }
};

/**
 * This handler acts as the entry point for your skill, routing all request and response
 * payloads to the handlers above. Make sure any new handlers or interceptors you've
 * defined are included below. The order matters - they're processed top to bottom 
 * */
export const handler = Alexa.SkillBuilders.custom()
    .withPersistenceAdapter(new DynamoDbPersistenceAdapter({ tableName: 'alexa-skills-persistence', createTable: true }))
    .addRequestHandlers(
        LaunchRequestHandler,
        TrackGoodFeelingHandler,
        TrackYesAnswerToExerciseHandler,
        TrackExerciseIntentHandler,
        TrackBadFeelingHandler,

        TrackScheduleIntent,
        TrackListMedicineIntent,
        TrackListSchedulingIntent,
        TrackRegisterExerciseIntentHandler,
        TrackScheduleWithSpecialistHandler,
        TrackChooseDateIntentHandler,

        TrackStartQuizIntentHandler,
        TrackQuiz1AnswerHandler,
        TrackQuiz2AnswerHandler,
        TrackQuiz3AnswerHandler,
        TrackQuiz4AnswerHandler,
        TrackQuiz5AnswerHandler,

        HelpIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler
        // IntentReflectorHandler
    )
    .addErrorHandlers(
        ErrorHandler)
    .withCustomUserAgent('sample/hello-world/v1.2')
    .lambda();