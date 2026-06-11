#include <stdio.h>
#include <pthread.h>
 
#define NUM_THREADS  4        
#define INCREMENTS   100000   
 
long long counter = 0;
 
void *increment(void *arg) {
    int i;
    for (i = 0; i < INCREMENTS; i++) {
        counter++;   
    }
    return NULL;
}
 
int main() {
    pthread_t tid[NUM_THREADS];
    int i;
 
    for (i = 0; i < NUM_THREADS; i++) {
        pthread_create(&tid[i], NULL, increment, NULL);
    }
 
    for (i = 0; i < NUM_THREADS; i++) {
        pthread_join(tid[i], NULL);
    }
 
    printf("Expected counter value : %lld\n",
           (long long)NUM_THREADS * INCREMENTS);
    printf("Actual counter value   : %lld\n", counter);
 
    return 0;
}
