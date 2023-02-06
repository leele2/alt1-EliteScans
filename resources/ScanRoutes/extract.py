import pandas as pd
import numpy as np
import os
import json

def thing(arr, string = "", count = -1):
    if len(arr) == 1:
        string = string + 'node: "' + arr[0] + '"}'
        string = string + count*"}" + "\n"
        print(string)
        return string
    count = count + 1
    string = string + 'node: "' + arr[0] + '",\n'
    string = string + arr[1] + ': {\n'
    thing(arr[2:], string, count)
    return string
    
dir_path = os.path.dirname(os.path.realpath(__file__)) + "\\"
file = "Zanaris"

df = pd.read_csv(dir_path + file + ".csv", header=None)

# Find all nodes #
nodes = []
for i in df[0].str.split(" "):
    for j in range(0,len(i),2):
        nodes.append(i[j])
nodes = list(dict.fromkeys(nodes))

# Create Dictionary for each node #
options = ["triple", "double", "single", "none"]
possible = {}
for  i in nodes:
    possible[i] = {}
    for j in options:
        possible[i][j] = []

# Fill possible values for each node #
for i in range(len(df[0])):
    for j in nodes:
        for k in options:
            if j + " " + k in df[0][i]:
                possible[j][k].append(df[1][i].split(", "))
#flattern nested lists then remove duplicates and sort
for i in possible:
    for j in possible[i]:
        possible[i][j] = [item for sublist in possible[i][j] for item in sublist]
        possible[i][j] = sorted([int(i) for i in list(dict.fromkeys(possible[i][j]))])
        
# Extract all paths #
paths = []
for i in df[0].str.split(" "):
    if len(i) > 2:
        paths.append(i[:-1])
#remove duplicates
remove = []
for i in range(len(paths)):
    for j in range(i + 1, len(paths)):
        if paths[i] == paths[j]:  
            remove.append(j)
            break
for i in sorted(remove, reverse=True):
    del paths[i]         
#remove paths which are just subsets of other paths
remove = []
for i in range(len(paths)):
    for j in range(i + 1, len(paths)):
        if set(paths[i]).issubset(paths[j]):
            remove.append(i)
            break
for i in sorted(remove, reverse=True):
    del paths[i]  
    
# Create Checkmap #
routes = {}
for i in paths:
    depth = []
    for j in range(len(i)):
        depth.append("i[" + str(j) + "]")
    for j in range(len(depth)):
        if j == 0:
            k1 = ""
            k2 = ""
            k3 = ""
        else:
            k1 = "["
            k2 = "]"
            k3 = "]["
        if eval(depth[j] + " not in routes" + k1 + k3.join(depth[:-len(depth) + j]) + k2 + ".keys()"):
            if 1 + j == len(depth):
                exec("routes" + "[" + k3.join(depth) + "]" + " = {}")
                continue
            exec("routes" + "[" + k3.join(depth[:-len(depth) + 1 + j]) + "]" + " = {}")
print(json.dumps(routes, indent=2))
# # Creates checkmap for each path
# routes = []
# for i in range(len(paths)):
#     routes.append(thing(paths[i]))

# Create locations structure # Currently requires you to fill the checkmap field from the string produced 
string = ""
string = string + '''{
        name: "LOCATION",
        mapImage: "./imgs/LOCATION/full.jpg",
        nodes: ['''
for i in nodes:
    string = string + '{\n name: "' + i + '",\n'
    for j in options[:-1]:
        string = string + j + ': ' + str(possible[i][j]) + ',\n'
    j = 'none'
    string = string + j + ': ' + str(possible[i][j]) + '\n'
    string = string + '}'
    if i != nodes[-1]:
        string = string + ','
string = string + "],\ncheckMap: {\n}}"
print(string)