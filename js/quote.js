async function getQuoteList() {
    const LOCATION = 'data/quotes.json'

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

async function findQuoteBook(quote) {
    const BOOK_LIST = await getBookList();
    return BOOK_LIST.find((book) => book.idBook === quote.idBook);
};

function formatAuthors(names) {
    return names.length < 2
        ? names.join("")
        : `${names.slice(0, -1).join(", ")} & ${names.at(-1)}`;
}

function fillQuoteArea(quote, book) {
    const TEST_QUOTE = document.querySelector("#test_quote");
    const QUOTE_AUTHOR = document.querySelector("#quote_author");
    const TEST_GUIDE = document.querySelector("#test_guide")

    TEST_GUIDE.hidden = true;
    TEST_QUOTE.textContent = quote.text;
    QUOTE_AUTHOR.textContent = formatAuthors(book.authors);
};

export default async function main () {
    const QUOTE_LIST = await getQuoteList();
    const QUOTE = getRandomQuote(QUOTE_LIST);
    const BOOK = await findQuoteBook(QUOTE);

    fillQuoteArea(QUOTE, BOOK);
};