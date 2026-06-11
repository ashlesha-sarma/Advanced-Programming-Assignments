/*Q. Write a C program for three different operations as stated in question 1 to analyze the space complexity.*/
#include <stdio.h>
#include <stdlib.h>

int constantSpaceSum(int n, size_t *auxMem) {
    int sum = 0;
    int i;

    *auxMem = sizeof(sum) + sizeof(i); 

    for (i = 0; i < n; i++)
        sum += i;

    return sum;
}


int linearSpaceCopy(int n, size_t *auxMem) {
    int *copy = (int *)malloc(n * sizeof(int));
    int sum = 0;
    int i;

    if (!copy) {
        *auxMem = 0;
        return -1; // Allocation failed
    }

    *auxMem = n * sizeof(int);

    for (i = 0; i < n; i++)
        copy[i] = i; // Fill with some data

    for (i = 0; i < n; i++)
        sum += copy[i];

    free(copy);
    return sum;
}

int quadraticSpaceMatrix(int n, size_t *auxMem) {
    int **matrix;
    int i, j, count = 0;

    matrix = (int **)malloc(n * sizeof(int *));
    if (!matrix) {
        *auxMem = 0;
        return -1;
    }


    for (i = 0; i < n; i++) {
        matrix[i] = (int *)malloc(n * sizeof(int));
        if (!matrix[i]) {
             for (int k = 0; k < i; k++) free(matrix[k]);
             free(matrix);
             *auxMem = 0;
             return -1;
        }
    }

    *auxMem = (n * sizeof(int *)) + (n * n * sizeof(int));

    for (i = 0; i < n; i++)
        for (j = 0; j < n; j++)
            matrix[i][j] = count++;
    
    for (i = 0; i < n; i++)
        free(matrix[i]);
    free(matrix);

    return count;
}

int main() {

    int inputs[] = {10, 20, 30, 40, 50}; 
    int num_inputs = sizeof(inputs) / sizeof(inputs[0]);
    int n;
    size_t auxMem;
    int result;

    printf("CONSTANT SPACE O(1) READINGS\n");
    for (int i = 0; i < num_inputs; i++) {
        n = inputs[i];
        
        result = constantSpaceSum(n, &auxMem);
        printf("Reading %d | n = %d | Result = %d | Aux Space = %zu bytes\n",
               i + 1, n, result, auxMem);
    }

    printf("\nLINEAR SPACE O(n) READINGS\n");
    for (int i = 0; i < num_inputs; i++) {
        n = inputs[i];

        result = linearSpaceCopy(n, &auxMem);
        if (result == -1 && auxMem == 0) {
             printf("Reading %d | n = %d | Allocation Failed\n", i + 1, n);
        } else {
             printf("Reading %d | n = %d | Result = %d | Aux Space = %zu bytes\n",
                    i + 1, n, result, auxMem);
        }
    }

    printf("\nQUADRATIC SPACE O(n^2) READINGS\n");
    for (int i = 0; i < num_inputs; i++) {
        n = inputs[i];

        result = quadraticSpaceMatrix(n, &auxMem);
        if (result == -1 && auxMem == 0) {
             printf("Reading %d | n = %d | Allocation Failed\n", i + 1, n);
        } else {
             printf("Reading %d | n = %d | Result = %d | Aux Space = %zu bytes\n",
                    i + 1, n, result, auxMem);
        }
    }

    return 0;
}
