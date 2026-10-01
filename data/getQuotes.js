import { JSDOM, VirtualConsole } from "jsdom";
import { writeFile } from "node:fs/promises";

async function getFullBookList() {
    const LINK = "https://gutendex.com/books";

    try {
        const RESPONSE = await fetch(LINK);

        if (!RESPONSE.ok) {
            throw new Error(`HTTP error! Status: ${RESPONSE.status}`);
        }

        const DATA = await RESPONSE.json();
        return DATA
    } catch (error) {
        console.error('Failed to fetch books:', error);
    }
};

async function getFullText(bookLinkFullText) {
    try {
        const RESPONSE = await fetch(bookLinkFullText);

        if (!RESPONSE.ok) {
            throw new Error(`HTTP error! Status: ${RESPONSE.status}`);
        };

        const DATA = await RESPONSE.text();
        return DATA;
    } catch (error) {
        console.error('Failed to fetch full  text:', error);
    }
};

function selectBooks(bookList) {
    return bookList
        .filter((book) => { return book.languages.find((n) => n === 'en') && book.copyright === false && book.media_type === 'Text' })
        .sort((a, b) => b.download_count - a.download_count)
        .slice(0, 20);
};

async function getBookInfo(bookList) {
    return Promise.all(
        bookList.map(async (book, index) => {
            return {
                idBook: index + 1,
                gutenbergId: book.id,
                title: book.title,
                authors: book.authors.reduce((acc, n) => {
                    acc.push(n.name);
                    return acc;
                }, []),
                linkFullText: book.formats["text/html"],
                fullText: await getFullText(book.formats["text/html"])
            };
        })
    );
};

async function getBooks() {
    const FULL_BOOK_LIST = await getFullBookList();
    const SELECTED_BOOK_LIST = selectBooks(FULL_BOOK_LIST.results);
    const BOOK_LIST = await getBookInfo(SELECTED_BOOK_LIST);

    return BOOK_LIST
}


function getParagraphs(html) {
    const DOC = new JSDOM(html, { virtualConsole: new VirtualConsole() }).window.document;

    DOC.querySelectorAll(".pagenum, sup, a.pginternal, .pg-boilerplate")
        .forEach((element) => element.remove());

    return Array.from(DOC.querySelectorAll("p"))
        .map((p) => p.textContent);
}


function cleanText(text) {
    return text
        .replace(/[\u2018\u2019\u201B]/g, "'")
        .replace(/[\u201C\u201D\u201F]/g, '"')
        .replace(/[\u2013\u2014\u2015]/g, "-")
        .replace(/\u2026/g, "...")
        .replace(/[\u00A0\u2009\u202F]/g, " ")
        .replace(/_/g, "")
        .replace(/\s+/g, " ")
        .trim();
}


function isValidQuote(text) {
    const IS_ASCII = /^[\x20-\x7E]+$/.test(text);
    const HAS_NOISE = /[\[\]{}<>*#]/.test(text);
    const IS_HEADING = text === text.toUpperCase();
    const BALANCED_QUOTES = (text.match(/"/g) ?? []).length % 2 === 0;

    return IS_ASCII && !HAS_NOISE && !IS_HEADING && BALANCED_QUOTES;
}

function selectQuotes(book) {
    if (!book.fullText) return [];

    return getParagraphs(book.fullText)
        .map(cleanText)
        .filter((text) => text.length >= 300 && text.length <= 400)
        .filter(isValidQuote);
}

function getQuotes(bookList) {
    let idQuote = 1;

    return bookList.reduce((arr, book) => {
        arr.push(...selectQuotes(book).map((quote) => {
            return {
                id: idQuote++,
                idBook: book.idBook,
                text: quote
            };
        }));
        return arr;
    }, []);
}

function getBooksWithoutText(bookList) {
    return bookList.map(({ fullText, ...book }) => book);
}

async function saveJson(fileName, data) {
    try {
        const FILE_URL = new URL(`./${fileName}`, import.meta.url);
        await writeFile(FILE_URL, JSON.stringify(data, null, 2), "utf8");
        console.log(`Saved ${fileName} (${data.length} items)`);
    } catch (error) {
        console.error(`Failed to save ${fileName}:`, error);
    }
}

async function main() {
    const BOOK_LIST = await getBooks();

    const QUOTES = getQuotes(BOOK_LIST);
    const BOOKS = getBooksWithoutText(BOOK_LIST);

    await saveJson("books.json", BOOKS);
    await saveJson("quotes.json", QUOTES);
}

main();