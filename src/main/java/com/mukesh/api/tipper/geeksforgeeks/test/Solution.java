package com.mukesh.api.tipper.geeksforgeeks.test;

class MyQueue {
    private static final int CAPACITY = 100005;

    int front = -1;
    int rear = -1;

    int[] arr = new int[CAPACITY];


    void push(int x) {
        if(front == -1) {
            rear = front = 0;
            arr[front] = x;
            return;
        }
        front = (front + 1) % CAPACITY;

        if(front == rear) {
            return;
        }
        arr[front] = x;
    }

    //Function to pop an element from queue and return that element.
    int pop() {
        //check if the array is Empty
        if(rear == -1) return -1;

        if(rear == front) {
            int number = arr[rear];
            front = -1;
            rear = -1;
            return number;
        }
        else {
            int number = arr[rear];
            rear = (rear + 1) % CAPACITY;
            return number;
        }
    }
}




