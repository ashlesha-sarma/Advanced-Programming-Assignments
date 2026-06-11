#include <stdio.h>
#include <stdlib.h>
#include <pthread.h>
#include <unistd.h>  //sleep()
 
#define BUFFER_SIZE  5   
#define NUM_ITEMS    10   
 
int buffer[BUFFER_SIZE];  //shared
int count = 0;   //current no of items in buffer
int in    = 0;   //producer
int out   = 0;   //consumer
 
pthread_mutex_t mutex    = PTHREAD_MUTEX_INITIALIZER;
pthread_cond_t  not_full  = PTHREAD_COND_INITIALIZER; //prod
pthread_cond_t  not_empty = PTHREAD_COND_INITIALIZER; //con

void *producer(void *arg) {
    int item;
    for (item = 1; item <= NUM_ITEMS; item++) {
 
        pthread_mutex_lock(&mutex);          
 
        while (count == BUFFER_SIZE) {
            printf("[Producer] Buffer FULL. Waiting...\n");
            pthread_cond_wait(&not_full, &mutex);  
        }
 
        buffer[in] = item;
        in = (in + 1) % BUFFER_SIZE;  //circular queue behaviour  0-4-0
        count++;
 
        printf("[Producer] Produced item %2d  |  Buffer count: %d\n",
               item, count);
 
        pthread_cond_signal(&not_empty);    
        pthread_mutex_unlock(&mutex);       
 
        sleep(1);  
    }
    return NULL;
}
 

void *consumer(void *arg) {
    int item, i;
    for (i = 0; i < NUM_ITEMS; i++) {
 
        pthread_mutex_lock(&mutex);   

        while (count == 0) {
            printf("[Consumer] Buffer EMPTY. Waiting...\n");
            pthread_cond_wait(&not_empty, &mutex); 
        }
 
        item = buffer[out];
        out  = (out + 1) % BUFFER_SIZE;
        count--;
 
        printf("[Consumer] Consumed item %2d  |  Buffer count: %d\n",
               item, count);
 
        pthread_cond_signal(&not_full);     
        pthread_mutex_unlock(&mutex);        
 
        sleep(2); 
    } 
    return NULL;
}
 
int main() {
    pthread_t prod_tid, cons_tid;
 
    printf("--- Producer-Consumer with Condition Variables ---\n\n");
 
    pthread_create(&prod_tid, NULL, producer, NULL);
    pthread_create(&cons_tid, NULL, consumer, NULL);
 
    pthread_join(prod_tid, NULL);
    pthread_join(cons_tid, NULL);
 
    pthread_mutex_destroy(&mutex);
    pthread_cond_destroy(&not_full);
    pthread_cond_destroy(&not_empty);
 
    printf("\n--- All items produced and consumed. Program complete. ---\n");
    return 0;
}
