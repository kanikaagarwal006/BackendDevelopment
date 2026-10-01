const library = [];
function addBook(title, author) {
    const book = {
        title: title,
        author: author
    };

    library.push(book);
}
function findBook(title) {
    return library.find(book => book.title === title);
}
addBook("The Alchemist", "Paulo Coelho");
addBook("Harry Potter", "J.K. Rowling");

console.log("Library:", library);

console.log("Found Book:", findBook("The Alchemist"));
console.log("Missing Book:", findBook("The Hobbit"));