input_filename = "ja_pageviews_data"
output_filename = "ja_wikipedia_top.json"
max_entries = 100000


file_lines = list(set(list(map(str.strip, open(input_filename, "r", encoding="UTF-8").readlines()))))
file_lines = [x.split() for x in file_lines]
file_lines = filter(lambda x: len(x) >= 5 and x[4].isnumeric() and "\"" not in x[1], file_lines)
file_lines = sorted(file_lines, key = lambda x: int(x[4]))
file_lines.reverse()

file_lines = list(dict.fromkeys([x[1] for x in file_lines]))

with open(output_filename, "w", encoding = "UTF8") as output_file:
    output_file.write("[\n")
    i = 0
    while i < max_entries - 1:
        output_file.write("\"" + file_lines[i] + "\"," + "\n")
        i += 1

    output_file.write("\"" + file_lines[i] + "\"" + "\n")
    output_file.write("];")
