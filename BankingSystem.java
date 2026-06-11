import java.util.ArrayList;
import java.util.List;

class Account {
    private String accountNumber;
    private String ownerName;
    private double balance;

    Account(String accountNumber, String ownerName) {
        this(accountNumber, ownerName, 0.0);
    }

    Account(String accountNumber, String ownerName, double balance) {
        this.accountNumber = accountNumber;
        this.ownerName = ownerName;
        this.balance = balance;
    }

    public String getAccountNumber() { return accountNumber; }
    public String getOwnerName() { return ownerName; }
    public double getBalance() { return balance; }

    public void setOwnerName(String ownerName) { this.ownerName = ownerName; }

    public void deposit(double amount) {
        if (amount <= 0) throw new IllegalArgumentException("Invalid amount");
        balance += amount;
    }

    public void withdraw(double amount) {
        if (amount <= 0 || amount > balance)
            throw new IllegalArgumentException("Invalid withdrawal");
        balance -= amount;
    }

    public void display() {
        System.out.println("Account No : " + accountNumber);
        System.out.println("Owner      : " + ownerName);
        System.out.println("Balance    : " + balance);
    }
}

class SavingsAccount extends Account {
    private double interestRate;

    SavingsAccount(String accountNumber, String ownerName, double balance, double interestRate) {
        super(accountNumber, ownerName, balance);
        this.interestRate = interestRate;
    }

    @Override
    public void display() {
        super.display();
        double interest = getBalance() * interestRate / 100;
        System.out.println("Interest Rate : " + interestRate);
        System.out.println("Interest      : " + interest);
    }
}

class CurrentAccount extends Account {
    private double overdraftLimit;

    CurrentAccount(String accountNumber, String ownerName, double balance, double overdraftLimit) {
        super(accountNumber, ownerName, balance);
        this.overdraftLimit = overdraftLimit;
    }

    @Override
    public void withdraw(double amount) {
        if (amount <= 0 || amount > getBalance() + overdraftLimit)
            throw new IllegalArgumentException("Invalid withdrawal");
        super.deposit(-amount);
    }

    @Override
    public void display() {
        super.display();
        System.out.println("Overdraft Limit : " + overdraftLimit);
    }
}

public class BankingSystem {
    public static void main(String[] args) {
        List<Account> accounts = new ArrayList<>();

        accounts.add(new Account("A001", "Alice", 3000));
        accounts.add(new SavingsAccount("S001", "Bob", 10000, 5));
        accounts.add(new CurrentAccount("C001", "Carol", 1000, 500));

        accounts.get(0).deposit(500);
        accounts.get(1).withdraw(2000);

        for (Account acc : accounts) {
            acc.display();
            System.out.println();
        }
    }
}