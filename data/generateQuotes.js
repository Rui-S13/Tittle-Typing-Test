import { JSDOM, VirtualConsole } from "jsdom";
import { writeFile } from "node:fs/promises";

const BOOK_IDS = [
    1342, 158, 105, 2641, 64317, 67979, 16389, 308,
    37106, 45, 113, 11, 12, 55, 16, 289,
    120, 74, 236, 215, 103, 164,
    1661, 2852, 244,
    35, 36, 5230, 43, 84
];

async function getBookById(id) {
    try {
        const RESPONSE = await fetch(`https://gutendex.com/books/${id}`);

        if (!RESPONSE.ok) {
            throw new Error(`HTTP error! Status: ${RESPONSE.status}`);
        }

        return await RESPONSE.json();
    } catch (error) {
        console.error(`Failed to fetch book ${id}:`, error);
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

function formatAuthor(name) {
    const [last, ...first] = name.split(", ");
    return first.length ? `${first.join(" ")} ${last}` : last;
};

function cleanTitle(title) {
    return title
        .replace(/\s*:\s*\$b\s*/i, ": ")
        .trim();
}

async function getBooksInfo(bookList) {
    return Promise.all(
        bookList.map(async (book, index) => {
            return {
                idBook: index + 1,
                gutenbergId: book.id,
                title: cleanTitle(book.title),
                authors: book.authors.map((author) => formatAuthor(author.name)),
                linkFullText: book.formats["text/html"],
                fullText: await getFullText(book.formats["text/html"])
            };
        })
    );
};

async function buildBooksList() {
    const RESULTS = await Promise.all(BOOK_IDS.map((id) => getBookById(id)));
    const SELECTED_BOOK_LIST = RESULTS.filter(Boolean);

    SELECTED_BOOK_LIST.forEach((book) => console.log(`${book.id}: ${book.title}`));

    return getBooksInfo(SELECTED_BOOK_LIST);
};

function getParagraphs(html) {
    const DOC = new JSDOM(html, { virtualConsole: new VirtualConsole() }).window.document;

    DOC.querySelectorAll(".pagenum, sup, a.pginternal, .pg-boilerplate")
        .forEach((element) => element.remove());

    return Array.from(DOC.querySelectorAll("p"))
        .map((p) => p.textContent);
};

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
};

function isValidQuote(text) {
    const IS_ASCII = /^[\x20-\x7E]+$/.test(text);
    const HAS_NOISE = /[\[\]{}<>*#]/.test(text);
    const IS_HEADING = text === text.toUpperCase();
    const BALANCED_QUOTES = (text.match(/"/g) ?? []).length % 2 === 0;

    return IS_ASCII && !HAS_NOISE && !IS_HEADING && BALANCED_QUOTES;
};

function pickSpread(items, limit) {
    if (items.length <= limit) return items;

    return Array.from({ length: limit }, (_, i) =>
        items[Math.floor((i * items.length) / limit)]
    );
};

function selectQuotes(book) {
    if (!book.fullText) return [];

    const VALID = getParagraphs(book.fullText)
        .map(cleanText)
        .filter((text) => text.length >= 500 && text.length <= 600)
        .filter(isValidQuote);

    return pickSpread(VALID, 100);
};

function buildQuoteList(bookList) {
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
};

function getBooksListWithoutText(bookList) {
    return bookList.map(({ fullText, ...book }) => book);
};

async function saveJson(fileName, data) {
    try {
        const FILE_URL = new URL(`./${fileName}`, import.meta.url);
        await writeFile(FILE_URL, JSON.stringify(data, null, 2), "utf8");
        console.log(`Saved ${fileName} (${data.length} items)`);
    } catch (error) {
        console.error(`Failed to save ${fileName}:`, error);
    }
};

async function generateData() {
    const BOOK_LIST = await buildBooksList();
    const QUOTES = buildQuoteList(BOOK_LIST);
    const BOOKS = getBooksListWithoutText(BOOK_LIST);

    await saveJson("books.json", BOOKS);
    await saveJson("quotes.json", QUOTES);
};

generateData();