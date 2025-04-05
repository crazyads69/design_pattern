class Book {
  private bookId: number;
  private title: string;
  private isAvailable: boolean;

  constructor(bookId: number, title: string, isAvailable: boolean = true) {
    this.bookId = bookId;
    this.title = title;
    this.isAvailable = isAvailable;
  }

  getBookId(): number {
    return this.bookId;
  }
  getTitle(): string {
    return this.title;
  }
  getBookAvailable(): boolean {
    return this.isAvailable;
  }
  setBookAvailable(isAvailable: boolean): void {
    this.isAvailable = isAvailable;
  }
}

class LibraryUser {
  private userId: number;
  private name: string;
  private borrowedBooks: Book[];

  constructor(userId: number, name: string) {
    this.userId = userId;
    this.name = name;
    this.borrowedBooks = [];
  }

  getUserId(): number {
    return this.userId;
  }
  getName(): string {
    return this.name;
  }
  getBorrowedBooks(): Book[] {
    return this.borrowedBooks;
  }
  addBorrowedBook(book: Book): void {
    this.borrowedBooks.push(book);
  }
  removeBorrowedBook(bookId: number): boolean {
    const index = this.borrowedBooks.findIndex((b) => b.getBookId() === bookId);
    if (index !== -1) {
      this.borrowedBooks.splice(index, 1);
      return true;
    }
    return false;
  }
}

class Library {
  private books: Book[];
  private users: LibraryUser[];

  constructor() {
    this.books = [];
    this.users = [];
  }

  addBook(book: Book): void {
    this.books.push(book);
  }

  addUser(user: LibraryUser): void {
    this.users.push(user);
  }

  getBooks(): Book[] {
    return this.books;
  }
  getUsers(): LibraryUser[] {
    return this.users;
  }
}

interface LibraryCommand {
  execute(): string;
}

class BorrowBookCommand implements LibraryCommand {
  private library: Library;
  private userId: number;
  private bookId: number;

  constructor(library: Library, userId: number, bookId: number) {
    this.library = library;
    this.userId = userId;
    this.bookId = bookId;
  }

  execute(): string {
    const users = this.library
      .getUsers()
      .filter((user) => user.getUserId() === this.userId);
    const books = this.library
      .getBooks()
      .filter((book) => book.getBookId() === this.bookId);
    if (users.length === 0) {
      return `User with ID ${this.userId} not found.`;
    }
    if (books.length === 0) {
      return `Book with ID ${this.bookId} not found.`;
    }
    const user = users[0];
    const book = books[0];
    if (!book.getBookAvailable()) {
      return `Book with ID ${this.bookId} is already borrowed.`;
    }
    book.setBookAvailable(false);
    user.addBorrowedBook(book);
    return `Book with ID ${
      this.bookId
    } ("${book.getTitle()}") borrowed by user ${user.getName()} (ID ${
      this.userId
    }).`;
  }
}

class ReturnBookCommand implements LibraryCommand {
  private library: Library;
  private userId: number;
  private bookId: number;

  constructor(library: Library, userId: number, bookId: number) {
    this.library = library;
    this.userId = userId;
    this.bookId = bookId;
  }

  execute(): string {
    const users = this.library
      .getUsers()
      .filter((user) => user.getUserId() === this.userId);
    const books = this.library
      .getBooks()
      .filter((book) => book.getBookId() === this.bookId);
    if (users.length === 0) {
      return `User with ID ${this.userId} not found.`;
    }
    if (books.length === 0) {
      return `Book with ID ${this.bookId} not found.`;
    }
    const user = users[0];
    const book = books[0];
    const removed = user.removeBorrowedBook(this.bookId);
    if (!removed) {
      return `Book with ID ${this.bookId} was not borrowed by user with ID ${this.userId}.`;
    }
    book.setBookAvailable(true);
    return `Book with ID ${
      this.bookId
    } ("${book.getTitle()}") returned by user ${user.getName()} (ID ${
      this.userId
    }).`;
  }
}

class RenewBookCommand implements LibraryCommand {
  private library: Library;
  private userId: number;
  private bookId: number;

  constructor(library: Library, userId: number, bookId: number) {
    this.library = library;
    this.userId = userId;
    this.bookId = bookId;
  }

  execute(): string {
    const users = this.library
      .getUsers()
      .filter((user) => user.getUserId() === this.userId);
    const books = this.library
      .getBooks()
      .filter((book) => book.getBookId() === this.bookId);
    if (users.length === 0) {
      return `User with ID ${this.userId} not found.`;
    }
    if (books.length === 0) {
      return `Book with ID ${this.bookId} not found.`;
    }
    const user = users[0];
    const book = books[0];
    const borrowedBooks = user.getBorrowedBooks();
    const exists = borrowedBooks.some(
      (borrowedBook) => borrowedBook.getBookId() === this.bookId
    );
    if (!exists) {
      return `Book with ID ${this.bookId} was not borrowed by user with ID ${this.userId}.`;
    }
    // Nếu có logic gia hạn (renew) về thời hạn mượn thì thêm vào đây.
    return `Book with ID ${
      this.bookId
    } ("${book.getTitle()}") renewed by user ${user.getName()} (ID ${
      this.userId
    }).`;
  }
}

class LibraryInvoker {
  private commands: LibraryCommand[];

  constructor() {
    this.commands = [];
  }

  addCommand(cmd: LibraryCommand): void {
    this.commands.push(cmd);
  }

  executeCommands(): void {
    this.commands.forEach((cmd) => {
      console.log(cmd.execute());
    });
    this.commands = [];
  }
}

class LibrayClient {
  private library: Library;

  constructor(library: Library) {
    this.library = library;
  }

  getLibrary(): Library {
    return this.library;
  }
}

const library = new Library();
const client = new LibrayClient(library);
const clientLibrary = client.getLibrary();

clientLibrary.addBook(new Book(1, "Clean Code"));
clientLibrary.addBook(new Book(2, "Design Patterns"));
clientLibrary.addBook(new Book(3, "Refactoring"));

clientLibrary.addUser(new LibraryUser(101, "Alice"));
clientLibrary.addUser(new LibraryUser(102, "Bob"));

const invoker = new LibraryInvoker();

invoker.addCommand(new BorrowBookCommand(clientLibrary, 101, 1));
invoker.addCommand(new BorrowBookCommand(clientLibrary, 102, 2));
invoker.addCommand(new BorrowBookCommand(clientLibrary, 101, 3));
invoker.executeCommands();

invoker.addCommand(new BorrowBookCommand(clientLibrary, 102, 1));
invoker.executeCommands();

invoker.addCommand(new RenewBookCommand(clientLibrary, 101, 1));
invoker.executeCommands();

invoker.addCommand(new ReturnBookCommand(clientLibrary, 101, 1));
invoker.executeCommands();

invoker.addCommand(new ReturnBookCommand(clientLibrary, 101, 1));
invoker.executeCommands();

clientLibrary.getUsers().forEach((user) => {
  console.log(
    `User: ${user.getName()} (ID: ${user.getUserId()}) has borrowed:`,
    user.getBorrowedBooks().map((b) => b.getTitle())
  );
});
