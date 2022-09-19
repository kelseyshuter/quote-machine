import React, {useState, useEffect} from 'react';
import './App.css';
import COLORS_ARRAY from "./colorsArray.js"

let quoteDBURL = "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";

function App() {
  const [quote, setQuote] = useState("You miss 100% of the shots you don't take.");
  const [author, setAuthor] = useState("Wayne Gretzky");
  const [randomNumber, setRandomNumber] = useState(0);
  const [quotesArray, setQuotesArray] = useState(null);
  const [accentColor, setAccentColor] = useState('#282c34');

  const fetchQuotes = async (url) => {
    const response = await fetch(url)
    const parsedJSON = await response.json()
    setQuotesArray(parsedJSON.quotes)
  }

  useEffect(() => {    
    fetchQuotes(quoteDBURL)
  }, [quoteDBURL])

  const getRandomQuote = () => {
    let randomInteger = Math.floor(quotesArray.length * Math.random())
    setRandomNumber(randomInteger)
    setAccentColor(COLORS_ARRAY[randomInteger])
    setQuote(quotesArray[randomInteger].quote)
    setAuthor(quotesArray[randomInteger].author)    
  }

  return (
    <div className="App">
      <body style={{backgroundColor:accentColor}}>
        <div id="quote-box" style={{color:accentColor}}>
          <p id="text">
          <i className="fa-solid fa-quote-left"></i>
            {quote}
          </p>
          <p id="author">- {author}</p>
          <div className="buttons">
            <a id="tweet-quote" href={encodeURI(`https://twitter.com/intent/tweet?hashtags=randomquote&text=${quote} -${author}`)}>
              <i className="fa-brands fa-square-twitter" style={{color:accentColor}}></i>
            </a>
            <button style={{backgroundColor:accentColor}}id="new-quote" onClick={()=>{
              getRandomQuote()
            }}>Random Quote</button> 
          </div>          
        </div>             
      </body>
    </div>
  );
}

export default App;
