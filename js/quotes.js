const TEST_QUOTE = document.querySelector("#test-quote");
const QUOTE_AUTHOR = document.querySelector("#quote-author");
const QUOTE_BOOK = document.querySelector("#quote-book")

async function getQuoteList() {
    const LOCATION = './data/quotes.json'

    try {
        const RESPONSE = await fetch(LOCATION);

        if (!RESPONSE.ok) {
            throw new Error(`HTTP error! Status: ${RESPONSE.status}`);
        };

        const DATA = await RESPONSE.json();
        return DATA;
    } catch (error) {
        console.error('Failed to fetch quote list:', error);
    };
};

async function getBookList() {
    const LOCATION = 'data/books.json'

    try {
        const RESPONSE = await fetch(LOCATION);

        if (!RESPONSE.ok) {
            throw new Error(`HTTP error! Status: ${RESPONSE.status}`);
        };

        const DATA = await RESPONSE.json();
        return DATA;
    } catch (error) {
        console.error('Failed to fetch quote list:', error);
    };
};

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

function getRandomQuote(quoteList) {
    return quoteList[randomNumber(0, quoteList.length - 1)];
};

function findBookByQuote(quote, bookList) {
    return bookList.find((book) => book.idBook === quote.idBook);
};

function formatAuthors(names) {
    return names.length < 2
        ? names.join("")
        : `${names.slice(0, -1).join(", ")} & ${names.at(-1)}`;
}

async function getQuote() {
    const QUOTE_LIST = await getQuoteList();
    const BOOK_LIST = await getBookList();

    const QUOTE = getRandomQuote(QUOTE_LIST);
    const BOOK = findBookByQuote(QUOTE, BOOK_LIST)

    return {
        text: QUOTE.text,
        authors: formatAuthors(BOOK.authors),
        bookTitle: BOOK.title
    };
};

export async function updateQuote() {
    TEST_QUOTE.textContent = "";
    const QUOTE = await getQuote();

    QUOTE.text.split('').forEach((char) => {
        const charSpan = document.createElement('span');
        charSpan.classList.add("char", "char-idle");
        charSpan.innerText = char;
        TEST_QUOTE.appendChild(charSpan);
    });

    QUOTE_AUTHOR.textContent = QUOTE.authors;
    QUOTE_BOOK.textContent = QUOTE.bookTitle;
};