#include <emscripten.h>
#include<stdio.h>
int balance=1000;
int password=2345;
#define MAX_TRANSACTIONS 10
char transaction_history[MAX_TRANSACTIONS][50];
int transaction_count = 0;

EMSCRIPTEN_KEEPALIVE

int pin_authentication(int entered_password) {
    if (entered_password==password) {
        printf("Correct password");
        return 1;
    }
    else {
        printf("Incorrect pin\n");
        fflush(stdout);
        return 0;
    }
    
}

EMSCRIPTEN_KEEPALIVE
int* get_balance_ptr() {
    return &balance;
}

EMSCRIPTEN_KEEPALIVE
void deposit(int amount){
    if (amount > 0) {
        balance += amount;
        printf("Deposit successful!");
        fflush(stdout);
        if (transaction_count < MAX_TRANSACTIONS) {
            sprintf(transaction_history[transaction_count], "Deposited: %d", amount);
            transaction_count++;
        } else {
            printf("Transaction history is full!\n");
            fflush(stdout);
    } 
}
    else {
        printf("Invalid deposit amount. Please enter a positive value.\n");
        fflush(stdout);
    }
}

EMSCRIPTEN_KEEPALIVE
int get_balance( ){
    return balance;
}

EMSCRIPTEN_KEEPALIVE
char** get_transaction_history() {
    return (char**)transaction_history;
}

EMSCRIPTEN_KEEPALIVE
void withdraw(int amount){
    if (amount > 0 && amount <= balance) 
    {
        balance -= amount;
        printf("Amount Withdrawn: %d\n", amount);
        
        // printf("Remaining Balance: %d\n", balance);
        fflush(stdout);
        if(transaction_count<MAX_TRANSACTIONS){
            sprintf(transaction_history[transaction_count], "Withdrawn: %d", amount);
            transaction_count++;
        }
    } else {
        printf("Insufficient Balance\n");
        fflush(stdout);
    }
}
EMSCRIPTEN_KEEPALIVE
int changePin(int newPin,int reenterPin,int currentpin) {
    if(currentpin==password){
        if(password!=newPin){
            if (newPin == reenterPin) { 
                password=reenterPin;
                printf("PIN successfully changed!\n");
                fflush(stdout);
                return 1;
             } 
             else if(currentpin&&newPin&&reenterPin==0){
                printf("Cannot be blank");
                fflush(stdout);
                return 3;
             }
             else if(newPin==currentpin){
                printf("Your old pin and new pin cannot be same ");
                fflush(stdout);
                return 4;
             }
            else {
                 printf("Error: PINs Should match!\n");
                 fflush(stdout);
                 return 2;
                }
        }
    
    
    else{
        printf("Incorrect password\n");
        fflush(stdout);
    }

}
}
EMSCRIPTEN_KEEPALIVE
int changepass(int new_password){
    password=new_password;
    return new_password;
}
EMSCRIPTEN_KEEPALIVE
int get_password(){
    return password;
}
EMSCRIPTEN_KEEPALIVE
void set_balance(int new_balance) {
    balance = new_balance;
}

int main() { return 0; }
    //emcc backend.c -o backend.js -s EXPORTED_FUNCTIONS="['_pin_authentication', '_deposit', '_withdraw', '_get_balance', '_get_transaction_history', '_changePin', '_set_balance', '_get_balance_ptr', '_changepass', '_get_password']" -s MODULARIZE=1 -s EXPORT_ES6=1 -s ENVIRONMENT=web -s "EXPORTED_RUNTIME_METHODS=['ccall', 'cwrap', 'UTF8ToString']"

