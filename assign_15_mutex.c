#include <stdio.h>
#include <pthread.h>
 
#define NUM_THREADS  4
#define INCREMENTS   100000
 
long long counter = 0;
 
pthread_mutex_t lock = PTHREAD_MUTEX_INITIALIZER;

void *increment(void *arg) {
    int i;
    for (i = 0; i < INCREMENTS; i++) {
        pthread_mutex_lock(&lock);  
        counter++;                   
        pthread_mutex_unlock(&lock); 
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
 
    pthread_mutex_destroy(&lock);
 
    return 0;
}
