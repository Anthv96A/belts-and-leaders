class Exceptions {
  static exceptionHandling(action, callbackError = null, cleanUp = null) {
    try {
      action();
      fail('Should not get this far');
    } catch (error) {
      if (callbackError) callbackError(error);
    } finally {
      if (cleanUp) cleanUp();
    }
  }


  static async exceptionHandlingAsync(callbackAsync, callbackError = null, cleanUp = null) {
    try {
      await callbackAsync();
      fail('Should not get this far');
    } catch (error) {
      if (callbackError) callbackError(error);
    } finally {
      if (cleanUp) cleanUp();
    }
  }
}

export default Exceptions;
