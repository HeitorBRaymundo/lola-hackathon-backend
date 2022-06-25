import * as Alexa from 'ask-sdk-core';

import { getTextFromDB } from '../../infrastructure/intentTextDB.js';
import { putRegister } from '../../infrastructure/registerDB';

export const TrackExerciseIntentHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
      && Alexa.getIntentName(handlerInput.requestEnvelope) === 'RegisterExerciseIntent';
  },
  async handle(handlerInput) {
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