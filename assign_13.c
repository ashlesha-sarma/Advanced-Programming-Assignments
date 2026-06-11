#include <stdio.h>
#include <stdlib.h>  //needed for malloc, realloc, free
#include <string.h>

typedef struct {
    char   *data;
    size_t  length;     //used
    size_t  capacity;   //allocated
} StringBuffer;

StringBuffer *sb_init(size_t initial_capacity) {      //Creates and initializes buffer.
    StringBuffer *sb = (StringBuffer *)malloc(sizeof(StringBuffer));  //he
    if (sb == NULL) {               
        fprintf(stderr, "Error: malloc failed for struct\n");
        return NULL;
    }

    sb->data = (char *)malloc(initial_capacity);  //internal buffer, character array on heap
    if (sb->data == NULL) {        
        fprintf(stderr, "Error: malloc failed for buffer\n");
        free(sb);                   
        return NULL;
    }

    sb->data[0] = '\0';              //null terminate empty string
    sb->length   = 0;
    sb->capacity = initial_capacity;
    return sb;
}

int sb_append(StringBuffer *sb, const char *str) {  //append function
    size_t str_len      = strlen(str);
    size_t needed       = sb->length + str_len + 1;  

    if (needed > sb->capacity) {
        size_t new_cap = sb->capacity * 2;  //double capacity until it can fit new string
        if (new_cap < needed) new_cap = needed; 

        char *temp = (char *)realloc(sb->data, new_cap);
        if (temp == NULL) {          
            fprintf(stderr, "Error: realloc failed\n");
            return -1;            
        }
        sb->data     = temp;         
        sb->capacity = new_cap;
        printf("  [realloc] capacity grew to %zu bytes\n", new_cap);
    }

    memcpy(sb->data + sb->length, str, str_len + 1);  //append new string 
    sb->length += str_len;
    return 0;                        
}

void sb_free(StringBuffer *sb) {
    if (sb == NULL) return;
    free(sb->data);  
    sb->data = NULL;  
    free(sb);          
}

int main(void) {
    printf(" Dynamic String Buffer Demo \n\n");

    StringBuffer *sb = sb_init(8);
    if (!sb) return 1;

    printf("Initial capacity: %zu\n", sb->capacity);

    sb_append(sb, "Hello");
    printf("After 'Hello'  -> len=%zu cap=%zu | \"%s\"\n",
           sb->length, sb->capacity, sb->data);

    sb_append(sb, ", World");
    printf("After ', World'-> len=%zu cap=%zu | \"%s\"\n",
           sb->length, sb->capacity, sb->data);

    sb_append(sb, "! From Assam");
    printf("After extra str-> len=%zu cap=%zu | \"%s\"\n",
           sb->length, sb->capacity, sb->data);

    printf("\nFinal string: \"%s\"\n", sb->data);

    sb_free(sb);
    printf("Memory freed successfully.\n");
    return 0;
}