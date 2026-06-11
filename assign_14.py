import gc
import sys

gc.disable()

class Node:
    def __init__(self, name):
        self.name = name
        self.link = None

    def __repr__(self):
        return f"Node({self.name!r})"


# create nodes
A = Node("A")
B = Node("B")

# cyclic reference
A.link = B
B.link = A

print("Before del:")
print("refcount(A):", sys.getrefcount(A))
print("refcount(B):", sys.getrefcount(B))

# remove names
del A
del B

# objects still alive because of cycle
still_alive = [
    obj for obj in gc.get_objects()
    if isinstance(obj, Node)
]

print("\nBefore gc.collect():")
print("Objects still alive:", still_alive)
print("Count:", len(still_alive))

#del helper list to avoid refernecing
del still_alive

gc.enable()

# force garbage collection
gc.collect()

after = [
    obj for obj in gc.get_objects()
    if isinstance(obj, Node)
]

print("\nAfter gc.collect():")
print("Objects remaining:", after)
print("Count:", len(after))

if len(after) == 0:
    print("\nGarbage collection successful.")