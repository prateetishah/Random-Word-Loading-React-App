import React, { useState, useEffect } from "react";

function FlagLoad() {
  const [typedText, setTypedText] = useState([]);
  const apiUrl = "https://random-word-api.herokuapp.com/word";

  useEffect(() => {
    // Fetch Flag from api
    fetch(apiUrl)
      .then((response) => response.text())
      .then((data) => {
        startTypingEffect(data);
      });
  }, []);

  const startTypingEffect = (text) => {
    let currentIndex = 0;

    const typingInterval = setInterval(() => {
      if (currentIndex < text.length) {
        setTypedText((prevTypedText) =>
          text[currentIndex] !== undefined &&
          currentIndex >= prevTypedText.length
            ? [...prevTypedText, text[currentIndex]]
            : [...prevTypedText]
        );
        currentIndex++; // Incrementing currentIndex
      } else {
        clearInterval(typingInterval);
      }
    }, 500); // Half-second delay
  };

  return (
    <div>
      <ul>
        {typedText.map((character, index) => (
          <li key={index}>{character || "Loading..."}</li>
        ))}
      </ul>
    </div>
  );
}

export default FlagLoad;
