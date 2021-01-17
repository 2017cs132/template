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

    console.log(domElements);

    isEnabled = true;
    setTabIndex();
    setReaderCurrentState(readerStates.READING);
    jumpToSpeakableElems();

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

  function setTabIndex() {
    const elem = getCurrentElem();
    $(elem).attr("tabindex", 0);
  }

  function speak(elem) {
    setTabIndex();
    $(elem).focus();
    highlight();
    generateSound();
    utterence = new SpeechSynthesisUtterance(getMsg());
    speechSynthesis.speak(utterence);
    utterence.onend = () => {
      if (currentState === readerStates.READING) {
        nextElement();
      } else {
        setReaderCurrentState(readerStates.READING);
      }
    };
  }

  function getMsg() {
    return getTextWithoutAnyChildNodeText();
  }

  function nextElement() {
    ++currentIndex;
    jumpToSpeakableElems();
    if (domElements[currentIndex]) speak(domElements[currentIndex]);
  }

  function setReaderCurrentState(state) {
    currentState = state;
  }

  function generateSound() {
    const sound = new Audio("./screen-reader/element_sound.mp3");
    sound.play();
  }

  function highlight() {
    const elem = getCurrentElem();
    $(".screen-reader-border").removeClass("screen-reader-border");
    $(elem).addClass("screen-reader-border");
  }

  function removingStyleWhenReaderStops() {
    $(domElements[currentIndex]).blur();
    $(".screen-reader-border").removeClass("screen-reader-border");
  }

  function jumpToSpeakableElems() {
    while (true) {
      const current = getCurrentElem();

      if (!current) break;

      const text = getTextWithoutAnyChildNodeText();

      if (text) break;

      ++currentIndex;
    }
  }

  function getTextWithoutAnyChildNodeText() {
    const currentElem = getCurrentElem();
    return $(currentElem).clone().children().remove().end().text().trim();
  }

  function getCurrentElem() {
    return domElements[currentIndex];
  }

  return { readFromStart, readFromPrev, readFromNext, stop, isReaderEnabled };
}
