const readerStates = {
  READING: "reading",
  READ_FROM_PREV_ELEM: "reading from prev element",
  READ_FROM_NEXT_ELEM: "reading from next element",
  PAUSE: "pause",
};

const reader = new ScreenReader();

$(document).keydown((e) => {
  if (reader.isReaderEnabled()) {
    if (e.code === "ArrowRight") reader.readFromNext();
    else if (e.code === "ArrowLeft") reader.readFromPrev();
    else if (e.code === "KeyS") reader.stop();
  } else {
    if (e.code === "KeyR" && !e.ctrlKey) reader.readFromStart();
  }
});

function ScreenReader() {
  var currentIndex = 0;
  var domElements = null;
  var utterence;
  var currentState;
  var isEnabled = false;

  function readFromStart() {
    currentIndex = 0;
    domElements = getDomElements();

    isEnabled = true;
    setTabIndex(domElements[0]);
    setReaderCurrentState(readerStates.READING);
    speak(domElements[currentIndex]);
  }

  function readFromPrev() {
    setReaderCurrentState(readerStates.READ_FROM_PREV_ELEM);
    speechSynthesis.cancel();
    currentIndex =
      currentIndex === 0 ? domElements.length - 1 : currentIndex - 1;
    speak(domElements[currentIndex]);
  }

  function readFromNext() {
    setReaderCurrentState(readerStates.READ_FROM_NEXT_ELEM);
    speechSynthesis.cancel();
    currentIndex =
      currentIndex >= domElements.length - 1 ? 0 : currentIndex + 1;
    speak(domElements[currentIndex]);
  }

  function stop() {
    isEnabled = false;
    setReaderCurrentState(readerStates.PAUSE);
    speechSynthesis.cancel();
    removingStyleWhenReaderStops();
  }

  function isReaderEnabled() {
    return isEnabled;
  }

  function getDomElements() {
    const bodyIndex = $("body").index("*");
    const srcIndex = $("script").index("*");
    return $("*").slice(bodyIndex + 1, srcIndex);
  }

  function setTabIndex(elem) {
    $(elem).attr("tabindex", 0);
  }

  function speak(elem) {
    //   console.log(elem.children);
    console.log(elem);
    setTabIndex(elem);
    $(elem).focus();
    highlight(elem);
    utterence = new SpeechSynthesisUtterance(getMsg(elem));
    speechSynthesis.speak(utterence);
    utterence.onend = () => {
      if (currentState === readerStates.READING) {
        nextElement();
      } else {
        setReaderCurrentState(readerStates.READING);
      }
    };
  }

  function getMsg(elem) {
    let msg = "";
    if (elem.children.length === 0) {
      msg = $(elem).text();
    }

    return msg;
  }

  function nextElement() {
    ++currentIndex;
    if (domElements[currentIndex]) speak(domElements[currentIndex]);
  }

  function setReaderCurrentState(state) {
    currentState = state;
  }

  function highlight(elem) {
    $(".border").removeClass("border");
    $(elem).addClass("border");
  }

  function removingStyleWhenReaderStops() {
    $(domElements[currentIndex]).blur();
    $(".border").removeClass("border");
  }

  return { readFromStart, readFromPrev, readFromNext, stop, isReaderEnabled };
}
