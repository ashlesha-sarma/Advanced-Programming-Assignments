/*Q. Write a C program to analyze time complexities in constant time, linear time and quadratic time.
Increase the size of input to check the time consumed. */

#include <stdio.h>
#include <time.h>

int constantTime(int n) {
    int x;
    x = n * n;
    x = x / 10;
    return x;
}

int linearTime(int n) {
    int sum = 0;
    for (int i = 0; i < n; i++) 
    {
        sum += i;
    }
    return sum;
}

int quadraticTime(int n) {
    int count = 0;
    for (int i = 0; i < n; i++) 
    {
        for (int j = 0; j < n; j++) 
        {
            count++;
        }
    }
    return count;
}

int main() {
    clock_t start, end;
    double time_taken;
    int n;

    int repeat = 1000; 
    int repeat_const = 10000000;  
    
    printf("CONSTANT TIME O(1) READINGS\n");
    for (int i = 1; i <= 5; i++) {
        printf("Enter input %d: ", i);
        scanf("%d", &n);

        start = clock();
        for (int r = 0; r < repeat_const; r++) 
        {
            constantTime(n);
        }
        end = clock();
        time_taken = (double)(end - start) / CLOCKS_PER_SEC;

        printf("Reading %d | n = %d | Time = %f seconds\n",
               i, n, time_taken);
    }


    printf("LINEAR TIME O(n) READINGS\n");
    for (int i = 1; i <= 5; i++) {
        printf("Enter input %d: ", i);
        scanf("%d", &n);

        start = clock();
        for (int r = 0; r < repeat; r++) 
        {
            linearTime(n);
        }
        end = clock();
        time_taken = (double)(end - start) / CLOCKS_PER_SEC;

        printf("Reading %d | n = %d | Time = %f seconds\n",
               i, n, time_taken);
    }

    printf("QUADRATIC TIME O(n^2) READINGS\n");
    for (int i = 1; i <= 5; i++) 
    {
        printf("Enter input %d: ", i);
        scanf("%d", &n);

        start = clock();
        for (int r = 0; r < repeat; r++) 
        {
            quadraticTime(n);
        }
        end = clock();
        time_taken = (double)(end - start) / CLOCKS_PER_SEC;

        printf("Reading %d | n = %d | Time = %f seconds\n",
               i, n, time_taken);
    }

    return 0;
}

/*Repetition was used to overcome clock resolution limitations and
 does not change the time complexity of the algorithms.*/