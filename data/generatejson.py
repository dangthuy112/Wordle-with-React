import json
import string
import os

solutions = []
letters = []
count = 0

with open('C:\\Users\\dangt\\Documents\\GitHub\\Wordle-with-React\\data\\listofwords.txt') as file:
    for line in file:
        line = line.rstrip('\n')
        count += 1
        current = {"id": count, "word": line}
        solutions.append(current)

for char in string.ascii_lowercase:
    current = {"key": char}
    letters.append(current)

output = {"solutions": solutions, "letters": letters}

save_path = 'C:\\Users\\dangt\\Documents\\GitHub\\Wordle-with-React'
file_name = 'db.json'

completeName = os.path.join(save_path, file_name)
db = open(completeName, "w")
db.write(json.dumps(output))

db.close()
