#!/usr/bin/python3

from subprocess import Popen,PIPE
import sys
import json

result = {}
result['haproxy'] = {}

pipe = Popen(['getent', 'hosts'], stdout=PIPE, universal_newlines=True)

result['haproxy']['hosts'] = []
for line in pipe.stdout.readlines():
    s = line.split()
    if s[1].startswith('servera.lab.example.com'):
        result['haproxy']['hosts'].append(s[1])

result['haproxy']['vars'] = {}

if len(sys.argv) == 2 and sys.argv[1] == '--list':
    print(json.dumps(result))
elif len(sys.argv) == 3 and sys.argv[1] == '--host':
    print(json.dumps({}))
else:
    print("Requires an argument, please use --list or --host <host>")
