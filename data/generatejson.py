import json

solutions = []
count = 0

with open('test.txt') as file: 
    for line in file:
        line = line.rstrip('\n') 
        count += 1
        current = {"id": count, "word": line}
        solutions.append(current)

output = {"solutions": solutions}

with open('db.json', 'w') as file:
    file.write(json.dumps(output))