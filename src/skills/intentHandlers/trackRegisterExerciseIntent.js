import * as Alexa from 'ask-sdk-core';

import { getTextFromDB } from '../../infrastructure/intentTextDB.js';
import { putRegister } from '../../infrastructure/registerDB.js';

export const TrackRegisterExerciseIntentHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
      && Alexa.getIntentName(handlerInput.requestEnvelope) === 'RegisterExerciseIntent';
  },
  async handle(handlerInput) {
    console.log('TrackExerciseIntentHandler Triggered');

    const speakOutput = await getTextFromDB('ExerciseConfirm');

    await putRegister({
      id: 1,
      type: 'exercise',
    });

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .getResponse()
  }
};