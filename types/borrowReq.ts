type BorrowDetail = {
    Quantity: number;
    DueDate: Date;
    BorrowInvoiceID: number;
    ISBN13: string;
};

type BorrowInvoice = {
    BorrowInvoiceID: number;
    BorrowingDate: Date;
    MemberID: number;
    EmployeeID: number;
    BorrowDetails: BorrowDetail[];
};
